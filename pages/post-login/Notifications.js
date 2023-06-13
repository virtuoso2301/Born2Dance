import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { wp, hp, BDLoader } from '../../Constants';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../../services/api_url';

const Notifications = () => {
  const data = useSelector(({ appData }) => appData);
  // console.log('data -> ', JSON.stringify(data, null, 2));
  const [State, setState] = useState({ IsLoading: false, Notifications: [] });

  useEffect(() => {
    GetNotifications();
  }, []);

  const GetNotifications = async id => {
    setState(p => ({ ...p, IsLoading: true }));
    try {
      const jsonObj = await fetch(`${API_URL}/getNotificationList`, {
        method: 'POST',
        body: JSON.stringify({
          userId: id,
        }),
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      });
      const response = await jsonObj.json();
      setState(p => ({ ...p, IsLoading: false }));
      console.log('GetNotifications -> ', JSON.stringify(response, null, 2));
      if (response?.notifications?.length > 0) {
        setState(p => ({
          ...p,
          Notifications: response?.notifications,
        }));
      }
    } catch (e) {
      setState(p => ({ ...p, IsLoading: false }));
      console.log('Error GetNotifications -> ', e);
    }
  };

  return (
    <View style={styles.Container}>
      <BDLoader visible={State.IsLoading} />
      <FlatList
        data={NotificationsDummy}
        keyExtractor={(v, i) => String(i)}
        renderItem={({ item, index }) => (
          <View style={styles.renderContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text numberOfLines={2} style={styles.text}>
                {item.description}
              </Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#0E172A',
  },
  renderContainer: {
    borderBottomWidth: 1,
    borderColor: '#808080',
    paddingHorizontal: wp(4),
    marginBottom: hp(1),
    paddingVertical: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    paddingVertical: hp(0.5),
  },
  time: {
    color: '#fff',
  },
});

export default Notifications;

const NotificationsDummy = [
  {
    title: 'Badshah',
    description: 'Aditya Prateek Singh Sisodia known by his stage name Badshah',
    time: '9:00 PM',
  },
  {
    title: 'Taylor Swift',
    description: 'Taylor Alison Swift is an American singer-songwriter.',
    time: '11:00 AM',
  },
  {
    title: 'Justin Bieber',
    description: 'Justin Drew Bieber is a Canadian singer.',
    time: '9:00 PM',
  },
  {
    title: 'Eminem',
    description:
      'Marshall Bruce Mathers III, known professionally as Eminem, is an American rapper',
    time: '10:30 PM',
  },
];
