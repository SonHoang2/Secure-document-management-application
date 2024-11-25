import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { DOCS_URL } from '../../shareVariables';

const PlainFile = ({ doc }) => {
    const [content, setContent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const toggleMode = () => {
        setIsEditing((prev) => !prev);
    };

    const saveChanges = () => {
        Alert.alert('Success', 'content has been saved!');
        setIsEditing(false);
    };

    const getFile = async () => {
        try {
            const res = await axios.get(DOCS_URL + `/${doc.id}/content`);
            console.log(res.data);
            
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
        <View>
            <View style={styles.toggleContainer}>
                <Button
                    title={isEditing ? 'Switch to Read Mode' : 'Switch to Edit Mode'}
                    onPress={toggleMode}
                />
            </View>
            <View style={styles.contentContainer}>
                {isEditing ? (
                    <TextInput
                        style={styles.textInput}
                        multiline
                        value={content}
                        onChangeText={setContent}
                    />
                ) : (
                    <Text style={styles.textContent}>{content}</Text>
                )}
            </View>
            {isEditing && (
                <Button title="Save Changes" onPress={saveChanges} color="#4CAF50" />
            )}
        </View>
    );
}


const styles = StyleSheet.create({

});

export default PlainFile;