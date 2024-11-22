import React, { useState } from 'react';
import { View, TextInput, Modal, TouchableOpacity, StyleSheet, Text, StatusBar  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Search = () => {
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [query, setQuery] = useState('');

    return (
        <View>
            <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
            
            <TouchableOpacity onPress={() => setSearchVisible(true)}>
                <Icon name="search" size={24} color="#000" style={styles.searchIcon} />
            </TouchableOpacity>

            <Modal
                visible={isSearchVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setSearchVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.searchBar}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            placeholderTextColor="#c3c3c3"
                            value={query}
                            onChangeText={(text) => setQuery(text)}
                            autoFocus={true}
                        />
                        <TouchableOpacity onPress={() => setSearchVisible(false)}>
                            <Icon name="close" size={24} color="#000" style={styles.closeIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.searchBody}>
                        <Text style={styles.searchBodyText}>Search by name, keywords, object & more</Text>
                    </View>
                </View>
            </Modal>
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
    },
    searchBar: {
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
});

export default Search;
