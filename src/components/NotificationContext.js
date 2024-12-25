import React, {createContext, useState, useEffect} from 'react';
import mqtt from 'mqtt';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';

export const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {
  const [notification, setNotification] = useState(null);

  const navigation = useNavigation();

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
      console.log('Connected to HiveMQ');
      client.subscribe(['iotapp/notification', 'iotapp/stranger'], err => {
        if (!err) {
          console.log('Subscribed to both topics');
        } else {
          console.error('Subscription error:', err);
        }
      });
    });

    client.on('message', (topic, message) => {
      const notificationMessage = message.toString();
      console.log(`Received on ${topic}:`, notificationMessage);

      if (topic === 'iotapp/notification') {
        showToast(
          'Người nhà của bạn vừa vào nhà',
          notificationMessage,
          'History',
          '#ffcc00',
          '#333333',
        );
      } else if (topic === 'iotapp/stranger') {
        showToast(
          'Cảnh báo có người lạ vào nhà!',
          notificationMessage,
          'Notification',
          '#ff0000',
          '#ffffff',
        );
      }
    });

    client.on('error', err => {
      console.error('MQTT Error:', err);
    });

    return () => {
      client.end();
    };
  }, []);

  const showToast = (
    title,
    message,
    targetPage,
    backgroundColor,
    textColor,
  ) => {
    Toast.show({
      type: 'custom',
      text1: title,
      text2: message,
      props: {
        backgroundColor: backgroundColor,
        textColor: textColor,
        onPress: () => {
          Toast.hide();
          navigation.navigate(targetPage); // Chuyển hướng đến trang tương ứng
        },
      },
    });
  };

  return (
    <NotificationContext.Provider value={{notification}}>
      {children}
      {/* Toast được thêm vào gốc ứng dụng */}
      <Toast
        config={{
          custom: ({text1, text2, props}) => (
            <TouchableOpacity
              onPress={props.onPress} // Thêm sự kiện nhấn vào toast
              style={{
                backgroundColor: props.backgroundColor,
                padding: 15,
                borderRadius: 8,
                marginBottom: 10,
              }}>
              <Text style={{color: props.textColor, fontWeight: 'bold'}}>
                {text1}
              </Text>
              <Text style={{color: props.textColor}}>{text2}</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </NotificationContext.Provider>
  );
};
