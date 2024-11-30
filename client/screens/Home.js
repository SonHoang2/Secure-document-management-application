import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { DOCS_URL } from '../shareVariables';
import * as DocumentPicker from 'expo-document-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocPopup from './components/DocPopup';

const Home = ({ navigation }) => {
    const [docs, setDocs] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    // set current document to be displayed in the modal
    const [popup, setPopup] = useState({
        visible: false,
        doc: null,
    });

    const getDocs = async () => {
        try {
            const res = await axios.get(DOCS_URL + "/recent");
            setDocs(res.data.data.docs);
        } catch (error) {
            if (error.response) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', error.message);
            }
        }
    }

    const Upload = async () => {
        try {
            const docs = await DocumentPicker.getDocumentAsync();
            const doc = docs.assets[0];

            const formData = new FormData();
            formData.append('file', {
                uri: doc.uri,
                type: doc.type,
                name: doc.name
            });

            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }


            const res = await axios.post(DOCS_URL + '/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(res.data);


        } catch (error) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User canceled document picker');
            } else {
                console.error('Error uploading file:', err);
                Alert.alert('Error', 'Failed to upload file');
            }
        }
    }

    const renderDocument = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('documentContent', { doc: item })}>
            <View style={styles.cardLeft}>
                <Ionicons name="document-text" style={styles.docIcon} />
                <View style={styles.cardBody}>
                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                    <Text>{item.createdAt}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => setPopup({
                visible: true,
                doc: item
            })}>
                <Ionicons name="ellipsis-vertical" style={styles.ellipsisIcon} />
            </TouchableOpacity>
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
            <TouchableOpacity onPress={Upload} style={styles.upload}>
                <AntDesign name="upload" size={24} color="#000" style={styles.uploadIcon} />
                <Text style={styles.uploadText}>Upload</Text>
            </TouchableOpacity>
            <DocPopup popup={popup} setPopup={setPopup}/>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardBody: {
        width: '80%',
        paddingLeft: 10
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        flexWrap: 'wrap',
    },
    upload: {
        backgroundColor: '#0d6efd',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        flexDirection: 'row',
    },
    uploadIcon: {
        color: '#fff',
        marginRight: 8,
    },
    uploadText: {
        color: '#fff',
        fontSize: 16,
    },
    docIcon: {
        fontSize: 30,
        paddingRight: 3,
        color: '#0d6efd',
    },
    ellipsisIcon: {
        fontSize: 24,
        padding: 8,
    },
});

export default Home;
