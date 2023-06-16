import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { classesAdd } from '../../redux/reducers/appData';
import { API_URL, API_URL_IMAGE } from '../../services/api_url';
import { useDispatch, useSelector } from 'react-redux';
import Actor from '../../assets/images/actor.png';
import { moderateVerticalScale, scale } from 'react-native-size-matters';
import { Dropdown } from 'react-native-element-dropdown';
import { BDLoader, hp, wp } from '../../Constants';
import FastImage from 'react-native-fast-image';

const Suburbs = [
  { label: 'Suburb1', value: 'Suburb1' },
  { label: 'Suburb2', value: 'Suburb2' },
  { label: 'Suburb3', value: 'Suburb3' },
  { label: 'Suburb4', value: 'Suburb4' },
];

export const ClassesList = ({ navigation, route }) => {
  const [State, setState] = useState({ IsLoading: false, DanceDetail: null });
  const dispatch = useDispatch();
  const classLists = useSelector(state => state.appData.classesList);
  const city = route.params.city;
  const DanceId = route.params?._id;
  console.log({ DanceId });

  const classesList = async () => {
    const response = await fetch(`${API_URL}/getStudiosList`);
    const data = await response.json();
    dispatch(classesAdd(data));
  };

  useEffect(() => {
    classesList();
    if (DanceId) {
      GetDanceDetail();
    }
  },[]);



  useEffect(()=>{
    console.log("CITY SELECTED", city)
    console.log(classLists?.studios)

  },[])


  const GetDanceDetail = async id => {
    setState(p => ({ ...p, IsLoading: true }));
    try {
      const jsonObj = await fetch(`${API_URL}/getDanceClassDetails`, {
        method: 'POST',
        body: JSON.stringify({
          id: DanceId,
        }),
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      });
      const response = await jsonObj.json();
      setState(p => ({ ...p, IsLoading: false }));
      console.log('GetDanceDetail -> ', JSON.stringify(response, null, 2));
      if (response?.success) {
        setState(p => ({
          ...p,
          DanceDetail: response?.dances,
        }));
      }
    } catch (e) {
      setState(p => ({ ...p, IsLoading: false }));
      console.log('Error GetDanceDetail -> ', e);
    }
  };

  const renderItem=({item})=>(
    <View
    onTouchEnd={() => {
      navigation.navigate('class-details', {
        id: item._id,
      });
    }}>
    <View style={style.card}>
      <View style={style.cardImageContainer}>
        <FastImage
          style={style.imageStyle}
          source={{ uri: `${API_URL_IMAGE}/${item?.images[0]}` }}
        />
      </View>
      <View style={style.cardDetailsContainer}>
        <Text style={style.className}>{item?.studioName}</Text>
        <Text style={style.classAddress}>{item?.address}</Text>
        <Text style={style.classOpen}>
          {item?.status == 'Active' ? 'Open Now' : 'Close'}
        </Text>
        <Text style={style.classType}>
          {item?.city?.cityName}, {item?.state?.stateName}
        </Text>
      </View>
    </View>
  </View>
  )

  return (
    <View style={style.view}>
      <View style={style.pageHeaderView}>
        <Text style={style.pageHeader}>City: {city}</Text>
        <Text style={style.pageHeader}>
          {classLists?.studios?.filter(item => item?.city?.cityName == city).length}{' '}
          Classes
        </Text>
      </View>

      <View style={{height:"11.5%"}}>
      <Dropdown
            style={style.inputStyle}
            selectedTextStyle={{ color: '#babfc8' }}
            placeholderStyle={{ color: '#babfc8' }}
            containerStyle={{ borderWidth: 0 }}
            data={Suburbs}
            labelField="label"
            valueField="value"
            placeholder={'Select a suburb'}
            value={State.States?.value}
            onChange={e => setState(p => ({ ...p, States: e }))}

            renderItem={(item, selected) => (
              <View
                style={{
                  backgroundColor: selected ? '#1D283A' : '#334155',
                  paddingHorizontal: wp(2),
                  paddingVertical: hp(1.5),
                }}>
                <Text style={{ color: '#babfc8' }}>{item.label}</Text>
              </View>
            )}
          />
      </View>

     
      <FlatList
      data={classLists?.studios?.filter(item => item?.city?.cityName == city)}
      renderItem={renderItem}
      />
    </View>
  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    flex: 1,
    padding: '2%',
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#334155',
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.5),
    marginHorizontal: wp(3),
    marginBottom: -hp(2),
    marginTop: hp(2),
  },
  pageHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: '2%',
    paddingLeft: '2%',
  },
  pageHeader: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFF',
  },
  pageHeaderValue: {
    marginTop: 1,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFF',
  },
  card: {
    marginTop: '3%',
    padding: 8,
    borderColor: '#BABFC8',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
  },
  cardImageContainer: {
    flex: 0.65,
  },
  imageStyle: {
    width: scale(100),
    height: scale(100),
    borderRadius:5
  },
  cardDetailsContainer: {
    flex: 1,
    justifyContent:"space-evenly"
  },
  className: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFF',
  },
  classRating: {
    paddingVertical: 8,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    color: '#FBFBFB',
  },
  classAddress: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: '#BABFC8',
  },
  classOpen: {
    paddingVertical: 5,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    color: '#21F47A',
  },
  classType: {
    paddingVertical: 5,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    color: '#FFFFFF',
  },
});
