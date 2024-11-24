import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { USERS_URL } from '../shareVariables';


const SignUp = ({ navigation, route }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { setUser } = route.params;

    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = async () => {
        try {
            const { firstName, lastName, email, password, confirmPassword } = formData;

            // Simple validation
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                Alert.alert('Error', 'All fields are required.');
                return;
            }

            if (password !== confirmPassword) {
                Alert.alert('Error', 'Passwords do not match.');
                return;
            }

            const res = await axios.post(USERS_URL + `/signup`, {
                firstName,
                lastName,
                email,
                password,
            });

            Alert.alert('Success', 'Account created successfully!');
            setUser(res.data.data.user);
        } catch (error) {
            if (error.response) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="#888"
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#888"
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry={true}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
            />

            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#888"
                secureTextEntry={true}
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.redirectText}>
                    Already have an account? <Text style={styles.linkText}>Log in</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#007BFF',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: 15,
        color: '#333',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    redirectText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
    },
    linkText: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
});

export default SignUp;
