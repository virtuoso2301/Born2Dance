import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { hp, wp } from '../../Constants'
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const AllSongs = ({ navigation, route }) => {

  const songDetails = route.params.songDetails

  const [selectedSong, setSelectedSong] = useState("")

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={style.headerContainer}
        onPress={() => {
          setSelectedSong(item._id)
          console.log(item)
        }}
      >

        <ImageBackground
          imageStyle={{ borderRadius: 10 }}
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
    padding: '2%',
    borderRadius: 5,
    width: wp(82),
    height: hp(16.5),
    marginHorizontal: 5,
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