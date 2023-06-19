import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { API_URL_IMAGE } from '../../services/api_url';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const MyCarousel = () => {
  const getDanceCategory = useSelector(state => state.appData.danceCategory);
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('dance-type-details', {
            id: item?._id,
            item,
            workshop: true,
          })
        }
        style={styles.item}>
        <ParallaxImage
          source={{ uri: `${API_URL_IMAGE}/${item.image}` }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.3}
          {...parallaxProps}
        />
        {/* <Text style={styles.Headertitle} numberOfLines={2}>
          {item?.categoryName}
        </Text> */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goForward}></TouchableOpacity>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 225}
        itemHeight={screenWidth - 220}
        data={getDanceCategory?.categorys.slice(0, 5)}
        renderItem={renderItem}
        hasParallaxImages={true}
        autoplay={true}
        layout={'default'}
        onSnapToItem={index => setIndex(index)}
      />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height:"100%"
  },
  item: {
    width: screenWidth - 240,
    height: screenWidth - 210,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    // backgroundColor: 'white',
    borderRadius: 12,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  Headertitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
alignSelf:"center",
    position: 'absolute',
    top: '88%',
    marginLeft: '32%',
  },
});
