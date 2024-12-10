import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { DOCS_URL } from '../shareVariables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocPopup from './components/DocPopup';


const PendingDocuments = ({ navigation }) => {
    const [docs, setDocs] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [popup, setPopup] = useState({
        visible: false,
        doc: null,
    });

    const getDocs = async () => {
        try {
            const res = await axios.get(DOCS_URL + "/status/pending");
            setDocs(res.data.data.docs);
        } catch (error) {
            if (error.response) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', error.message);
            }
        }
    }
    
    const renderDocument = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('documentContent', { doc: item })}>
            <View style={styles.cardLeft}>
                <Ionicons name="document-text" style={styles.docIcon} />
                <View style={styles.cardBody}>
                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                    {/* <View style={styles.cardBodyText}>
                        <Text>You {item.auditLogs[0].action} at </Text>
                        <Text>{
                            new Intl.DateTimeFormat('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            }).format(new Date(item.auditLogs[0].timestamp))
                        }</Text>
                    </View> */}
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
            {
                popup.visible &&
                <DocPopup setPopup={setPopup} navigation={navigation} doc={popup.doc} />
            }
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
    cardBodyText: {
        flexDirection: 'row',
        alignItems: 'flex-start'
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

export default PendingDocuments;
