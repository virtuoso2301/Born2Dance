import React, { useEffect, useState } from 'react';
import {
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

export const DownloadVideo = ({ navigation }) => {
  const [videolist, setVideolist] = useState([
    {
      id: 1,
      title: 'This is video one',
      name: 'michelle',
      category: 'Hip Hop',
      time: '10:30',
      videourl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    },
    {
      id: 1,
      title: 'This is video one',
      name: 'michelle',
      category: 'Hip Hop',
      time: '10:30',
      videourl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    },
    {
      id: 1,
      title: 'This is video one',
      name: 'michelle',
      category: 'Hip Hop',
      time: '10:30',
      videourl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    },
    {
      id: 1,
      title: 'This is video one',
      name: 'michelle',
      category: 'Hip Hop',
      time: '10:30',
      videourl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    },
  ]);
  return (
    <ScrollView style={style.view}>
      <View style={style.view}>
        {videolist.length == 0 ? (
          <View>
            <View>
              <FastImage
                source={require('../../assets/images/video.png')}
                style={style.videoImage}
              />
            </View>
            <View>
              <Text style={style.videoText}>
                Download videos and watch them offline
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <View>
              <Text style={style.downloadText}>Your downoads</Text>
            </View>
            {videolist.map((item, index) => (
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
                  <Text style={style.cardInnerText}>{item?.title}</Text>
                  <Text style={style.cardInnernameText}>{item?.name}</Text>
                  <View style={style.cradInnerTextRow}>
                    <Text style={style.cardInnerTextOne}>
                      Intermediate, {item?.category}
                    </Text>
                    <Text style={style.cardInnerTextTwo}>
                      Time :{' '}
                      <Text style={style.cardTimeText}>{item?.time} mins</Text>
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
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
    fontSize: scale(12),
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
