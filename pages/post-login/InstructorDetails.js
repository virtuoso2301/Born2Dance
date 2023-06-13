import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { API_URL_IMAGE, API_URL } from '../../services/api_url';
import verified from '../../assets/images/verified.png';
import { hp, wp } from '../../Constants';
import Share from 'react-native-share';
import VideoControl from 'react-native-video-controls';

export const InstructorDetails = ({ navigation, route }) => {
  const { id, item } = route.params;

  const BannerWidth = Dimensions.get('window').width * 1;

  const [likeCount, setLikeCount] = useState(11)
  const [isLiked, setIsLiked] = useState(false)

  const renderItem = useCallback(
    ({ item, index }) => (
      <View style={style.imageContainer}>
        <Image
          style={style.image}
          resizeMode={'cover'}
          source={{ uri: `${API_URL_IMAGE}/${item}` }}
        />
        {/* <Text style={style.imageTitle}>{item.name}</Text>
        <Text style={style.imageDescription}>{item.description}</Text> */}
      </View>
    ),
    [],
  );

  console.log('img -> ', JSON.stringify(item, null, 2));

  const onSharePress = async () => {
    try {
      const share = await Share.open({
        title: item?.name,
        message: item?.about,
        subject: item?.designation,
      });
      if (share.success) {
      }
    } catch (e) {
      console.log('Error Share -> ', e);
    }
  };

  const onLikePress = () => {
    setIsLiked(!isLiked)
    if (!isLiked) { setLikeCount(likeCount + 1) }
    else { setLikeCount(likeCount - 1) }


  }

  return (
    <View style={style.view}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}>
        <View style={style.bannerView}>
          <Carousel
            data={item?.imagelist}
            renderItem={renderItem}
            sliderWidth={BannerWidth}
            itemWidth={BannerWidth}
            autoplay={true}
            autoplayInterval={3000}
            loop={true}
          />
        </View>
        <View style={style.line}>
          <View style={style.lineHR} />
          <View style={style.lineLabel}>
            <Image
              source={{ uri: `${API_URL_IMAGE}/${item?.profileImage}` }}
              resizeMode="cover"
              style={{ width: '100%', height: '100%', borderRadius: 100 }}
            />
            <Image
              source={verified}
              resizeMode={'contain'}
              style={{
                width: wp(5),
                height: wp(5),
                position: 'absolute',
                top: hp(1),
                right: 0,
                backgroundColor: '#fff',
                borderRadius: 1000,
              }}
            />
          </View>
          <View style={style.lineHR} />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: wp(7.5),
            }}
            onPress={onLikePress}>
              <View style={{flexDirection:"row"}}>
            <Text style={{ color: isLiked ? "#2885E5" : "#ffffffaa",fontSize:13,fontWeight:isLiked?"800":"400",marginTop:"32%",marginRight:"8%"}}>{likeCount}</Text>
            <Image
              style={[style.downloadImage, { tintColor: isLiked ? "#2885E5" : '#ffffffaa' }]}
              source={require('../../assets/images/like.png')}
            />
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text style={style.instructorTitle}>{item?.name}</Text>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: wp(10),
            }}
            onPress={onSharePress}>
            <Image
              style={[style.downloadImage, { tintColor: '#ffffffaa' }]}
              source={require('../../assets/images/share.png')}
            />
          </TouchableOpacity>
          <Text style={style.instructorDescription}>{item.designation}</Text>
        </View>
        <View style={{ flex: 30 }}>
          <Text style={style.aboutHeder}>About Instructor</Text>
          <Text numberOfLines={4} style={style.about}>
            {item.about}
          </Text>

          {item?.footerImage && (
            <VideoControl
              source={{
                uri: `${API_URL_IMAGE}/${item?.footerImage}`,
              }}
              navigator={navigation}
              resizeMode="contain"
              toggleResizeModeOnFullscreen={false}
            />
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={style.buttonTakeClasses}
        onPress={() => {
          navigation.navigate('hireus-one', { id: item._id });
        }}>
        <LinearGradient
          style={style.takeClassesGradient}
          colors={['#2885E5', '#844AE9']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}>
          <Text style={{ ...style.takeClassesButtonText, color: '#FFFFFF' }}>
            Hire
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    flex: 1,
  },
  bannerView: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.4,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    backgroundColor: '#000000',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  line: { flexDirection: 'row', marginTop: -50 },
  lineHR: {
    backgroundColor: '#334155',
    height: 2,
    flex: 1,
    alignSelf: 'center',
  },
  lineLabel: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    fontSize: 12,
    backgroundColor: '#1E293B',
    color: '#E2E8F0',
    borderRadius: 100,
  },
  instructorTitle: {
    paddingVertical: '4%',
    paddingHorizontal: wp(2),
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: scale(20),
    lineHeight: 23,
    textAlign: 'center',
    letterSpacing: -0.24,
    color: '#FFFFFF',
  },
  instructorDescription: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: scale(14),
    lineHeight: scale(14),
    textAlign: 'center',
    letterSpacing: -0.24,
    color: '#BABFC8',
  },
  aboutHeder: {
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: scale(16),
    lineHeight: 19,
    letterSpacing: -0.24,
    color: '#FFFFFF',
  },
  about: {
    // paddingHorizontal: '2%',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: scale(13),
    letterSpacing: -0.24,
    color: '#BABFC8',
    paddingBottom: hp(2),
    paddingHorizontal: '4%',
  },
  takeClassesContainer: {
    bottom: 8,
    position: 'absolute',
    width: '100%',
    justifyContent: 'flex-end',
  },
  takeClassesGradient: {
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonTakeClasses: {
    textAlign: 'center',
    borderRadius: 5,
    // position: 'absolute',
    // bottom: hp(2),
    // left: wp(2.5),
    // right: 0,
    width: wp(95),
    alignSelf: 'center',
    marginVertical: hp(2),
  },
  takeClassesButtonText: {
    padding: '2%',
    alignSelf: 'center',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
  },
  downloadImage: {
    width: scale(25),
    height: scale(25),
    marginTop: scale(12),
  },
});
