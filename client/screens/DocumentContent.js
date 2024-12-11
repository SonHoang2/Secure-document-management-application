import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import PlainFile from './components/PlainFile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { checkRole } from '../utils/checkRole';
import { documentStatus, roleName } from '../shareVariables';
import { DOCS_URL } from '../shareVariables';

const DocumentContent = ({ route, navigation }) => {
    const { doc, user } = route.params;

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            title: doc.title,
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={styles.MoreButton}
                >
                    <Ionicons
                        name="ellipsis-vertical"
                        style={styles.MoreIcon}
                    />
                </TouchableOpacity>
            ),
        });

    }, [navigation, doc.title]);

    const handleApprove = async () => {
        try {
            setModalVisible(false);
            await axios.patch(DOCS_URL + `/${doc.id}`, { status: documentStatus.Approved });
            navigation.goBack()
        } catch (error) {
            console.log(error);
            alert('Error approving document');
        }
    };

    const handleReject = async () => {
        try {
            setModalVisible(false);
             await axios.patch(DOCS_URL + `/${doc.id}`, { status: documentStatus.Rejected });
            navigation.goBack()
        } catch (error) {
            console.log(error);
            alert('Error approving document');
        }
    };


    return (
        <View style={styles.container}>
            {doc.type === 'txt' && <PlainFile doc={doc} />}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setModalVisible(false)
                    }
                >
                    <View style={styles.modalContent}>
                        {
                            checkRole(user, roleName.Manager) &&
                            doc.status === documentStatus.Pending &&
                            <View>
                                <TouchableOpacity style={styles.button} onPress={handleApprove}>
                                    <Entypo name="thumbs-up" style={styles.buttonIcon} />
                                    <Text style={styles.buttonText}>Approve</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={handleReject}>
                                    <Entypo name="thumbs-down" style={styles.buttonIcon} />
                                    <Text style={styles.buttonText}>Reject</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate('documentDetail',
                                    {
                                        doc: doc,
                                        screen: 'DocumentDetail'
                                    }
                                )
                            }}
                        >
                            <Feather name="info" style={styles.buttonIcon} />
                            <Text style={styles.buttonText}>Details</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    MoreIcon: {
        fontSize: 24,
        marginRight: 5,
        padding: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    modalContent: {
        marginTop: 20,
        width: 300,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    button: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonIcon: {
        fontSize: 20,
        marginRight: 5,
    },
    buttonText: {
        fontSize: 16,
    },
});

export default DocumentContent;
