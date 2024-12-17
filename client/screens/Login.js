import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import { USERS_URL, GOOGLE_CLIENT_ID } from '../shareVariables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation, route }) => {
    const { setUser } = route.params;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isGoogleAuthInProgress, setIsGoogleAuthInProgress] = useState(false);

    const handleSubmit = async () => {
        try {
            console.log(USERS_URL);

            if (!email || !password) {
                Alert.alert('Error', 'Please enter both email and password.');
                return;
            }

            const res = await axios.post(USERS_URL + `/login`, {
                email,
                password,
            });

            console.log(res);

            Alert.alert('Success', 'Login successful');
            setUser(res.data.data.user);

        } catch (error) {
            if (error.response) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', error.message);
            }
        }
    };

    const redirectUri = makeRedirectUri({
        useProxy: true,
    });


    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: GOOGLE_CLIENT_ID,
        redirectUri: redirectUri
    });

    console.log(request);

    useEffect(() => {
        if (response?.type === 'success') {
            // Handle successful authentication
            const { authentication } = response.params;
            console.log(authentication);
            // Handle the Google sign-in logic here (e.g., setUser)
            setIsGoogleAuthInProgress(false); // Reset the flag after successful login
        } else if (response?.type === 'error') {
            // Handle error
            console.error('Google Auth Error:', response.error);
            setIsGoogleAuthInProgress(false); // Reset the flag after error
        }
    }, [response]);

    const handleGoogleSignIn = async () => {
        if (isGoogleAuthInProgress) return; // Prevent multiple calls
        setIsGoogleAuthInProgress(true);
        await promptAsync(); // Trigger Google sign-in
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity style={styles.passwordVisibleButton} onPress={() => setPasswordVisible(prev => !prev)}>
                    {passwordVisible
                        ? <Ionicons name="eye" style={styles.passwordVisibleIcon} />
                        : <Ionicons name="eye-off" style={styles.passwordVisibleIcon} />
                    }
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.redirectText}>
                    Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
                </Text>
            </TouchableOpacity>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                    <Text style={{ width: 50, textAlign: 'center' }}>OR</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>
            <TouchableOpacity
                style={styles.buttonGoogle}
                onPress={handleGoogleSignIn}
                disabled={isGoogleAuthInProgress}
            >
                <Image source={require('../assets/image/google-icon.png')} style={styles.buttonGoogleIcon} />
                <Text style={styles.buttonGoogleText}>Sign in with Google</Text>
            </TouchableOpacity> */}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    button: {
        height: 50,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    redirectText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
    },
    linkText: {
        color: '#007BFF',
    },
    buttonGoogle: {
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row',
        borderWidth: 0.2,
    },
    buttonGoogleText: {
        color: '#333',
        fontSize: 16,
        marginLeft: 10,
    },
    buttonGoogleIcon: {
        width: 30,
        height: 30,
    },
    passwordContainer: {
        position: 'relative',
        marginVertical: 15
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

export default Login;
