import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { hp, wp } from '../../Constants'
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import SoundPlayer from 'react-native-sound-player'
import { API_URL_IMAGE } from '../../services/api_url';

const AllSongs = ({ navigation, route }) => {

  const songDetails = route.params.songDetails
  const songItem = route.params.songItem

  const [selectedSong, setSelectedSong] = useState(songItem?songItem._id:"")

   let _onFinishedPlayingSubscription = null
    let _onFinishedLoadingSubscription = null
    let _onFinishedLoadingFileSubscription = null
    let _onFinishedLoadingURLSubscription = null
  

  useEffect(()=>{
    SoundPlayer.setSpeaker(true)

    _onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
      console.log('finished playing', success)
    })
    _onFinishedLoadingSubscription = SoundPlayer.addEventListener('FinishedLoading', ({ success }) => {
      console.log('finished loading', success)
    })
    _onFinishedLoadingFileSubscription = SoundPlayer.addEventListener('FinishedLoadingFile', ({ success, name, type }) => {
      console.log('finished loading file', success, name, type)
    })
    _onFinishedLoadingURLSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', ({ success, url }) => {
      console.log('finished loading url', success, url)
    })

    if(songItem){
      SoundPlayer.playUrl(`${API_URL_IMAGE +"/"+ songItem.songlink}`.replace(/ /g, '%20'))
    }

    return(()=>{
      _onFinishedPlayingSubscription.remove()
      _onFinishedLoadingSubscription.remove()
      _onFinishedLoadingURLSubscription.remove()
      _onFinishedLoadingFileSubscription.remove()
      SoundPlayer.stop()
    }
    )


  },[])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={style.headerContainer}
        onPress={() => {
          setSelectedSong(item._id)
          console.log(item)
          SoundPlayer.playUrl(`${API_URL_IMAGE +"/"+ item.songlink}`.replace(/ /g, '%20'))
        }}
      >

        <ImageBackground
          imageStyle={{ borderRadius: 10 }}
          style={style.instructorlogo1}
          source={require("../../assets/images/music.jpeg")}
        >
          {item._id == selectedSong ? <FastImage
            style={[style.instructorlogo1, { opacity: 0.3 }]}
            source={require("../../assets/images/sound1.gif")}
          /> : null}
        </ImageBackground>

        <View style={style.headerTitleContainer}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center' }}>
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
    )
  }
  return (
    <View style={{ backgroundColor: "#0E172A", flex: 1 }}>
      <FlatList
        data={songDetails}
        renderItem={renderItem}
        style={{ marginVertical: hp(2.5), marginHorizontal: wp(3) }}
      />
      <TouchableOpacity
        style={style.buttonTakeClasses}
        onPress={() => navigation.navigate("song-purchase-form")}>
        <LinearGradient
          style={style.takeClassesGradient}
          colors={['#2885E5', '#844AE9']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}>
          <Text style={{ alignSelf: 'center', color: "#ffffff", fontWeight: "500" }}>
            Purchase a Song
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

export default AllSongs

const style = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: '3%',
    borderColor: '#ffffff70',
    //borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: '5%',
    backgroundColor:"#ffffff09"
  },
  headerLogo: {
    overflow: 'hidden',
    borderRadius: 100,
  },
  instructorlogo1: {
    height: hp(13.5),
    width: 110,
    borderRadius: 10,
    marginLeft: 2,
    alignSelf: "center"
  },
  headerTitleContainer: { flex: 2, paddingTop: '5%', paddingLeft: '5%' },
  headerTitle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: wp(1),
  },
  headerDescription: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: '#BABFC8',
    paddingTop: wp(1),
  },
  takeClassesGradient: {
    borderRadius: 5,
    justifyContent: 'center',
    width: "100%",
    height: "100%",
  },
  buttonTakeClasses: {
    textAlign: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: "4%",
    right: "4%",
    height: hp(5),
    width: wp(40),
    justifyContent: "center"
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
})