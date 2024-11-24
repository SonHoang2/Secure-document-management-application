import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const DocumentContent = ({ route, navigation }) => {
    const { document } = route.params;
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(document.content);

    const toggleMode = () => {
        setIsEditing((prev) => !prev);
    };

    const saveChanges = () => {
        // Simulate saving the content to a backend
        Alert.alert('Success', 'Document content has been saved!');
        setIsEditing(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{document.title}</Text>
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    toggleContainer: {
        marginBottom: 16,
    },
    contentContainer: {
        flex: 1,
        marginBottom: 16,
    },
    textInput: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlignVertical: 'top',
    },
    textContent: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default DocumentContent;
