import React, { useEffect, useState, useRef } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback

} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { scale } from 'react-native-size-matters';
import VideoPlayer from 'react-native-video-player';
import VideoControl from 'react-native-video-controls';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useSelector } from 'react-redux';
import { hp, wp } from '../../Constants';
import { API_URL_IMAGE } from '../../services/api_url';
import Logo from '../../assets/images/logo.png';
import Share from 'react-native-share';
import Orientation from 'react-native-orientation-locker';

export const DanceTypeDetails = ({ navigation, route }) => {
  const paymentStatus = useSelector(
    state => state.appData.paymentSuccessStatus,
  );
  const { id, item, workshop } = route.params;
  const [VideoId, setVideoId] = useState(null);
  const [State, setState] = useState({
    fullScreen: false,
    Width_Layout: '',
    Height_Layout: '',
    potraitMode: true,
  });
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


  const videoref = useRef()
  // console.log(videoref.current,'shadaabali')
  const GetVideos = () => {
    const videos = [];
    for (const key in item) {
      if (key.includes('videoSeasion')) {
        videos.push(item[key]);
      }
    }
    setYouTubeList(videos);
    console.log('Videos -> ', JSON.stringify(videos, null, 2));
  };

  useEffect(() => {
    Orientation.unlockAllOrientations();
    navigation.setOptions({ tabBarVisible: false });
    GetVideos();

    return () => {

      Orientation.lockToPortrait();
    };
  }, []);

  useEffect(() => {
    detectOrientation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [State.Width_Layout]);

  useEffect(() => {
    const { fullScreen, potraitMode } = State;
    !fullScreen && !potraitMode ? Orientation.lockToPortrait() : '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const detectOrientation = () => {
    console.log(State)
    if (State.Width_Layout > State.Height_Layout) {
      setState(p => ({ ...p, fullScreen: true, potraitMode: false }));
      StatusBar.setHidden(true);
    } else {
      setState(p => ({ ...p, fullScreen: false, potraitMode: true }));
      StatusBar.setHidden(false);
    }
  };

  const DownloadBtn = () => {
    ToastAndroid.showWithGravity(
      'Comming soon',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

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

  const handleExitFullScreen = (e) => {
    e.preventDefault()
    setState({
      fullScreen: false
    });
  }

  const handleEnterFullscreen = (e) => {
    e.preventDefault()
    setState({
      fullScreen: true
    });
  }

  const hanlepress = () => {
    console.log('ah')
  }
  const videoPlayerView = (e) => {

    const { fullScreen } = State;
    // console.log('shada');
    return (
      <TouchableWithoutFeedback onPress={hanlepress}>

        <VideoPlayer
          // ref={videoref}
          video={{
            uri: VideoId
              ? `${API_URL_IMAGE}/uploads/${VideoId}`
              : `${API_URL_IMAGE}/uploads/${item?.videoUrl?.video}`,
          }}
          showDuration={true}
          // autoplay={true}      
          // navigator={navigation}
          // resizeMode="contain"
          // toggleResizeModeOnFullscreen={true}
          // disableControlsAutoHide={true}
          // pauseOnPress={true}
          onEnterFullscreen={handleEnterFullscreen}
          onExitFullscreen={handleExitFullScreen}

        />
      </TouchableWithoutFeedback>

    )

  };


  const CONTENT = () => {
    return (
      <View style={{ paddingBottom: paymentStatus == null ? hp(10) : 0 }}>
        <ScrollView>
          {/* {workshop ? (
            <View
              style={{
                width: '100%',
                height: hp(30),
              }}>
              {videoPlayerView()}
            </View>
          ) : item?.videoUrl ? (
            <YoutubePlayer
              height={220}
              videoId={
                VideoId == null
                  ? item.videoUrl?.split('v=')?.[1]?.substring(0, 11) //item?.videoUrl?.video?.split('_')?.[0]
                  : VideoId?.split('v=')?.[1]?.substring(0, 11)
              }
              play={true}
            />
          ) : null} */}
          <View
            style={{
              width: '100%',
              height: hp(30),
            }}>
            {videoPlayerView()}
          </View>
          <View style={{ paddingHorizontal: wp(4) }}>
            <View style={style.mainDanceDetails}>
              <View style={style.daneTeacherDetails}>
                <View>
                  <Image
                    style={style.dancerImage}
                    source={
                      !item?.titleImage ? { uri: item?.titleImage } : Logo
                    }
                  />
                </View>
                <View style={style.mainDancerView}>
                  <Text style={style.dacerText}>{item?.title}</Text>
                  <Text numberOfLines={2} style={style.dancerName}>
                    {item?.titleName}
                  </Text>
                </View>
              </View>
              {workshop && (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={onSharePress}>
                    <Image
                      style={[style.downloadImage, { marginRight: wp(2) }]}
                      source={require('../../assets/images/share.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={DownloadBtn}>
                    <Image
                      style={style.downloadImage}
                      source={require('../../assets/images/download.png')}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={style.line}>
              <View style={style.lineHR} />
            </View>

            {workshop ? (
              <View style={style.maintextRow}>
                <View>
                  <Text style={style.danceDuration}>Level</Text>
                  <Text style={style.danceType}>Intermediate</Text>
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
              <Text style={style.aboutHeader}>About Instructor</Text>
              <Text style={style.aboutText}>{item?.about}</Text>
            </View>
            {workshop && YouTubeList?.length > 0
              ? YouTubeList.map((item, index) => (
                <TouchableOpacity
                  onPress={() =>
                    paymentStatus !== null && setVideoId(item?.video)
                  }
                  style={style.mainLearnVideo}
                  key={index}>
                  <View style={style.videoText}>
                    <Image
                      style={style.dancerImage}
                      source={require('../../assets/images/introVideo.png')}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={style.videoText2}>{item?.title}</Text>
                      <Text style={{ paddingLeft: scale(10) }}>
                        {item?.author}
                      </Text>
                    </View>
                    <Text style={style.videoQuantty}>1 video</Text>
                  </View>
                </TouchableOpacity>
              ))
              : null}
          </View>
        </ScrollView>

        <View style={style.takeClassesContainer}>
          {paymentStatus == null && workshop ? (
            <TouchableOpacity
              style={style.buttonTakeClasses}
              onPress={() => {
                navigation.navigate('premium-screen', {
                  item: item,
                });
              }}>
              <LinearGradient
                style={style.takeClassesGradient}
                colors={['#2885E5', '#844AE9']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}>
                <Image
                  style={style.takeClassesIcon}
                  source={require('../../assets/images/lock.png')}
                />
                <Text
                  style={{
                    ...style.takeClassesButtonText,
                    color: '#FFFFFF',
                  }}>
                  Take Classes
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View
      onLayout={event => {
        const { layout } = event.nativeEvent;
        setState(p => ({
          ...p,
          Width_Layout: layout.width,
          Height_Layout: layout.height,
        }));
      }}
      style={[style.view]}>
      {State.fullScreen ? videoPlayerView() : CONTENT()}
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
  },
  takeClassesIcon: {
    padding: '2%',
    alignSelf: 'center',
    fontStyle: 'normal',
  },
  takeClassesButtonText: {
    positions: 'fixed',
    bottom: 0,
    padding: '3%',
    alignSelf: 'center',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    borderRadius: 5,
  },
  mainDanceDetails: {
    displayName: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  daneTeacherDetails: {
    displayName: 'flex',
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
  },
  dacerText: {
    color: '#FFFFFF',
    fontSize: scale(12),
    lineHeight: scale(16),
    fontWeights: '600',
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
    tintColor: '#ffffffaa',
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
});




const OldCode = () => {
  return (
    <View style={{ paddingBottom: paymentStatus == null ? hp(10) : 0 }}>
      <ScrollView>
        {workshop ? (
          <View
            style={{
              width: '100%',
              height: hp(30),
            }}>
            {videoPlayerView()}
            {/* <VideoPlayer
            video={{
              uri: VideoId
                ? `${API_URL_IMAGE}/uploads/${VideoId}`
                : `${API_URL_IMAGE}/uploads/${item?.videoUrl?.video}`,
            }}
            videoWidth={1600}
            videoHeight={900}
            resizeMode={'contain'}
            showDuration={true}
            fullscreen={fullscreen}
            fullscreenAutorotate={true}
            fullScreenOnLongPress={true}
            fullscreenOrientation={'all'}
            thumbnail={{
              uri: item.videoUrl
                ? `${API_URL_IMAGE}/${item?.videoUrl?.image}`
                : 'https://www.oneclickghana.com/wp-content/plugins/video-thumbnails/default.jpg',
            }}
          /> */}
          </View>
        ) : item?.videoUrl ? (
          <YoutubePlayer
            height={220}
            videoId={
              VideoId == null
                ? item.videoUrl?.split('v=')?.[1]?.substring(0, 11)
                : VideoId?.split('v=')?.[1]?.substring(0, 11)
            }
            play={true}
          />
        ) : null}
        <View style={{ paddingHorizontal: wp(4) }}>
          <View style={style.mainDanceDetails}>
            <View style={style.daneTeacherDetails}>
              <View>
                <Image
                  style={style.dancerImage}
                  source={!item?.titleImage ? { uri: item?.titleImage } : Logo}
                />
              </View>
              <View style={style.mainDancerView}>
                <Text style={style.dacerText}>{item?.title}</Text>
                <Text numberOfLines={2} style={style.dancerName}>
                  {item?.titleName}
                </Text>
              </View>
            </View>
            {workshop && (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={onSharePress}>
                  <Image
                    style={[style.downloadImage, { marginRight: wp(2) }]}
                    source={require('../../assets/images/share.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={DownloadBtn}>
                  <Image
                    style={style.downloadImage}
                    source={require('../../assets/images/download.png')}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={style.line}>
            <View style={style.lineHR} />
          </View>

          {workshop ? (
            <View style={style.maintextRow}>
              <View>
                <Text style={style.danceDuration}>Level</Text>
                <Text style={style.danceType}>Intermediate</Text>
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
            <Text style={style.aboutHeader}>About Instructor</Text>
            <Text style={style.aboutText}>{item?.about}</Text>
          </View>
          {workshop && YouTubeList?.length > 0
            ? YouTubeList.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  paymentStatus !== null ? PlayVideoId(item?.videoLink) : null
                }
                style={style.mainLearnVideo}
                key={index}>
                <View style={style.videoText}>
                  <Image
                    style={style.dancerImage}
                    source={require('../../assets/images/introVideo.png')}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={style.videoText2}>{item?.name}</Text>
                    <Text style={{ paddingLeft: scale(10) }}>
                      {item?.author}
                    </Text>
                  </View>
                  <Text style={style.videoQuantty}>1 video</Text>
                </View>
              </TouchableOpacity>
            ))
            : null}
        </View>
      </ScrollView>

      <View style={style.takeClassesContainer}>
        {paymentStatus == null && workshop ? (
          <TouchableOpacity
            style={style.buttonTakeClasses}
            onPress={() => {
              navigation.navigate('premium-screen', {
                item: item,
              });
            }}>
            <LinearGradient
              style={style.takeClassesGradient}
              colors={['#2885E5', '#844AE9']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}>
              <Image
                style={style.takeClassesIcon}
                source={require('../../assets/images/lock.png')}
              />
              <Text
                style={{
                  ...style.takeClassesButtonText,
                  color: '#FFFFFF',
                }}>
                Take Classes
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
