import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const BDLoader = ({ visible }) => {
  return (
    visible && (
      <View style={styles.Container}>
        <ActivityIndicator size={'large'} color={'#fff'} />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00000099',
    zIndex: 1,
  },
});

export default BDLoader;
