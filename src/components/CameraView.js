import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import mqtt from 'mqtt';

const CameraView = ({navigation}) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const options = {
      clientId: `mqttjs_${Math.random().toString(16).substring(2, 8)}`,
      username: 'chuhieu',
      password: '123',
    };

    const client = mqtt.connect(
      'wss://a8b2eda48398497e9e05534a941a1d4b.s1.eu.hivemq.cloud:8884/mqtt',
      options,
    );

    client.on('connect', () => {
      client.subscribe('iot_app/image', err => {
        if (!err) {
          console.log('Subscribed to iotapp/image');
        }
      });
    });

    client.on('message', (topic, message) => {
      if (topic === 'iot_app/image') {
        setImage(`data:image/jpeg;base64,${message.toString()}`);
      }
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{uri: image}} style={styles.image} />
      ) : (
        <Image
          source={require('../static/images/no_image.jpg')}
          style={styles.image}
        />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Notification')}>
          <Text style={styles.buttonText}>Thông báo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('History')}>
          <Text style={styles.buttonText}>Lịch sử</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b8b8ff', // Màu nền khác màu xám
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 30,
    borderRadius: 10, // Bo góc cho hình ảnh
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: '#9381ff', // Màu nền của nút (xanh lá cây)
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff', // Màu chữ của nút
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CameraView;
