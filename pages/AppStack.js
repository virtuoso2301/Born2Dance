import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TryPremium } from './post-login/TryPremium';
import { CustomVideo } from './post-login/CustomVideo';
import { PostLoginLanding } from './post-login/Landing';
import { HireUs } from './post-login/HireUs';
import { LearnToDance } from './post-login/LearnToDance';
import { PremiumScreen } from './post-login/PremiumScreen';
import { PlayerVideo } from './post-login/PlayerVideo';
import { Wallet } from './post-login/Wallet';
import { Profile } from './post-login/Profile';
import Notifications from './post-login/Notifications';
import { ContactUs } from './post-login/ContactUs';
import { Feedback } from './post-login/Feedback';
import { Refer } from './post-login/Refer';
import { ProfileTwo } from './post-login/ProfileTwo';
import { DownloadVideo } from './post-login/DownloadVideo';
import GlobalDanceForm from './post-login/GlobalDanceForm';
import { InstructorDetails } from './post-login/InstructorDetails';
import { HireusOne } from './post-login/HireusOne';
import { HireusTwo } from './post-login/HireusTwo';
import { HireusThree } from './post-login/HireusThree';
import { HireusFour } from './post-login/HireusFour';
import { HireusFive } from './post-login/HireusFive';
import { RequestUs } from './post-login/RequestUs';
import ClassList2 from './post-login/ClassList2';
import { ClassesList } from './post-login/ClassesList';
import { ClasseDetails } from './post-login/ClassDetails';
import { PremiumDetails } from './post-login/PremiumDetails';
import { AllCity } from './post-login/AllCity';
import { wp } from '../Constants';
import MyPlan from './post-login/MyPlan';
import { DanceClass } from './post-login/DanceClass';
import { LearnDanceForm } from './post-login/LearnDanceForm';
import { Thankyou } from './post-login/Thankyou';
import { City } from './post-login/City';
import RegisterYourClass from './post-login/RegisterYourClass';
import RegisterYourself from './post-login/RegisterYourself';
import Aboutus from './post-login/Aboutus';
import Dummy from './post-login/Dummy';
import DanceTypeDetails from './post-login/DanceTypeDetails';
import AllSongs from './post-login/AllSongs';
import AllVideos from './post-login/AllVideos';

