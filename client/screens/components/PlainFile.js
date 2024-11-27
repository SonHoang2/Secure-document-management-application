import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { DOCS_URL } from '../../shareVariables';

const PlainFile = ({ doc }) => {
    const [content, setContent] = useState(null);

    const saveChanges = () => {
        Alert.alert('Success', 'content has been saved!');
    };

    const getFile = async () => {
        try {
            const res = await axios.get(DOCS_URL + `/${doc.id}/content`);
            setContent(res.data);
        } catch (error) {
            if (error.response) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', error.message);
            }
        }
    }

    useEffect(() => {
        getFile();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TextInput
                    style={styles.textInput}
                    multiline
                    value={content}
                    onChangeText={setContent}
                />
            </View>
            <Button title='Save Changes' onPress={saveChanges} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15
    },
    contentContainer: {
        flex: 1,
        marginBottom: 40,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
        textAlignVertical: 'top',
    },
    textContent: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
});

export default PlainFile;