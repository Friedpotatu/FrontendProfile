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
  const {name, id} = item;

  return (
    <Pressable onPress={()=>{
        setModalProfile(true);
        setProfile(item);
        }}>
     <View style={styles.contenedor}>
      <Text style={styles.label}>Perfil:</Text>
      <Text style={styles.texto}>{name}</Text>
      <View style={styles.contenedorBotones}>
        <Pressable style={[styles.btn, styles.btnEditar]}
          onPress={() => {
            setModalVisible(true);
            ProfileEdit(id);
          }}>
          <Text>Editar</Text>
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
    color: '#6D28D9',
    fontSize: 24,
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
    backgroundColor: '#F59E0B',
    alignItems: 'center',
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
