import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { tokenAdd, usersSignInAdd } from '../../redux/reducers/appData';
import { API_URL } from '../../services/api_url';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    emailError: '',
    passwordError: '',
    serverError: '',
  });

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '255362522738-jp58mv7hsft7viv4p1eal11bc977tf7c.apps.googleusercontent.com',
    });
  }, []);

  const loginAPI = async () => {
    try {
      if (email === '') {
        setError({ ...error, emailError: 'Please enter email' });
      } else if (password === '') {
        setError({ ...error, passwordError: 'Please enter password' });
      } else {
        const userValue = {
          email: email,
          password: password,
        };
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userValue),
        });
        const responseJson = await response.json();
        // console.log(responseJson);
        if (responseJson.success === true) {
          dispatch(usersSignInAdd(responseJson.user));
          dispatch(tokenAdd(responseJson.token));
          await AsyncStorage.setItem('token', responseJson.token);
          await AsyncStorage.setItem('user', JSON.stringify(responseJson.user));
          // navigation.navigate('home');
        } else if (responseJson.success === false) {
          setError({ ...error, serverError: responseJson.message });
        }
      }
    } catch (error) {
      setError(error);
    }
    setTimeout(() => {
      setError({ ...error, serverError: '' });
      setError({ ...error, emailError: '' });
      setError({ ...error, passwordError: '' });
    }, 3000);
  };

  const googleLogin = async () => {
    // Get the users ID token
    const userInfo = await GoogleSignin.signIn();
    if (userInfo.idToken) {
      console.log(userInfo, 'userInfo');
      // Start User
      const user = {
        _id: userInfo.id,
        fullname: userInfo.name,
        email: userInfo.email,
        ownerReferCode: Math.floor(Math.random() * 34256835),
        profileImage: userInfo.photo,
        phone: '',
      };  
      dispatch(usersSignInAdd(user));
      dispatch(tokenAdd(userInfo.idToken));
      await AsyncStorage.setItem('token', userInfo.idToken);
      await AsyncStorage.setItem('user', JSON.stringify(userInfo));
      // navigation.navigate('home');
    }
    // End User
    const googleCredential = await auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );
    await auth().signInWithCredential(googleCredential);
  };

  const facebookLogin = async () => {
    ToastAndroid.showWithGravity(
      'Comming soon',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

  return (
    <ScrollView style={style.view}>
      <View style={style.view}>
        <Text style={style.title}>Enter your email</Text>
        <Text style={style.discription}>
          Please enter your email we’ll sent you the verification code on your
          given email
        </Text>
        <View>
          <Text style={style.inputLabel}>Email</Text>
          <TextInput
            autoCapitalize="none"
            style={style.input}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder={'Enter your email'}
            placeholderTextColor="#FFFFFF"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <Text style={style.error}>{error.emailError}</Text>
        </View>
        <View>
          <Text style={style.inputLabel}>Password</Text>
          <TextInput
            autoCapitalize="none"
            secureTextEntry
            style={style.input}
            onChangeText={text => setPassword(text)}
            value={password}
            placeholder={'Enter your password'}
            placeholderTextColor="#FFFFFF"
          />
          <Text style={style.error}>{error.passwordError}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('forgot-password');
          }}>
          <Text style={style.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={style.error}>{error.serverError}</Text>
        <TouchableOpacity style={style.buttonLogin} onPress={loginAPI}>
          <LinearGradient
            colors={['#2885E5', '#9968EE']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ borderWidth: 1, borderStyle: 'solid', borderRadius: 5 }}>
            <Text style={{ ...style.loginButtonText, color: '#FFFFFF' }}>
              Log In
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={style.line}>
          <View style={style.lineHR} />
          <View style={style.lineLabel}>
            <Text style={style.lineLabel}>OR</Text>
          </View>
          <View style={style.lineHR} />
        </View>
        <View>
          <TouchableOpacity style={style.socialButton} onPress={googleLogin}>
            <Image
              resizeMode="contain"
              style={style.socialImage}
              source={require('../../assets/images/google.png')}
            />
            <Text style={style.socialText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={style.socialButton} onPress={facebookLogin}>
            <Image
              resizeMode="contain"
              style={style.facebookImage}
              source={require('../../assets/images/facebook.png')}
            />
            <View>
              <Text style={style.facebookText}>Continue with Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={style.haventSignText}>
          <View>
            <Text style={style.signUpQuestion}>Haven’t Signed Up yet? </Text>
          </View>
          <View style={style.signUpView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('signup');
              }}
              style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={style.signUp}>Sign Up</Text>
              <Text style={style.signUpExtra}> for B2D</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    flex: 1,
    flexGrow: 1,
    padding: '3%',
    marginBottom: '0%',
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
  },
  buttonLogin: {
    marginTop: '5%',
    textAlign: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
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
  line: {
    flexDirection: 'row',
    marginTop: '10%',
    marginBottom: '10%',
  },
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
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 24,
    borderColor: 'transparent',
    backgroundColor: '#1E293B',
    color: '#E2E8F0',
  },
  socialButton: {
    backgroundColor: '#1E293B',
    borderRadius: 6,
    padding: '3%',
    marginBottom: '3%',
    flexDirection: 'row',
  },
  socialText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
    flex: 0.8,
    marginLeft: moderateScale(67),
  },
  facebookText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
    flex: 0.8,
    marginLeft: moderateScale(60),
  },
  facebookImage: {
    marginLeft: moderateScale(3),
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
    marginBottom: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  signUpText: {
    marginTop: '2%',
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
  socialImage: {
    flex: 0.1,
  },
  errorView: {
    flex: 1,
    marginTop: '2%',
  },
  error: {
    marginTop: '2%',
    color: 'red',
    fontWeight: 'bold',
  },
  haventSignText: {
    marginTop: moderateScale(20),
  },
});
