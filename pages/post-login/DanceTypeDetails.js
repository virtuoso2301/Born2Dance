import 'react-native-gesture-handler';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Platform, Dimensions, StatusBar, ScrollView,  Text, TouchableOpacity, Alert, Image, } from 'react-native';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import { hp, wp } from '../../Constants';
import { useSelector } from 'react-redux';
import { API_URL_IMAGE } from '../../services/api_url';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../assets/images/logo.png';
import Share from 'react-native-share';
import FastImage from 'react-native-fast-image';

import { scale, verticalScale } from 'react-native-size-matters';


const DanceTypeDetails = ({ navigation, route }) => {


  const paymentStatus = useSelector(
    state => state.appData.paymentSuccessStatus,
  );

  const { id, item, workshop } = route.params;
  const [VideoId, setVideoId] = useState(null);

  const [YouTubeList, setYouTubeList] = useState([
    {
      id: 1,
      name: item?.videoSeasion1?.title || 'Not found',
      videoLink: item?.videoSeasion1?.video,
    },
    {
      id: 2,
      name: item?.videoSeasion2?.title || 'Not found',
      videoLink: item?.videoSeasion2?.video,
    },
    {
      id: 2,
      name: item?.videoSeasion3?.title || 'Not found',
      videoLink: item?.videoSeasion3?.video,
    },
  ]);

  const GetVideos = () => {
    const videos = [];
    for (const key in item) {
      if (key.includes('videoSeasion')) {
        videos.push(item[key]);
      }
    }
    setYouTubeList(videos);
    //console.log('Videos -> ', JSON.stringify(videos, null, 2));
  };

  useEffect(() => {
    GetVideos();
    //console.log("ALL VIDEO CONTENT: ", item)

  }, []);



  const onSharePress = async () => {
    try {
      const share = await Share.open({
        title: item?.title,
        message: `${API_URL_IMAGE}/uploads/${item?.videoUrl?.video}`,
        subject: item?.titleName,
      });
      if (share.success) {
      }
    } catch (e) {
      console.log('Error Share -> ', e);
    }
  };


  const video = {
    uri: VideoId
      ? `${API_URL_IMAGE}/uploads/${VideoId}`
      : `${API_URL_IMAGE}/uploads/${item?.videoUrl?.video}`,
  }
  const videoPlayer = useRef(null);

  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [isLoading, setIsLoading] = useState(true);

  let potHt;
  let potWd;
  let landHt;
  let landWd;

  const onSeek = (seek) => {
    videoPlayer?.current.seek(seek);
  };

  const onSeeking = (currentVideoTime) => setCurrentTime(currentVideoTime);

  const onPaused = (newState) => {
    setPaused(!paused);
    setPlayerState(newState);
  };

  const onReplay = () => {
    videoPlayer?.current.seek(0);
    setCurrentTime(0);
    if (Platform.OS === 'android') {
      setPlayerState(PLAYER_STATES.PAUSED);
      setPaused(true);
    } else {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPaused(false);
    }
  };

  const onProgress = (data) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  useEffect(() => {
    Orientation.lockToPortrait()
    potHt = Dimensions.get("window").height
    potWd = Dimensions.get("window").width
    landHt = Dimensions.get("window").width
    landWd = Dimensions.get("window").height
    console.log("DIMENSIONS set")
    console.log(YouTubeList)
  }, [])

  const onLoad = (data) => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setCurrentTime(duration);
  };


  const [isFullScreen, setIsFullScreen] = useState(false);

  // This function is triggered when the user press on the fullscreen button or to come back from the fullscreen mode.
  const onFullScreen = () => {
    if (!isFullScreen) {
      Orientation.lockToLandscape();
    } else {
      if (Platform.OS === 'ios') {
        Orientation.lockToPortrait();
      }
      Orientation.lockToPortrait();
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <View style={style.view}>
      <StatusBar hidden={true} />


      <View style={{ height: isFullScreen ? landHt : hp(30), width: isFullScreen ? landWd : potWd }}>
        <Video
          onEnd={onEnd}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          posterResizeMode={'cover'}
          onProgress={onProgress}
          paused={paused}
          ref={(ref) => (videoPlayer.current = ref)}
          resizeMode={'cover'}
          source={video}
          style={style.backgroundVideo}
        />
        <MediaControls
          isFullScreen={isFullScreen}
          duration={duration}
          isLoading={isLoading}
          progress={currentTime}
          onFullScreen={onFullScreen}
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          mainColor={'#1E293B70'}
          playerState={playerState}
          style={style.backgroundVideo}
          sliderStyle={isFullScreen ? { containerStyle: style.mediaControls, thumbStyle: {}, trackStyle: {} } : { containerStyle: {}, thumbStyle: {}, trackStyle: {} }}
        >
          {!isLoading ? <TouchableOpacity onPress={() => videoPlayer.current.seek(currentTime > 10 ? currentTime - 10 : 0)} style={{ position: "absolute", top: "60%", left: "15%" }}>
            <Image resizeMode='contain' style={{ height: hp(18), width: wp(18) }} source={require('../../assets/images/backward.png')} />
          </TouchableOpacity>
            : null}
          {!isLoading ? <TouchableOpacity onPress={() => videoPlayer.current.seek(currentTime + 10)} style={{ position: "absolute", top: "60%", right: "15%" }}>
            <Image resizeMode='contain' style={{ height: hp(18), width: wp(18) }} source={require('../../assets/images/forward.png')} />
          </TouchableOpacity>
            : null}

        </MediaControls>
      </View>



      {!isFullScreen ?
        <View style={{ flex: 1, paddingHorizontal: wp(4) }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={style.mainDanceDetails}>
              <View style={style.daneTeacherDetails}>
                <View>
                  <FastImage
                    style={style.dancerImage}
                    source={
                      !item?.titleImage ? { uri: item?.titleImage } : Logo
                    }
                  />
                </View>
                <View style={style.mainDancerView}>
                  <Text style={style.dacerText}>{item?.title}</Text>
                </View>
              </View>
              {workshop && (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={onSharePress}>
                    <FastImage
                      style={[style.downloadImage, { marginRight: wp(2) }]}
                      source={require('../../assets/images/share.png')}
                    />
                  </TouchableOpacity>
                  {/* <TouchableOpacity onPress={DownloadBtn}>
                    <FastImage
                      style={style.downloadImage}
                      source={require('../../assets/images/download.png')}
                    />
                  </TouchableOpacity> */}
                </View>
              )}
            </View>

            <View style={style.line}>
              <View style={style.lineHR} />
            </View>

            {workshop ? (
              <View style={style.maintextRow}>
                <View>
                  <Text style={style.danceDuration}>Instructor</Text>
                  <Text style={style.danceType}>{item?.titleName}</Text>
                </View>
                <View>
                  <Text style={style.danceDuration}>Style</Text>
                  <Text style={style.danceType}>{item?.categoryName}</Text>
                </View>
                <View>
                  <Text style={style.danceDuration}>Time</Text>
                  <Text style={style.danceType}>{item?.timeDate}</Text>
                </View>
              </View>
            ) : null}

            <View style={style.line}>
              <View style={style.lineHR} />
            </View>

            <View style={style.aboutSection}>
              <Text style={style.aboutHeader}>Description</Text>
              <Text style={style.aboutText}>{item?.about}</Text>
            </View>
            {workshop && YouTubeList?.length > 0
              ? YouTubeList.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    paymentStatus !== null && setVideoId(item?.video)
                    paymentStatus == null && Alert.alert("Alert","Take classes to continue")

                  }
                  }
                  style={style.mainLearnVideo}
                  key={index}>
                  <View style={style.videoText}>
                    <FastImage
                      style={style.dancerImage}
                      source={require('../../assets/images/introVideo.png')}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={style.videoText2}>{item?.title?.endsWith(".mp4") ? item?.title?.slice(0, -4) : item?.title}</Text>
                    </View>
                    {/* <Text style={style.videoQuantty}>20 video</Text> */}
                  </View>
                </TouchableOpacity>
              ))
              : null}


          </ScrollView>
          {paymentStatus == null && workshop ? (
            <TouchableOpacity onPress={() => {
              Alert.alert("Payment", "Proceed to pay Rs.500?");
            }} style={{ marginVertical: hp(1.5), height: hp(5.5) }}>
              <LinearGradient
                colors={['#2885E5', '#9968EE']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{ borderWidth: 1, borderStyle: 'solid', borderRadius: 5, height: "100%", justifyContent: 'center' }}>
                <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: 14, fontWeight: '500' }}>
                  Take Classes
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : null}
        </View> : null}





    </View>

  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: '3%',
  },
  headerLogo: {
    overflow: 'hidden',
    borderRadius: 100,
  },
  instructorlogo: {
    height: 70,
    width: 70,
  },
  headerTitleContainer: { flex: 2, paddingTop: '5%', paddingLeft: '5%' },
  headerTitle: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    color: '#FFFFFF',
  },
  headerDescription: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 12,
    color: '#FFFFFF',
  },
  line: { flexDirection: 'row' },
  lineHR: {
    backgroundColor: '#334155',
    height: 2,
    flex: 1,
    alignSelf: 'center',
  },
  aboutSection: {
    flex: 1,
    paddingTop: scale(15),
    paddingBottom: scale(20),
  },
  aboutHeader: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  videoListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  takeClassesContainer: {
    width: '100%',
    padding: scale(10),
    justifyContent: 'flex-end',
  },
  takeClassesGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    width: "95%",
    alignSelf: "center"
  },
  buttonTakeClasses: {
    textAlign: 'center',
    borderRadius: 5,
  },
  takeClassesIcon: {
    padding: '2%',
    alignSelf: 'center',
    fontStyle: 'normal',
  },
  takeClassesButtonText: {

    padding: '3%',
    alignSelf: 'center',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    borderRadius: 5,
  },
  mainDanceDetails: {
    //displayName: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  daneTeacherDetails: {
    //displayName: 'flex',
    flexDirection: 'row',
    paddingTop: scale(10),
    paddingBottom: scale(10),
  },
  dancerImage: {
    width: scale(50),
    height: scale(50),
  },
  mainDancerView: {
    paddingLeft: scale(10),
    marginTop: verticalScale(4)
  },
  dacerText: {
    color: '#FFFFFF',
    fontSize: scale(12),
    lineHeight: scale(16),
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'Raleway',
    width: scale(180),
  },
  dancerName: {
    color: '#FFFFFF',
    fontSize: scale(10),
    marginTop: scale(5),
  },
  downloadImage: {
    width: scale(25),
    height: scale(25),
    marginTop: scale(12),
  },
  maintextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: scale(12),
    paddingBottom: scale(12),
  },
  danceDuration: {
    color: '#BABFC8',
    fontSize: scale(10),
    fontWeight: '400',
    lineHeight: scale(12),
    fontStyle: 'normal',
    fontFamily: 'Inter',
    textTransform: 'uppercase',
  },
  danceType: {
    color: '#FFFFFF',
    fontSize: scale(10),
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: 'Inter',
    textTransform: 'capitalize',
    lineHeight: scale(12),
    paddingTop: scale(5),
  },
  aboutText: {
    color: '#BABFC8',
    fontSize: scale(14),
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'Raleway',
    lineHeight: scale(18),
  },
  mainLearnVideo: {
    backgroundColor: '#1E293B',
    width: '100%',
    padding: scale(8),
    borderRadius: scale(5),
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  videoText: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  videoText2: {
    color: '#FFFFFF',
    paddingLeft: scale(10),
    fontSize: scale(14),
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: 'Raleway',
    lineHeight: scale(16),
    marginTop: scale(12),
  },
  videoQuantty: {
    color: '#FFFFFF',
    fontSize: scale(10),
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: 'Raleway',
  },
  backgroundVideo: {
    height: "100%",
    width: '100%',
  },
  mediaControls: {
    width: "90%",
    height: '90%',
    alignSelf: "center",
  }
});

export default DanceTypeDetails;