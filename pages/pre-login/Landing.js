import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { tokenAdd, usersSignInAdd } from '../../redux/reducers/appData';
import { scale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { API_URL } from '../../services/api_url';


const style = StyleSheet.create({
  image: {
    height: '77%',
  },
  header: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    letterSpacing: -0.02,
    color: '#0F172A',
    margin: '1%',
    paddingBottom: '2%',
    position: 'relative',
    top: scale(-70),
  },
  view: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexGrow: 1,
    padding: '3%',
    marginBottom: '2%',
  },
  buttonLogin: {
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: 'linear-gradient(90deg, #2885E5 0%, #9968EE 100%)',
    padding: '1%',
    width:"96%",
    alignSelf:"center"
  },
  buttonSignUp: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#2885E5',
    margin: '3%',
    width:"95%",
    alignSelf:"center"
  },
  loginButtonText: {
    padding: '2.5%',
    alignSelf: 'center',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
  },
});

export const PreLoginLanding = ({ navigation }) => {
  const [user,setuser]=useState({})
  useEffect(()=>{ 
    GoogleSignin.configure({
      webClientId:"954839633934-4707ipr7i77pc0u1ofcnptd1ef5u9pfa.apps.googleusercontent.com",
      iosClientId:"954839633934-hun2otfj69e4mnevmdrrodv79ufnc3vn.apps.googleusercontent.com",
      offlineAccess:true,
      forceCodeForRefreshToken:true,

    })
    isSignedIn()
  })
  const signIn=async()=>{
    alert('good morning')
    try{
      await GoogleSignin.hasPlayServices(); 
      const userInfo=await GoogleSignin.signIn()
      console.log("due___",userInfo)
    setuser(userInfo)
    }catch(error){
   console.log(error)
    }
  }


  const isSignedIn=async()=>{
    const isSignedIn=await GoogleSignin.isSignedIn()
    if(isSignedIn){
  getCurrentUserInfO()
    }
    else{
      console.log('please Login')
    }
  }
  const getCurrentUserInfO=async()=>{
    try{
      const userInfo=await GoogleSignin.signInSilently();
      console.log("edit___")
      setuser(userInfo)


    }catch(error){
  console.log("HERE:",error)
    }
  }



   useEffect(() => {
      GoogleSignin.configure({
        webClientId:
          '255362522738-jp58mv7hsft7viv4p1eal11bc977tf7c.apps.googleusercontent.com',
          iosClientId:"954839633934-hun2otfj69e4mnevmdrrodv79ufnc3vn.apps.googleusercontent.com",
      });
    }, []);

  const googleLogin = async () => {
    // Get the users ID token
    const userInfo = await GoogleSignin.signIn();
    if (userInfo.idToken) {
      console.log("GOOOGGLEE USERR INFOO: ", userInfo);
      // Start User
      const user = {
        fullname: userInfo.user.name,
        email: userInfo.user.email,
        profileImage: userInfo.user.photo,
        loginType: "google",
        password: "NA",
        refercode: "",
        //phone: userInfo.phone,
      };


      console.log("USERRR MADE: ", user)
      //dispatch(usersSignInAdd(user));
      //dispatch(tokenAdd(userInfo.idToken));
      //await AsyncStorage.setItem('user', JSON.stringify(user));
      //await AsyncStorage.setItem('token', userInfo.idToken);

      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const responseJson = await response.json();

      if (responseJson.success === true) {


        // dispatch(usersSignInAdd(user));
        // await AsyncStorage.setItem('user', JSON.stringify(user));
        // dispatch(tokenAdd(userInfo.idToken));
        // await AsyncStorage.setItem('token', userInfo.idToken);

        const userValue = {
          email: user.email,
          password: user.password
        };
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userValue),
        });
        const responseJson = await response.json();
        console.log("Login GOOGLE DATA: ", responseJson)
        if (responseJson.success === true) {
          dispatch(usersSignInAdd(responseJson.user));
          dispatch(tokenAdd(responseJson.token));
          await AsyncStorage.setItem('token', responseJson.token);
          await AsyncStorage.setItem('user', JSON.stringify(responseJson.user));
          // navigation.navigate('home');
        } else if (responseJson.success === false) {
          //setError({ ...error, serverError: responseJson.message });
          console.log("ERROR L184: ", responseJson.message)
        }




      } else if (responseJson.success === false) {
        //setError({ ...error, serverError: responseJson.message });
        if (responseJson.message == "email already exists") {

          const userValue = {
            email: user.email,
            password: user.password,
          };
          const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userValue),
          });
          const responseJson = await response.json();
          // console.log(responseJson);
          if (responseJson.success === true) {
            dispatch(usersSignInAdd(responseJson.user));
            dispatch(tokenAdd(responseJson.token));
            await AsyncStorage.setItem('token', responseJson.token);
            await AsyncStorage.setItem('user', JSON.stringify(responseJson.user));
            // navigation.navigate('home');
          } else if (responseJson.success === false) {
            //setError({ ...error, serverError: responseJson.message });
            console.log("EMAIL EXIST ERROR: ", responseJson.message)
          }

        }
      }

      // navigation.navigate('home');
    }
    //   // End User
    //   const googleCredential = await auth.GoogleAuthProvider.credential(
    //     userInfo.idToken,
    //   );
    //   await auth().signInWithCredential(googleCredential);
    // 
  };

  const dispatch = useDispatch();

  // login
  const LoginGuest = async () => {
    const token = '367236v5b62cq726257d65esgfweyrt78eurw78rtsdgukfw78';
    const user = {
      _id: '630678eef208498c80bdf64b',
      fullname: 'Guest Account',
      email: 'guest@gmail.com',
      ownerReferCode: 'xxxxxx',
      profileImage: 'https://cdn-icons-png.flaticon.com/512/219/219983.png',
      phone: '+91xxxxxxxx',
    };
    dispatch(usersSignInAdd(user));
    dispatch(tokenAdd(token));
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    // navigation.navigate('home');
  };
  return (
    <SafeAreaView style={style.view}>
      <View style={style.view}>
        <ImageBackground
          style={style.image}
          source={require('../../assets/images/Gallery.png')}>
          <LinearGradient
            colors={['#00000000', '#FFFFFFFF']}
            style={{ height: '80%', width: '100%' }}></LinearGradient>
        </ImageBackground>
        <View>
          <Text style={style.header}> Welcome to B2D</Text>
        </View>
        <View style={{ position: 'relative', top: scale(-60) }}>
          <TouchableOpacity
            style={style.buttonLogin}
            onPress={() => {
              navigation.navigate('login');
            }}>
            <LinearGradient
              colors={['#2885E5', '#9968EE']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: 5,
                borderColor: 'transparent',
              }}>
              <Text style={{ ...style.loginButtonText, color: '#FFFFFF' }}>
                Log In
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.buttonSignUp}
            onPress={() => {
              navigation.navigate('signup');
            }}>
            <Text style={{ ...style.loginButtonText, color: '#475569' }}>
              Sign Up
            </Text>

          </TouchableOpacity>
          {/* <TouchableOpacity
            style={style.buttonSignUp}
          
            onPress={() => {signIn}}>
            <Text style={{ ...style.loginButtonText, color: '#475569' }}>
            continue with google
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={Style.socialButton} onPress={googleLogin}>
            <Image
              resizeMode="contain"
              style={style.socialImage}
              source={require('../../assets/images/google.png')}
            />
            <Text style={Style.socialText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...style.buttonLogin }}
            onPress={LoginGuest}>
            {/* <LinearGradient
              colors={['#2885E5', '#9968EE']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: 5,
                borderColor: 'transparent',
              }}> */}
            <Text
              style={{
                color: '#475569',
                textAlign: 'right',
                padding: 6,
                fontSize: 15,
                marginTop: 10,
              }}>
              Guest &#x3e;
            </Text>
            {/* </LinearGradient> */}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};


const Style = new StyleSheet.create({
  socialButton: {
    backgroundColor: '#1E293B',
    borderRadius: 6,
    padding: '3%',
    marginVertical: '3%',
    flexDirection: 'row',
    width:"96%",
    alignSelf:"center"
  },
  socialText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
    flex: 0.8,
    marginLeft: 67,
    color: 'white'
    // marginLeft: moderateScale(67),
  },

})
