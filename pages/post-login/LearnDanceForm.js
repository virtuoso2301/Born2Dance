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
import { API_URL } from '../../services/api_url';

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    flex: 1,
    paddingHorizontal: '3%',
    paddingBottom:8
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
    paddingBottom: hp(1),
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

export const LearnDanceForm = ({ navigation }) => {
  const Requirement = [
    { label: 'Album songs', value: 'Album songs' },
    { label: 'Films', value: 'Films' },
    { label: 'Workshops', value: 'Workshops' },
    { label: 'Events', value: 'Events' },
    { label: 'School & College', value: 'School & College' },
    { label: 'Wedding/Sangeet', value: 'Wedding/Sangeet' },
    { label: 'Others', value: 'Others' },
  ];

  const LearnWhere = [
    { label: 'Online', value: 'Online' },
    { label: 'Offline', value: 'Offline' },
    { label: 'Your Place', value: 'Your Place' },
    { label: 'Our Place', value: 'Our Place' },
    { label: 'Others', value: 'Others' },
  ];

  const Gender = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Others', value: 'Others' },
  ]

  const ContactMode = [
    { label: 'Calling', value: 'Calling' },
    { label: 'WhatsApp', value: 'WhatsApp' },
    { label: 'Email', value: 'Email' },
  ]

  const ContactTiming = [
    { label: 'Morning', value: 'Morning' },
    { label: 'Afternoon', value: 'Afternoon' },
    { label: 'Evening', value: 'Evening' },
  ]

  const [State, setState] = useState({
    FullName:'',
    Email: '',
    PhoneNumber: '',
    Address: '',
    Country: '',
    Gender: null,
    Requirement:null,
    LearnWhere:null,
    Organization:'',
    ContactMode: null,
    ContactTiming: null,
  });

  const learnDanceFormAPI=async()=>{
    try{
      const response = await fetch(`${API_URL}/addLearnToDanceFormNew`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          FullName:State.FullName,
          Email: State.Email,
          PhoneNumber: State.PhoneNumber,
          Address: State.Address,
          Country:State.Country,
          Gender: State.Gender,
          Requirement:State.Requirement,
          LearnWhere:State.LearnWhere,
          Organization:State.Organization,
          ContactMode: State.ContactMode,
          ContactTiming: State.ContactTiming,
        }),
      });
      const responseJson = await response.json();
      // setClassDetails(responseJson.dance);
      console.log("SUBMITed RESPONSE: ", responseJson)
      alert("FORM submitted successfully")

    }
    catch(e){
      console.log("LEarn this dance form api error: ",e)
    }
  }


  const onSubmitPress = async () => {

    if(State.FullName=='' || State.Email=='' || State.PhoneNumber.length<10 || State.Address=='' || State.Country==''|| State.Organization==''|| State.Gender==null || State.Requirement==null || State.LearnWhere==null || State.ContactMode==null || State.ContactTiming==null){
      alert("Please Fill all fields correctly")
    }
    else{
      learnDanceFormAPI()
      setState({
        FullName:'',
        Email: '',
        PhoneNumber: '',
        Address: '',
        Country: '',
        Gender: null,
        Requirement:null,
        LearnWhere:null,
        Organization:'',
        ContactMode: null,
        ContactTiming: null,
      })
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
    // await RazorpayCheckout.open(options)
    //   .then(data => {
    //     // handle success
    //     ToastAndroid.showWithGravity(
    //       `Success: ${data.razorpay_payment_id}`,
    //       ToastAndroid.SHORT,
    //       ToastAndroid.BOTTOM,
    //     );
    //     dispatch(paymentSuccessStatusAdd(data.razorpay_payment_id));
    //     navigation.navigate('request-us');
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
}

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
          <Text style={style.whyYouText}>Your Requirement</Text>
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
            data={Requirement}
            labelField="label"
            valueField="value"
            placeholder={'Select your requirement'}
            value={State.Requirement}
            onChange={e => setState(p => ({ ...p, Requirement: e.value }))}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Where do you want to learn?</Text>
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
            data={LearnWhere}
            labelField="label"
            valueField="value"
            placeholder={'Select an option'}
            value={State.LearnWhere}
            onChange={e => setState(p => ({ ...p, LearnWhere: e.value }))}
          />
        </View>


        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Contact Mode</Text>
          <Dropdown
            style={style.inputStyle}
            selectedTextStyle={{ color: '#babfc8' }}
            placeholderStyle={{ color: '#babfc8' }}
            containerStyle={{ borderWidth: 0 }}
            data={ContactMode}
            labelField="label"
            valueField="value"
            placeholder='Select an option'
            value={State.ContactMode}
            onChange={e => setState(p => ({ ...p, ContactMode: e.value }))}
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
          <Text style={style.whyYouText}>Contact Timing</Text>
          <Dropdown
            style={style.inputStyle}
            selectedTextStyle={{ color: '#babfc8' }}
            placeholderStyle={{ color: '#babfc8' }}
            containerStyle={{ borderWidth: 0 }}
            data={ContactTiming}
            labelField="label"
            valueField="value"
            placeholder='Select an option'
            value={State.ContactTiming}
            onChange={e => setState(p => ({ ...p, ContactTiming: e.value }))}
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
          <Text style={style.whyYouText}>Organization</Text>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={style.input}
            placeholder="Your Organization"
            onChangeText={e => setState(p => ({ ...p, Organization: e }))}
            value={State.Organization}
          />
        </View>



      </ScrollView>
      <TouchableOpacity style={[style.mainNextstyle,{marginVertical:20}]} onPress={onSubmitPress}>
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
