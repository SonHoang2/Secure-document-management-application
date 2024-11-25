import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { DOCS_URL } from '../../shareVariables';
import Pdf from 'react-native-pdf';

const PdfFile = ({ doc }) => {
    const [content, setContent] = useState('');

    const getFile = async () => {
        try {
            // const res = await axios.get(DOCS_URL + `/${doc.id}/content`);
            // setContent(res.data);
            // console.log("res.data", res.data);
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

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    webview: { flex: 1 },
});

export default PdfFile;
