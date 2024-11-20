import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/Home';
import Login from './screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

export default function App() {
    const user = AsyncStorage.getItem('user');

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                {user ? (
                    <>
                        <Drawer.Screen name="Home" component={Home} />
                        {/* <Drawer.Screen name="Profile" component={ProfileScreen} />
                    <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
                    </>
                ) : (
                    <>
                        <Drawer.Screen name="Login" component={Login} />
                        {/* <Drawer.Screen name="SignUp" component={SignUp} /> */}
                    </>
                )}
            </Drawer.Navigator>
        </NavigationContainer>
    );
}