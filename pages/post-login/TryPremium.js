import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import {
  paymentSuccessStatusAdd,
  pricesAdd,
} from '../../redux/reducers/appData';
import { API_URL } from '../../services/api_url';
import RazorpayCheckout from 'react-native-razorpay';
import Logo from '../../assets/images/logo.png';

export const TryPremium = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const pricesList = useSelector(state => state.appData.pricesList);
  const userDetail = useSelector(state => state.appData.usersSignIn);
  const [colorv, setColorv] = useState(null);
  const [cart, setCart] = useState(null);

  // prices function
  const pricesFun = async () => {
    const response = await fetch(`${API_URL}/getPricesList`);
    const data = await response.json();
    dispatch(pricesAdd(data?.priceslist));
  };

  useEffect(() => {
    pricesFun();
  }, []);

  useEffect(() => {
    if (pricesList?.[0]) {
      SelectPriceFun(pricesList?.[0], 0);
    }
  }, [pricesList]);

  // select prices fun
  const SelectPriceFun = async (item, index) => {
    setColorv(index);
    setCart(item);
  };

  return (
    <>
      <View style={style.view}>
        <View>
          <View>
            <Image
              style={style.mainHeaderImage}
              source={require('../../assets/images/menStep.png')}
            />
          </View>
        </View>
        <View style={style.maintextRow}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('premium-screen');
              }}>
              <Image
                style={style.crosbtnImage}
                source={require('../../assets/images/crossBtn.png')}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={style.missingText}>
              Select your subscription package
            </Text>
          </View>
          {pricesList?.length > 0
            ? pricesList.map((item, index) => (
                <View
                  style={{
                    ...style.secScroll,
                    backgroundColor: colorv == index ? '#FDB601' : '#1E293B',
                  }}
                  key={index}
                  onTouchEnd={() => SelectPriceFun(item, index)}>
                  <View>
                    <Text style={style.classesText}>{item?.title}</Text>
                    <Text style={style.weeklyText}>{item?.subtitle}</Text>
                  </View>
                  <View>
                    <Text style={style.priceText}>₹{item?.price}</Text>
                  </View>
                </View>
              ))
            : null}
        </View>
      </View>
      <View style={style.takeClassesContainer}>
        <TouchableHighlight
          style={style.buttonTakeClasses}
          onPress={() => {
            console.log('cart -> ', JSON.stringify(cart, null, 2));

            var options = {
              description: cart.subtitle,
              image: Logo,
              currency: 'INR',
              key: 'rzp_test_OCVELwbtKpzpvc', // Your api key
              amount: Number(cart.price) + '00',
              name: cart.title,
              prefill: {
                email: userDetail?.email,
                contact: userDetail?.phone,
                name: userDetail?.fullname,
              },
              theme: { color: '#F37254' },
            };
            RazorpayCheckout.open(options)
              .then(data => {
                // handle success
                ToastAndroid.showWithGravity(
                  `Success: ${data.razorpay_payment_id}`,
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                );
                dispatch(paymentSuccessStatusAdd(data.razorpay_payment_id));
                navigation.navigate('home');
              })
              .catch(error => {
                // handle success
                console.log('Razorpay -> ', JSON.stringify(error, null, 2));
                ToastAndroid.showWithGravity(
                  error.error?.description,
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                );
              });
          }}>
          <LinearGradient
            style={style.takeClassesGradient}
            colors={['#2885E5', '#844AE9']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}>
            <Text style={{ ...style.takeClassesButtonText, color: '#FFFFFF' }}>
              Checkout
            </Text>
          </LinearGradient>
        </TouchableHighlight>
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
    borderRadius: 5,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'red',
    opacity: 0.3,
  },
  mainHeaderImage: {
    width: '100%',
    height: scale(400),
    objecFit: 'cover',
    opacity: 0.6,
  },
  maintextRow: {
    padding: scale(12),
    backgroundColor: '#1E293B',
    marginTop: scale(-125),
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    height: '100%',
  },
  danceDuration: {
    color: '#FFB800',
    fontSize: scale(20),
    fontWeight: '400',
    lineHeight: scale(12),
    fontStyle: 'normal',
    textTransform: 'uppercase',
    paddingTop: scale(8),
  },
  danceType: {
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontSize: scale(12),
    fontWeight: '400',
    lineHeight: scale(14),
    marginTop: scale(3),
  },
  missingText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scale(19),
    paddingTop: scale(18),
    paddingBottom: scale(10),
  },
  secScroll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '3%',
    borderWidth: 1,
    borderColor: '#BABFC8',
    marginBottom: scale(8),
    borderRadius: scale(5),
  },
  classesText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: scale(19),
  },
  weeklyText: {
    color: '#BABFC8',
    fontSize: scale(12),
    marginTop: scale(5),
  },
  priceText: {
    color: '#FFFFFF',
    marginTop: scale(12),
  },
  crosbtnImage: {
    width: scale(20),
    height: scale(20),
    marginTop: scale(20),
  },
  secScrollLast: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FDB601',
    borderRadius: scale(5),
    padding: '3%',
  },
  weeklyText2: {
    color: '#FFFFFF',
    fontSize: scale(12),
    marginTop: scale(5),
  },
});
