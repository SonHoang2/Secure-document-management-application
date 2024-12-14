import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { USERS_URL } from '../shareVariables';
import Ionicons from 'react-native-vector-icons/Ionicons';


const SignUp = ({ navigation, route }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);

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
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#888"
                    value={formData.firstName}
                    onChangeText={(value) => handleInputChange('firstName', value)}
                    required
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#888"
                    value={formData.lastName}
                    onChangeText={(value) => handleInputChange('lastName', value)}
                    required
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                />
            </View>
            <View style={[styles.passwordContainer, styles.inputContainer]}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity style={styles.passwordVisibleButton} onPress={() => setPasswordVisible(prev => !prev)}>
                    {passwordVisible
                        ? <Ionicons name="eye" style={styles.passwordVisibleIcon} />
                        : <Ionicons name="eye-off" style={styles.passwordVisibleIcon} />
                    }
                </TouchableOpacity>
            </View>
            <View style={[styles.passwordContainer, styles.inputContainer]}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#888"
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                    secureTextEntry={!passwordConfirmVisible}

                />
                <TouchableOpacity style={styles.passwordVisibleButton} onPress={() => setPasswordConfirmVisible(prev => !prev)}>
                    {passwordConfirmVisible
                        ? <Ionicons name="eye" style={styles.passwordVisibleIcon} />
                        : <Ionicons name="eye-off" style={styles.passwordVisibleIcon} />
                    }
                </TouchableOpacity>
            </View>
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
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        height: 50,
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
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
    passwordContainer: {
        position: 'relative',
    },
    passwordVisibleButton: {
        position: 'absolute',
        right: 0,
        height: '100%',
        justifyContent: 'center'
    },
    passwordVisibleIcon: {
        color: '#333',
        fontSize: 20,
        padding: 10
    }
});

export default SignUp;
