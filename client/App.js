import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
    const user = AsyncStorage.getItem('user');

    function Root() {
        return (
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={Home} />
            </Drawer.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    user ? (
                        <>
                            <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="SignUp" component={SignUp} />
                            <Stack.Screen name="Login" component={Login} />
                        </>
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}