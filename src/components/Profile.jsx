/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const Profile = ({
  item,
  setModalVisible,
  setProfile,
  ProfileEdit,
  setModalProfile,
}) => {
  const {name, last_name, id, summary} = item;

  return (
    <Pressable onPress={()=>{
        setModalProfile(true);
        setProfile(item);
        }}>
     <View style={styles.contenedor}>
      <Text style={styles.label}>Perfil:</Text>
      <Text style={styles.texto}>{name+ " " + last_name}</Text>
      <Text style={styles.resumen}>{summary}</Text>
      <View style={styles.contenedorBotones}>
        <Pressable style={[styles.btn, styles.btnEditar]}
          onPress={() => {
            setModalVisible(true);
            ProfileEdit(id);
          }}>
          <Text style={styles.btnTexto}>Editar</Text>
        </Pressable>
      </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomColor: '#94a3B8',
    borderBottomWidth: 1,
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  texto: {
    color: '#2B83AE',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  resumen: {
    color: '#0071AA',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  fecha: {
    color: '#374151',
  },
  contenedorBotones: {
    flexDirection: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
  },
  btnEditar: {
    backgroundColor: '#000000',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
  },
  btnEliminar: {
    backgroundColor: '#EF4444',
  },
  btnTexto: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF',
  },
});
export default Profile;
