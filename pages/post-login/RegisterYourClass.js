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
  Alert
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
    marginTop: hp(3),
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
    paddingVertical:14,
    color: '#BABFC8',
    fontSize: scale(12),
  },
});

const RegisterYourClass = ({ navigation }) => {

  const [State, setState] = useState({
    FullName:'',
    Email: '',
    PhoneNumber: '',
    Dob:'',
    Address: '',
    City:'',
    State:'',
    Country: '',
    Gender: null,
    DanceStudioName:'',
    Suburb:'',
    NoOfDanceStyles:"",
    StudioImages:"",
    AboutStudio:""
  });

  const Gender = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Others', value: 'Others' },
  ]

  const onSubmitPress =  () => {
    Alert.alert("Alert","You have pressed submit")
    // if (State.Cities == null) {
    //   return alert('Please select dance level');
    // }
    // if (State.PhoneNumber.length < 10) {
    //   return alert('Please enter your phone number');
    // }
    // const options = {
    //   description: 'Description goes here',
    //   image: Logo,
    //   currency: 'INR',
    //   key: 'rzp_test_OCVELwbtKpzpvc', // Your api key
    //   amount: Number(State.Cities?.value) + '00',
    //   name: State.Cities?.label,
    //   prefill: {
    //     email: 'email goes here',
    //     contact: 'phone number goes here',
    //     name: 'Fullname goes here',
    //   },
    //   theme: { color: '#F37254' },
    // };
    // await RazorpayCheckout.open(options)
    //   .then(data => {
    //     // handle success
    //     ToastAndroid.showWithGravity(
    //       `Success: ${data.razorpay_payment_id}`,
    //       ToastAndroid.SHORT,
    //       ToastAndroid.BOTTOM,
    //     );
    //     dispatch(paymentSuccessStatusAdd(data.razorpay_payment_id));
    //     navigation.navigate('home');
    //   })
    //   .catch(error => {
    //     // handle success
    //     console.log('Razorpay -> ', JSON.stringify(error, null, 2));
    //     ToastAndroid.showWithGravity(
    //       error.error?.description,
    //       ToastAndroid.SHORT,
    //       ToastAndroid.BOTTOM,
    //     );
    //   });
  };

  return (
    <View style={style.view}>
      <ScrollView>
        <Text style={style.requestFormText}>Request Form</Text>
        <Text style={style.pleaseText}>
          Please answer the following question so the we can reach to you.
        </Text>

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Full Name</Text>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={style.input}
            placeholder="Eg. Summer high,AP Dhillon"
            onChangeText={e => setState(p => ({ ...p, FullName: e }))}
            value={State.FullName}
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
            Enter Your Mobile Number
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

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Enter Your DOB</Text>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={style.input}
            placeholder="Enter D.O.B"
            value={State.Dob}
            onChangeText={v => setState(p => ({ ...p, Dob: v }))}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Address</Text>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={style.input}
            placeholder="Your address"
            onChangeText={e => setState(p => ({ ...p, Address: e }))}
            value={State.Address}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>City</Text>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={style.input}
            placeholder="Your address"
            onChangeText={e => setState(p => ({ ...p, City: e }))}
            value={State.City}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>State</Text>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={style.input}
            placeholder="Your address"
            onChangeText={e => setState(p => ({ ...p, State: e }))}
            value={State.State}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Country</Text>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={style.input}
            placeholder="Your country"
            onChangeText={e => setState(p => ({ ...p, Country: e }))}
            value={State.Country}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Gender</Text>
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
            data={Gender}
            labelField="label"
            valueField="value"
            placeholder={'Select Gender'}
            value={State.Gender}
            onChange={e => setState(p => ({ ...p, Gender: e.value }))}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Dance Studio Name</Text>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={style.input}
            placeholder="Your Dance Studio Name"
            onChangeText={e => setState(p => ({ ...p, DanceStudioName: e }))}
            value={State.DanceStudioName}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Suburb</Text>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={style.input}
            placeholder="Your Dance Studio Name"
            onChangeText={e => setState(p => ({ ...p, Suburb: e }))}
            value={State.Suburb}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Number of Dance Styles you know</Text>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={style.input}
            placeholder="Your country"
            keyboardType='numeric'
            onChangeText={e => setState(p => ({ ...p, NoOfDanceStyles: e }))}
            value={State.NoOfDanceStyles}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Studio Images</Text>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={style.input}
            placeholder="Google drive link"
            onChangeText={e => setState(p => ({ ...p, StudioImages: e }))}
            value={State.StudioImages}
          />
        </View>


        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>About Your Dance Class</Text>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={[style.input,{height:120,paddingTop:12}]}
            placeholder="Write about your dance class"
            multiline
            onChangeText={e => setState(p => ({ ...p, AboutYourself: e }))}
            value={State.AboutYourself}
          />
        </View>


        <TouchableOpacity onPress={onSubmitPress} style={{marginVertical:18}}>
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

export default RegisterYourClass
