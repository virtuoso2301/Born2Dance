import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PreLoginLanding } from './pre-login/Landing';
import { Login } from './pre-login/Login';
import { SignUp } from './pre-login/SignUp';
import { VerifyOTP } from './pre-login/VerifyOTP';
import { PasswordReset } from './pre-login/PasswordReset';
import { ForgotPassword } from './pre-login/ForgotPassword';

const Stack = createNativeStackNavigator();
const preLoginPageHeaderOptions = {
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#1E293B',
  },
  headerTitleStyle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
  },
  headerTintColor: '#fff',
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="landingMain"
        component={PreLoginLanding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          title: 'Login',
          ...preLoginPageHeaderOptions,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="signup"
        component={SignUp}
        options={{
          title: 'Sign Up',
          ...preLoginPageHeaderOptions,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="verify-otp"
        component={VerifyOTP}
        options={{
          title: 'Verify',
          ...preLoginPageHeaderOptions,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="reset-password"
        component={PasswordReset}
        options={{
          title: 'Reset Password',
          ...preLoginPageHeaderOptions,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="forgot-password"
        component={ForgotPassword}
        options={{
          title: 'Forgot Password',
          ...preLoginPageHeaderOptions,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
