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
    SelectedState: [],
    IsLoading: false,
    StateDances: [],
  });

  useEffect(() => {
    GetAllIndiaStates();
  }, []);

  useEffect(() => {
    console.log("SELECTED STATE: ", State.SelectedState)
  }, [State.SelectedState])


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
      } else {
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
    setState(p => ({ ...p, SelectedState: [item] }));
  };

  return (
    <View style={styles.Container}>
      <BDLoader visible={State.IsLoading} />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <FlatList
          style={{ width: wp(3), backgroundColor: "#00000099", paddingVertical: hp(1.5), paddingHorizontal: 5 }}
          contentContainerStyle={{ alignItems: "center" }}
          data={State.States}
          renderItem={({ item, index }) => (
            <View style={{ width: "100%", backgroundColor: "#00000000", flexDirection: "row" }}>
              <View style={{ height: wp(15), width: 7, borderRadius: 10, backgroundColor: State.SelectedState[0]?._id == item?._id ? "#956DFF" : "#00000000", alignSelf: "center", marginBottom: hp(4) }}>
              </View>
              <View>
                <TouchableOpacity style={{ width: wp(30), backgroundColor: "#00000000", marginBottom: hp(1.5) }} onPress={() => onStatePress(item)}>
                  <FastImage
                    style={{
                      alignSelf: 'center',
                      width: wp(18),
                      aspectRatio: 1,
                      borderRadius: wp(18) / 2,
                    }}
                    resizeMode={'cover'}
                    source={{ uri: `${API_URL_IMAGE}/${item?.profileImage}` }}
                  />
                  {State.SelectedState[0]?._id !== item?._id ?
                    <Text
                      style={{
                        color: "#fff",
                        textAlign: 'center',
                        marginTop: '5%',
                        fontSize: 10.5,
                        fontWeight: '400',
                      }}>
                      {item?.stateName}
                    </Text>
                    :
                    <Text
                      style={{
                        color: "#fff",
                        textAlign: 'center',
                        marginTop: '5%',
                        fontSize: 10.5,
                        fontWeight: '400',
                      }}>
                      {item?.stateName}
                    </Text>
                  }
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <View style={{ width: wp(70), paddingVertical: hp(1.5), paddingHorizontal: wp(1.5), backgroundColor: "#ffffff10" }}>
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16, alignSelf: "center", marginVertical: hp(1) }}>{State?.SelectedState[0]?.stateName}</Text>
          {State?.SelectedState?.length > 0 ?
            <FlatList
              data={State?.StateDances}
              numColumns={2}
              style={{ paddingLeft: wp(1.5) }}
              contentContainerStyle={{ justifyContent: "flex-start" }}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Dance Class', {
                      params: { id: item?._id, item: item },
                    })}>
                    <FastImage
                      style={{
                        alignSelf: 'center',
                        width: wp(30),
                        height: wp(35),
                        borderRadius: wp(2),
                        marginHorizontal: wp(1.5),
                        marginVertical: hp(1.5)
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
            :
            <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "#ffffff", fontWeight: "500" }}>Please select a state!</Text>
            </View>
          }
        </View>
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
});


