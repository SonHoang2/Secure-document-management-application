import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import PlainFile from './components/PlainFile';

const DocumentContent = ({ route, navigation }) => {
    const { doc } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: doc.title });
    }, [navigation, doc.title]);

    return (
        <View style={styles.container}>
            {doc.type === 'txt' && <PlainFile doc={doc} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default DocumentContent;
