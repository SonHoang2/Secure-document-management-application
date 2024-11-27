import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import PlainFile from './components/PlainFile';

const DocumentContent = ({ route, navigation }) => {
    const { doc } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: doc.title });
    }, [navigation, doc.title]);

    console.log(doc.type);

    return (
        <View style={styles.container}>
            {doc.type === 'plain' && <PlainFile doc={doc} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default DocumentContent;
