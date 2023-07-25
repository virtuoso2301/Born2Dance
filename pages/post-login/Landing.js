import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import MyCarousel from './testing';
import { scale } from 'react-native-size-matters';
import { API_URL, API_URL_IMAGE } from '../../services/api_url';
import { useDispatch, useSelector } from 'react-redux';
import {
  bannerListAdd,
  cityListAdd,
  danceCategoryAdd,
  hireusAdd,
  setBannerMuted,
  usersSignInAdd,
} from '../../redux/reducers/appData';
import { profile } from '../../services/services';
import { BDLoader, hp, wp } from '../../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image'
import Orientation from 'react-native-orientation-locker';

const { width: screenWidth } = Dimensions.get('window');

const LogoTitle = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <FastImage
        source={require('../../assets/images/logo.png')}
        style={{ width: 25, height: 25 }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={{ width: 25, height: 25, marginRight: 10 }}
          onPress={() => {
            navigation.navigate('Notifications');
          }}>
          <Ionicons name="notifications-outline" size={25} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 25, height: 25 }}
          onPress={() => {
            navigation.navigate('profile');
          }}>
          <FastImage
            source={require('../../assets/images/user.png')}
            style={{ width: '100%', height: '100%' }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const PostLoginLanding = ({ navigation }) => {
  // const { token, bannerMuted} = useSelector(({ appData }) => appData);

  const { bannerMuted, token } = useSelector(state => state.appData);
  const dispatch = useDispatch();
  const BannerWidth = Dimensions.get('window').width * 1;

  const [State, setState] = useState({
    IsLoading: false,
    States: null,
    hirelist: null,
    danceCategory: null,
    cityList: null,
    bannerList: null,
  });
  const [bannerURL, setBannerURL] = useState("")
  const [country, SetCountry] = useState(null)
  const [songDetails, setSongDetails] = useState(null)



  // unlimited function
  const hireusFun = async () => {
    const response = await fetch(`${API_URL}/getHireList`);
    const data = await response.json();
    setState(p => ({ ...p, hirelist: data?.hirelist }));
    dispatch(hireusAdd(data?.hirelist));
  };

  // dance category
  const danceCategory = async () => {
    const response = await fetch(`${API_URL}/getAllCategories`);
    const data = await response.json();
    setState(p => ({ ...p, danceCategory: data }));
    dispatch(danceCategoryAdd(data));
  };

  const allMusic = async () => {
    const response = await fetch(`${API_URL}/getAllAudio`);
    const data = await response.json();
    setSongDetails(data?.audio)
  };

  const [selectedSong, setSelectedSong] = useState("")

  // const reanderItem = ({ item }) => {
  //   return item.type === 'image' ? (
  //     <View>
  //       <FastImage
  //         source={{ uri: `${API_URL_IMAGE}/${item?.image}` }}
  //         resizeMode="cover"
  //         style={{
  //           // width: "100%",
  //           // height: "100%",
  //           // alignSelf:"center"
  //           marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
  //           backgroundColor: 'white',
  //           backgroundColor: '#000000',
  //           borderRadius: 10,
  //           width: screenWidth - screenWidth / 50,
  //           marginHorizontal: 1,
  //           marginVertical: 5,
  //           height: Dimensions.get("window").height * 0.24,
  //           alignSelf: "center"

  //         }}
  //       />
  //     </View>
  //   ) : (
  //     <View>
  //       <Video
  //         source={{ uri: `${API_URL_IMAGE}/${item?.image}` }}
  //         resizeMode="cover"
  //         style={{
  //           // width: "100%",
  //           // height: "100%",
  //           // alignSelf:"center"
  //           marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
  //           backgroundColor: 'white',
  //           backgroundColor: '#000000',
  //           borderRadius: 10,
  //           width: screenWidth - screenWidth / 50,
  //           marginHorizontal: 1,
  //           marginVertical: 5,
  //           height: Dimensions.get("window").height * 0.24,
  //           alignSelf: "center"
  //         }}
  //         controls={false}
  //         paused={false}
  //         repeat={false}
  //       >
  //       </Video>
  //     </View>
  //   );
  // };

  // city list
  const cityList = async () => {
    const response = await fetch(`${API_URL}/getallstate`);
    const data = await response.json();
    setState(p => ({ ...p, cityList: data }));
    dispatch(cityListAdd(data));
  };

  // const cityList = async () => {
  //   const response = await fetch(`${API_URL}/allcity`);
  //   const data = await response.json();
  //   setState(p => ({ ...p, cityList: data }));
  //   dispatch(cityListAdd(data));
  // };

  // banner list
  const bannerList = async () => {
    const response = await fetch(`${API_URL}/getAllBanner`);
    const data = await response.json();
    setState(p => ({ ...p, bannerList: data }));
    setBannerURL(data?.banners[0]?.image)
    dispatch(bannerListAdd(data));
  };

  const GetRequiredApis = async () => {
    setState(p => ({ ...p, IsLoading: true }));
    await danceCategory();
    await cityList();
    await bannerList();
    await hireusFun();
    await profile(token).then(res => dispatch(usersSignInAdd(res)));
    await allMusic()

  };

  useEffect(() => {
    Orientation.lockToPortrait()
    GetRequiredApis();
    setState(p => ({ ...p, IsLoading: false }));

    ; (async () => {
      const response = await fetch(`${API_URL}/getAllCountry`);
      const data = await response.json();
      SetCountry(data.countrys)
    })();

  }, []);

  const [heroBannerEnded, setHeroBannerEnded] = useState(false)

  const [muted, setMuted] = useState(bannerMuted)




  const videoDetails = [
    {
      name: "Video 1",
      artist: "Lewis Capaldi"
    },
    {
      name: "Video 2",
      artist: "Adele"
    },
    {
      name: "Video 3",
      artist: "Ed Sheeran"
    },
    {
      name: "Video 4",
      artist: "Taylor Swift"
    },
    {
      name: "Video 5",
      artist: "Billie Eilish"
    },
    {
      name: "Video 6",
      artist: "Post Malone"
    },
    {
      name: "Video 7",
      artist: "Beyoncé"
    },
    {
      name: "Video 8",
      artist: "Bruno Mars"
    }
  ]


  return (
    <View style={style.view}>
      <BDLoader visible={State.IsLoading} />
      <LogoTitle navigation={navigation} />
      <ScrollView>
        {/* <View>
          <Carousel
            style={style.bannerTop}
            data={State.bannerList?.banners}
            renderItem={reanderItem}
            //   return (
            //     <View style={style.imageContainer}>
            //       <Image
            //         source={{ uri: `${API_URL_IMAGE}/${item?.image}` }}
            //         resizeMode="cover"
            //         style={{
            //           width: '100%',
            //           height: 140,
            //         }}
            //       />
            //     </View>
            //   );
            // }}
            sliderWidth={BannerWidth}
            itemWidth={BannerWidth}
            autoplay={true}
            autoplayInterval={20000}
            loop={true}
          />
        </View> */}
        <View style={{ height: Dimensions.get("window").height * 0.24 }}>
          <Video
            // source={{ uri: `${API_URL_IMAGE}/${bannerURL}` }}
            source={{ uri: "https://www.pexels.com/video/2499611/" }}
            resizeMode="cover"
            style={{
              // width: "100%",
              // height: "100%",
              // alignSelf:"center"
              marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
              backgroundColor: 'white',
              backgroundColor: '#000000',
              borderRadius: 10,
              width: screenWidth - screenWidth / 50,
              marginHorizontal: 1,
              alignSelf: "center",
              height: "100%",

            }}
            controls={false}
            paused={false}
            repeat={false}
            onEnd={() => setHeroBannerEnded(true)}
            muted={muted}
            onLoadStart={() => setHeroBannerEnded(false)}
          >
          </Video>
          {!heroBannerEnded ?
            <TouchableOpacity style={{ position: "absolute", top: "4.5%", right: "4.5%", }} onPress={() => {
              dispatch(setBannerMuted(!muted))
              setMuted(!muted)

            }}>
              <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 10 }}>{muted ? `${"UNMUTE"}` : `${"MUTE"}`}</Text>
            </TouchableOpacity>
            :
            null
          }
        </View>

        <View style={style.section}>
          <View style={style.sectionHeader}>
            <Text style={style.sectionTitle}>Learn to Dance</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('learn-to-dance', { workshop: true });
              }}>
              <Text style={style.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <MyCarousel getDanceCategory={State.danceCategory} />
        </View>
        <View style={style.section}>
          <View style={style.sectionHeader}>
            <Text style={style.sectionTitle}>Hire Us</Text>
            <Text
              style={style.seeAll}
              onTouchEnd={() => navigation.navigate('Hire Us')}>
              See All
            </Text>
          </View>
          <ScrollView horizontal={true} style={{ paddingTop: '5%' }}>
            {State.hirelist?.map((item, index) => {
              return (
                <View key={`${index}`} style={style.hireUsView}>
                  <View style={style.teacherImageContainer}>
                    <TouchableOpacity
                      onPress={() => {

                        navigation.navigate('instructor-details', {
                          id: item._id,
                          item: item,
                        });
                      }}>
                      <FastImage
                        style={style.teacherImage}
                        source={{
                          uri: `${API_URL_IMAGE}/${item?.profileImage}`,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={style.teacherDetails}>
                    <Text style={style.teacherName}>{item.name}</Text>
                    <Text style={style.danceType}>{item.designation}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={style.section}>
          <View style={style.workshopstyle}>
            <Text style={style.sectionTitle}>Global Dance Forms</Text>
          </View>
          <View style={{ paddingTop: '8%', flexDirection: 'row' }}>
            {country?.slice(0, 2)?.map(item =>
              <TouchableOpacity
                activeOpacity={0.5}
                style={style.workshopContainer}
                onPress={() => navigation.navigate('global dance form', {
                  screen: 'global dance form',
                  params: { id: item?._id, item: item },
                })}>
                <View style={style.imageDance}>
                  <FastImage
                    style={{ width: '100%', height: '100%' }}
                    resizeMode={'cover'}
                    source={{ uri: `${API_URL_IMAGE}/${item?.profileImage}` }}
                  />
                </View>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: -wp(10),
                    left: 0,
                  }}>
                  <LinearGradient
                    style={[
                      {
                        width: wp(50),
                        height: wp(50),
                      },
                    ]}
                    colors={['#0304045c', '#d2dce52b']}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 1, y: 0 }}>
                    <View
                      style={{
                        position: 'absolute',
                        bottom: hp(1),
                        alignSelf: 'center',
                        alignItems: 'flex-start',
                        width: '100%',
                        paddingLeft: wp(2),
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          marginBottom: hp(0.5),
                          fontSize: wp(6),
                        }}>
                        {item?.name}
                      </Text>
                      <Text
                        style={[
                          style.danceFormText,
                          { paddingHorizontal: wp(5) },
                        ]}>
                        {item?.subtitle}
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity
              activeOpacity={1}
              style={style.workshopContainer}
              onPress={() => navigation.navigate('global dance form')}>
              <View style={style.imageDance}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  resizeMode={'cover'}
                  source={require('../../assets/images/World.png')}
                />
              </View>

              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: -wp(10),
                  left: 0,
                }}>
                <LinearGradient
                  style={[
                    {
                      width: wp(50),
                      height: wp(50),
                    },
                  ]}
                  colors={['#0304045c', '#d2dce52b']}
                  start={{ x: 1, y: 1 }}
                  end={{ x: 1, y: 0 }}>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: hp(1),
                      alignSelf: 'center',
                      alignItems: 'flex-start',
                      width: '100%',
                      paddingLeft: wp(2),
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        marginBottom: hp(0.5),
                        fontSize: wp(6),
                      }}>
                      {'Others'}
                    </Text>
                    <Text style={style.danceFormText}>
                      {'International Dance Form'}
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={style.section}>
          <View style={style.sectionHeader}>
            <Text style={style.sectionTitle}>B2D Dance Classes</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('all-city');
              }}>
              <Text style={style.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={State.cityList?.states.slice(0, 4)}
            renderItem={({ item }) => (
              <View style={style.imageContainerDance}>

                <TouchableOpacity
                  onPress={() =>
                    // navigation.navigate('classes-list', { city: item.stateName })
                    navigation.navigate('city', { id: item._id, stateName: item?.stateName })
                  }
                  style={{ height: hp(25), justifyContent: "center", width: wp(73) }}
                >
                  <FastImage
                    style={{
                      alignSelf: 'center',
                      width: wp(70),
                      height: hp(20),
                      borderRadius: 7
                    }}
                    resizeMode={'cover'}
                    source={{ uri: `${API_URL_IMAGE}/${item?.profileImage}` }}
                  />
                  <Text
                    style={{
                      color: '#BABFC8',
                      textAlign: 'center',
                      marginTop: '5%',
                      fontSize: 17,
                      fontWeight: '400',
                    }}>
                    {item?.stateName}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            horizontal
          />
        </View>
        <View style={[style.section, { height: hp(25) }]}>
          <View style={style.sectionHeader}>
            <Text style={style.sectionTitle}>B2D Music</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('all-songs', { songDetails: songDetails });
              }}>
              <Text style={style.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={songDetails?.slice(0, 4)}
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: hp(1), marginHorizontal: wp(3) }}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                style={style.headerContainer}
                onPress={() => {
                  setSelectedSong(item._id)
                }}
              >
                <ImageBackground
                imageStyle={{borderRadius:10}}
                  style={style.instructorlogo1}
                  source={require("../../assets/images/music.jpeg")}
                //source={{uri:`${API_URL_IMAGE}/${item.image}`}}
                >
                  {item._id == selectedSong ? <FastImage
                    style={[style.instructorlogo1, { opacity: 0.3 }]}
                    source={require("../../assets/images/sound1.gif")}
                  /> : null}
                </ImageBackground>

                <View style={style.headerTitleContainer}>
                  <View>
                    <Text style={style.headerTitle}>{item.songName}</Text>
                  </View>
                  <Text style={style.headerDescription}>
                    {item.artist}
                  </Text>
                  <Text style={style.headerDescription1}>
                    3:47
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>


        <View style={style.section}>
          <View style={style.sectionHeader}>
            <Text style={style.sectionTitle}>B2D Videos</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('all-videos');
              }}>
              <Text style={style.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={videoDetails.slice(0, 4)}
            renderItem={({ item }) => (
              <View style={style.imageContainerDance}>

                <TouchableOpacity
                  onPress={() => Alert.alert("Alert", "Waiting for API")}
                  style={{ height: hp(30), justifyContent: "center", width: wp(85), }}
                >
                  <FastImage
                    style={{
                      alignSelf: 'center',
                      width: wp(80),
                      height: hp(25),
                      borderRadius: 10,
                    }}
                    resizeMode={'cover'}
                    source={require("../../assets/images/b2ddance.jpeg")}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      textAlign: 'center',
                      marginTop: '5%',
                      fontSize: 16,
                      fontWeight: '400',
                    }}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            horizontal
          />
        </View>

        <View>
          <FastImage
            style={style.image}
            source={require('../../assets/images/LastBanner.png')}
          />
        </View>

      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    flex: 1,
    paddingBottom: hp(2)
  },
  imageContainer: {
    //flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    backgroundColor: '#000000',
    borderRadius: 10,
    width: screenWidth,
    marginHorizontal: 1,
    marginVertical: 5,
    alignItems: "center",
    height: Dimensions.get("window").height * 0.24,
    justifyContent: "center"
  },
  image: {
    width: '95%',
    resizeMode: "cover",
    height: Dimensions.get("window").height * 0.3,
    alignSelf: "center",
    marginTop: hp(1)


  },
  imageTitle: {
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    marginTop: '13%',
    marginLeft: '6%',
  },
  imageDescription: {
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 14,
    padding: '5%',
  },
  bannerTop: {
    width: '110%',
    resizeMode: 'cover',
    height: 173,
    borderRadius: 8,
  },
  section: {
    paddingTop: '5%',
    backgroundColor: '#0E172A',
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
  },
  workshopstyle: {
    marginTop: scale(5),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    marginBottom: scale(-18),
  },
  sectionTitle: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 23,
    color: '#FFFFFF',
    paddingLeft: 15,
    paddingBottom: 10,
  },
  seeAll: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: '#956DFF',
  },
  danceStyleView: {
    paddingVertical: '0%',
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.51,
  },
  imageContainerDance: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue

    backgroundColor: '#0E172A',
    borderRadius: 8,
    justifyContent: 'flex-start',
    // height: 80,
    // width:wp(100)
  },
  imageDance: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageTitleDance: {
    padding: '1%',
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    alignSelf: 'center',
    bottom: 0,
  },
  hireUsView: {
    marginHorizontal: wp(3),
  },
  teacherName: {
    fontStyle: 'normal',
    marginTop: 8,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.1992,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  danceType: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    marginTop: 5,
    letterSpacing: -0.1992,
    color: '#B6B8BB',
    width: scale(100),
    textAlign: 'center',
  },
  teacherImageContainer: {
    borderRadius: 60,
    overflow: 'hidden',
  },
  teacherImage: {
    height: 120,
    width: 120,
  },
  teacherDetails: {
    alignItems: 'center',
  },
  danceFormText: {
    color: '#fff',
    backgroundColor: '#EC3528',
    fontSize: 10,
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    borderRadius: wp(1),
  },
  workshopContainer: {
    width: '47%',
    height: wp(50),
    marginHorizontal: wp(1.5),
    overflow: 'hidden',
    borderRadius: wp(2),
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#334155',
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.5),
    marginHorizontal: wp(3),
    marginBottom: -hp(2),
    marginTop: hp(2),
  },
  dropdownContainerStyle: {},
  placeholderStyle: {
    color: '#BABFC8',
  },
  selectedTextStyle: {
    color: '#BABFC8',
  },
  inputSearchStyle: {
    backgroundColor: '#0E172A',
    color: '#BABFC8',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: '2%',
    borderColor: '#ffffff50',
    borderWidth: 1.5,
    borderRadius: 5,
    marginBottom: '5%',
    width: wp(82),
    height: hp(16.5),
    marginHorizontal: 10,
  },
  headerLogo: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  instructorlogo: {
    height: 100,
    width: 70,
  },
  instructorlogo1: {
    height: hp(13.5),
    width: 110,
    marginLeft: 2,
    alignSelf: "center",
    borderRadius:10
  },
  headerTitleContainer: { marginLeft: 18, marginTop: 10 },
  headerTitle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    color: '#FFFFFF',
    marginVertical: 6
  },
  headerDescription: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 14,
    color: '#BABFC8',
    paddingTop: wp(1),
  },
  headerDescription1: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: '#BABFC8',
    marginTop: 10
  },

});
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
  },
  icon: {
    width: wp(9),
    height: wp(9),
  },
});
