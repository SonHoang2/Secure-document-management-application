import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const documentData = {
    docs: [
        {
            id: 1,
            title: "cmd open database",
            type: "txt",
            size: "93",
            content: "upload\\files\\user-2-1733295891742.txt",
            createdAt: "2024-12-04T07:04:51.749Z",
            updatedAt: "2024-12-04T07:07:46.787Z",
            public: false,
            status: "pending",
            createdBy: 2,
        },
        {
            id: 2,
            title: "test-file-1",
            type: "txt",
            size: "10128",
            content: "upload\\files\\user-2-1733386827453.txt",
            createdAt: "2024-12-05T08:20:27.456Z",
            updatedAt: "2024-12-05T08:21:23.713Z",
            public: false,
            status: "pending",
            createdBy: 2,
        },
    ],
};

const PendingDocuments = () => {
    const renderDocument = ({ item }) => (
        <View style={styles.documentCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Type: {item.type.toUpperCase()}</Text>
            <Text>Size: {item.size} bytes</Text>
            <Text>Status: {item.status}</Text>
            <Text>Visibility: {item.public ? "Public" : "Private"}</Text>
            <Text>Created At: {new Date(item.createdAt).toLocaleString()}</Text>
            <Text>Updated At: {new Date(item.updatedAt).toLocaleString()}</Text>
            <Text>Created By User ID: {item.createdBy}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Document List</Text>
            <FlatList
                data={documentData.docs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderDocument}
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
    documentCard: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

export default PendingDocuments;
