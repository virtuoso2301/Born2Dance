import {
  NativeBaseProvider,
  scale,
  verticalScale,
  moderateScale,
} from 'react-native-size-matters';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { API_URL } from '../../services/api_url';
import { useDispatch } from 'react-redux';
import { usersSignUpAdd } from '../../redux/reducers/appData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ForgotPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const forgetPassword = async () => {
    try {
      if (email === '') {
        setError('Please enter email');
      } else {
        const userValue = {
          email: email,
        };
        const response = await fetch(`${API_URL}/forgot`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userValue),
        });
        const responseJson = await response.json();
        // console.log("Data Send:-", responseJson);
        dispatch(usersSignUpAdd(responseJson.user));
        await AsyncStorage.setItem('user', JSON.stringify(responseJson));
        if (responseJson.success === true) {
          navigation.navigate('verify-otp');
        } else if (responseJson.success === false) {
          setError(responseJson.message);
        }
      }
      setTimeout(() => {
        setError('');
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={style.view}>
      <Text style={style.title}>Forgot Password?</Text>
      <Text style={style.discription}>
        Don’t worry ! It happens. Please enter the email we will send the OTP in
        this email.
      </Text>
      <View>
        <Text style={style.inputLabel}>Email</Text>
        <TextInput
          invalid
          autoCapitalize="none"
          keyboardType="email-address"
          style={style.input}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder={'Enter your email'}
          placeholderTextColor="#FFFFFF"
        />
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
      <TouchableOpacity style={style.buttonLogin} onPress={forgetPassword}>
        <LinearGradient
          colors={['#2885E5', '#9968EE']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}>
          <Text style={{ ...style.loginButtonText, color: '#FFFFFF' }}>
            Log in
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={style.signMainStyling}>
        <Text style={style.havenSignupText}>Haven’t Signed Up yet?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('login');
          }}>
          <Text style={style.signUp}>
            Sign Up <Text style={style.signUpExtra}>for B2D</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    flex: 1,
    flexGrow: 1,
    padding: '3%',
  },
  title: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 29,
    color: '#FFFFFF',
  },
  discription: {
    color: '#BABFC8',
    marginTop: '5%',
    marginBottom: '5%',
    fontSize: 14,
  },
  inputLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: '5%',
    marginTop: '2%',
  },
  input: {
    color: '#FFFFFF',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    padding: '3%',
    marginBottom: '3%',
  },
  buttonLogin: {
    marginTop: '5%',
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: 'linear-gradient(90deg, #2885E5 0%, #9968EE 100%)',
  },
  loginButtonText: {
    padding: '3%',
    alignSelf: 'center',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
  },
  forgotPasswordText: {
    color: '#956DFF',
    alignSelf: 'flex-end',
  },
  line: { flexDirection: 'row', marginTop: '10%', marginBottom: '10%' },
  lineHR: {
    backgroundColor: '#334155',
    height: 2,
    flex: 1,
    alignSelf: 'center',
  },
  lineLabel: {
    alignSelf: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    fontSize: 12,
    backgroundColor: '#1E293B',
    color: '#E2E8F0',
  },
  socialButton: {
    backgroundColor: '#1E293B',
    borderRadius: 6,
    padding: '4%',
    marginBottom: '3%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
    flex: 0.8,
  },
  signUpView: {
    flex: 1,
    alignItems: 'center',
  },
  signUpQuestion: {
    marginTop: '5%',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#BABFC8',
  },
  signUpText: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  signUp: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: '#956DFF',
  },
  signUpExtra: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  errorView: {
    flex: 1,
  },
  error: {
    color: 'red',
    padding: '2%',
    fontWeight: 'bold',
  },
  signMainStyling: {
    marginTop: moderateScale(340),
  },
  havenSignupText: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    color: '#FFFFFF',
    marginBottom: moderateScale(15),
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#BABFC8',
  },
});
