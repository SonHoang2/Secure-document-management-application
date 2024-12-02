import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const DocPopup = ({ setPopup, navigation, doc }) => {
    

    return (
        <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => setPopup(prev => ({ ...prev, visible: false }))}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                onPress={() => setPopup(prev => ({ ...prev, visible: false }))}
            >
                <View
                    style={styles.modalContainer}
                    onStartShouldSetResponder={() => true}
                    onTouchEnd={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <View style={styles.ModalHeader}>
                        <Ionicons name="document-text" style={styles.ModalHeaderIcon} />
                        <Text style={styles.ModalHeaderText} numberOfLines={1}>{doc?.title}</Text>
                    </View>
                    <TouchableOpacity style={styles.ModalBodyButton}
                        onPress={() => navigation.navigate('documentDetail',
                            {
                                doc: doc,
                                screen: 'DocumentDetail'
                            }
                        )}
                    >
                        <Feather name="info" style={styles.ModalBodyIcon} />
                        <Text style={styles.ModalBodyText}>Details</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: 'white',
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    ModalHeaderText: {
        color: '#1b1a1f',
        fontSize: 18,
        fontWeight: 'bold',
        width: '80%',
        paddingLeft: 10,
    },
    ModalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        padding: 20,
        borderBlockColor: '#c5c6c6',
        borderBottomWidth: 1.5,
        width: '100%',

    },
    ModalHeaderIcon: {
        fontSize: 30,
        color: '#0d6efd',
    },
    ModalBodyButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 20,
    },
    ModalBodyIcon: {
        fontSize: 30,
    },
    ModalBodyText: {
        color: '#1b1a1f',
        fontSize: 18,
        paddingLeft: 10
    },
});

export default DocPopup;
