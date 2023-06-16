import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { API_URL, API_URL_IMAGE } from '../../services/api_url';
import FastImage from 'react-native-fast-image';

export const ClasseDetails = ({ navigation, route }) => {
  const { id } = route.params;

  const [classDetails, setClassDetails] = useState({});

  const getClassDetailsAPI = async () => {
    try {
      const response = await fetch(`${API_URL}/getAllStudios`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          id: id,
        }),
      });
      const responseJson = await response.json();
      setClassDetails(responseJson.studios);
      // console.log(responseJson)
    } catch (e) {
      console.log('getClassDetailsAPI -> ', e);
    }
  };

  useEffect(() => {
    getClassDetailsAPI();
  }, []);

  return (
    <ScrollView style={style.view}>
      <View style={style.imageContainer}>
        <FastImage
          style={style.image}
          source={{ uri: `${API_URL_IMAGE}/${classDetails?.images}` }}
        />
      </View>
      <Text style={style.className}>{classDetails?.studioName}</Text>
      <Text style={style.classRating}>
        4.5
        <AirbnbRating
          count={5}
          defaultRating={4.5}
          size={12}
          ratingContainerStyle={{ paddingHorizontal: 5 }}
        />
      </Text>
      <Text style={style.classAddress}>{classDetails?.address}</Text>
      <Text style={style.classType}>
        {classDetails?.city} | {classDetails?.state}
      </Text>
      <Text style={style.className}>About</Text>
      <Text style={style.aboutText}>{classDetails?.description}</Text>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    flex: 1,
    padding: '3%',
  },

  imageContainer: {
    height: Dimensions.get('window').height * 0.2,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    backgroundColor: '#000000',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  className: {
    paddingVertical: 8,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 28,
    color: '#FFFFFF',
  },
  classRating: {
    paddingVertical: 8,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#FBFBFB',
  },
  classAddress: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: '#BABFC8',
  },
  classType: {
    paddingVertical: 5,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    color: '#FFFFFF',
  },
  aboutText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: '#BABFC8',
  },
});
