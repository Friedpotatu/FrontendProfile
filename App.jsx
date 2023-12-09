/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
} from 'react-native';
import userApi from './src/api/UserApi.jsx';

const App = () => {
  const [modelaVisible, setModalVisible] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState({});
  const [modalProfile, setModalProfile] = useState(false);

  const getProfiles = async () => {
    const response = await userApi
    .get('/profile')
    .then(res => {setProfiles(res.data); console.log(res.data);})
    .catch(error => console.log(error));
  };

  const editProfile = id => {
    const editProfile = profiles.filter(profile => profile.id === id);
    setProfile(editProfile[0]);
  };

  useEffect(() => {
    const response = getProfiles();
    console.log(response);
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <Text>hello</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
