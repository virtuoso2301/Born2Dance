import React from 'react';
import {
  Image,
  Text,
  TextInput,
  ToastAndroid,
  Share,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateVerticalScale, scale } from 'react-native-size-matters';
import crossIcon from '../../assets/images/crossBtn.png';
import refer from '../../assets/images/refer.png';
import Clipboard from '@react-native-community/clipboard';
import { useSelector } from 'react-redux';

export function Refer({ navigation }) {
  const userDetail = useSelector(state => state.appData.usersSignIn);

  // console.log(userDetail?.ownerReferCode)
  return (
    <View style={{ flex: 1, backgroundColor: '#0F172B' }}>
      <View
        style={{
          padding: 20,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          backgroundColor: '#1D283A',
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
      </View>

      <View style={style.profileStyle}></View>
      <View style={style.profileList}>
        <View
          style={{
            display: 'flex',
            width: '100%',
            marginTop: moderateVerticalScale(20),
            padding: moderateVerticalScale(11),
          }}>
          <Image
            source={refer}
            style={{
              width: scale(300),
              height: scale(260),
              marginTop: moderateVerticalScale(6),
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              color: '#FFFF',
              width: '100%',
              fontWeight: '600',
              fontSize: 20,
              marginTop: moderateVerticalScale(15),
            }}>
            Refer a friend
          </Text>
          <Text
            style={{
              color: '#FFFF',
              width: '100%',
              fontWeight: '400',
              fontSize: 13,
              paddingTop: moderateVerticalScale(10),
            }}>
            You’ll get a chance to watch subscription videos.
          </Text>
          <TextInput
            style={{
              color: '#FFFF',
              width: '100%',
              fontWeight: '600',
              fontSize: 15,
              marginTop: moderateVerticalScale(15),
              backgroundColor: '#0F172A',
              borderRadius: 5,
              paddingLeft: 15,
              // position: 'relative',
            }}
            placeholderTextColor="#FFFF"
            placeholder={userDetail?.ownerReferCode}
            editable={false}
          />
          <TouchableOpacity
            style={{
              marginTop: moderateVerticalScale(-35),
              marginRight: moderateVerticalScale(15),
            }}
            onPress={async () => {
              await Clipboard.getString(userDetail?.ownerReferCode);
              ToastAndroid.show('Copied to code', ToastAndroid.SHORT);
            }}>
            <Text
              style={{
                color: '#956DFF',
                width: '100%',
                fontWeight: '700',
                fontSize: 17,
                textAlign: 'right',
              }}>
              Copy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Share.share({
                message: `Check out this app https://play.google.com/store/apps/details?id=com.app.referfriend`,
                title: 'Refer a friend',
              });
            }}
            style={{ marginTop: moderateVerticalScale(30) }}>
            <LinearGradient
              colors={['#2885E5', '#9968EE']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{ borderWidth: 1, borderStyle: 'solid', borderRadius: 5 }}>
              <Text
                style={{
                  padding: '2%',
                  alignSelf: 'center',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: 16,
                  lineHeight: 24,
                  color: '#FFFFFF',
                }}>
                Refer Now
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const style = {
  TextButton: {
    fontSize: scale(15),
    color: '#000000',
    backgroundColor: '#FFFFFF',
    width: '35%',
    padding: '1.5%',
    borderRadius: scale(5),
    textAlign: 'center',
  },
  profileStyle: {
    flex: 1,
    backgroundColor: '#0F172B',
  },
  profileImage: {
    width: scale(90),
    height: scale(90),
    marginTop: moderateVerticalScale(6),
  },
  profileList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    width: '100%',
    height: '87%',
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingTop: moderateVerticalScale(10),
  },
};
