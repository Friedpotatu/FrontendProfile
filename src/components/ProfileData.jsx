/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, SafeAreaView, View,  Pressable, StyleSheet } from 'react-native';

const ProfileData = ({profile, setProfile, setModalProfile}) => {

    return (
        <SafeAreaView style={styles.contenedor}>
           <Text style={styles.titulo}>Informacion {''}
               <Text style={styles.tituloBold}>Perfil</Text>
            </Text>
            <View>
                <Pressable
                    style={styles.btnCerrar}
                    onPress={() => {
                        setModalProfile(false);
                        setProfile({});
                    }}>
                    <Text style={styles.btnCerrarTexto}>X Cerrar</Text>
                </Pressable>
            </View>
            <View style={styles.contenido}>
                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.valor}>{profile.name}</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Apellido:</Text>
                    <Text style={styles.valor}>{profile.last_name}</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.valor}>{profile.email}</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Ciudad:</Text>
                    <Text style={styles.valor}>{profile.city}</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>País:</Text>
                    <Text style={styles.valor}>{profile.country}</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Resumen:</Text>
                    <Text style={styles.valor}>{profile.summary}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#6FAFD6',
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
    btnCerrar: {
        marginVertical: 30,
        backgroundColor: '#000000',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10,
    },
    btnCerrarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    contenido: {
        backgroundColor: '#FFF',
        marginHorizontal: 30,
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    campo: {
        marginBottom: 10,
    },
    label: {
        textTransform: 'uppercase',
        color: '#374151',
        fontWeight: '600',
        fontSize: 12,
    },
    valor: {
        fontWeight: '700',
        fontSize: 20,
        color: '#334155',
    },
});

export default ProfileData;
