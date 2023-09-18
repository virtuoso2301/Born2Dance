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
  ToastAndroid,
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
import { API_URL_IMAGE, API_URL } from '../../services/api_url';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const CustomVideo = ({ navigation }) => {

  const [userId,setUserId]=useState("")
  const [userName,setUserName]=useState("")


  const GetUserDetail=async()=>{
    const user= await AsyncStorage.getItem('user')
setUserId(JSON.parse(user)._id)
setUserName(JSON.parse(user).fullname)
  }

  const GetRequests=async()=>{
    const response = await fetch(`${API_URL}/getAllCustomVideo`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();
  }

  useEffect(()=>{
    GetUserDetail()
    //GetRequests()
  },[])



  const TypeOfDelivery = [
    { label: 'One Week  (Rs.20000)', value: 'One Week', amount: "20000" },
    { label: 'Two Weeks  (Rs.15000)', value: 'Two Weeks', amount: "15000" },
    { label: 'Three Weeks  (Rs.10000)', value: 'Three Weeks', amount: "10000" },
  ];

  const DanceLevel = [
    { label: 'Begginer', value: 'Begginer' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advance', value: 'Advance' },
  ];

  const TrainerGender = [
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
    SongTitle: "",
    DanceStyle: '',
    DanceLevel: null,
    TrainerGender: null,
    TypeOfDelivery: null,
    ContactMode: null,
    ContactTiming: null,
    paymentStatus: "false",
    amount:""
  });

  useEffect(()=>{
    console.log("STATE: ",State)
  },[State])

  const customVideoRequestAPI = async () => {
    try {
      const response = await fetch(`${API_URL}/customeVedioForm`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          event:State.TypeOfDelivery,
          songname:State.SongTitle,
          paymentStatus:"false",
          phonenumber:State.PhoneNumber,
          email:State.Email,
          level:State.DanceLevel,
          userId:userId
        }),
      });
      const responseJson = await response.json();
      // setClassDetails(responseJson.dance);
      console.log("SUBMITed RESPONSE: ",responseJson.data._id)
      const formId=responseJson.data._id

      Alert.alert("Payment",`Proceed to pay Rs.${State.amount}?`,[
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: async() => {
          try{
            const response2 = await fetch(`${API_URL}/updatecustomvideo`, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              method: 'PUT',
              body: JSON.stringify({
                id:formId,
                userId:userId,
                payment:State.DanceLevel,
                paymentStatus:"true"
              }),
            });
            const responseJson2 = await response2.json();
            console.log("FORM PAYMENT DONE: ",responseJson2)
            Alert.alert("Success","Your Payment was successful")
            setState({
              FullName:'',
              Email: '',
              PhoneNumber: '',
              Address: '',
              Country: '',
              SongTitle: "",
              DanceStyle: '',
              DanceLevel: null,
              TrainerGender: null,
              TypeOfDelivery: null,
              ContactMode: null,
              ContactTiming: null,
              paymentStatus: "false",
              amount:""
            })
          }
          catch(e){
            console.log("UPDATE CUSTOM VIDEO ERROR",e)
          }
        }},
      ])

    } catch (e) {
      console.log('customVideoRequestAPI -> ', e);
    }
  };

  const onSubmitPress = async () => {
    if (State.DanceLevel == null || State.TypeOfDelivery==null || State.Email==''|| State.PhoneNumber.length<10 ||State.SongTitle=='' || State.FullName == '' || State.Address=='' || State.Country=='' || State.DanceStyle=='' || State.TrainerGender==null || State.ContactMode==null || State.ContactTiming==null) {
      return alert('Please fill all fields correctly');
    }
    else {
      customVideoRequestAPI()
      const options = {
        description: 'Description goes here',
        image: "https://i.imgur.com/3g7nmJC.png",
        currency: 'INR',
        // key: 'rzp_test_OCVELwbtKpzpvc', // Your api key
        key: 'sgsdcsgjsdvsi',
        amount: "100",
        name: State.SongTitle,
        prefill: {
          email: State.Email,
          contact: State.PhoneNumber,
          name: userName,
        },
        theme: { color: '#F37254' },
      };
      // await RazorpayCheckout.open(options)
      //   .then(data => {
      //     // handle success
      //     alert(`Success: ${data.razorpay_payment_id}`);
      //     dispatch(paymentSuccessStatusAdd(data.razorpay_payment_id));
      //     navigation.navigate('home');
          

      //   })
      //   .catch(error => {
      //     // handle success
      //     console.log('Razorpay -> ', error);
      //     ToastAndroid.showWithGravity(
      //       error.error?.description,
      //       ToastAndroid.SHORT,
      //       ToastAndroid.BOTTOM,
      //     );
      //   });
    }
  };

  return (
    <View style={style.view}>
      <ScrollView>
        <View style={{flexDirection:"row"}}>
        <Text style={style.requestFormText}>Request Form</Text>
        <TouchableOpacity onPress={() => navigation.navigate("download")} style={{ justifyContent: "center", alignItems: "center", height: 40, width: "50%", marginLeft:"18%",marginTop:16 }}>
          <LinearGradient
            colors={['#2885E5', '#9968EE']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ borderWidth: 1, borderStyle: 'solid', borderRadius: 5, justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
            <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
              See Your Requested Videos
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        </View>
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
          <Text style={style.whyYouText}>Song title</Text>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={style.input}
            placeholder="Eg. Summer high,AP Dhillon"
            onChangeText={e => setState(p => ({ ...p, SongTitle: e }))}
            value={State.SongTitle}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Dance Style</Text>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={style.input}
            placeholder="Choice of dance style"
            onChangeText={e => setState(p => ({ ...p, DanceStyle: e }))}
            value={State.DanceStyle}
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
            value={State.DanceLevel}
            onChange={e => setState(p => ({ ...p, DanceLevel: e.value }))}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Trainer Gender</Text>
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
            data={TrainerGender}
            labelField="label"
            valueField="value"
            placeholder={'Select Trainer Gender'}
            value={State.TrainerGender}
            onChange={e => setState(p => ({ ...p, TrainerGender: e.value }))}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.whyYouText}>Delivery Time</Text>
          <Dropdown
            style={style.inputStyle}
            selectedTextStyle={{ color: '#babfc8' }}
            placeholderStyle={{ color: '#babfc8' }}
            containerStyle={{ borderWidth: 0 }}
            data={TypeOfDelivery}
            labelField="label"
            valueField="value"
            placeholder='Select Delivery time'
            value={State.TypeOfDelivery}
            onChange={e => setState(p => ({ ...p, TypeOfDelivery: e.value, amount:e.amount }))}
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


      </ScrollView>

      <TouchableOpacity onPress={onSubmitPress} style={[style.mainNextstyle,{marginVertical:14}]}>
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
