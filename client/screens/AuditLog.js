import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { AUDITLOG } from '../shareVariables';

const AuditLog = ({ navigation }) => {
    const [totalLogs, setTotalLogs] = useState(0);
    const [auditLogs, setAuditLogs] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [queryParam, setQueryParam] = useState({
        page: 1,
        limit: 10,
        sort: '-timestamp',
    });


    const onRefresh = () => {
        setRefreshing(true);
        setAuditLogs([]);
        setTimeout(() => {
            setQueryParam({ ...queryParam, page: 1 });
            setRefreshing(false);
        }, 500);
    };

    const getAuditLogs = async () => {
        const res = await axios.get(AUDITLOG, {
            withCredentials: true,
            params: queryParam,
        });

        setTotalLogs(res.data.total);

        // not allow duplicate logs
        setAuditLogs(prev => {
            const newItems = res.data.data.auditLogs;

            // Create a Set to track existing IDs
            const existingIds = new Set(prev.map((item) => item.id));

            // Filter newItems to only include unique items
            const filteredItems = newItems.filter((item) => !existingIds.has(item.id));

            // Return the updated array
            return [...prev, ...filteredItems];
        });

        setIsLoading(false);
    };

    useEffect(() => {
        getAuditLogs();
    }, [navigation, queryParam.page]);

    const renderLogItem = ({ item }) => {

        return (
            <View style={styles.logItem}>
                <Text style={styles.logText}>
                    <Text style={styles.bold}>Action:</Text> {item.action}
                </Text>
                <Text style={styles.logText}>
                    <Text style={styles.bold}>User:</Text> {item.user.firstName} {item.user.lastName}
                </Text>
                <Text style={styles.logText}>
                    <Text style={styles.bold}>Document Title:</Text> {item.document.title}
                </Text>
                <Text style={styles.logText}>
                    <Text style={styles.bold}>Document Type:</Text> {item.document.type}
                </Text>
                <Text style={styles.logText}>
                    <Text style={styles.bold}>Timestamp:</Text> {new Date(item.timestamp).toLocaleString()}
                </Text>
            </View>
        )
    };

    const ListEndLoader = () => {
        if (isLoading) {
            return <ActivityIndicator size={'large'} style={styles.loading} />;
        }
    }

    console.log("hello");
    

    const handleEndReached = () => {
        if (!isLoading) {
            console.log('isLoading',isLoading);
            
            setIsLoading(true);
            setQueryParam(prev => {
                console.log(prev.page);
    
                const maxPages = Math.ceil(totalLogs / queryParam.limit);
                if (prev.page >= maxPages) {
                    setIsLoading(false);
                    return prev;
                }
    
                return { ...prev, page: prev.page + 1 }
            })
        }
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={auditLogs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderLogItem}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.8}
                ListFooterComponent={ListEndLoader}
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
    loading: {
        marginVertical: 40,
    },
});

export default AuditLog;
