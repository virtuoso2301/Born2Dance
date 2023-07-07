import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { moderateVerticalScale, scale } from 'react-native-size-matters';
import { API_URL, API_URL_IMAGE } from '../../services/api_url';
import { profile } from '../../services/services';
import { usersSignInAdd } from '../../redux/reducers/appData';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { hp } from '../../Constants';

export const ProfileTwo = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const users = route.params.users;
  const token = useSelector(state => state.appData.token);



  const [name, setName] = useState(users?.fullname);
  const [email, setEmail] = useState(users?.email);
  const [phone, setPhone] = useState(users?.phone);
  const [image, setImage] = useState({
    uri: users?.profileImage,
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const updateProfile = async () => {
    try {
      const userValue = {
        fullname: name,
        phone: phone,
      };
      const response = await fetch(`${API_URL}/update`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: `${token}`,
        },
        body: JSON.stringify(userValue),
      });
      const responseJson = await response.json();
      if (responseJson.success === true) {
        profile(token)
          .then(res => {
            dispatch(usersSignInAdd(res));
          })
          .catch(err => {
            console.log(err);
          });
        ToastAndroid.show('Profile updated successfully', ToastAndroid.SHORT);
      }
    } catch (error) {
      setError(error);
    }
  };

  const uploadImage = async () => {
    try {
      const result = await launchImageLibrary({ noData: true });
      if (result) {
        setImage({ uri: result.assets[0].uri });
        var formdata = new FormData();
        formdata.append('profile', {
          name: result.assets[0].fileName,
          type: result.assets[0].type,
          uri: result.assets[0].uri,
        });

        // image upload api
        const response = await fetch(`${API_URL}/uploadprofile`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            token: `${token}`,
          },
          body: formdata,
        });
        const responseJson = await response.json();
        //  console.log(responseJson)
        if (responseJson.success === true) {
          profile(token)
            .then(res => {
              dispatch(usersSignInAdd(res));
            })
            .catch(err => {
              console.log(err);
            });
          ToastAndroid.show('Image updated successfully', ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={style.view}>
      <View>
        <View style={style.profileStyle}>
          <Image source={image} style={style.profileImage} />
          <Text
            style={{
              fontSize: scale(20),
              fontWeight: 'bold',
              color: '#FFFFFF',
              marginTop: moderateVerticalScale(6),
            }}>
            {users?.fullname}
          </Text>
          <TouchableOpacity onPress={uploadImage}>
            <Text
              style={{
                fontSize: scale(15),
                fontWeight: 'bold',
                color: '#956DFF',
                marginTop: moderateVerticalScale(6),
              }}>
              Change photo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.view}>
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
        </View>
        <View>
          <Text style={style.inputLabel}>Email</Text>
          <TextInput
            style={style.input}
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
            value={email}
            placeholderTextColor="#FFFFFF"
            editable={false}
            selectTextOnFocus={false}
            underlineColorAndroid="transparent"
            placeholder={'Enter your email'}
          />
        </View>
        <View>
          <Text style={style.inputLabel}>Phone Number</Text>
          <TextInput
            style={style.input}
            autoCapitalize="none"
            onChangeText={text => setPhone(text)}
            value={phone}
            maxLength={10}
            keyboardType="numeric"
            placeholderTextColor="#FFFFFF"
            placeholder={'Enter your phone number'}
          />
        </View>
        <View>
          <Text style={style.inputLabel}>Password</Text>
          <View>
            <TextInput
              autoCapitalize="none"
              secureTextEntry
              style={style.input}
              onChangeText={text => setPassword(text)}
              value={password}
              placeholderTextColor="#FFFFFF"
              placeholder={' Enter your password'}
            />
          </View>
        </View>

        {error !== '' && (
          <View style={style.errorView}>
            <Text style={style.error}>{error}</Text>
          </View>
        )}
        <TouchableOpacity style={style.buttonSignup} onPress={updateProfile}>
          <LinearGradient
            colors={['#2885E5', '#9968EE']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ borderWidth: 1, borderStyle: 'solid', borderRadius: 5 }}>
            <Text style={{ ...style.signupButtonText, color: '#FFFFFF' }}>
              Save Changes
            </Text>
          </LinearGradient>
        </TouchableOpacity>
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
  profileStyle: {
    flex: 1,
    alignItems: 'center',
    marginTop: moderateVerticalScale(30),
    marginBottom: moderateVerticalScale(22),
  },
  profileImage: {
    width: scale(95),
    height: scale(95),
    borderRadius: scale(45),
    marginTop: moderateVerticalScale(6),
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
    marginBottom: hp(1),
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
  // loginQuestion: {
  //   marginTop: '5%',
  //   fontStyle: 'normal',
  //   fontWeight: '400',
  //   fontSize: 14,
  //   lineHeight: 20,
  //   color: '#BABFC8',
  // },
  // loginText: {
  //   marginTop: '2%',
  //   fontStyle: 'normal',
  //   fontWeight: '600',
  //   fontSize: 14,
  //   lineHeight: 20,
  //   color: '#FFFFFF',
  // },
  // login: {
  //   alignSelf: 'center',
  //   justifyContent: 'flex-start',
  //   fontStyle: 'normal',
  //   fontWeight: '600',
  //   fontSize: 14,
  //   lineHeight: 20,
  //   color: '#956DFF',
  // },
  // loginExtra: {
  //   alignSelf: 'center',
  //   justifyContent: 'flex-start',
  //   fontStyle: 'normal',
  //   fontWeight: '600',
  //   fontSize: 14,
  //   lineHeight: 20,
  //   color: '#FFFFFF',
  // },
  errorView: {
    flex: 1,
  },
  error: {
    color: 'red',
    padding: '2%',
    fontWeight: 'bold',
  },
});