import SongPurchaseForm from './post-login/SongPurchaseForm';
import AllVideoSongs from './post-login/AllVideoSongs';
import AllCinemas from './post-login/AllCinemas';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="post-loginMain"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="learn-to-dance"
        component={LearnToDance}
        options={{
          headerTitleAlign: 'center',
          title: 'Learn to Dance',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="dance-type-details"
        component={DanceTypeDetails}
        options={{
          headerTitleAlign: 'center',
          title: 'Learn to Dance',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="try-premium"
        component={TryPremium}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="premium-screen"
        component={PremiumScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="player-video"
        component={PlayerVideo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{
          title: 'My Plan',
          ...preLoginPageHeaderOptions,
          headerTitleAlign: 'center',
          backgroundColor: 'red',
          headerStyle: {
            backgroundColor: '#3882E7',
            shadowOpacity: 0,
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Notifications',
          ...preLoginPageHeaderOptions,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="contact"
        component={ContactUs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="feedback"
        component={Feedback}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="refer"
        component={Refer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="dummy"
        component={Dummy}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profileTwo"
        component={ProfileTwo}
        options={{
          title: 'Edit Profile',
          headerTitleAlign: 'center',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="download"
        component={DownloadVideo}
        options={{
          title: 'Downloads',
          headerTitleAlign: 'center',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="custom-video"
        component={CustomVideo}
        options={{
          title: 'Custom Video Requirment',
          headerTitleAlign: 'center',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="global dance form"
        component={GlobalDanceForm}
        options={{
          title: 'Global Dance Form',
          headerTitleAlign: 'center',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="Dance Class"
        component={DanceClass}
        options={{
          title: 'Dance Class',
          headerTitleAlign: 'center',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="Learn Dance Form"
        component={LearnDanceForm}
        options={{
          title: 'Learn Dance Form',
          headerTitleAlign: 'center',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="Thankyou"
        component={Thankyou}
        options={{
          title: 'Thankyou',
          headerTitleAlign: 'center',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="instructor-details"
        component={InstructorDetails}
        options={{
          title: 'Hire Us',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="hireus-one"
        component={HireusOne}
        options={{
          headerTitleAlign: 'center',
          title: 'Hire Us',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="hireus-two"
        component={HireusTwo}
        options={{
          headerTitleAlign: 'center',
          title: 'Hire Us',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="hireus-three"
        component={HireusThree}
        options={{
          headerTitleAlign: 'center',
          title: 'Hire Us',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="hireus-four"
        component={HireusFour}
        options={{
          headerTitleAlign: 'center',
          title: 'Hire Us',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="hireus-five"
        component={HireusFive}
        options={{
          headerTitleAlign: 'center',
          title: 'Hire Us',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="request-us"
        component={RequestUs}
        options={{
          headerTitleAlign: 'center',
          title: 'Hire Us',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="register-yourself"
        component={RegisterYourself}
        options={{
          headerTitleAlign: 'center',
          title: 'Register yourself',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="song-purchase-form"
        component={SongPurchaseForm}
        options={{
          headerTitleAlign: 'center',
          title: 'Purchase Request',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="register-yourclass"
        component={RegisterYourClass}
        options={{
          headerTitleAlign: 'center',
          title: 'Register your class',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="About us"
        component={Aboutus}
        options={{
          headerTitleAlign: 'center',
          title: 'About us',
          ...preLoginPageHeaderOptions,
        }}
      />

      <Stack.Screen
        name="class-list2"
        component={ClassList2}
        options={{
          headerTitleAlign: 'center',
          title: 'Class List',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="all-music-videos"
        component={AllVideoSongs}
        options={{
          headerTitleAlign: 'center',
          title: 'B2D Music Videos',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="all-songs"
        component={AllSongs}
        options={{
          headerTitleAlign: 'center',
          title: 'B2D Music',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="all-cinemas"
        component={AllCinemas}
        options={{
          headerTitleAlign: 'center',
          title: 'B2D Cinemas',
          ...preLoginPageHeaderOptions,
        }}
      />

      <Stack.Screen
        name="classes-list"
        component={ClassesList}
        options={{
          title: 'Nearby Classes',
          ...preLoginPageHeaderOptions,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="class-details"
        component={ClasseDetails}
        options={{
          title: 'Nearby Classes',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Stack.Screen
        name="premium-details"
        component={PremiumDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="all-city"
        component={AllCity}
        options={{
          title: 'All State',
          ...preLoginPageHeaderOptions,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="city"
        component={City}
        options={({ route }) => ({
          title: `${route.params.stateName}`,
          ...preLoginPageHeaderOptions,
          headerTitleAlign: 'center',
        })}
      />

    </Stack.Navigator>
  );
};

const BottomTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#0F172A',
          // paddingBottom: 6,
          // paddingTop: 6,
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Ionicons name={'home'} size={size} color={color} />;
          } else if (route.name === 'Explore Classes') {
            return <Ionicons name={'compass'} size={size} color={color} />;
          } else if (route.name === 'Hire Us') {
            return <Ionicons name={'search'} size={size} color={color} />;
          } else if (route.name === 'Custom Video') {
            return (
              <Image
                source={require('../assets/images/CustomVideo.png')}
                resizeMode={'contain'}
                style={[styles.icon, { tintColor: '#9a9da6' }]}
              />
            );
          } else if (route.name === 'My plan') {
            return (
              <Image
                source={require('../assets/images/MyPlan.png')}
                resizeMode={'contain'}
                style={styles.icon}
              />
            );
          }
          // else if (route.name === 'Wallet') {
          //   iconName = 'wallet';
          // }
        },
        tabBarActiveTintColor: '#926AEE',
        tabBarInactiveTintColor: '#9A9DA6',
      })}>
      <Tab.Screen
        name="Home"
        component={PostLoginLanding}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Explore Classes"
        component={AllCity}
        options={{
          headerTitleAlign: 'center',
          title: 'Explore Classes',
          ...preLoginPageHeaderOptions,
        }}
      />
      <Tab.Screen
        name="Hire Us"
        component={HireUs}
        options={{
          headerTitleAlign: 'center',
          title: 'Hire Us',
          ...preLoginPageHeaderOptions,
        }}

      />
      <Tab.Screen
        name="Custom Video"
        component={CustomVideo}
        options={{
          title: 'Custom Video',
          ...preLoginPageHeaderOptions,
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="My plan"
        component={MyPlan}
        options={{
          title: 'My plan',
          ...preLoginPageHeaderOptions,
          headerTitleAlign: 'center',

        }}
      />
      {/* <Tab.Screen
          name="Wallet"
          component={Wallet}
          options={{
            title: 'My Plan',
            ...preLoginPageHeaderOptions,
            headerTitleAlign: 'center',
            backgroundColor: 'red',
            headerStyle: {
              backgroundColor: '#3882E7',
              shadowOpacity: 0,
              elevation: 0,
            },
          }}
        /> */}
    </Tab.Navigator>
  );
};

const preLoginPageHeaderOptions = {
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#1E293B',
  },
  headerTitleStyle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
  },
  headerTintColor: '#fff',
};

const styles = StyleSheet.create({
  container: {
    flex: 100,
    backgroundColor: '#0E172A',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  header: {
    margin: '0%',
    paddingRight: '5%',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f00',
  },
  icon: {
    width: wp(9),
    height: wp(9),
  },
});

export default AppStack;
