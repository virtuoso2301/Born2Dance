import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { API_URL_IMAGE, API_URL } from '../../services/api_url';
import searchIcon from '../../assets/images/search.png';
import verified from '../../assets/images/verified.png';
import { BDLoader, hp, wp } from '../../Constants';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

export const HireUs = ({ navigation }) => {
  const [State, setState] = useState({
    IsLoading: false,
  });
  const [selectedTab, setSelectedTab] = useState("All")
  const [list, setList] = useState(null)
  const [displayList, setDisplayList] = useState(null)
  const actions = [{
    text: "Register Yourself",
    icon: require("../../assets/images/user.png"),
    name: "register",
    position: 1
  }]

  useEffect(() => {
    GetHireUsList();
  }, []);
  const GetHireUsList = async (v) => {
    try {
      // console.log('good morning')
      //setState(p => ({ ...p, SelectedTab: v ,}))
      setState(p => ({ ...p, IsLoading: true }));
      const jsonObj = await fetch(`${API_URL}/getHireList`);
      const response = await jsonObj.json();

      setState(p => ({ ...p, IsLoading: false }));
      console.log('GetHireUsList -> ', JSON.stringify(response, null, 2));

      //   if (response?.hirelist?.length > 0) {
      //     setState(p => ({ ...p, HireUs: response?.hirelist }));
      //  }
      // if(State.SelectedTab===0){
      //          if (response?.hirelist?.length > 0) {
      //         let choregrapherArrayList=[]
      //  choregrapherArrayList= await response.hirelist.filter((hireListElement)=>hireListElement.designation===State.SelectedTab)
      //         setState(p => ({ ...p, HireUs: choregrapherArrayList }));

      //       } 
      //      else  if(State.SelectedTab===1){
      //         let choregrapherArrayList=[]
      //  choregrapherArrayList=response.hirelist.filter((hireListElement)=>hireListElement.designation=='Dancers')
      //         setState(p => ({ ...p, HireUs: choregrapherArrayList }));

      //       } 
      if (response?.hirelist?.length > 0) {
        setList(response.hirelist)
        setDisplayList(response.hirelist)
      }
    } catch (e) {
      console.log('Error getHireUsList -> ', e);
    }
  };

  useEffect(() => {
    if (selectedTab == "All") {
      setDisplayList(list)
    }
    else {
      setDisplayList(list.filter(item => item.designation == selectedTab))
    }
  }, [selectedTab])

  useEffect(() => {

    console.log(displayList)

  }, [])

  const designations = [
    { id: "1", title: "All" },
    { id: "2", title: "Choreographer" },
    { id: "3", title: "Dancers" },
    { id: "4", title: "Child Dancers" },
    { id: "5", title: "Senior Dancers" },
    { id: "6", title: "Group Dancers" },
  ]

  const renderItem = ({ item }) => {
    return (
      <View
        style={style.headerContainer}
        onTouchEnd={() => {
          navigation.navigate('instructor-details', {
            id: item._id,
            item: item,
          });
        }}
      >
        <View style={style.headerLogo}>
          <FastImage
            style={style.instructorlogo}
            source={{
              uri: `${API_URL_IMAGE}/${item?.profileImage}`,
            }}
          />
        </View>
        <View style={style.headerTitleContainer}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={style.headerTitle}>{item.name}</Text>
            <FastImage
              source={verified}
              resizeMode={'contain'}
              style={{ width: wp(4), height: wp(4) }}
            />
          </View>
          <Text style={style.headerDescription}>
            {item.designation}
          </Text>
        </View>
        <View style={style.arrow}>
          <FastImage source={require('../../assets/images/arrow.png')} />
        </View>
      </View>
    )
  }

  return (
    <View style={style.view}>
      <BDLoader visible={State.IsLoading} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#fff',
          marginVertical: hp(2),
        }}>
        Hire Us
      </Text>
      <View
        style={{
          backgroundColor: '#1D283A',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderRadius: 5,
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: scale(40),
            marginTop: hp(0.5),
            height: scale(40),
          }}
          onPress={() => console.warn('hello')}>
          <FastImage
            source={searchIcon}
            style={{
              width: '50%',
              height: '50%',
            }}
          />
        </TouchableOpacity>

        <TextInput
          placeholderTextColor="#BABFC8"
          style={{
            paddingHorizontal: wp(2),
            color: '#FFFFFF',
            fontSize: scale(12),
            flex: 1,
          }}
          placeholder="Search users"
        />
      </View>


      <View style={style.TabContainer}>
        {/* <ScrollView horizontal={true}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: hp(2),
            }}>
            {[
              'Choreographer',
              'Dancers',
              'Child Dancers',
              'Senior Dancer',
              'Groupe Dancers',
              'Dance Studio',
            ].map((v, i) => (
              <TouchableOpacity
                key={i}
                onPress={()=>{GetHireUsList(v)}}
                style={[
                  style.renderTab,
                  {
                    borderBottomColor:
                      State.SelectedTab == i ? '#926AEE' : 'transparent',
                  },
                ]}>
                <Text style={{ color: '#fff' }}>{v}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView> */}
        <FlatList
          data={designations}
          renderItem={({ item }) => {
            return (
              <View style={{ marginHorizontal: wp(1.75) }}>
                <TouchableOpacity onPress={() => setSelectedTab(item.title)}>
                  <Text style={{ color: selectedTab == item.title ? "#8671DB" : "#ffffff", fontWeight: "500" }}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            )
          }}
          horizontal
          style={{ marginVertical: hp(1.5) }}
        />
      </View>

      {/* <ScrollView>
        {State.HireUs.length > 0
          ? State.HireUs?.map((item, index) => {
              return (
                <View
                  style={style.headerContainer}
                  onTouchEnd={() => {
                    navigation.navigate('instructor-details', {
                      id: item._id,
                      item: item,
                    });
                  }}
                  key={index}>
                  <View style={style.headerLogo}>
                    <Image
                      style={style.instructorlogo}
                      source={{
                        uri: `${API_URL_IMAGE}/${item?.profileImage}`,
                      }}
                    />
                  </View>
                  <View style={style.headerTitleContainer}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={style.headerTitle}>{item.name}</Text>
                      <Image
                        source={verified}
                        resizeMode={'contain'}
                        style={{ width: wp(4), height: wp(4) }}
                      />
                    </View>
                    <Text style={style.headerDescription}>
                      {item.designation}
                    </Text>
                  </View>
                  <View style={style.arrow}>
                    <Image source={require('../../assets/images/arrow.png')} />
                  </View>
                </View>
              );
            })
          : null}
      </ScrollView> */}
      <FlatList
        data={displayList}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={style.buttonTakeClasses}
        onPress={() => {
        }}>
        <LinearGradient
          style={style.takeClassesGradient}
          colors={['#2885E5', '#844AE9']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}>
          <Text style={{ alignSelf:'center',color:"#ffffff",fontWeight:"500"}}>
            Register Yourself
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

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
    borderColor: '#334155',
    borderWidth: 1,
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
});
