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
import { hp, wp } from '../../Constants';

const style = StyleSheet.create({
  view: {
    padding: '3%',
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
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    fontSize: 12,
    backgroundColor: '#1E293B',
    color: '#E2E8F0',
    borderRadius: 100,
  },
  instructorTitle: {
    padding: '5%',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 23,
    textAlign: 'center',
    letterSpacing: -0.24,
    color: '#FFFFFF',
  },
  instructorDescription: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    letterSpacing: -0.24,
    color: '#BABFC8',
  },
  aboutHeder: {
    padding: '5%',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.24,
    color: '#FFFFFF',
  },
  about: {
    paddingHorizontal: '5%',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.24,
    color: '#BABFC8',
  },
  takeClassesContainer: {
    textAlign: 'center',
    borderRadius: 5,
    // position: 'absolute',
    // bottom: hp(2),
    // left: wp(2.5),
    // right: 0,
    width: wp(95),
    alignSelf: 'center',
    marginBottom: hp(2),
    overflow: 'hidden',
  },
  takeClassesGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonTakeClasses: {
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: 'linear-gradient(90deg, #2885E5 0%, #9968EE 100%)',
  },
  takeClassesButtonText: {
    padding: '2%',
    alignSelf: 'center',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
  },
});

export const PremiumDetails = ({ navigation }) => {
  const [teachers, setTeachers] = useState({});
  const [bannerImages, setBannerImages] = useState([]);

  const BannerWidth = Dimensions.get('window').width * 1;

  const getHireUsAPI = async () => {
    try {
      const resp = await getHireUs(id);
      setTeachers(resp.data);
      setBannerImages(resp.data.carouselImages);
    } catch (error) {}
  };

  useEffect(() => {
    getHireUsAPI();
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => (
      <View style={style.imageContainer}>
        <Image style={style.image} source={{ uri: item }} />
        {/* <Text style={style.imageTitle}>{item.name}</Text>
        <Text style={style.imageDescription}>{item.description}</Text> */}
      </View>
    ),
    [],
  );

  return (
    <View style={style.view}>
      <ScrollView
        style={style.view}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}>
        <View style={style.bannerView}></View>
        <View style={{ flex: 1 }}>
          <Text style={style.instructorTitle}>{teachers.name}</Text>
          <Text style={style.instructorDescription}>{teachers.danceType}</Text>
        </View>
        <View style={{ flex: 30 }}>
          <Text style={style.aboutHeder}>About Instructor</Text>
          <Text style={style.about}>{teachers.description}</Text>
        </View>
      </ScrollView>
      <View style={style.takeClassesContainer}>
        <TouchableOpacity
          style={style.buttonTakeClasses}
          onPress={() => {
            navigation.navigate('request-us');
          }}>
          <LinearGradient
            style={style.takeClassesGradient}
            colors={['#2885E5', '#844AE9']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}>
            <Text style={{ ...style.takeClassesButtonText, color: '#FFFFFF' }}>
              Request Us
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
