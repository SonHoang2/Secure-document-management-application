import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const SignUp = ({ navigation }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSignUp = () => {
        const { name, email, password, confirmPassword } = formData;

        // Simple validation
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        // Proceed with API call or navigation
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login'); // Navigate to the login page
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            {/* Name Input */}
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#888"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
            />

            {/* Email Input */}
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
            />

            {/* Password Input */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry={true}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
            />

            {/* Confirm Password Input */}
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#888"
                secureTextEntry={true}
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
            />

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Redirect to Login */}
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
