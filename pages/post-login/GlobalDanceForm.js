import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BDLoader, hp, wp } from '../../Constants';
import { API_URL, API_URL_IMAGE } from '../../services/api_url';

const GlobalDanceForm = ({ navigation, route }) => {
  const { id, item } = route.params.params;

  const [State, setState] = useState({
    States: [],
    SelectedState: {},
    IsLoading: false,
    StateDances: [],
  });

  useEffect(() => {
    GetAllIndiaStates();
  }, []);

  const GetAllIndiaStates = async () => {
    setState(p => ({ ...p, IsLoading: true }));
    try {
      const jsonObj = await fetch(`${API_URL}/getAllState`, {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      });
      const response = await jsonObj.json();
      setState(p => ({ ...p, IsLoading: false }));

      if (response?.states?.length > 0) {
        setState(p => ({
          ...p,
          States: response?.states.filter(item => item.countryId._id == id),
          SelectedState: response?.states?.[0],
        }));
        GetDanceByStateId({ id: response?.states?.[0]?._id });
      }
    } catch (e) {
      setState(p => ({ ...p, IsLoading: false }));
      console.log('Error GetAllIndiaStates -> ', e);
    }
  };

  const GetDanceByStateId = async ({ id }) => {
    setState(p => ({ ...p, IsLoading: true }));
    try {
      const jsonObj = await fetch(`${API_URL}/getDanceClassList`, {
        method: 'POST',
        body: JSON.stringify({
          stateId: id,
        }),
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      });
      const response = await jsonObj.json();
      setState(p => ({ ...p, IsLoading: false }));

      if (response?.dances?.length > 0) {
        setState(p => ({
          ...p,
          StateDances: response?.dances,
        }));
      }else{
        setState(p => ({
          ...p,
          StateDances: [],
        }));
      }
    } catch (e) {
      setState(p => ({ ...p, IsLoading: false }));
      console.log('Error GetDanceByStateId -> ', e);
    }
  };

  const onStatePress = item => {
    GetDanceByStateId({ id: item._id })
    setState(p => ({ ...p, SelectedState: item }));
  };

  return (
    <View style={styles.Container}>
      <BDLoader visible={State.IsLoading} />
      <View style={{ flex: 1, flexDirection: 'row', marginTop: hp(2) }}>
        <FlatList
          style={{ width: wp(30) }}
          data={State.States}
          renderItem={({ item, index }) => (
            <View style={styles.imageContainerDance}>
              <TouchableOpacity onPress={() => onStatePress(item)}>
                <Image
                  style={{
                    alignSelf: 'center',
                    width: wp(20),
                    height: wp(20),
                    borderRadius: wp(20),
                    opacity: State.SelectedState?._id == item?._id ? 1 : 0.4,
                  }}
                  resizeMode={'cover'}
                  source={{ uri: `${API_URL_IMAGE}/${item?.profileImage}` }}
                />
                <Text
                  style={{
                    color:
                      State.SelectedState?._id == item?._id
                        ? '#FFF'
                        : '#BABFC8CC',
                    textAlign: 'center',
                    marginTop: '5%',
                    fontSize: 14,
                    fontWeight: '400',
                  }}>
                  {item?.stateName}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <FlatList
          style={{ width: wp(70) }}
          data={State.States.length > 0 ? State.StateDances : []}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.imageContainerDance}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Dance Class', {
                  params: { id: item?._id, item: item },
                })}>
                <Image
                  style={{
                    alignSelf: 'center',
                    width: wp(30),
                    height: wp(40),
                    borderRadius: wp(2),
                  }}
                  resizeMode={'cover'}
                  source={{ uri: `${API_URL_IMAGE}/${item?.banner}` }}
                />
                <Text
                  style={{
                    color: '#BABFC8',
                    textAlign: 'center',
                    marginTop: '5%',
                    fontSize: 14,
                    fontWeight: '400',
                  }}>
                  {item?.className}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default GlobalDanceForm;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#0E172A',
  },
  imageContainerDance: {
    marginBottom: Platform.select({ ios: hp(2), android: hp(2) }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    backgroundColor: '#0E172A',
    borderRadius: 8,
    justifyContent: 'flex-end',
    marginRight: wp(5),
  },
});

const CountryData = [
  {
    img: 'https://cdn.pixabay.com/photo/2016/08/24/17/07/india-1617463_960_720.png',
    name: 'India',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2017/01/07/16/55/usa-1960922_960_720.jpg',
    name: 'America',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2013/07/13/14/14/australia-162232_960_720.png',
    name: 'Australia',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2013/07/13/14/15/germany-162301_960_720.png',
    name: 'Germany',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2013/07/13/14/15/france-162295_960_720.png',
    name: 'France',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2015/11/12/16/03/flag-1040555_960_720.png',
    name: 'China',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2020/12/05/06/57/flag-5805251_960_720.png',
    name: 'Afghanistan',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2021/11/15/09/57/united-arab-emirates-6797567_960_720.png',
    name: 'Dubai',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2012/04/10/22/59/pakistan-26804_960_720.png',
    name: 'Pakistan',
  },
];

const IndianStates = [
  {
    name: 'Andhra Pradesh',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },

  {
    name: 'Assam',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Bihar',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Chhattisgarh',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Goa',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Gujarat',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Haryana',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Himachal Pradesh',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Jharkhand',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Karnataka',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Kerala',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Madhya Pradesh',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Maharashtra',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Manipur',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Meghalaya',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Mizoram',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Nagaland',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Odisha',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Punjab',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Rajasthan',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Sikkim',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Tamil Nadu',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Telangana',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Tripura',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Uttar Pradesh',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'Uttarakhand',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
  {
    name: 'West Bengal',
    image:
      'https://as2.ftcdn.net/v2/jpg/03/99/80/33/1000_F_399803330_dtsI4eWMr6S8j1Bht8prCWdXliyd1hmV.jpg',
  },
];
