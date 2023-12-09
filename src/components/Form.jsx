/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import UserApi from '../api/UserApi';

import {
  Modal,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import {URL} from '../helpers/index';
const endpoint = URL;
const Form = props => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [summary, setSummary] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isPickerEnabled, setIsPickerEnabled] = useState(false);

  /**
   * Instancio todos los props que llegan al componente.
   */
  const {modalVisible} = props;
  const {profiles} = props;
  const {setProfiles} = props;
  const {setModalVisible} = props;
  const {profile: profileObj} = props;
  const {setProfile: setProfileApp} = props;
  const {showProfiles} = props;

  useEffect(() => {
    getProfiles();
  }, []);

  useEffect(() => {
    if (Object.keys(profileObj).length > 0) {
      setId(profileObj.id);
      setName(profileObj.name);
      setLastName(profileObj.last_name);
      setEmail(profileObj.email);
      setCity(profileObj.city);
      setCountry(profileObj.country);
      setSummary(profileObj.summary);
    }
  }, [profileObj]);

  const getProfiles = async () => {
    const response = await UserApi
      .get()
      .then(res => {
        setUsers(res.data);
        setIsPickerEnabled(true);
      })
      .catch(error => {
        console.log(error);
        setIsPickerEnabled(false);
      });
  };

  const update = async (updatedProfile) => {
    try {
      const response = await UserApi.put(`/appointment/${id}`, {
        name: updatedProfile.name,
        last_name: updatedProfile.last_name,
        email: updatedProfile.email,
        city: updatedProfile.city,
        country: updatedProfile.country,
        summary: updatedProfile.summary,
      });
    } catch (error) {
      console.error('Error al realizar la solicitud PUT (Actualización):', error.message);
    }
  };

  const handleProfile = () => {
    if ([name, last_name, email, city, country, summary].includes('')) {
      //alerta para validar que todos los campos esten llenos.
      Alert.alert('Error', 'Todos los campos son obligatorios.', [
        {text: 'Recordar después', style: 'cancel'},
        {text: 'Cancelar'},
        {text: 'Ok'},
      ]);
      return;
    }
    const newProfile = {
      name,
      last_name,
      email,
      city,
      country,
      summary,
    };
    if (id) {
      //se edita el paciente
      newPatient.id = id;
      console.log(newPatient);
      update(newPatient);
      const pacientesActualizados = pacientes.map(pacienteState =>
        pacienteState.id === newPatient.id ? newPatient : pacienteState,
      );
      setPacientes(pacientesActualizados);
      setPacienteApp({});
    } else {
        console.log(newProfile);
        console.log("No existe");

    setModalVisible(!modalVisible); //cierro el modal despues de guardar
    setId('');
    setName('');
    setLastName('');
    setEmail('');
    setCity('');
    setCountry('');
    setSummary('');
    showProfiles();
    }
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            {pacienteObj.id ? 'Editar' : 'Nueva'}{' '}
            <Text style={styles.tituloBold}>Perfil</Text>
          </Text>

          <Pressable
            style={styles.btnCancelar}
            onPress={() => {
              setModalVisible(!modalVisible);
              setProfileApp({});
              setId('');
              setName('');
              setLastName('');
              setEmail('');
              setCity('');
              setCountry('');
              setSummary('');
            }}>
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor={'#666'}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Apellido</Text>
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              placeholderTextColor={'#666'}
              value={name}
              onChangeText={setLastName}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese correo electrónico"
              placeholderTextColor={'#666'}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="Ciudad"
              placeholderTextColor={'#666'}
              value={city}
              onChangeText={setCity}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Country</Text>
            <TextInput
              style={styles.input}
              placeholder="País"
              placeholderTextColor={'#666'}
              value={country}
              onChangeText={setCountry}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Resumen</Text>
            <TextInput
              style={styles.input}
              placeholder="Resumen"
              placeholderTextColor={'#666'}
              value={summary}
              onChangeText={setSummary}
            />
          </View>

          <Pressable style={styles.btnNuevaCita} onPress={handleProfile}>
            <Text style={styles.btnNuevaCitaTexto}>
              {profileObj.id ? 'Editar' : 'Agregar'}
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6D28D9',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  tituloBold: {
    fontWeight: '900',
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
  },
  sintomasInput: {
    height: 100,
  },
  fechaContenedor: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    color: '#5827A4',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default Form;
