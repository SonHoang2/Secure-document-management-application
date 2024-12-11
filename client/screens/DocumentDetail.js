import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DocumentDetail = ({ route, navigation }) => {
    const { doc } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: "Detail" });
    }, [navigation, doc.title]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title: <Text style={styles.value}>{doc.title}</Text></Text>
            <Text style={styles.label}>Type: <Text style={styles.value}>{doc.type}</Text></Text>
            <Text style={styles.label}>Size: <Text style={styles.value}>{doc.size} kb</Text></Text>
            <Text style={styles.label}>Created At: <Text style={styles.value}>{doc.createdAt}</Text></Text>
            <Text style={styles.label}>Updated At: <Text style={styles.value}>{doc.updatedAt}</Text></Text>
            <Text style={styles.label}>Public: <Text style={styles.value}>{doc.public ? 'Yes' : 'No'}</Text></Text>
            <Text style={styles.label}>Status: <Text style={styles.value}>{doc.status}</Text></Text>
            <Text style={styles.label}>Created By: <Text style={styles.value}>{doc.user?.email || doc.email}</Text></Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Root', { screen: 'Recent' })}>
                <Text style={styles.buttonText}>Return Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    value: {
        fontWeight: 'normal',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#0d6efd',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
    },
});

export default DocumentDetail;
