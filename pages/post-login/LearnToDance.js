import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  moderateScale,
  scale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import searchIcon from '../../assets/images/search.png';
import { API_URL_IMAGE } from '../../services/api_url';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

export const LearnToDance = ({ navigation, route }) => {
  const getDanceCategory = useSelector(state => state.appData.danceCategory);
  const [searchText, setSearchText] = useState('');
  const { workshop } = route.params;

  console.log(
    'getDanceCategory -> ',
    JSON.stringify(getDanceCategory, null, 2),
  );

  const SerachData = () => {
    // console.log(searchText);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0E172A' }}>
      <View
        style={{
          position: 'relative',
        }}>
        <TextInput
          placeholderTextColor="#BABFC8"
          style={{
            backgroundColor: '#1D283A',
            borderRadius: 5,
            padding: '2%',
            paddingLeft: moderateScale(36),
            margin: '2%',
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: scale(12),
            lineHeight: 14,
            width: '95%',
            marginHorizontal: '2.5%',
            textTransform: 'capitalize',
            marginVertical: '5%',
          }}
          placeholder="Search for categories"
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity onPress={SerachData}>
          <FastImage
            source={searchIcon}
            style={{
              width: 20,
              height: 20,
              position: 'absolute',
              bottom: 34,
              left: 20,
            }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        style={style.view}
        data={getDanceCategory?.categorys.filter(item =>
          item.categoryName.toLowerCase().includes(searchText.toLowerCase()),
        )}
        renderItem={({ item }) => (
          <View
            style={style.imageContainerDance}
            onTouchEnd={() => {
              navigation.navigate('dance-type-details', {
                id: item?._id,
                item: item,
                workshop: workshop,
              });
            }}>
            <FastImage
              style={style.imageDance}
              source={{ uri: `${API_URL_IMAGE}/${item?.image}` }}
            />
            <View
              style={{
                position: 'absolute',
                width: 100,
                bottom: 5,
              }}>
              <Text style={style.imageTitleDance}>{item?.categoryName}</Text>
            </View>
          </View>
        )}
        numColumns={2}
      />
      <View
        style={{
          marginLeft: scale(8),
          marginRight: scale(8),
          marginBottom: scale(10),
        }}>
        <TouchableOpacity
          style={style.mainNextstyle}
          onPress={() => {
            navigation.navigate('custom-video');
          }}>
          <LinearGradient
            colors={['#2885E5', '#9968EE']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ borderWidth: 1, borderStyle: 'solid', borderRadius: 5 }}>
            <Text style={{ ...style.loginButtonText, color: '#FFFFFF' }}>
              Custom Video
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    paddingBottom: '7%',
    width: '100%',
    marginHorizontal: '3%',
    display: 'flex',
  },
  imageContainerDance: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 10 }), // Prevent a random Android rendering issue
    borderRadius: 8,
    alignSelf: 'center',
    height: scale(155),
    width: 100,
    marginVertical: '3%',
    position: 'relative',
  },
  imageDance: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: 1,
    backgroundColor: '#000000',
    width: scale(155),
  },
  imageTitleDance: {
    flex: 1,
    padding: '2%',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: scale(12),
    lineHeight: 14,
    width: '100%',
    textAlign: 'center',
    textTransform: 'capitalize',
    position: 'relative',
    left: scale(20),
  },
  loginButtonText: {
    padding: '3%',
    textAlign: 'center',
  },
});
