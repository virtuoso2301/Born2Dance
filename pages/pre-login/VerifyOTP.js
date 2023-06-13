import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from '../../services/api_url';
import { loaderAdd } from '../../redux/reducers/appData';


export const VerifyOTP = ({navigation}) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const usersSignUp = useSelector(state => state.appData.usersSignUp);

  const verifySingUpCode = async () => {
    try {
      if (code.length !== 6) {
        setError('Enter valid code !!!');
        return;
      }
      const request = {
        email: usersSignUp.email,
        otp: code,
      }
      const response = await fetch(
        `${API_URL}/verify`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(request)
        });
        const responseJson = await response.json();
        if(responseJson.success === true){
          dispatch(loaderAdd(false));
          navigation.navigate('reset-password');
        } else if(responseJson.success === false){
          setError(responseJson.message);
        }
        setTimeout(() => {
          setError('');
        }, 5000);
    } catch (error) {
      setError(error);
    }
  };

  // resend code
  const resendOtp = async () => {
    try {
      const request = {
        email: usersSignUp.email,
      }
      const response = await fetch(
        `${API_URL}/resetOtp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(request)
        });
        const responseJson = await response.json();
        if(responseJson.success === true){
          setError(responseJson.message);
        } else if(responseJson.success === false){
          setError(responseJson.message);
        }
        setTimeout(() => {
          setError('');
        }, 5000);
    } catch (error) {
      setError(error);
    }
  }


  return (
    <View style={style.view}>
      <Text style={style.title}>Enter 6 digit code</Text>
      <Text style={style.discription}>
        Please enter the code we have sent you the verification code on your
        given email ID.
      </Text>
      <View>
        <OTPTextInput
          handleTextChange={e => {
            setCode(e);
          }}
          inputCount={6}
          offTintColor="#BABFC8"
          tintColor="#3183E6"
          textInputStyle={style.input}></OTPTextInput>
      </View>

      <View style={style.verifyView}>
        <TouchableOpacity
          onPress={resendOtp}
          style={{flex: 1, flexDirection: 'row'}}>
          <Text style={style.verifyQuestion}>Didn’t recieved yet? </Text>
          <Text style={style.verify}> Resend Code</Text>
        </TouchableOpacity>
      </View>
      {error !== '' && (
        <View style={style.errorView}>
          <Text style={style.error}>{error}</Text>
        </View>
      )}
        <View>
          <TouchableOpacity
            style={style.buttonVerify}
            onPress={verifySingUpCode}>
            <LinearGradient
              colors={['#2885E5', '#9968EE']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={{borderWidth: 1, borderRadius: 5, borderStyle: 'solid'}}>
              <Text style={{...style.verifyButtonText, color: '#FFFFFF'}}>
                Verify OTP
              </Text>
            </LinearGradient>
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
    marginBottom: '3%',
  },
  buttonVerify: {
    marginBottom: '10%',
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: 'linear-gradient(90deg, #2885E5 0%, #9968EE 100%)',
  },
  verifyButtonText: {
    padding: '2%',
    alignSelf: 'center',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
  },
  verifyView: {
    flex: 1,
    alignItems: 'center',
  },
  verifyQuestion: {
    marginTop: '5%',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#BABFC8',
  },
  verify: {
    marginTop: '5%',
    // alignSelf: 'center',
    // justifyContent: 'flex-start',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: '#956DFF',
  },
  errorView: {
    flex: 1,
  },
  error: {
    color: 'red',
    padding: '1%',
    fontWeight: 'bold',
  },
});