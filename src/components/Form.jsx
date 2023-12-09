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
const Form = props => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [summary, setSummary] = useState('');
  const [frameworkName1, setFrameworkName1] = useState('');
  const [frameworkLevel1, setFrameworkLevel1] = useState('');
  const [frameworkName2, setFrameworkName2] = useState('');
  const [frameworkLevel2, setFrameworkLevel2] = useState('');
  const [hobbieName1, setHobbieName1] = useState('');
  const [hobbieDescription1, setHobbieDescription1] = useState('');
  const [hobbieName2, setHobbieName2] = useState('');
  const [hobbieDescription2, setHobbieDescription2] = useState('');
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

      console.log(profileObj.frameworks);
      // Accede a los frameworks y hobbies del perfil
      if (profileObj.frameworks) {
        // Parsea la cadena a un array de objetos JSON
        const frameworksArray = JSON.parse(profileObj.frameworks);

        if (frameworksArray.length >= 2) {
          const [framework1, framework2] = frameworksArray;

          console.log(framework1);
          console.log(framework2);

          setFrameworkName1(framework1.name);
          setFrameworkLevel1(framework1.level);

          setFrameworkName2(framework2.name);
          setFrameworkLevel2(framework2.level);
        }
      }

      if (profileObj.hobbies && profileObj.hobbies.length >= 2) {
        // Similarmente, puedes parsear la cadena de hobbies si es necesario
        const hobbiesArray = JSON.parse(profileObj.hobbies);

        if (hobbiesArray.length >= 2) {
          const [hobbie1, hobbie2] = hobbiesArray;

          setHobbieName1(hobbie1.name);
          setHobbieDescription1(hobbie1.description);

          setHobbieName2(hobbie2.name);
          setHobbieDescription2(hobbie2.description);
        }
      }
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
      const response = await UserApi.put(`/profile/${id}`, {
        name: updatedProfile.name,
        last_name: updatedProfile.last_name,
        email: updatedProfile.email,
        city: updatedProfile.city,
        country: updatedProfile.country,
        summary: updatedProfile.summary,
        frameworks: [
          { name: frameworkName1, level: frameworkLevel1 },
          { name: frameworkName2, level: frameworkLevel2 },
        ],
        hobbies: [
          { name: hobbieName1, description: hobbieDescription1 },
          { name: hobbieName2, description: hobbieDescription2 },
        ],
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
      frameworks: [
        { name: frameworkName1, level: frameworkLevel1 },
        { name: frameworkName2, level: frameworkLevel2 },
      ],
      hobbies: [
        { name: hobbieName1, description: hobbieDescription1 },
        { name: hobbieName2, description: hobbieDescription2 },
      ],
    };
    if (id) {
      //se edita el paciente
      newProfile.id = id;
      console.log(newProfile);
      update(newProfile);
      const profileUpdated = profiles.map(profileState =>
        profileState.id === newProfile.id ? newProfile : profileState,
      );
      setProfiles(profileUpdated);
      setProfileApp({});
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
    setFrameworkName1('');
    setFrameworkLevel1('');
    setFrameworkName2('');
    setFrameworkLevel2('');
    setHobbieName1('');
    setHobbieDescription1('');
    setHobbieName2('');
    setHobbieDescription2('');
    showProfiles();
    }
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            {profileObj.id ? 'Editar' : 'Nueva'}{' '}
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
              setFrameworkName1('');
              setFrameworkLevel1('');
              setFrameworkName2('');
              setFrameworkLevel2('');
              setHobbieName1('');
              setHobbieDescription1('');
              setHobbieName2('');
              setHobbieDescription2('');
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

          <View style={styles.campo}>
            <Text style={styles.label}>Framework 1</Text>
            <TextInput
              style={styles.input}
              placeholder="nombre del framework"
              placeholderTextColor={'#666'}
              value={frameworkName1}
              onChangeText={setFrameworkName1}
            />
          </View>
          <View style={styles.campo}>
          <TextInput
              style={styles.input}
              placeholder="nivel de conocimiento"
              placeholderTextColor={'#666'}
              value={frameworkLevel1}
              onChangeText={setFrameworkLevel1}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Framework 2</Text>
            <TextInput
              style={styles.input}
              placeholder="nombre del framework"
              placeholderTextColor={'#666'}
              value={frameworkName2}
              onChangeText={setFrameworkName2}
            />
          </View>
          <View style={styles.campo}>
          <TextInput
              style={styles.input}
              placeholder="nivel de conocimiento"
              placeholderTextColor={'#666'}
              value={frameworkLevel2}
              onChangeText={setFrameworkLevel2}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Hobbie 1</Text>
            <TextInput
              style={styles.input}
              placeholder="nombre del Hobbie"
              placeholderTextColor={'#666'}
              value={hobbieName1}
              onChangeText={setHobbieName1}
            />
          </View>
          <View style={styles.campo}>
          <TextInput
              style={styles.input}
              placeholder="descripcion del Hobbie"
              placeholderTextColor={'#666'}
              value={hobbieDescription1}
              onChangeText={setHobbieDescription1}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Hobbie 2</Text>
            <TextInput
              style={styles.input}
              placeholder="nombre del Hobbie"
              placeholderTextColor={'#666'}
              value={hobbieName2}
              onChangeText={setHobbieName2}
            />
          </View>
          <View style={styles.campo}>
          <TextInput
              style={styles.input}
              placeholder="descripcion del Hobbie"
              placeholderTextColor={'#666'}
              value={hobbieDescription2}
              onChangeText={setHobbieDescription2}
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
    backgroundColor: '#83C369',
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
    backgroundColor: '#000000',
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
    backgroundColor: '#000000',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default Form;
