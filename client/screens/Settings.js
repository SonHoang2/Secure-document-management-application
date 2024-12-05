import axios from 'axios';
import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { USERS_URL } from '../shareVariables';

const Settings = ({ route }) => {
    const { setUser } = route.params;

    const signOut = async () => {
        try {
            await axios.get(USERS_URL + '/logout', { withCredentials: true });
            alert("You have been signed out.");
        } catch (error) {
            console.log(error);

            if (error.response) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', error.message);
            }
        }
        setUser(null);
    }

    const closeAccount = async () => {
        try {
            const user = await axios.delete(USERS_URL + '/me');
            console.log(user);
            
            alert("Your account has been closed.");
        } catch (error) {
            if (error.response) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', error.message);
            }
        }
        setUser(null);
    }

    const closeAccountAlert = () => {
        Alert.alert(
            "Close Account",
            "Are you sure you want to close your account? This action is irreversible.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Yes, Close Account", onPress: closeAccount },
            ]
        );
    };


    const signOutAlert = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Sign Out",
                    onPress: signOut,
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.danger} onPress={closeAccountAlert}>
                <Text style={styles.buttonText}>Close Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.danger} onPress={signOutAlert}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    danger: {
        paddingVertical: 15,
        paddingStart: 20,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 0.9,
    },
    buttonText: {
        color: 'red',
        fontSize: 16,
        fontWeight: '400',
    },
});

export default Settings;
