import React,{useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import searchIcon from '../../assets/images/search.png';
import { moderateScale, scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { API_URL_IMAGE } from '../../services/api_url';
import { hp, wp } from '../../Constants';
import FastImage from 'react-native-fast-image'


export const AllCity = ({ navigation }) => {
  const cityLists = useSelector(state => state.appData.cityList);

  // console.log('cityLists -> ', JSON.stringify(cityLists, null, 2));

  const data = cityLists.states.map(
    ({ stateName: label, stateName: value, ...rest }) => ({
      value,
      label,
      ...rest,
    }),
  );
  const [searchText, setSearchText] = useState('');

  return (
    <View style={style.view}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
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
            height:45
          }}
          placeholder="Search for states"
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
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
          </View>
        {/* <Image source={searchIcon} style={style.searchIcon} /> */}
        <Text style={style.pageHeader}> Popular states</Text>
        <View style={style.renderContainer}>
          {cityLists?.states?.length > 0 &&
            cityLists?.states?.filter((item)=>item?.countryId?.name=="India" && item?.stateName.includes(searchText)).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={style.renderCities}
                onPress={() =>
                  // navigation.navigate('classes-list', { state: item.stateName })
                  navigation.navigate('city', { id: item._id, stateName:item?.stateName  })
                }>
                <FastImage
                  style={{
                    alignSelf: 'center',
                    width: wp(42.5),
                    height: wp(42.5),
                    borderRadius:7
                  }}
                  source={{ uri: `${API_URL_IMAGE}/${item.profileImage}` }}
                />
                <Text style={style.renderCityText}>{item?.stateName}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    flex: 1,
    paddingHorizontal: wp(3),
  },
  pageHeader: {
    paddingTop: '2%',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 23,
    color: '#FFFFFF',
    marginBottom: '5%',
  },
  input: {
    backgroundColor: '#1D283A',
    borderRadius: 5,
    padding: '2%',
    paddingLeft: moderateScale(36),
    color: '#FFFFFF',
    fontSize: scale(12),
    lineHeight: 14,
    width: '100%',
    textTransform: 'capitalize',
    marginVertical: '5%',
    marginLeft: 5,
  },
  searchIcon: {
    width: scale(18),
    height: scale(18),
    // position: 'absolute',
    // top: scale(-46),
    // left: scale(12),
  },
  renderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  renderCities: {
    width: '50%',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  renderCityText: {
    color: '#fff',
    textAlign: 'center',
    fontSize:15,
    marginTop:hp(1.5),
    marginBottom:hp(1.25)
  },
});
