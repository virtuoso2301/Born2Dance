import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground ,
} from 'react-native';
import styles from 'react-native-3d-swiper/styles';
import LinearGradient from 'react-native-linear-gradient';
import { scale, moderateVerticalScale,moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { unlimitedAdd } from '../../redux/reducers/appData';
import { API_URL_IMAGE, API_URL } from "../../services/api_url";

export const PremiumScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const unlimitedList = useSelector(state => state.appData.unlimitedList);

  // unlimited function
  const unlimitedFun = async () => {
    const response = await fetch(`${API_URL}/premiumData`);
    const data = await response.json();
    dispatch(unlimitedAdd(data?.premiumlist));
  }

  useEffect(() => {
    unlimitedFun();
  },[])

  return (
    <>
     <View style={style.view}>
        <View >
            <ImageBackground style={style.headerImage} source={require('../../assets/images/dance4.png')}>
                <Text style={style.headerImageText}>Get Unlimited Access with Premium</Text>
            </ImageBackground>
            <View style={style.maintextRow}>
                <View>
                    <Text style={style.danceDuration}>1000+</Text>
                    <Text style={style.danceType}>Classes</Text>
                </View>
                <View>
                    <Text style={style.danceDuration}>100+</Text>
                    <Text style={style.danceType}>Workshops</Text>
                </View>
                <View>
                    <Text style={style.danceDuration}>80+</Text>
                    <Text style={style.danceType}>Instructor</Text>
                </View>
                <View>
                    <Text style={style.danceDuration}>70+</Text>
                    <Text style={style.danceType}>Categories</Text>
                </View>
            </View>
        </View>       
        <View>
            <Text style={style.missingText}>Heres what youre missing</Text>
        </View>
        <ScrollView>
          {unlimitedList?.length > 0 ? unlimitedList?.map((item, index) => (
          <View style={style.secScroll} key={index}>
            <Text style={style.classesText}>{item?.title}</Text>
            <Text style={style.weeklyText}>{item?.content}</Text>
          </View>
          )) : null}
        </ScrollView>
    </View>
    <View style={style.takeClassesContainer}>
            <TouchableOpacity 
            onPress={() => {
                navigation.navigate('try-premium');
              }}
            style={style.buttonTakeClasses}>
            <LinearGradient
                style={style.takeClassesGradient}
                colors={['#2885E5', '#844AE9']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}>
                <Image
                style={style.takeClassesIcon}
                source={require('../../assets/images/lock.png')}
                />
                <Text style={{...style.takeClassesButtonText, color: '#FFFFFF'}}>
                Take Classes
                </Text>
            </LinearGradient>
            </TouchableOpacity>
    </View>
    </>
  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    flex: 2,
    height: '100%',
  },
  takeClassesContainer: {
    bottom: 8,
    position: 'absolute',
    width: '100%',
    padding: scale(10),
    justifyContent: 'flex-end',
    borderRadius: 10,
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
  takeClassesIcon: {
    padding: '2%',
    alignSelf: 'center',
    fontStyle: 'normal',
  },
  takeClassesButtonText: {
    bottom: 0,
    padding: '3%',
    alignSelf: 'center',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    borderRadius : 5,
  },
  headerImage:{
    width: '100%',
    height: scale(200),
    objecFit: 'cover',
  },
  headerImageText:{
    color: '#FFFFFF',
    position: 'relative',
    top: scale(130),
    paddingLeft: scale(12),
    fontSize: scale(24),
    lineHeight:scale(24),
    fontStyle: 'normal',
    fontWeight:'600',
    width: scale(260),
  },
  maintextRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(12),
    backgroundColor: '#1D283A',
  },
  danceDuration:{
    color:'#FFB800',
    fontSize: scale(20),
    fontWeight: '400',
    lineHeight: scale(12),
    fontStyle: 'normal',
    textTransform: 'uppercase',
    paddingTop: scale(8),
  },
  danceType:{
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontSize: scale(12),
    fontWeight: '400',
    lineHeight: scale(14),
    marginTop: scale(3),
  },
  missingText:{
    color: '#956DFF',
    fontSize: scale(20),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: scale(23),
    padding: '3%',
  },
  secScroll:{
  padding: '3%',
  },
  classesText:{
    color: '#FFFFFF',
    fontSize: scale(16),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: scale(19),
  },
  weeklyText:{
    color: '#BABFC8',
    fontSize: scale(12),
    marginTop: scale(5),
    borderBottomWidth: 2,
    borderColor: '#1D283A',
    paddingBottom: scale(10)
  }
});
