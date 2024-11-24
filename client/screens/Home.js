import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { DOCS_URL } from '../shareVariables';

const Home = ({ navigation }) => {
    const [docs, setDocs] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getDocs = async () => {
        try {
            const res = await axios.get(DOCS_URL + "/recent");
            setDocs(res.data.data.docs);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    const renderDocument = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={navigation}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Type: {item.type}</Text>
            <Text>Size: {item.size} KB</Text>
            <Text>Status: {item.status}</Text>
            <Text>Created At: {new Date(item.createdAt).toLocaleString()}</Text>
            <Text>Status: {item.public ? "Public" : "Private"}</Text>
        </TouchableOpacity>
    );

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            getDocs();
            setRefreshing(false);
        }, 2000);
    };

    useEffect(() => {
        getDocs();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <FlatList
                data={docs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderDocument}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

export default Home;
