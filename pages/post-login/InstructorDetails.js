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
import VideoPlayer from 'react-native-video-controls';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const InstructorDetails = ({ navigation, route }) => {
  const { id, item } = route.params;

  


  const BannerWidth = Dimensions.get('window').width * 1;

  const [likeCount, setLikeCount] = useState(item.like)
  const [isLiked, setIsLiked] = useState(false)
  const [instructorDetails,setInstructorDetails]=useState(null)
  const [likedDancers,setLikedDancers]=useState(null)
  const [userId,setUserId]=useState("")


  const CallApiOne=async()=>{
    const response = await fetch(`${API_URL}/getHireList`);
    const data = await response.json();
    setInstructorDetails(data?.hirelist?.filter((val)=>val._id==item._id)[0])
    console.log(data?.hirelist?.filter((val)=>val._id==item._id)[0])
    setLikeCount(data?.hirelist?.filter((val)=>val._id==item._id)[0].like)
    const user= await AsyncStorage.getItem('user')

    const res =await fetch("https://api.born2dance.in/api/userslist")
    const resData=await res.json()
    const len= await resData?.users?.filter((val)=>val?._id==JSON.parse(user)._id)[0]?.likedDancer?.includes(item._id)
  
    console.log(len)
    setIsLiked(len)
    setUserId(JSON.parse(user)._id)



    //  if(len[0]?.likedDancer.includes(item._id)){
    //    setIsLiked(true)   
    //   }
    //  else{
    //    setIsLiked(false)
    //  }
}


useEffect(()=>{
  CallApiOne()

},[])



  const renderItem = useCallback(
    ({ item, index }) => (
      <View style={style.imageContainer}>
        <FastImage
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


  const increaseLikeAPI = async () => {
    try {
      const response = await fetch(`${API_URL}/increaseLike`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          id: item._id,
          userId: userId
        }),
      });
      const responseJson = await response.json();
      // setClassDetails(responseJson.dance);
      console.log(responseJson)
    } catch (e) {
      console.log('increaseLikeAPI -> ', e);
    }
  };

  const decreaseLikeAPI = async () => {
    try {
      const response = await fetch(`${API_URL}/decreaseLike`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          id: item._id,
          userId: userId
        }),
      });
      const responseJson = await response.json();
      // setClassDetails(responseJson.dance);
      console.log(responseJson)
    } catch (e) {
      console.log('decreaseLikeAPI -> ', e);
    }
  };

  //console.log('img -> ', JSON.stringify(item, null, 2));

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
    if (!isLiked) {
      setLikeCount(likeCount + 1)
      increaseLikeAPI()
    }
    else {
      setLikeCount(likeCount - 1)
      decreaseLikeAPI()
    }


  }

  return (
    <View style={style.view}>
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
          <FastImage
            source={{ uri: `${API_URL_IMAGE}/${item?.profileImage}` }}
            resizeMode="cover"
            style={{ width: '100%', height: '100%', borderRadius: 100 }}
          />
          <FastImage
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
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>

        <TouchableOpacity
          style={{ width: "33.333%" }}
          onPress={onLikePress}>
          <View style={{ flexDirection: "row", justifyContent: "center", width: "100%" }}>
            <Text style={{ color: isLiked ? "#2885E5" : "#ffffffaa", fontSize: 13, fontWeight: isLiked ? "800" : "400", marginTop: scale(19), marginRight: scale(1.7) }}>{likeCount}</Text>
            <Image
              style={[style.downloadImage, { tintColor: isLiked ? "#2885E5" : '#ffffffaa', marginLeft: scale(1.7) }]}
              source={require('../../assets/images/like.png')}
            />
          </View>
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            width: "33.333%",
            paddingBottom: "2.5%"
          }}>
          <Text style={style.instructorTitle}>{item?.name}</Text>
          <Text style={style.instructorDescription}>{item.designation}</Text>
        </View>


        <TouchableOpacity
          style={{ width: "33.333%", alignItems: "center" }}
          onPress={onSharePress}>
          <Image
            style={[style.downloadImage, { tintColor: '#ffffffaa' }]}
            source={require('../../assets/images/share.png')}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View >
          <Text style={style.aboutHeder}>About Instructor</Text>
          <Text style={style.about}>
            {item.about}
          </Text>
        </View>


        <View style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height * 0.27,
          paddingHorizontal: "2%",
          marginBottom: "3%"
        }}>
          {item?.footerImage && (
            <VideoPlayer
              source={{
                uri: `${API_URL_IMAGE}/${item?.footerImage}`.replace(/ /g, '%20'),
              }}
              navigator={navigation}
              resizeMode="cover"
              toggleResizeModeOnFullscreen={false}
              style={{ borderRadius: 10 }}

            />
          )}
        </View>

      </ScrollView>




      <TouchableOpacity
        style={{ height: "5%", width: "90%", alignSelf: "center", justifyContent: 'center' }}
        onPress={() => {
          navigation.navigate('hireus-one', { id: item._id });
        }}>
        <LinearGradient
          style={[style.takeClassesGradient, { height: "100%", justifyContent: "center", alignItems: "center" }]}
          colors={['#2885E5', '#844AE9']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: "500" }}>
            Hire
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity style={{ height: "5%", justifyContent: 'center', alignItems: "center", width: "90%", backgroundColor: "#00000000" }}>

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
    height: Dimensions.get('window').height * 0.225,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    backgroundColor: '#000000',
    height: "100%"
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
    marginTop: '10%',
    paddingHorizontal: wp(2),
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: scale(15),
    lineHeight: 23,
    textAlign: 'center',
    letterSpacing: -0.24,
    color: '#FFFFFF',
  },
  instructorDescription: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: scale(14),
    //lineHeight: scale(14),
    textAlign: 'center',
    //letterSpacing: -0.24,
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
    width: '100%',

  },
  takeClassesGradient: {
    borderRadius: 5,

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
