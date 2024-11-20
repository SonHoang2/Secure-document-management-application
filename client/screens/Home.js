import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { USERS_URL } from '../customValue';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
    const openMenu = () => {
        navigation.openDrawer(); // Opens the side menu (requires Drawer Navigator)
    };

    const handleSearch = (text) => {
        console.log('Search:', text);
        // Implement search functionality here
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search files or folders"
                        placeholderTextColor="#888"
                        onChangeText={handleSearch}
                    />
                </View>
            </View>

            <Text style={styles.title}>Welcome to the Home Page!</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        elevation: 2,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        flex: 1,
        marginLeft: 16,
        paddingHorizontal: 10,
        height: 40,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
});

export default Home;
