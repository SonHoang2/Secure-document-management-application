import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const DocPopup = ({ popup, setPopup, }) => {


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={popup.visible}
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
                    <Text style={styles.modalText}>{popup.doc.title}</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Details</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: '#1b1a1f',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    modalText: {
        color: '#1b1a1f',
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
    },
});

export default DocPopup;
