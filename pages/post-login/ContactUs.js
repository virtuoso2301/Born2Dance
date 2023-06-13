import React, { useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {moderateVerticalScale, scale} from 'react-native-size-matters';
import crossIcon from '../../assets/images/crossBtn.png';
import Textarea from 'react-native-textarea';
import { API_URL } from '../../services/api_url';

export function ContactUs({navigation}) {
  const [code, setCode] = useState('+91');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState({
    mobile: '',
    message: '',
  });

  const SubmitContact = async () => {
    if (mobile === '') {
      setError({...error, mobile: 'mobile number is required'});
    }
    else if (message === '') {
      setError({...error, message: 'message is required'});
    } else{
      const userValue = {
        mobile: mobile,
        msg: message,
      };
      const response = await fetch(
        `${API_URL}/addContact`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userValue)
        });
        const responseJson = await response.json();
        if(responseJson.success === true){
          navigation.navigate('feedback')
        }
      }
        setTimeout(() => {
          setError({...error, mobile: ''});
          setError({...error, message: ''});
        }, 3000);
  }

  return (
    <View style={{flex: 1, backgroundColor: '#0F172B'}}>
      <View
        style={{
            padding: 20,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: '#1D283A',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
          <Image
            source={crossIcon}
            style={{
              width: scale(15),
              height: scale(15),
              marginTop: moderateVerticalScale(6),
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={style.maincontactBack}>
        <View style={style.contactBackColor}>
          <Text style={style.feedbackText}>
            Having any trouble? Share your feedback
          </Text>
          <Text style={style.providingText}>
            Providing your phone number will help us reach out to you faster
          </Text>
          <View style={style.inputArea}>
            <TextInput
              style={style.inputOneStyle}
              placeholder="+91"
              placeholderTextColor="#BABFC8"
              onChangeText={text => setCode(text)}
              value={code}
            />
            <TextInput
              style={style.inputTextStyle}
              placeholder="enter your number"
              placeholderTextColor="#BABFC8"
              keyboardType='numeric'
              onChangeText={(text) => setMobile(text)}
              value={mobile}
              maxLength={10}
            />
          </View>
          <Text style={{color:'red', marginLeft: moderateVerticalScale(25), marginTop: moderateVerticalScale(10)}}>{error.mobile}</Text>
          <View style={style.textAreaStyle}>
            <Textarea
                placeholderTextColor="#BABFC8"
                style={style.textAreaInput}
                placeholder={'Type something here...'}
                onChangeText={(text) => setMessage(text)}
                value={message}
                maxLength={200}
            />
          </View>
          <Text style={{color:'red', marginLeft: moderateVerticalScale(25), marginTop: moderateVerticalScale(10)}}>{error.message}</Text>
          <View style={style.submitButton}>
            <TouchableOpacity
              style={style.mainNextstyle}
              onPress={SubmitContact}>
              <LinearGradient
                colors={['#2885E5', '#9968EE']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderRadius: 5,
                  padding: '3%',
                  alignItems: 'center',
                }}>
                <Text style={{...style.loginButtonText, color: '#FFFFFF'}}>
                  Submit
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const style = {
  maincontactBack: {
      marginTop: moderateVerticalScale(25),
  },
      contactBackColor: {
      backgroundColor: '#1E293B',
      height: '100%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
  },
  feedbackText: {
      color: '#FFFFFF',
      fontSize: scale(16),
      textAlign: 'center',
      marginTop: moderateVerticalScale(25),
      paddingLeft: scale(18),
      paddingRight: scale(18),
  },
  providingText: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontSize: scale(14),
      paddingLeft: scale(21),
      paddingRight: scale(21),
      marginTop: scale(10),
  },
  inputArea: {
      flexDirection: 'row',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: scale(30),
      paddingLeft: scale(14),
      paddingRight: scale(14),
  },
  inputOneStyle: {
      borderWidth: 1,
      borderRadius: 5,
      color: '#FFF',
      borderColor: '#BABFC8',
      padding: '2%',
      width: '12%',
  },
  inputTextStyle: {
      color: '#FFF',
      borderWidth: 1,
      borderRadius: 5,
      color: '#FFF',
      borderColor: '#BABFC8',
      padding: '2%',
      width: '85%',
  },
  textAreaStyle: {
      paddingLeft: scale(14),
      paddingRight: scale(14),
      marginTop: scale(30),
  },
  textAreaInput: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#BABFC8',
      height: scale(160),
      textAlignVertical: 'top',
      paadding: '2%',
      color: '#FFF',
  },
  submitButton:{
      fontSize: scale(16),
      paddingLeft: scale(14),
      paddingRight: scale(14),
      marginTop: moderateVerticalScale(190),
  }
};
