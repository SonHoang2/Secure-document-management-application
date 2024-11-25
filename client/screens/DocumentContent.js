import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import PlainFile from './components/PlainFile';
import PdfFile from './components/PdfFile';

const DocumentContent = ({ route, navigation }) => {
    const { doc } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: doc.title });
    }, [navigation, doc.title]);

    console.log(doc.type);
    
    return (
        <View style={styles.container}>
            {doc.type === 'plain' && <PlainFile doc={doc} />}
            {doc.type === 'pdf' && <PdfFile doc={doc} />}
        </View>
    );
};

const styles = StyleSheet.create({
    
});

export default DocumentContent;
