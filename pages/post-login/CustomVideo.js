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
    console.log("ALL REQUESTSSS: ",responseJson)
  }

  useEffect(()=>{
    GetUserDetail()
    //GetRequests()
  },[])



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
    SongTitle: "",
    paymentStatus: "false"
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
          event:State.TypeOfEvent,
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

      Alert.alert("Payment",`Proceed to pay Rs.${State.DanceLevel}?`,[
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
              TypeOfEvent: null,
              DanceLevel: null,
              Email: '',
              PhoneNumber: '',
              SongTitle: "",
              paymentStatus: "false"
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
    if (State.DanceLevel == null || State.TypeOfEvent==null || State.Email==''|| State.PhoneNumber.length<10 ||State.SongTitle=='') {
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
            onChangeText={e => setState(p => ({ ...p, SongTitle: e }))}
            value={State.SongTitle}
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
            value={State.TypeOfEvent}
            onChange={e => setState(p => ({ ...p, TypeOfEvent: e.value }))}
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
            value={State.DanceLevel}
            onChange={e => setState(p => ({ ...p, DanceLevel: e.value }))}
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
        <TouchableOpacity onPress={() => navigation.navigate("download")} style={{ position: "absolute", top: "3%", right: "3%", justifyContent: "center", alignItems: "center", height: "5%", width: "50%" }}>
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
      </ScrollView>
    </View>
  );
};
