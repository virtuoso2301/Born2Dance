import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import {StyleSheet} from "react-native";
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const PlayerVideo = () => {
  return (
    <View style={styles.mainBackground}>
    <Video 
    style={{ ...styles.video ,
    flex : 1,
    left : -screenWidth/2 ,
    width : screenHeight, }}
    controls={true}
    source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
    />
    </View>
  )
}

const styles = StyleSheet.create({
    mainBackground: {
      flex: 1,
        backgroundColor: '#1E293B',
    },
    video: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    
    },
})
