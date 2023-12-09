/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import userApi from './src/api/UserApi.jsx';
import Profile from './src/components/Profile.jsx';
import Form from './src/components/Form.jsx';
import ProfileData from './src/components/ProfileData.jsx';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
      <Text style={styles.titulo}>
        Administrador de Perfiles{' '}
      </Text>
      {profiles.length === 0 ? (
        <Text style={styles.noPacientes}> No hay perfiles</Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={profiles}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <Profile
                item={item}
                setModalVisible={setModalVisible}
                setProfile={setProfile}
                ProfileEdit={editProfile}
                setModalProfile={setModalProfile}
              />
            );
          }}
        />
      )}

      <Form
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        profiles={profiles}
        setProfiles={setProfiles}
        profile={profile}
        setProfile={setProfile}
        getProfiles={getProfiles}
        showProfiles={getProfiles}
      />

      <Modal visible={modalProfile} animationType="fade">
        <ProfileData
          profile={profile}
          setProfile={setProfile}
          setModalProfile={setModalProfile}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default App;

