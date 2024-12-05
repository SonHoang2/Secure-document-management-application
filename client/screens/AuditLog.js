import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { AUDITLOG } from '../shareVariables';

const AuditLog = ({ navigation }) => {
    const [auditLogs, setAuditLogs] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            getAuditLogs();
            setRefreshing(false);
        }, 2000);
    };

    const getAuditLogs = async () => {
        const res = await axios.get(AUDITLOG + '/?sort=-timestamp', { withCredentials: true });
        console.log(res.data.data.auditLogs);
        setAuditLogs(res.data.data.auditLogs);
    };

    useEffect(() => {
        getAuditLogs();
    }, [navigation]);

    const renderLogItem = ({ item }) => (
        <View style={styles.logItem}>
            <Text style={styles.logText}>
                <Text style={styles.bold}>Action:</Text> {item.action}
            </Text>
            <Text style={styles.logText}>
                <Text style={styles.bold}>User:</Text> {item.user.firstName} {item.user.lastName}
            </Text>
            <Text style={styles.logText}>
                <Text style={styles.bold}>Document ID:</Text> {item.documentId || "N/A"}
            </Text>
            <Text style={styles.logText}>
                <Text style={styles.bold}>Timestamp:</Text> {new Date(item.timestamp).toLocaleString()}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={auditLogs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderLogItem}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    logItem: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    },
    logText: {
        fontSize: 16,
        marginBottom: 5,
    },
    bold: {
        fontWeight: "bold",
    },
});

export default AuditLog;
