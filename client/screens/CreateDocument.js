import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { DOCS_URL } from '../shareVariables';

const CreateDocument = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSave = async () => {
        try {
            if (!title.trim() || !content.trim()) {
                Alert.alert('Validation Error', 'Title and content cannot be empty.');
                return;
            }
            const res = await axios.post(DOCS_URL + "/", {
                title,
                content,
            });

            Alert.alert('Success', 'Document saved successfully!');
            navigation.navigate('Root', { screen: 'Recent' })
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'An error occurred. Please try again.');
        }
    };

    return (
        <View style={styles.container}
            keyboardVerticalOffset={200}
        >
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter document title"
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.label}>Content</Text>
            <TextInput
                style={[styles.input, styles.contentInput]}
                placeholder="Enter document content"
                value={content}
                onChangeText={setContent}
                multiline
                textAlignVertical="top"
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save Document</Text>
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 16,
    },
    contentInput: {
        flex: 1,
    },
    button: {
        backgroundColor: '#28a745',
        padding: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    }
});

export default CreateDocument;
