import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { Dropdown } from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../assets/images/logo.png';
import { hp, wp } from '../../Constants';
import RazorpayCheckout from 'react-native-razorpay';

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    flex: 1,
    paddingHorizontal: '3%',
  },
  requestFormText: {
    color: '#ffffff',
    fontSize: scale(16),
    paddingTop: scale(10),
  },
  pleaseText: {
    color: '#BABFC8',
    fontSize: scale(12),
  },
  whyYouText: {
    color: '#ffffff',
    fontSize: scale(16),
    fontStyle: 'Poppins',
  },
  dropdownStyle: {
    marginTop: moderateScale(20),
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#334155',
    padding: '2%',
  },
  placeholderStyle: {
    color: '#BABFC8',
  },
  loginButtonText: {
    padding: '3%',
    textAlign: 'center',
  },
  mainNextstyle: {
    marginVertical: hp(2),
  },
  selectedTextStyle: {
    color: '#BABFC8',
  },
  inputSearchStyle: {
    backgroundColor: '#0E172A',
    color: '#BABFC8',
  },
});

export const HireusOne = ({ navigation }) => {
  const Requirement = [
    { label: 'Album songs', value: 'Album songs' },
    { label: 'Films', value: 'Films' },
    { label: 'Workshops', value: 'Workshops' },
    { label: 'Events', value: 'Events' },
    { label: 'School & College', value: 'School & College' },
    { label: 'Sangeet', value: 'Sangeet' },
    { label: 'Others', value: 'Others' },
  ];

  const Learn = [
    { label: 'Online', value: '100' },
    { label: 'Offline', value: '200' },
    { label: 'Your Place', value: 'Your Place' },
    { label: 'Our Place', value: 'Our Place' },
    { label: 'Others', value: 'Others' },
  ];

  const [State, setState] = useState({
    Requirement: null,
    Learn: null,
    Gender: null,
    Contect: null,
    ContectTiming: null,
  });

  const onSubmitPress = async () => {
    if (!State.Requirement?.value) {
      return alert('Please select What type of requirement you have?');
    }
    if (!State.Learn?.value) {
      return alert('Please select Where do you want to learn?');
    }

    const options = {
      description: 'Description goes here',
      image: Logo,
      currency: 'INR',
      key: 'rzp_test_OCVELwbtKpzpvc', // Your api key
      amount: Number(State.Learn?.value) + '00',
      name: State.Learn?.label,
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
        navigation.navigate('request-us');
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
      {/* <View style={{ width:'20%', height:4,backgroundColor:'#956DFF'}}></View>÷ */}
      <ScrollView>
        <View>
          <Text style={style.requestFormText}>Request Form</Text>
        </View>
        <View style={{ marginTop: moderateScale(10) }}>
          <Text style={style.pleaseText}>
            Please answer the following question so the we can reach to you.
          </Text>
        </View>
        <View style={{ marginTop: moderateScale(15) }}>
          <Text style={style.whyYouText}>
            What type of requirement you have?
          </Text>
        </View>

        <View style={style.dropdownStyle}>
          <Dropdown
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
            style={style.inputStyle}
            data={Requirement}
            labelField="label"
            valueField="value"
            placeholder={'Please select the type'}
            value={State.Requirement?.value}
            onChange={v => {
              setState(p => ({ ...p, Requirement: v }));
            }}
          />
        </View>

        <View style={{ marginTop: moderateScale(15) }}>
          <Text style={style.whyYouText}>Where do you want to learn?</Text>
        </View>

        <View style={style.dropdownStyle}>
          <Dropdown
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
            style={style.inputStyle}
            data={Learn}
            labelField="label"
            valueField="value"
            placeholder={'Please select the type'}
            value={State.Learn?.value}
            onChange={v => {
              setState(p => ({ ...p, Learn: v }));
            }}
          />
        </View>

        <View style={{ marginTop: moderateScale(15) }}>
          <Text style={style.whyYouText}>Choose choreographer gender.</Text>
        </View>

        <View style={style.dropdownStyle}>
          <Dropdown
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
            style={style.inputStyle}
            data={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ]}
            labelField="label"
            valueField="value"
            placeholder={'Please select the type'}
            value={State.Gender?.value}
            onChange={v => {
              setState(p => ({ ...p, Gender: v }));
            }}
          />
        </View>

        <View style={{ marginTop: moderateScale(15) }}>
          <Text style={style.whyYouText}>Please enter your name?</Text>
        </View>

        <View style={style.dropdownStyle}>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={{
              marginTop: moderateVerticalScale(1),
              backgroundColor: '#0E172A',
              borderWidth: 1,
              borderColor: '#334155',
              borderRadius: 5,
              padding: '2%',
              paddingLeft: moderateScale(16),
              // margin: '2%',
              color: '#BABFC8',
              fontSize: scale(12),
              lineHeight: 14,
              width: '100%',
              // marginHorizontal:'2.5%',
              textTransform: 'capitalize',
              marginVertical: '5%',
            }}
            placeholder="john Abraham"
          />
        </View>

        <View style={{ marginTop: moderateScale(15) }}>
          <Text style={style.whyYouText}>Please enter your number?</Text>
        </View>

        <View style={style.dropdownStyle}>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={{
              marginTop: moderateVerticalScale(1),
              backgroundColor: '#0E172A',
              borderWidth: 1,
              borderColor: '#334155',
              borderRadius: 5,
              padding: '2%',
              paddingLeft: moderateScale(16),
              // margin: '2%',
              color: '#BABFC8',
              fontSize: scale(12),
              lineHeight: 14,
              width: '100%',
              // marginHorizontal:'2.5%',
              textTransform: 'capitalize',
              marginVertical: '5%',
            }}
            placeholder="Eg; 9747474747"
          />
        </View>

        <View style={{ marginTop: moderateScale(2) }}>
          <Text style={style.whyYouText}>Please enter your email ID?</Text>
        </View>

        <View style={style.dropdownStyle}>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={{
              backgroundColor: '#0E172A',
              marginTop: moderateVerticalScale(1),
              borderWidth: 1,
              borderColor: '#334155',
              borderRadius: 5,
              padding: '2%',
              paddingLeft: moderateScale(16),
              // margin: '2%',
              color: '#BABFC8',
              fontSize: scale(12),
              lineHeight: 14,
              width: '100%',
              // marginHorizontal:'2.5%',
              textTransform: 'capitalize',
              marginVertical: '5%',
            }}
            placeholder="Eg; abcd@gmail.com"
          />
        </View>

        <View style={{ marginTop: moderateScale(2) }}>
          <Text style={style.whyYouText}>Please enter your country?</Text>
        </View>

        <View style={style.dropdownStyle}>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={{
              backgroundColor: '#0E172A',
              marginTop: moderateVerticalScale(1),
              borderWidth: 1,
              borderColor: '#334155',
              borderRadius: 5,
              padding: '2%',
              paddingLeft: moderateScale(16),
              // margin: '2%',
              color: '#BABFC8',
              fontSize: scale(12),
              lineHeight: 14,
              width: '100%',
              // marginHorizontal:'2.5%',
              textTransform: 'capitalize',
              marginVertical: '5%',
            }}
            placeholder="india"
          />
        </View>

        <View style={{ marginTop: moderateScale(2) }}>
          <Text style={style.whyYouText}>Please enter your address?</Text>
        </View>

        <View style={style.dropdownStyle}>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={{
              backgroundColor: '#0E172A',
              marginTop: moderateVerticalScale(1),
              borderWidth: 1,
              borderColor: '#334155',
              borderRadius: 5,
              padding: '2%',
              paddingLeft: moderateScale(16),
              // margin: '2%',
              color: '#BABFC8',
              fontSize: scale(12),
              lineHeight: 14,
              width: '100%',
              // marginHorizontal:'2.5%',
              textTransform: 'capitalize',
              marginVertical: '5%',
            }}
            placeholder="ABCD street, Mumbai "
          />
        </View>

        <View style={{ marginTop: moderateScale(2) }}>
          <Text style={style.whyYouText}>Please enter your organization?</Text>
        </View>

        <View style={style.dropdownStyle}>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={{
              backgroundColor: '#0E172A',
              marginTop: moderateVerticalScale(1),
              borderWidth: 1,
              borderColor: '#334155',
              borderRadius: 5,
              padding: '2%',
              paddingLeft: moderateScale(16),
              // margin: '2%',
              color: '#BABFC8',
              fontSize: scale(12),
              lineHeight: 14,
              width: '100%',
              // marginHorizontal:'2.5%',
              textTransform: 'capitalize',
              marginVertical: '5%',
            }}
            placeholder="ABC organization"
          />
        </View>

        <View style={{ marginTop: moderateScale(15) }}>
          <Text style={style.whyYouText}>How to contect?</Text>
        </View>

        <View style={style.dropdownStyle}>
          <Dropdown
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
            style={style.inputStyle}
            data={[
              { label: 'Call', value: 'Call' },
              { label: 'Chat', value: 'Chat' },
            ]}
            labelField="label"
            valueField="value"
            placeholder={'Please select the type'}
            value={State.Contect?.value}
            onChange={v => {
              setState(p => ({ ...p, Contect: v }));
            }}
          />
        </View>
        <View style={{ marginTop: moderateScale(15) }}>
          <Text style={style.whyYouText}>How to contect timing?</Text>
        </View>

        <View style={style.dropdownStyle}>
          <Dropdown
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
            style={style.inputStyle}
            data={[
              { label: 'Morning', value: 'Morning' },
              { label: 'Afternoon', value: 'Afternoon' },
              { label: 'Evening', value: 'Evening' },
            ]}
            labelField="label"
            valueField="value"
            dropdownPosition="top"
            placeholder={'Please select the type'}
            value={State.ContectTiming?.value}
            onChange={v => {
              setState(p => ({ ...p, ContectTiming: v }));
            }}
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={style.mainNextstyle} onPress={onSubmitPress}>
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
    </View>
  );
};
