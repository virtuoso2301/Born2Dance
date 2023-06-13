import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { Dropdown } from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { hp, wp } from '../../Constants';
import RazorpayCheckout from 'react-native-razorpay';
import Logo from '../../assets/images/logo.png';

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    flex: 1,
    paddingHorizontal: wp(3),
  },
  requestFormText: {
    color: '#ffffff',
    fontSize: scale(16),
    paddingTop: hp(3),
  },
  pleaseText: {
    color: '#BABFC8',
    fontSize: scale(12),
    paddingVertical: hp(2),
  },
  whyYouText: {
    color: '#ffffff',
    fontSize: scale(16),
    fontStyle: 'Poppins',
    paddingBottom: hp(1),
  },
  dropdownStyle: {
    marginTop: hp(1),
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#334155',
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.5),
  },
  placeholderStyle: {
    color: '#BABFC8',
  },
  loginButtonText: {
    padding: '3%',
    textAlign: 'center',
  },
  mainNextstyle: {
    marginVertical: hp(4),
  },
  selectedTextStyle: {
    color: '#BABFC8',
  },
  inputSearchStyle: {
    backgroundColor: '#0E172A',
    color: '#BABFC8',
  },
  inputContainer: {
    paddingTop: hp(2),
  },
  input: {
    backgroundColor: '#0E172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 5,
    padding: '2%',
    paddingHorizontal: wp(5),
    color: '#BABFC8',
    fontSize: scale(12),
  },
});

export const CustomVideo = ({ navigation }) => {
  const TypeOfEvent = [
    { label: 'Online', value: 'Online' },
    { label: 'Offline', value: 'Offline' },
    { label: 'Home', value: 'Home' },
    { label: 'Office', value: 'Office' },
  ];

  const DanceLevel = [
    { label: 'Begginer', value: '100' },
    { label: 'Intermediate', value: '200' },
    { label: 'Advance', value: '500' },
  ];

  const [State, setState] = useState({
    TypeOfEvent: null,
    DanceLevel: null,
    Email: '',
    PhoneNumber: '',
  });

  const onSubmitPress = async () => {
    if (State.DanceLevel == null) {
      return alert('Please select dance level');
    }
    if (State.PhoneNumber.length < 10) {
      return alert('Please enter your phone number');
    }
    const options = {
      description: 'Description goes here',
      image: Logo,
      currency: 'INR',
      key: 'rzp_test_OCVELwbtKpzpvc', // Your api key
      amount: Number(State.DanceLevel?.value) + '00',
      name: State.DanceLevel?.label,
      prefill: {
        email: 'email goes here',
        contact: 'phone number goes here',
        name: 'Fullname goes here',
      },
      theme: { color: '#F37254' },
    };
    await RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        ToastAndroid.showWithGravity(
          `Success: ${data.razorpay_payment_id}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        dispatch(paymentSuccessStatusAdd(data.razorpay_payment_id));
        navigation.navigate('home');
      })
      .catch(error => {
        // handle success
        console.log('Razorpay -> ', JSON.stringify(error, null, 2));
        ToastAndroid.showWithGravity(
          error.error?.description,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  };

  return (
    <View style={style.view}>
      <ScrollView>
        <Text style={style.requestFormText}>Request Form</Text>
        <Text style={style.pleaseText}>
          Please answer the following question so the we can reach to you.
        </Text>

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Song title</Text>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={style.input}
            placeholder="Eg. Summer high,AP Dhillon"
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Type of event</Text>
          <Dropdown
            style={style.inputStyle}
            selectedTextStyle={{ color: '#babfc8' }}
            placeholderStyle={{ color: '#babfc8' }}
            containerStyle={{ borderWidth: 0 }}
            data={TypeOfEvent}
            labelField="label"
            valueField="value"
            placeholder={'Please select the type'}
            value={State.TypeOfEvent?.value}
            onChange={e => setState(p => ({ ...p, TypeOfEvent: e }))}
            renderItem={(item, selected) => (
              <View
                style={{
                  backgroundColor: selected ? '#263040' : '#334155',
                  paddingHorizontal: wp(2),
                  paddingVertical: hp(1.5),
                }}>
                <Text style={{ color: '#babfc8' }}>{item.label}</Text>
              </View>
            )}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Dance Level</Text>
          <Dropdown
            style={style.inputStyle}
            selectedTextStyle={{ color: '#babfc8' }}
            placeholderStyle={{ color: '#babfc8' }}
            containerStyle={{ borderWidth: 0 }}
            renderItem={(item, selected) => (
              <View
                style={{
                  backgroundColor: selected ? '#263040' : '#334155',
                  paddingHorizontal: wp(2),
                  paddingVertical: hp(1.5),
                }}>
                <Text style={{ color: '#babfc8' }}>{item.label}</Text>
              </View>
            )}
            data={DanceLevel}
            labelField="label"
            valueField="value"
            placeholder={'Please select the type'}
            value={State.DanceLevel?.value}
            onChange={e => setState(p => ({ ...p, DanceLevel: e }))}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Enter your Email Id</Text>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={style.input}
            placeholder="Eg; demo@gmail.com"
            keyboardType={'email-address'}
            value={State.Email}
            onChangeText={v => setState(p => ({ ...p, Email: v }))}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>
            Enter Your Mobile Number (required){' '}
          </Text>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={style.input}
            placeholder="Eg 9986754380"
            maxLength={10}
            keyboardType={'numeric'}
            value={State.PhoneNumber}
            onChangeText={v => setState(p => ({ ...p, PhoneNumber: v }))}
          />
        </View>
        <TouchableOpacity onPress={onSubmitPress} style={style.mainNextstyle}>
          <LinearGradient
            colors={['#2885E5', '#9968EE']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ borderWidth: 1, borderStyle: 'solid', borderRadius: 5 }}>
            <Text style={{ ...style.loginButtonText, color: '#FFFFFF' }}>
              Submit
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
