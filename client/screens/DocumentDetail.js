import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DocumentDetail = ({ route, navigation }) => {
    const { doc } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: "Detail" });
    }, [navigation, doc.title]);

    let size = doc.size;
    let unit = 'B';
    if (size > 1024) {
        size = (size / 1024).toFixed(2);
        unit = 'KB';
    }
    if (size > 1024) {
        size = (size / 1024).toFixed(2);
        unit = 'MB';
    }

    console.log(doc);

    return (
        <View style={styles.container}>
            <View style={styles.field}>
                <Text style={styles.label}>Title:</Text>
                <Text style={styles.value}>{doc.title}</Text>
            </View>
            <View style={styles.field}>
                <Text style={styles.label}>Type:</Text>
                <Text style={styles.value}>{doc.type}</Text>
            </View>
            <View style={styles.field}>
                <Text style={styles.label}>Size:</Text>
                <Text style={styles.value}>{size} {unit}</Text>
            </View>
            <View style={styles.field}>
                <Text style={styles.label}>Created At:</Text>
                <Text style={styles.value}>
                    {doc.createdAt ? new Date(doc.createdAt).toLocaleString() : 'Never'}
                </Text>
            </View>
            <View style={styles.field}>
                <Text style={styles.label}>Updated At:</Text>
                <Text style={styles.value}>
                    {doc.updateAt ? new Date(doc.updateAt).toLocaleString() : 'Never'}
                </Text>
            </View>
            <View style={styles.field}>
                <Text style={styles.label}>Public:</Text>
                <Text style={styles.value}>{doc.public ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.field}>
                <Text style={styles.label}>Status:</Text>
                <Text style={styles.value}>{doc.status}</Text>
            </View>
            <View style={styles.field}>
                <Text style={styles.label}>Created By:</Text>
                <Text style={styles.value}>{doc.user?.email || doc.email}</Text>
            </View>
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
    field: {
        marginBottom: 15, // Space between fields
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5, // Space between label and value
    },
    value: {
        fontSize: 16,
        fontWeight: '400',
        color: '#333',
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    button: {
        marginTop: 20,
        backgroundColor: '#0d6efd',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default DocumentDetail;
