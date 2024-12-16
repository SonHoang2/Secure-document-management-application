import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import { USERS_URL, CLIENT_URL } from '../shareVariables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';

const Login = ({ navigation, route }) => {
    const { setUser } = route.params;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [authUrl, setAuthUrl] = useState('');

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

    // const handleAuthRedirect = async () => {
    //     try {
    //         console.log(location.pathname);
    //         const { code } = queryString.parse(location.search);

    //         if (location.pathname === "/auth/google") {
    //             const URL = USERS_URL + `/login/google`;
    //             const response = await fetch(URL, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({ code, redirectUri: CLIENT_URL + "/auth/google" }),
    //             });
    //             const data = await response.json();
    //             console.log(data);
    //             localStorage.setItem("user", JSON.stringify(data.data.user));
    //             localStorage.setItem("token", JSON.stringify(data.token));
    //             navigate("/");
    //         }


    //     } catch (error) {
    //         console.error('Error fetching auth data:', error);
    //     }
    // };

    const googleLogin = () => {
        const queryParams = new URLSearchParams({
            client_id: CLIENT_URL,
            scope: 'openid email profile',
            redirect_uri: CLIENT_URL + "/auth/google",
            response_type: 'code',
        }).toString();

        setAuthUrl(`https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`);
    }

    // useEffect(() => {
    //     // login with social account
    //     // handleAuthRedirect()

    // }, [location.pathname]);

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
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                    <Text style={{ width: 50, textAlign: 'center' }}>OR</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>
            <TouchableOpacity style={styles.buttonGoogle} onPress={googleLogin}>
                <Image source={require('../assets/image/google-icon.png')} style={styles.buttonGoogleIcon} />
                <Text style={styles.buttonGoogleText}>Sign in with Google</Text>
            </TouchableOpacity>
            <WebView
                source={{ uri: authUrl }}
            />
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
