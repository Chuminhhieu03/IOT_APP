import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const ControlScreen = ({route}) => {
  const {controlType} = route.params;
  const [isLightOn, setIsLightOn] = useState(false);
  const [isDoorOpen, setIsDoorOpen] = useState(false);

  // Khai báo giá trị animated cho màu nền
  const backgroundColor = useState(new Animated.Value(0))[0];

  const toggleApi = async () => {
    if (controlType === 'light') {
      const response = await axios.post(
        'https://iot-deploy.onrender.com/api/user/toogle_statement_light',
      );
      const newLightState = response.data.data === 'true';
      setIsLightOn(newLightState);
    } else if (controlType === 'door') {
      const response = await axios.post(
        'https://iot-deploy.onrender.com/api/user/toogle_statement_door',
      );
      const newDoorState = response.data.data === 'true';
      setIsDoorOpen(newDoorState);
    }
  };

  const toggleLight = async () => {
    await toggleApi(); // Cập nhật trạng thái từ API trước
    Animated.timing(backgroundColor, {
      toValue: isLightOn ? 1 : 0, // Chuyển đổi giá trị dựa trên trạng thái mới
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const toggleDoor = async () => {
    await toggleApi();
    Animated.timing(backgroundColor, {
      toValue: isDoorOpen ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  // Biến chuyển đổi màu nền từ animated giá trị
  const backgroundColorInterpolation = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#333333', '#b8b8ff'], // Nếu là 0 thì nền tối, nếu là 1 thì nền sáng
  });

  const fetchData = async () => {
    if (controlType === 'light') {
      const response = await axios.get(
        'https://iot-deploy.onrender.com/api/user/get_statement_light',
      );
      const newLightState = response.data.data === 'true';
      setIsLightOn(newLightState);
    } else if (controlType === 'door') {
      const response = await axios.get(
        'https://iot-deploy.onrender.com/api/user/get_statement_door',
      );
      const newDoorState = response.data.data === 'true';
      setIsDoorOpen(newDoorState);
    }
  };

  useEffect(() => {
    fetchData();
  }, [route]);

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: isLightOn ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isLightOn]);

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: isDoorOpen ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isDoorOpen]);

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: backgroundColorInterpolation},
      ]}>
      {controlType === 'light' && (
        <View style={styles.controlBlock}>
          <TouchableOpacity style={styles.button} onPress={toggleLight}>
            <Icon
              name="lightbulb-o"
              size={50}
              color={isLightOn ? '#ffcc00' : '#fff'}
            />
            <Text style={styles.buttonText}>
              {isLightOn ? 'Tắt Đèn' : 'Bật Đèn'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {controlType === 'door' && (
        <View style={styles.controlBlock}>
          <TouchableOpacity style={styles.button} onPress={toggleDoor}>
            <Icon
              name="home"
              size={50}
              color={isDoorOpen ? '#00ff00' : '#fff'}
            />
            <Text style={styles.buttonText}>
              {isDoorOpen ? 'Đóng Cửa' : 'Mở Cửa'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBlock: {
    marginBottom: 30,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9381ff',
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ControlScreen;
