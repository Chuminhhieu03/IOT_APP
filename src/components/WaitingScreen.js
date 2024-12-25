// src/components/WaitingScreen.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Sử dụng thư viện icon

const WaitingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.block}
          onPress={() => navigation.navigate('Camera')}>
          <Icon name="camera" size={50} color="#fff" />
          <Text style={styles.blockText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.block}
          onPress={() => navigation.navigate('History')}>
          <Icon name="history" size={50} color="#fff" />
          <Text style={styles.blockText}>Lịch Sử</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.block}
          onPress={() =>
            navigation.navigate('Control', {controlType: 'light'})
          }>
          <Icon name="lightbulb-o" size={50} color="#fff" />
          <Text style={styles.blockText}>Bật/Tắt Đèn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.block}
          onPress={() => navigation.navigate('Control', {controlType: 'door'})}>
          <Icon name="home" size={50} color="#fff" />
          <Text style={styles.blockText}>Đóng/Mở Cửa</Text>
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
    backgroundColor: '#b8b8ff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  block: {
    width: '40%',
    height: 150,
    backgroundColor: '#9381ff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  blockText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default WaitingScreen;
