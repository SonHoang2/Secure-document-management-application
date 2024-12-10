import axios from 'axios';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import Recent from './screens/Recent';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Settings from './screens/Settings';
import DocumentContent from './screens/DocumentContent';
import DocumentDetail from './screens/DocumentDetail';
import AuditLog from './screens/AuditLog';
import Profile from './screens/Profile';
import Users from './screens/Users';
import MyDocs from './screens/MyDocs';
import PendingDocuments from './screens/PendingDocuments';
import Search from './screens/Search';
import CreateDocument from './screens/CreateDocument';
import { USERS_URL, roleName, IMAGES_URL } from './shareVariables';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const res = await axios.get(USERS_URL + '/me', { withCredentials: true });
            setUser(res.data.data.user);
        };

        if (!user) {
            checkAuth();
        }

    }, [user]);

    function Root() {
        return (
            <Drawer.Navigator initialRouteName='Recent'>
                <Drawer.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        drawerLabel: () => (
                            <View style={styles.drawerItem}>
                                <Image source={{ uri: IMAGES_URL + "/" + user.avatar }} style={styles.avatar} />
                                <View style={styles.profile}>
                                    <Text style={styles.profileText}>{user.firstName} {user.lastName}</Text>
                                    <Text style={styles.profileTextSmall}>View profile</Text>
                                </View>
                            </View>
                        ),
                    }}
                    initialParams={{ user }}
                />
                <Drawer.Screen
                    name="Recent"
                    component={Recent}
                    options={ ({ navigation }) => ({
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                                <Icon name="search" size={25} color="#000" style={{ marginRight: 15 }} />
                            </TouchableOpacity>
                        ),
                        drawerLabel: () => (
                            <View style={styles.drawerItem}>
                                <Icon name="access-time" size={20} color="#000" style={styles.icon} />
                                <Text style={styles.drawerLabel}>Recent</Text>
                            </View>
                        ),
                    })}
                />
                <Drawer.Screen
                    name="MyDocuments"
                    component={MyDocs}
                    options={{
                        drawerLabel: () => (
                            <View style={styles.drawerItem}>
                                <Icon name="folder" size={20} color="#000" style={styles.icon} />
                                <Text style={styles.drawerLabel}>My Documents</Text>
                            </View>
                        ),
                    }}
                />
                {
                    user.role === roleName.Admin && (
                        <Drawer.Screen
                            name="AuditLog"
                            component={AuditLog}
                            options={{
                                drawerLabel: () => (
                                    <View style={styles.drawerItem}>
                                        <Icon name="history" size={20} color="#000" style={styles.icon} />
                                        <Text style={styles.drawerLabel}>Audit Log</Text>
                                    </View>
                                ),
                            }}
                        />
                    )
                }
                {
                    user.role === roleName.Admin && (
                        <Drawer.Screen
                            name="Users"
                            component={Users}
                            options={{
                                drawerLabel: () => (
                                    <View style={styles.drawerItem}>
                                        <Icon name="people" size={20} color="#000" style={styles.icon} />
                                        <Text style={styles.drawerLabel}>Users</Text>
                                    </View>
                                ),
                            }}
                            initialParams={{ users: true }}
                        />
                    )
                }
                {
                    user.role === roleName.Manager && (
                        <Drawer.Screen
                            name="PendingDocuments"
                            component={PendingDocuments}
                            options={{
                                drawerLabel: () => (
                                    <View style={styles.drawerItem}>
                                        <Ionicons name="hourglass-outline" size={20} color="#000" style={styles.icon} />
                                        <Text style={styles.drawerLabel}>Pending Documents</Text>
                                    </View>
                                ),
                            }}
                        />
                    )
                }
                <Drawer.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        drawerLabel: () => (
                            <View style={styles.drawerItem}>
                                <Icon name="settings" size={20} color="#000" style={styles.icon} />
                                <Text style={styles.drawerLabel}>Settings</Text>
                            </View>
                        ),
                    }}
                    initialParams={{ setUser }}
                />
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
                            <Stack.Screen name="documentContent" component={DocumentContent} />
                            <Stack.Screen name="documentDetail" component={DocumentDetail} />
                            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
                            <Stack.Screen name="CreateDocument" component={CreateDocument} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={Login} initialParams={{ setUser }} />
                            <Stack.Screen name="SignUp" component={SignUp} initialParams={{ setUser }} />
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    icon: {
        marginRight: 15,
    },
    drawerLabel: {
        fontSize: 16,
        color: '#000',
    },
    profile: {
        flexDirection: 'column',
    },
    profileText: {
        fontSize: 16,
        color: '#000',
    },
    profileTextSmall: {
        fontSize: 14,
        color: '#000',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
    },
});