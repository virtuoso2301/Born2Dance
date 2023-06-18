import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { API_URL, API_URL_IMAGE } from '../../services/api_url';
import YoutubePlayer from 'react-native-youtube-iframe';
import LinearGradient from 'react-native-linear-gradient';
import { hp, wp } from '../../Constants';
import {
  scale,
  moderateVerticalScale
} from 'react-native-size-matters';

export const DanceClass = ({ navigation, route }) => {
  const [classDetails, setClassDetails] = useState({});
  const [VideoId, setVideoId] = useState(null);
  const [showMore,setShowMore] =useState(false)

  const getClassDetailsAPI = async () => {
    try {
      const response = await fetch(`${API_URL}/getDanceClassDetails`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          id: route.params.params.id,
        }),
      });
      const responseJson = await response.json();
      setClassDetails(responseJson.dance);
    } catch (e) {
      console.log('getClassDetailsAPI -> ', e);
    }
  };

  useEffect(() => {
    getClassDetailsAPI();
  }, []);


  return (
    <View style={style.view}>
    <ScrollView style={style.view}>
      <View style={style.imageContainer}>
        {/* <Image
          style={style.image}
          source={{ uri: `${API_URL_IMAGE}/${classDetails?.banner}` }}
        /> */}
        <YoutubePlayer
          height={220}
          videoId={
            VideoId == null
              ? classDetails.youtube?.split('v=')?.[1]?.substring(0, 11) //item?.videoUrl?.video?.split('_')?.[0]
              : VideoId?.split('v=')?.[1]?.substring(0, 11)
          }
          play={false}
        />
      </View>
      <Text style={style.className}>{classDetails?.className}</Text>
      <Text style={style.classRating}>
        4.5
        <AirbnbRating
          count={5}
          defaultRating={4.5}
          size={12}
          ratingContainerStyle={{ paddingHorizontal: 5 }}
        />
      </Text>
      {/* <Text style={style.classAddress}>{classDetails?.address}</Text> */}
      <Text style={style.classType}>
        {classDetails?.city} | {classDetails?.stateId?.stateName}
      </Text>
      <Text style={{ ...style.className, paddingTop: 30 }}>About</Text>
      {classDetails?.description?.length<200?
      <Text style={style.aboutText}>{classDetails?.description}</Text>
      :
      showMore?
        <Text style={style.aboutText}>{classDetails?.description} ... <Text onPress={()=>setShowMore(false)} style={{color:"#844AE9", fontWeight:"500"}}>Show Less</Text></Text>
        :
      <Text style={style.aboutText}>{classDetails?.description?.slice(0,200)} ... <Text onPress={()=>setShowMore(true)} style={{color:"#844AE9", fontWeight:"500"}}>Show More</Text></Text>
      
}

      <TouchableOpacity
        style={style.buttonTakeClasses}
        onPress={() => {
          navigation.navigate('Learn Dance Form');
        }}>
        <LinearGradient
          colors={['#2885E5', '#844AE9']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}>
          <Text style={{ ...style.takeClassesButtonText, color: '#FFFFFF' }}>
          Learn this dance form
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    flex: 1,
  },
  buttonTakeClasses: {
    bottom: 0,
    marginTop: moderateVerticalScale(25),
    textAlign: 'center',
    borderRadius: 5,
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
  view: {
    backgroundColor: '#0E172A',
    flex: 1,
    padding: '3%',
  },
  imageContainer: {
    height: Dimensions.get('window').height * 0.2,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    backgroundColor: '#000000',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  className: {
    paddingVertical: 8,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 28,
    color: '#FFFFFF',
    paddingTop: 60,
  },
  classRating: {
    paddingVertical: 8,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#FBFBFB',
  },
  classAddress: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: '#BABFC8',
  },
  classType: {
    paddingVertical: 5,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    color: '#FFFFFF',
  },
  aboutText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: '#BABFC8',
  },
});
