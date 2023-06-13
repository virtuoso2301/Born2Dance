import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { Dropdown } from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { hp, wp } from '../../Constants';

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
    marginTop: moderateVerticalScale(377),
  },
  selectedTextStyle: {
    color: '#BABFC8',
  },
  inputSearchStyle: {
    backgroundColor: '#0E172A',
    color: '#BABFC8',
  },
});

export const HireusThree = ({ navigation }) => {
  const data = [
    { label: '1 days', value: '1' },
    { label: '2 days', value: '2' },
    { label: '3 days', value: '3' },
    { label: '4 days', value: '4' },
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
        style={{ width: '60%', height: 4, backgroundColor: '#956DFF' }}></View>
      <ScrollView style={style.view}>
        <View style={{ marginTop: 10 }}>
          <Text style={style.questionText}>Question 3 0f 5</Text>
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
          <Text style={style.whyYouText}>How many days you want to learn?</Text>
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
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Please select the type' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
              navigation.navigate('classes-list', { city: item.value });
            }}
          />
        </View>

        <View>
          <TouchableOpacity
            style={style.mainNextstyle}
            onPress={() => {
              navigation.navigate('hireus-four');
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
