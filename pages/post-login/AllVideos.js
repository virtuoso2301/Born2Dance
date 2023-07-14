import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { hp, wp } from '../../Constants'
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

const AllVideos = () => {

    const videoDetails=[
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
      const renderItem = ({ item }) => {
        return (
          <View
            style={style.headerContainer}
            onTouchEnd={() => Alert.alert("Alert","Waiting for API")}
          >
            <View style={style.headerLogo}>
              <FastImage
                style={style.instructorlogo}
                source={require("../../assets/images/b2ddance.jpeg")}
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
        data={videoDetails}
        renderItem={renderItem}
        style={{marginVertical:hp(2.5),marginHorizontal:wp(3)}}
      />
      <TouchableOpacity
        style={style.buttonTakeClasses}
        onPress={() => Alert.alert("Alert","Waiting for API")}>
        <LinearGradient
          style={style.takeClassesGradient}
          colors={['#2885E5', '#844AE9']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}>
          <Text style={{ alignSelf:'center',color:"#ffffff",fontWeight:"500"}}>
            Purchase a Video
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

export default AllVideos

const style = StyleSheet.create({
    takeClassesGradient: {
        borderRadius: 5,
        justifyContent: 'center',
        width:"100%",
        height:"100%",
      },
      buttonTakeClasses: {
        textAlign: 'center',
        borderRadius: 5,
        position: 'absolute',
        bottom: "4%",
        right: "4%",
        height:hp(5),
        width:wp(40),
        justifyContent:"center"
    },
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