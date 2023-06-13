import React, { useEffect, useState } from 'react';
import { StackRouter } from '@react-navigation/native';
import {
  Button,
  FlatList,
  Image,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Box,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateVerticalScale, scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import crossIcon from '../../assets/images/crossBtn.png';
import { API_URL } from '../../services/api_url';

export function Wallet({ navigation }) {
  const [income, setIncome] = useState(null);
  const [list, setList] = useState([]);
  const userDetail = useSelector(state => state.appData.usersSignIn);

  // refer wallet function
  const referWalletFun = async () => {
    const response = await fetch(`${API_URL}/getAllReferIncome`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userDetail._id,
      }),
    });
    const result = await response.json();
    setIncome(result.referincome);
  };

  const referList = async () => {
    const response = await fetch(`${API_URL}/userslist`);
    const resultData = await response.json();
    setList(resultData.users);
  };

  useEffect(() => {
    referWalletFun();
    referList();
  }, []);

  return (
    <LinearGradient
      colors={['#2885E5', '#9968EE']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.5 }}
      style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={style.profileStyle} />
        <View style={style.profileList}>
          <View>
            <View style={style.walletCardStyle}>
              <View style={style.mainCardStyle}>
                <View>
                  <Text style={style.walletrefralText}>Referal Minutes </Text>
                  <Text style={style.walletTimeText}>
                    {income != null ? income?.totalAmount : 0.0} sec
                  </Text>
                </View>
                <View style={style.cardInnerStyle}>
                  <Image
                    source={require('../../assets/images/wallet2.png')}
                    style={style.walletImage}
                  />
                </View>
              </View>
              <View>
                <Text style={style.walletcardText}>
                  The maximum you share with your friends more seconds you’ll
                  get to watch subscription videos
                </Text>
              </View>
            </View>
          </View>
          <View style={style.historyStyle}>
            <View style={style.history}>
              <Text style={style.historyText}>History</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {list.length > 0
                ? list
                    .filter(item1 => item1?.refercode == income?.refercode)
                    .map(item => (
                      <View style={style.historyCard}>
                        <View>
                          <Text style={style.historyCardTexone}>
                            {item?.fullname}
                          </Text>
                          <Text style={style.histryPromoCode}>
                            Promo code: {item?.ownerReferCode}
                          </Text>
                          <Text style={style.historyDateText}>
                            {item?.createdAt}
                          </Text>
                        </View>
                        <View>
                          <Text style={style.historyTimeText}>+5 sec</Text>
                        </View>
                      </View>
                    ))
                : null}
            </ScrollView>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const style = {
  profileStyle: {
    flex: 1,
    alignItems: 'center',
  },
  profileList: {
    backgroundColor: '#0F172A',
    width: '100%',
    height: '80%',
  },
  walletCardStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#1D283A',
    borderRadius: scale(10),
    width: scale(315),
    height: 'auto',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: moderateVerticalScale(-75),
  },
  mainCardStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: scale(15),
  },
  walletrefralText: {
    color: '#C4C4C4',
    fontSize: scale(14),
    fontWeight: '500',
    lineHeight: scale(16),
  },
  walletImage: {
    width: scale(40),
    height: scale(40),
  },
  walletTimeText: {
    color: '#FFFFFF',
    fontSize: scale(20),
    lineHeight: scale(24),
    fontWeight: '700',
  },
  walletcardText: {
    color: '#BABFC8',
    fontWeight: '400',
    fontSize: scale(12),
    lineHeight: scale(14),
    padding: scale(15),
  },
  historyStyle: {
    marginTop: moderateVerticalScale(10),
    paddingHorizontal: '4.5%',
  },
  historyText: {
    color: '#fff',
    fontSize: scale(20),
    fontWeight: '600',
    lineHeight: scale(23),
  },
  historyCard: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#7A8E9A',
    marginTop: moderateVerticalScale(8),
    paddingTop: '2%',
    paddingBottom: '4%',
  },
  historyCardTexone: {
    color: '#FFFFFF',
    fontSize: scale(16),
    lineHeight: scale(19),
    fontWeight: '500',
  },
  histryPromoCode: {
    color: '#FFFFFF',
    fontSize: scale(14),
    lineHeight: scale(16),
    fontWeight: '400',
    marginTop: moderateVerticalScale(5),
  },
  historyDateText: {
    color: '#BABFC8',
    fontSize: scale(10),
    lineHeight: scale(12),
    fontWeight: '400',
    marginTop: moderateVerticalScale(5),
  },
  historyTimeText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    lineHeight: scale(19),
    fontWeight: '700',
    marginTop: moderateVerticalScale(24),
  },
};
