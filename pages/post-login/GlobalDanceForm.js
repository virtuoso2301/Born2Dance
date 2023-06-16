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
import FastImage from 'react-native-fast-image';

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
          //SelectedState: response?.states?.[0],
        }));
        //GetDanceByStateId({ id: response?.states?.[0]?._id });
        //console.log(response?.states)
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
        // console.log("DANCE TYPESS START")
        // const ad= await response?.dances?.filter(item=>item.city=="Andhra Pradesh")
        // for(let i=0;i<ad.length;i++){
        //   console.log(ad[i].className)

        // }
        // console.log("DANCE TYPESS END")
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
      <View style={{ flex: 1, flexDirection: 'row'}}>
        <FlatList
          style={{ width: wp(30),backgroundColor:"#00000099" }}
          data={State.States}
          renderItem={({ item, index }) => (
            <View style={styles.imageContainerDance}>
              <TouchableOpacity style={{backgroundColor:"#00000099"}} onPress={() => onStatePress(item)}>
                <FastImage
                  style={{
                    alignSelf: 'center',
                    width: wp(20),
                    height: wp(20),
                    borderRadius: wp(20),
                    opacity: State.SelectedState?._id == item?._id ? 1 : 0.7,
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
                <FastImage
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
    marginBottom: Platform.select({ ios: hp(1), android: hp(1) }), // Prevent a random Android rendering issue
    backgroundColor: '#0E172A',
    borderRadius: 8,
    justifyContent: 'flex-end',
    marginRight: wp(5),
    marginTop:hp(1.5),
    backgroundColor:"#00000099"
  },
});


