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
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { Dropdown } from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { hp, wp } from '../../Constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_URL } from '../../services/api_url';
import { useSelector } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import Logo from '../../assets/images/logo.png';

export const LearnDanceForm = ({ navigation }) => {
  const userDetail = useSelector(state => state.appData.usersSignIn);

  const [isChecked, setIsChecked] = useState(false);

  const [songName, setSongName] = useState('');
  const [songRefer, setSongRefer] = useState('');
  const [songDanceStyle, setSongDanceStyle] = useState('');
  const [Name, setName] = useState('');
  const [Mobile, setMobile] = useState('');
  const [Email, setEmail] = useState('');
  const [Country, setCountry] = useState('');
  const [Level, setLevel] = useState('');
  const [Gender, setGender] = useState('');
  const [DeliveryTime, setDeliveryTime] = useState('');
  const [ContactTime, setContactTime] = useState('');
  const [ContactYou, setContactYou] = useState('');
  const [error, setError] = useState('');

  const handleValidation = () => {
    if (
      songName == '' ||
      songRefer == '' ||
      songDanceStyle == '' ||
      Name == '' ||
      Mobile == '' ||
      Email == '' ||
      Country == ''
    ) {
      setError('All fields is required');
    } else {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        userId: userDetail._id,
        danceStyle: songDanceStyle,
        songName: songName,
        songReference: songRefer,
        yourName: Name,
        mobileNo: Mobile,
        country: Country,
        email: Email,
        level: Level.value,
        gender: Gender.value,
        deliveryTime: DeliveryTime.value,
        contactTime: ContactTime.value,
        howContactYou: ContactYou.value,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(`${API_URL}/addLearnToDanceForm`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.success == true) {
            var options = {
              description: songRefer,
              image: Logo,
              currency: 'INR',
              key: 'rzp_test_OCVELwbtKpzpvc', // Your api key
              amount: Number(DeliveryTime.value) + '00',
              name: songName,
              prefill: {
                email: Email,
                contact: Mobile,
                name: Name,
              },
              theme: { color: '#F37254' },
            };
            RazorpayCheckout.open(options)
              .then(data => {
                var myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
          
                var raw = JSON.stringify({
                  amount: DeliveryTime.value,
                  Id: result.Transcations._id,
                });
          
                var requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow',
                };
          
                fetch(`${API_URL}/webhook`, requestOptions)
                  .then(response => response.json())
                  .then(result => {
                    // handle success
                    ToastAndroid.showWithGravity(
                      `Payment Success`,
                      ToastAndroid.SHORT,
                      ToastAndroid.BOTTOM,
                    );
                    navigation.navigate('Thankyou');
                  })
                  
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
          }
        })
        .catch(error => console.log('error', error));
    }
  };

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  const levelOptions = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ];
  const Trainergender = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Others', value: 'others' },
  ];
  const Deliverytime = [
    { label: '1 week -> 20k', value: '200' },
    { label: '2 week -> 15k', value: '150' },
    { label: '3 week -> 10k', value: '100' },
  ];
  const Contacttime = [
    { label: 'Morning', value: 'morning' },
    { label: 'Afternoon', value: 'afternoon' },
    { label: 'Evening', value: 'evening' },
  ];
  const Contactyou = [
    { label: 'Call', value: 'call' },
    { label: 'Whatsapp', value: 'whatsapp' },
    { label: 'Email', value: 'email' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={style.view}>
        {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}
        <View style={{ marginTop: moderateScale(15) }}>
          <Text style={style.whyYouText}>Song name</Text>
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
              color: '#BABFC8',
              fontSize: scale(12),
              lineHeight: 14,
              width: '100%',
              textTransform: 'capitalize',
              marginVertical: '5%',
            }}
            value={songName}
            onChangeText={text => setSongName(text)}
            placeholder="song name"
          />
        </View>

        <View style={{ marginTop: moderateScale(15) }}>
          <Text style={style.whyYouText}>Song reference line</Text>
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
            onChangeText={text => setSongRefer(text)}
            placeholder="Song reference line"
          />
        </View>

        <View style={{ marginTop: moderateScale(15) }}>
          <Text style={style.whyYouText}>Dance style</Text>
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
            placeholder="Dance style"
            onChangeText={text => setSongDanceStyle(text)}
          />
        </View>

        <View style={{ marginTop: moderateScale(15) }}>
          <Text style={style.whyYouText}>Your name</Text>
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
            placeholder="Your name"
            onChangeText={text => setName(text)}
          />
        </View>

        <View style={{ marginTop: moderateScale(15) }}>
          <Text style={style.whyYouText}>Mobile No</Text>
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
            placeholder="Mobile no"
            onChangeText={text => setMobile(text)}
          />
        </View>

        <View style={{ marginTop: moderateScale(15) }}>
          <Text style={style.whyYouText}>Country</Text>
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
            placeholder="Country"
            onChangeText={text => setCountry(text)}
          />
        </View>

        <View style={{ marginTop: moderateScale(15) }}>
          <Text style={style.whyYouText}>Email Id</Text>
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
            placeholder="Email id"
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={{ marginTop: moderateScale(10) }}>
          <Text style={style.whyYouText}>Choose your level</Text>
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
            data={levelOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={Level}
            placeholder="Please select the type"
            onChange={text => setLevel(text)}
          />
        </View>

        <View style={{ marginTop: moderateScale(10) }}>
          <Text style={style.whyYouText}>Trainer gender</Text>
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
            data={Trainergender}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Please select the type"
            value={Gender}
            onChange={text => setGender(text)}
          />
        </View>

        <View style={{ marginTop: moderateScale(10) }}>
          <Text style={style.whyYouText}>Delivery time</Text>
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
            data={Deliverytime}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Please select the type"
            value={DeliveryTime}
            onChange={text => setDeliveryTime(text)}
          />
        </View>

        <View style={{ marginTop: moderateScale(10) }}>
          <Text style={style.whyYouText}>Contact timing</Text>
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
            data={Contacttime}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Please select the type"
            value={ContactTime}
            onChange={text => setContactTime(text)}
          />
        </View>

        <View style={{ marginTop: moderateScale(10) }}>
          <Text style={style.whyYouText}>How to contact you</Text>
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
            data={Contactyou}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Please select the type"
            value={ContactYou}
            onChange={text => setContactYou(text)}
          />
        </View>

        <View style={{ ...style.dropdownStyle, paddingBottom: 50 }}>
          <TouchableOpacity
            onPress={handleCheckboxToggle}
            style={styles.container}>
            {isChecked ? (
              <Icon name="check-square-o" size={24} color="#babfc8" />
            ) : (
              <Icon name="square-o" size={24} color="#babfc8" />
            )}
            <Text style={{ color: '#babfc8' }}> Terms & Condition</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ paddingTop: 0, backgroundColor: '#0E172A' }}>
        <TouchableOpacity
          style={style.mainNextstyle}
          onPress={handleValidation}>
          <LinearGradient
            colors={['#2885E5', '#9968EE']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ borderWidth: 1, borderStyle: 'solid', borderRadius: 5 }}>
            <Text style={{ ...style.loginButtonText, color: '#FFFFFF' }}>
              Submit & Pay
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
    padding: '3%',
  },
  questionText: {
    color: '#BABFC8',
    fontSize: scale(12),
  },
  requestFormText: {
    color: '#ffffff',
    fontSize: scale(16),
  },
  pleaseText: {
    color: '#BABFC8',
    fontSize: scale(12),
  },
  whyYouText: {
    color: '#ffffff',
    fontSize: scale(17),
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
    marginTop: moderateVerticalScale(0),
    padding: 10,
  },
  selectedTextStyle: {
    color: '#BABFC8',
  },
  inputSearchStyle: {
    backgroundColor: '#0E172A',
    color: '#BABFC8',
  },
});
