import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './components/SplashScreen';
import LoadingScreen from './components/LoadingScreen';
import NotificationScreen from './components/NotificationScreen';
import CameraView from './components/CameraView';
import HistoryView from './components/HistoryView';
import DetailView from './components/DetailView';
import {NotificationProvider} from './components/NotificationContext';
import WaitingScreen from './components/WaitingScreen';
import ControlScreen from './components/ControlScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  // const {notification} = useContext(NotificationContext);

  return (
    <NavigationContainer>
      <NotificationProvider>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}} // Không hiển thị tiêu đề ở màn hình Splash
          />
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{title: 'Đang tải'}} // Tiêu đề tiếng Việt
          />
          <Stack.Screen
            name="Notification"
            component={NotificationScreen}
            options={{title: 'Thông báo'}} // Tiêu đề tiếng Việt
          />
          <Stack.Screen
            name="Camera"
            component={CameraView}
            options={{title: 'Máy ảnh'}} // Tiêu đề tiếng Việt
          />
          <Stack.Screen
            name="History"
            component={HistoryView}
            options={{title: 'Lịch sử'}} // Tiêu đề tiếng Việt
          />
          <Stack.Screen
            name="Detail"
            component={DetailView}
            options={{title: 'Chi tiết'}} // Tiêu đề tiếng Việt
          />
          <Stack.Screen
            name="Waiting"
            component={WaitingScreen}
            options={{title: 'Màn hình quản lý'}} // Tiêu đề tiếng Việt
          />
          <Stack.Screen
            name="Control"
            component={ControlScreen}
            options={{title: 'Điều khiển'}} // Tiêu đề tiếng Việt
          />
        </Stack.Navigator>
      </NotificationProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
