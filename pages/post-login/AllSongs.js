import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { hp, wp } from '../../Constants'
import FastImage from 'react-native-fast-image';

const AllSongs = ({ navigation, route }) => {

  const songDetails = route.params.songDetails
  const selected = route.params.selected
  
  const [selectedSong,setSelectedSong]=useState(selected?selected:"")

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={style.headerContainer}
        onPress={() => {
          setSelectedSong(item._id)
          console.log(item)
        }}
      >
        <View style={style.headerLogo}>
          <ImageBackground
            style={style.instructorlogo}
            source={require("../../assets/images/music.jpeg")}
            //source={{uri:`${API_URL_IMAGE}/${item.image}`}}
          >
            {item._id==selectedSong?<FastImage
              style={[style.instructorlogo,{opacity:0.3}]}
              source={require("../../assets/images/sound1.gif")}
            />:null}
          </ImageBackground>
        </View>
        <View style={style.headerTitleContainer}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={style.headerTitle}>{item.songName}</Text>
          </View>
          <Text style={style.headerDescription}>
            {item.artist}
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
    </View>
  )
}

export default AllSongs

const style = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: '2%',
    borderColor: '#956DFF70',
    borderWidth: 1.5,
    borderRadius: 5,
    marginBottom: '5%',
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
})