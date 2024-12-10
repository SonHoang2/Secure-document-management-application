import { useState, useEffect } from 'react';
import { View, TextInput, Modal, TouchableOpacity, StyleSheet, Text, StatusBar, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { DOCS_URL } from '../shareVariables';

const Search = ({ navigation }) => {
    const [searchValue, setSearchValue] = useState('');
    const [docs, setDocs] = useState([]);

    const getDocs = async () => {
        try {
            const res = await axios.get(DOCS_URL + "/search/" + searchValue);
            setDocs(res.data.data.docs);
        } catch (error) {
            console.error(error);
        }
    }

    const renderDocument = ({ item }) => {
        console.log(item);

        return (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('documentContent', { doc: item })}>
                <View style={styles.cardLeft}>
                    <Ionicons name="document-text" style={styles.docIcon} />
                    <View style={styles.cardBody}>
                        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                        <View style={styles.cardBodyText}>
                            {/* <Text style={styles.title} numberOfLines={1}>{item.}</Text> */}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    function useDebounce(cb, delay) {
        try {
            useEffect(() => {
                if (cb === "") {
                    setDocs([]);
                    return;
                };

                const handler = setTimeout(async () => {
                    const res = await axios.get(DOCS_URL + "/search/" + searchValue);
                    setDocs(res.data.data.docs);
                }, delay);

                return () => {
                    clearTimeout(handler);
                };
            }, [cb, delay]);

            return docs;
        } catch (err) {
            console.log(err);
        }
    }

    useDebounce(searchValue, 500);

    return (
        <View style={styles.modalContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Root', { screen: 'Recent' })}>
                    <Ionicons name="arrow-back" style={styles.searchIcon} />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    value={searchValue}
                    onChangeText={(text) => setSearchValue(text)}
                    autoFocus={true}
                    onSubmitEditing={() => getDocs()}
                />
                <TouchableOpacity onPress={() => setSearchValue("")}>
                    <MaterialIcons name="close" style={styles.closeIcon} />
                </TouchableOpacity>
            </View>
            {
                searchValue === "" ?
                    <View style={styles.searchBody}>
                        <Text style={styles.searchBodyText}>Search by name, keywords, object & more</Text>
                    </View>
                    :
                    docs.length === 0 ?
                        <View style={styles.searchBody}>
                            <Text style={styles.searchBodyText}>No results found</Text>
                        </View>
                        :
                        <FlatList
                            data={docs}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderDocument}
                        />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    searchIcon: {
        fontSize: 24,
        color: '#000',
        marginRight: 15,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight + 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        paddingHorizontal: 10,
        height: 50,
        shadowColor: '#000',
        marginBottom: 20
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    closeIcon: {
        fontSize: 20,
        color: '#000',
        marginLeft: 10,
    },
    searchBody: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBodyText: {
        fontSize: 16,
        color: '#616161',
    },
    card: {
        backgroundColor: '#fafafa',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardBody: {
        width: '100%',
        paddingLeft: 10
    },
    cardBodyText: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        flexWrap: 'wrap',
    },
    upload: {
        backgroundColor: '#0d6efd',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        flexDirection: 'row',
    },
    uploadIcon: {
        color: '#fff',
        marginRight: 8,
    },
    uploadText: {
        color: '#fff',
        fontSize: 16,
    },
    docIcon: {
        fontSize: 30,
        paddingRight: 3,
        color: '#0d6efd',
    },
    ellipsisIcon: {
        fontSize: 24,
        padding: 8,
    },
});

export default Search;
