import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

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
    fontSize: scale(24),
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
    marginTop: moderateVerticalScale(382),
  },
  selectedTextStyle: {
    color: '#BABFC8',
  },
  inputSearchStyle: {
    backgroundColor: '#0E172A',
    color: '#BABFC8',
  },
});

export const HireusFive = ({ navigation }) => {
  const data = [
    { label: 'Online', value: '1' },
    { label: 'Offline', value: '2' },
    { label: 'Home', value: '3' },
    { label: 'Office', value: '1' },
  ];

  const [value, setValue] = useState(null);
  const [cities, setCities] = useState([]);

  const [teachers, setTeachers] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const getHireUsAPI = async () => {
    try {
      const resp = await getHireUs();
      setTeachers(resp.data);
    } catch (error) {}
  };

  useEffect(() => {
    getHireUsAPI();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
      <View
        style={{ width: '100%', height: 4, backgroundColor: '#956DFF' }}></View>
      <ScrollView style={style.view}>
        <View style={{ marginTop: 10 }}>
          <Text style={style.questionText}>Question 5 0f 5</Text>
        </View>
        <View style={{ marginTop: moderateScale(10) }}>
          <Text style={style.requestFormText}>Request Form</Text>
        </View>
        <View style={{ marginTop: moderateScale(10) }}>
          <Text style={style.pleaseText}>
            Please answer the following question so the we can reach to you.
          </Text>
        </View>
        <View style={{ marginTop: moderateScale(10) }}>
          <Text style={style.whyYouText}>Please enter your email ID</Text>
        </View>

        <View style={style.dropdownStyle}>
          <TextInput
            placeholderTextColor="#BABFC8"
            style={{
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
            placeholder="Eg; abcd@gmail.com"
          />
        </View>

        <View>
          <TouchableOpacity
            style={style.mainNextstyle}
            onPress={() => {
              navigation.navigate('request-us');
            }}>
            <LinearGradient
              colors={['#2885E5', '#9968EE']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{ borderWidth: 1, borderStyle: 'solid', borderRadius: 5 }}>
              <Text style={{ ...style.loginButtonText, color: '#FFFFFF' }}>
                Next
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {teachers.map((item, index) => {
          return (
            <View>
              <Text></Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
