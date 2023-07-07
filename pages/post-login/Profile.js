import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  Text,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateVerticalScale, scale } from 'react-native-size-matters';
import crossIcon from '../../assets/images/crossBtn.png';
import download from '../../assets/images/download.png';
import wallet from '../../assets/images/wallet.png';
import Bell from '../../assets/images/bell.png';
import note from '../../assets/images/note.png';
import hire from '../../assets/images/hire.png';
import phone from '../../assets/images/phone.png';
import info from '../../assets/images/info.png';
import { useDispatch } from 'react-redux';
import { tokenAdd, usersSignInAdd } from '../../redux/reducers/appData';
import { API_URL_IMAGE } from '../../services/api_url';
import { hp, wp } from '../../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Profile({ navigation }) {
  const dispatch = useDispatch();
  const [State, setState] = useState({ userDetail: null });

const view="View Profile"
  useEffect(() => {
    GetUserDetails();
  }, []);

  const GetUserDetails = async () => {
    const user = await AsyncStorage.getItem('user');
    
    if (user) {
      setState(p => ({ ...p, userDetail: JSON.parse(user) }));
    }
    //console.log("1 ",State.userDetail)
    console.log("2 ",user)
    const data=JSON.parse(user)

};

  return (
    <LinearGradient
      colors={['#2885E5', '#9968EE']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.4, y: 0.4 }}
      style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            padding: 20,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={crossIcon}
              style={{
                width: scale(15),
                height: scale(15),
                marginTop: moderateVerticalScale(6),
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('try-premium')}
            style={style.TextButton}>
            <Text style={{ textAlign: 'center', color: '#000' }}>
              Buy Premium
            </Text>
          </TouchableOpacity>
        </View>

        <View style={style.profileStyle}>
          <Image
            source={
              
              // State.userDetail&&googleLoginData
              //   ? {
              //       uri:googleLoginData.photo
              //     }
              //   : {
              //     uri: State.userDetail?.profileImage?.startsWith('http')
              //         ? State.userDetail?.profileImage
              //         : `${API_URL_IMAGE}/` + State.userDetail?.profileImage,
              //   }
              {
                uri: State.userDetail?.profileImage?.startsWith('http')
                    ? State.userDetail?.profileImage
                    : `${API_URL_IMAGE}/` + State.userDetail?.profileImage,
              }
            }
            resizeMode={'cover'}
            style={style.profileImage}
          />
          <Text
            style={{
              fontSize: scale(20),
              fontWeight: 'bold',
              color: '#FFFFFF',
              marginTop: moderateVerticalScale(6),
            }}>
            {State.userDetail?.fullname}
          </Text>

          
          <TouchableOpacity

            onPress={() =>
              navigation.navigate('profileTwo', { users: State.userDetail})
            }>
            <Text
              style={{
                fontSize: scale(15),
                fontWeight: 'bold',
                color: '#FFFFFF',
                marginTop: moderateVerticalScale(6),
              }}>
              {view}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.profileList}>
          <FlatList
            data={[
              { key: 'About us', image: info, route: 'About us' },
              { key: 'My wallet', image: wallet, route: 'Wallet' },
              { key: 'Refer & Earn', image: note, route: 'refer' },
              { key: 'Notifications', image: Bell, route: 'Notifications' },
              { key: 'Contact Us', image: phone, route: 'contact' },
              { key: 'Downloads', image: download, route: 'download' },
              { key: 'Logout', image: download, route: 'logout' },
            ]}
            renderItem={({ item }) => {
              return (
                <View>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      padding: moderateVerticalScale(15),
                      width: '100%',
                      borderBottomColor: '#334155',
                      borderBottomWidth: 1,
                      display: 'flex',
                    }}
                    onPress={async () => {
                      if (item.route == 'logout') {
                        // navigation.navigate('login');
                        dispatch(tokenAdd(null));
                        dispatch(usersSignInAdd(null));
                        await AsyncStorage.removeItem('token');
                        await AsyncStorage.removeItem('user');
                      } else {
                        navigation.navigate(item.route);
                      }
                    }}>
                    <Image
                      source={item.image}
                      resizeMode={'contain'}
                      style={{
                        width: scale(20),
                        height: scale(20),
                        marginHorizontal: wp(4),
                        marginTop: hp(0.5),
                        tintColor: '#fff',
                      }}
                    />
                    <Text
                      style={{
                        fontSize: scale(15),
                        fontFamily: 'Inter',
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        marginTop: moderateVerticalScale(6),
                        textAlign: 'left',
                      }}>
                      {item.key}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const style = {
  TextButton: {
    fontSize: scale(15),
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#FFFFFF',
    width: '35%',
    padding: '1.9%',
    borderRadius: scale(5),
    textAlign: 'center',
  },
  profileStyle: {
    flex: 1,
    alignItems: 'center',
    marginTop: moderateVerticalScale(10),
  },
  profileImage: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
    marginTop: moderateVerticalScale(6),
  },
  profileList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateVerticalScale(6),
    backgroundColor: '#1E293B',
    width: '100%',
    height: '60%',
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingTop: moderateVerticalScale(10),
  },
};
