import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import searchIcon from '../../assets/images/search.png';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { wp, hp } from '../../Constants';
import { API_URL_IMAGE } from '../../services/api_url';

export const NearByClasses = ({ navigation }) => {
  const cityLists = useSelector(state => state.appData.cityList);

  const data = cityLists?.citys?.map(
    ({ cityName: label, cityName: value, ...rest }) => ({
      value,
      label,
      ...rest,
    }),
  );

  const lastBannerData = [
    { count: '1000+', name: 'Classes' },
    { count: '100+', name: 'Workshops' },
    { count: '80+', name: 'Instructors' },
    { count: '70+', name: 'Catogeries' },
  ];

  const [value, setValue] = useState(null);

  return (
    <View style={style.view}>
      <ScrollView>
        {/* <TextInput
          placeholderTextColor="#BABFC8"
          style={{
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
          }}
          placeholder="Search for nearby dance class"
        /> */}
        <TouchableOpacity>
          <Image
            source={searchIcon}
            style={{
              width: scale(20),
              height: scale(20),
              position: 'absolute',
              top: scale(-46),
              left: scale(12),
            }}
          />

          <View style={style.cityStyle}>
            <Text style={style.statestext}> Popular states</Text>
            <Text
              style={style.seeText}
              onPress={() => navigation.navigate('all-city')}>
              {' '}
              Sell All
            </Text>
          </View>
          <View>
            <FlatList
              data={cityLists?.citys?.slice(0, 4)}
              renderItem={({ item }) => (
                <View
                  style={style.imageContainerDance}
                  onTouchEnd={() =>
                    navigation.navigate('classes-list', { city: item.cityName })
                  }>
                  <Image
                    style={{ alignSelf: 'center', width: 55, height: 55 }}
                    source={{ uri: `${API_URL_IMAGE}/${item.profileImage}` }}
                  />
                  <Text style={style.imageTitleDance}>{item?.cityName}</Text>
                </View>
              )}
              numColumns={4}
            />
          </View>
        </TouchableOpacity>
        <View style={{ bottom: moderateVerticalScale(70) }}>
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
            style={[style.input]}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Select cities'}
            value={value}
            onChange={item => {
              setValue(item.value);
              navigation.navigate('classes-list', { city: item.value });
            }}
          />
        </View>
        <View
          style={{
            ...style.bannerView,
            marginTop: '-18%',
            marginBottom: '20%',
            width: '100%',
            height: '30%',
            borderRadius: 4,
          }}
          onTouchEnd={() => {
            navigation.navigate('premium-details');
          }}>
          <Image
            style={style.image}
            source={require('../../assets/images/LastBanner.png')}
          />
          <Text style={{ ...style.imageTitle, fontSize: 20 }}>
            Get unlimited access with Premium
          </Text>
          <FlatList
            style={{ position: 'relative', top: '-15%' }}
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'flex-end',
            }}
            data={lastBannerData}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
                  justifyContent: 'flex-end',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    ...style.imageTitleDance,
                    color: '#ff9300',
                    fontSize: 16,
                    fontWeight: '600',
                  }}>
                  {item?.count}
                </Text>
                <Text
                  style={{ ...style.imageTitleDance, top: -6, color: '#FFF' }}>
                  {item?.name}
                </Text>
              </View>
            )}
            numColumns={4}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    flex: 1,
    padding: '3%',
  },
  pageHeader: {
    paddingTop: '2%',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 23,
    color: '#FFFFFF',
    marginBottom: '5%',
  },
  imageContainerDance: {
    flex: 1,
    marginBottom: 70, // Prevent a random Android rendering issue
    borderRadius: 8,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  imageDance: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  imageTitleDance: {
    padding: '2%',
    color: '#BABFC8',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    alignSelf: 'center',
    bottom: 0,
    marginTop: '6%',
  },
  input: {
    marginTop: '10%',
    color: '#FFFFFF',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#334155',
    padding: '2%',
    marginBottom: '3%',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#BABFC8',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  bannerView: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.3,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  imageTitle: {
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    marginTop: '6%',
    marginLeft: '4%',
  },
  cityStyle: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: scale(20),
  },
  statestext: {
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontSize: scale(16),
    lineHeight: scale(23),
  },
  seeText: {
    color: '#956DFF',
    fontSize: scale(11),
  },
});
