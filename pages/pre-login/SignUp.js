import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { loaderAdd, usersSignUpAdd } from '../../redux/reducers/appData';
import { API_URL } from '../../services/api_url';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    serverError: '',
  });

  const signUpAPI = async () => {
    try {
      if (name === '') {
        setError({ ...error, name: 'Name is required' });
      } else if (email === '') {
        setError({ ...error, email: 'Email is required' });
      } else if (password === '') {
        setError({ ...error, password: 'Password is required' });
      } else {
        const request = {
          fullname: name,
          email: email,
          password: password,
          refercode: code,
          loginType: 'manual',
          profileImage: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
        };
        const response = await fetch(`${API_URL}/signup`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        });
        const responseJson = await response.json();
        if (responseJson.success === true) {
          dispatch(usersSignUpAdd(request));
          await AsyncStorage.setItem('user', JSON.stringify(request));
          navigation.navigate('login');
          setError({ ...error, name: '', mobile: '', password: '' });
        } else if (responseJson.success === false) {
          setError({ ...error, serverError: responseJson.message });
        }
      }
      setTimeout(() => {
        setError({ ...error, name: '', mobile: '', password: '' });
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={style.view}>
      <View style={style.view}>
        <Text style={style.title}>Welcome</Text>
        <Text style={style.discription}>Lets get started with you B2D.</Text>
        <View>
          <Text style={style.inputLabel}>Full Name</Text>
          <TextInput
            style={style.input}
            autoCapitalize="none"
            onChangeText={text => setName(text)}
            value={name}
            placeholderTextColor="#FFFFFF"
            placeholder={'Enter your full name'}
          />
          <Text style={style.error}>{error.name}</Text>
        </View>
        <View>
          <Text style={style.inputLabel}>Email</Text>
          <TextInput
            style={style.input}
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
            value={email}
            placeholderTextColor="#FFFFFF"
            placeholder={'Enter your email'}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <Text style={style.error}>{error.email}</Text>
        </View>
        <View>
          <Text style={style.inputLabel}>Password</Text>
          <View>
            <TextInput
              autoCapitalize="none"
              style={style.input}
              secureTextEntry={!showPassword}
              onChangeText={text => setPassword(text)}
              value={password}
              placeholderTextColor="#FFFFFF"
              placeholder={' Enter your password'}
            />
            {!showPassword ? (
              <TouchableOpacity
                style={style.suffix}
                onPress={() => setShowPassword(!showPassword)}>
                <Image
                  resizeMode="cover"
                  source={require('../../assets/images/eye_off.png')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={style.suffix}
                onPress={() => setShowPassword(!showPassword)}>
                <Image
                  resizeMode="cover"
                  source={require('../../assets/images/eye.png')}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text style={style.error}>{error.password}</Text>
        </View>
        <View>
          <Text style={style.inputLabel}>Any Referal Code?</Text>
          <TextInput
            autoCapitalize="none"
            style={style.input}
            onChangeText={text => setCode(text)}
            value={code}
            placeholderTextColor="#FFFFFF"
            placeholder={'Referal code'}
          />
        </View>
        <View style={style.errorView}>
          <Text style={style.error}>{error.serverError}</Text>
        </View>
        <TouchableOpacity style={style.buttonSignup} onPress={signUpAPI}>
          <LinearGradient
            colors={['#2885E5', '#9968EE']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ borderWidth: 1, borderStyle: 'solid', borderRadius: 5 }}>
            <Text style={{ ...style.signupButtonText, color: '#FFFFFF' }}>
              Sign Up
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={style.loginView}>
          <Text style={style.loginQuestion}>Already have an account? </Text>
        </View>
        <View style={style.loginView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('login');
            }}
            style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={style.login}>Log In</Text>
            <Text style={style.loginExtra}> for B2D</Text>
          </TouchableOpacity>
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
    marginBottom: '2%',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  suffix: {
    position: 'absolute',
    top: 12,
    right: 15,
  },
  buttonSignup: {
    marginTop: '5%',
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: 'linear-gradient(90deg, #2885E5 0%, #9968EE 100%)',
  },
  signupButtonText: {
    padding: '3%',
    alignSelf: 'center',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
  },
  loginView: {
    flex: 1,
    alignItems: 'center',
  },
  loginQuestion: {
    marginTop: '5%',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#BABFC8',
  },
  loginText: {
    marginTop: '2%',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  login: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: '#956DFF',
  },
  loginExtra: {
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
    fontWeight: 'bold',
  },
});
