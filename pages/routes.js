import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { View } from 'react-native';
import { BDLoader } from '../Constants';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tokenAdd } from '../redux/reducers/appData';

const Stack = createNativeStackNavigator();

export default Routes = () => {
  const token = useSelector(state => state.appData.token);
  const dispatch = useDispatch();

  useEffect(() => {
    GetToken();
  }, []);

  const GetToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('token -> ', token);
    if (token !== null) {
      dispatch(tokenAdd(token));
    }
  };

  // if (Token === null) {
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <BDLoader visible={true} />
  //     </View>
  //   );
  // }

  return (
    <SafeAreaProvider>
      <NavigationContainer onReady={() => SplashScreen.hide()}>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
          }}>
          {!token ? (
            <Stack.Screen
              name="landing"
              component={AuthStack}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="post-login"
              component={AppStack}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
