import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import {
  moderateVerticalScale,
  moderateScale,
  scale,
} from 'react-native-size-matters';
import VideoPlayer from 'react-native-video-player';
import { hp, wp } from '../../Constants';
import FastImage from 'react-native-fast-image';
import { API_URL } from '../../services/api_url';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DownloadVideo = ({ navigation }) => {

  const [videolist, setVideolist] = useState(null);


  const GetRequests = async () => {

    const user = await AsyncStorage.getItem('user')
    const userId=JSON.parse(user)._id

    const response = await fetch(`${API_URL}/getAllCustomVideo`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();
    //console.log("ALL REQUESTSSS: ", responseJson?.customvideo?.filter(item => item.userId == userId))
    setVideolist(responseJson?.customvideo?.filter(item => item?.userId == userId))
  }
const renderItem=({item})=>{
  return(
    <View style={style.mainCardStyle}>
                <View>
                  <FastImage
                    source={require('../../assets/images/girl_group.png')}
                    style={style.imageDownload}
                  />
                  {/* <VideoPlayer 
                  style={style.imageDownload}
                  video={{ uri: item?.videourl }}
                  thumbnail={{ uri: "https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-play-video-icon-graphic-design-template-vector-png-image_530837.jpg" }}
                   /> */}
                </View>
                <View style={style.cardInnerStyle}>
                  <Text style={style.cardInnerText}>Song: {item?.songname}</Text>
                  <Text style={style.cardInnernameText}> Event type: {item?.event}</Text>


                  <Text style={style.cardInnernameText}> Level: {item?.level=="100"?"Begginer":item?.level=="200"?"Intermediate":"Advance"}</Text>


                </View>
              </View>
  )
}
  useEffect(() => {

    GetRequests()
  }, [])

  return (
      <View style={style.view}>
        <FlatList
        data={videolist}
        renderItem={renderItem}
        />

      </View>

  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    flex: 1,
    flexGrow: 1,
    padding: '2%',
    marginBottom: '0%',
  },
  videoImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: moderateVerticalScale(150),
  },
  videoText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: scale(16),
    width: scale(180),
    lineHeight: scale(24),
  },
  downloadText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontFamily: 'Raleway',
    lineHeight: scale(19),
    fontWeight: '500',
  },
  mainCardStyle: {
    width: wp(95),
    marginTop: moderateVerticalScale(20),
    backgroundColor: '#1D283A',
    alignItems: 'center',
    paddingHorizontal: wp(1),
    // justifyContent: 'flex-start',
    borderRadius: 5,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  imageDownload: {
    width: scale(85),
    height: scale(75),
    borderRadius: 5,
  },
  cardInnerStyle: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
  },
  cardInnerText: {
    color: '#FFFFFF',
    width: wp(65),
    fontSize: scale(14),
    fontWeight: '500',
  },
  cardInnernameText: {
    color: '#FFFFFF',
    fontSize: scale(10),
    width: wp(65),
    marginTop: moderateVerticalScale(8),
  },
  cradInnerTextRow: {
    width: wp(65),
    paddingRight: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#FFFFFF',
  },
  cardInnerTextOne: {
    width: wp(38),
    color: '#FFFFFF',
    fontSize: scale(10),
    lineHeight: scale(12),
    fontWeight: '400',
    marginTop: moderateVerticalScale(11),
  },
  cardInnerTextTwo: {
    color: '#FFFFFF',
    fontSize: scale(10),
    lineHeight: scale(12),
    fontWeight: '400',
    marginTop: moderateVerticalScale(14),
  },
  cardTimeText: {
    color: '#FFFFFF',
    fontSize: scale(10),
    lineHeight: scale(10),
    fontWeight: '500',
  },
});
