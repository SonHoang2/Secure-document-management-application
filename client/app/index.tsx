import { Text, View, Button } from "react-native";
import axios from "axios";
import React from "react";
import { useState } from "react";

export default function Index() {
    const [documents, setDocuments] = useState("");

    const fetchDocuments = async () => {
        try {
            const response = await axios.get("http://192.168.1.66:5000/api/v1/documents");
            setDocuments(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            <Text>{documents}</Text>
            <Button
                title="Press me"
                onPress={() => fetchDocuments()}
            />
        </View>
    );
}
