import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import searchIcon from '../../assets/images/search.png';
import { moderateScale, scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { API_URL, API_URL_IMAGE } from '../../services/api_url';
import { hp, wp } from '../../Constants';
import { useState } from 'react';
import { useEffect } from 'react';
import FastImage from 'react-native-fast-image';

export const City = ({ navigation, route }) => {
    const { id, stateName } = route.params;

    const [city, setCity] = useState([])

    const cityList = async () => {
    const response = await fetch(`${API_URL}/allcity`);
    const data = await response.json();

    setCity(data?.citys?.filter(item => item?.stateId?._id == id));
  };

  useEffect(() => {
    cityList()
  },[])

  return (
    <View style={style.view}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput
          placeholderTextColor="#BABFC8"
          style={style.input}
          placeholder="Search city name"
        />
        {/* <Image source={searchIcon} style={style.searchIcon} /> */}
        <Text style={style.pageHeader}>Cities</Text>
        <View style={style.renderContainer}>
          {city?.length > 0 &&
            city?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={style.renderCities}
                onPress={() =>
                  navigation.navigate('classes-list', { _id: item._id, city: item.cityName })
                }>
                <FastImage
                  style={{
                    alignSelf: 'center',
                    width: wp(20),
                    height: wp(20),
                    borderRadius:3.5
                  }}
                  source={{ uri: `${API_URL_IMAGE}/${item.profileImage}` }}
                />
                <Text style={style.renderCityText}>{item?.cityName}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    flex: 1,
    paddingHorizontal: wp(3),
  },
  pageHeader: {
    paddingTop: '2%',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 23,
    color: '#FFFFFF',
    marginBottom: '5%',
  },
  input: {
    backgroundColor: '#1D283A',
    borderRadius: 5,
    padding: '2%',
    paddingLeft: moderateScale(36),
    color: '#FFFFFF',
    fontSize: scale(12),
    lineHeight: 14,
    width: '100%',
    textTransform: 'capitalize',
    marginVertical: '5%',
    marginLeft: 5,
  },
  searchIcon: {
    width: scale(20),
    height: scale(20),
    position: 'absolute',
    top: scale(-46),
    left: scale(12),
  },
  renderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  renderCities: {
    width: '25%',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  renderCityText: {
    color: '#fff',
    textAlign: 'center',
    marginVertical:hp(1)
  },
});
