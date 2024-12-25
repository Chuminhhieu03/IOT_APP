import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const DetailView = ({route}) => {
  const {name, time, image} = route.params;
  console.log('image', image);

  return (
    <View style={styles.container}>
      <Image
        source={{uri: `data:image/jpeg;base64,${image}`}}
        style={styles.image}
      />
      <Text style={styles.text}>Tên: {name}</Text>
      <Text style={styles.text}>Thời Gian: {time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#b8b8ff',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
});

export default DetailView;
