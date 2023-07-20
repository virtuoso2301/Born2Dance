import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { hp, wp } from '../../Constants'
import FastImage from 'react-native-fast-image';

const AllSongs = ({navigation}) => {

    const songDetails=[
        {
          name: "Song 1",
          artist: "Lewis Capaldi"
          },
          
          {
          name: "Song 2",
          artist: "Adele"
          },
          
          {
          name: "Song 3",
          artist: "Ed Sheeran"
          },
          
          {
          name: "Song 4",
          artist: "Taylor Swift"
          }
          ,
          {
          name: "Song 5",
          artist: "Billie Eilish"
          }
          ,
          {
          name: "Song 6",
          artist: "Post Malone"
          }
          ,
          {
          name: "Song 7",
          artist: "Beyoncé"
          }
          ,
          {
          name: "Song 8",
          artist: "Bruno Mars"
          }
      ]
      const renderItem = ({ item }) => {
        return (
          <View
            style={style.headerContainer}
            onTouchEnd={() => navigation.navigate("music-details",{musicItem:item})}
          >
            <View style={style.headerLogo}>
              <FastImage
                style={style.instructorlogo}
                source={require("../../assets/images/music.jpeg")}
              />
            </View>
            <View style={style.headerTitleContainer}>
              <View
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={style.headerTitle}>{item.name}</Text>
              </View>
              <Text style={style.headerDescription}>
                {item.artist}
              </Text>
            </View>
            <View style={style.arrow}>
              <FastImage source={require('../../assets/images/arrow.png')} />
            </View>
          </View>
        )
      }
  return (
    <View style={{backgroundColor:"#0E172A", flex:1}}>
      <FlatList
        data={songDetails}
        renderItem={renderItem}
        style={{marginVertical:hp(2.5),marginHorizontal:wp(3)}}
      />
    </View>
  )
}

export default AllSongs

const style = StyleSheet.create({
      view: {
        backgroundColor: '#0E172A',
        flex: 1,
        paddingHorizontal: '3%',
      },
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
      arrow: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
      },
      TabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(1),
      },
      renderTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(1.2),
        borderBottomWidth: wp(0.5),
        marginHorizontal: wp(2),
      },
})