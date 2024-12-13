import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { IMAGES_URL, USERS_URL } from '../shareVariables';
import axios from 'axios';

const Users = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getUsers = async () => {
        try {
            const res = await axios.get(USERS_URL);
            setUsers(res.data.data.users);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch users');
        }
    }

    useEffect(() => {
        getUsers();
    }, [navigation]);

    const renderUser = ({ item: user }) => (
        <View style={styles.userCard}>
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: IMAGES_URL + '/' + user.avatar }}
                    style={styles.avatar}
                />
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.name}>
                    {user.firstName} {user.lastName}
                </Text>
                <Text>Email: {user.email}</Text>
                <Text>Role: {user.role}</Text>
                <Text>Status: {user.active ? "Active" : "Inactive"}</Text>
            </View>
        </View>
    );

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            getUsers();
            setRefreshing(false);
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderUser}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    userCard: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    avatarContainer: {
        justifyContent: 'center',
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
});

export default Users;
