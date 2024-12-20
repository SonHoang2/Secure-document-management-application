import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { IMAGES_URL } from '../shareVariables';
import Feather from 'react-native-vector-icons/Feather';

const Profile = ({ navigation, route }) => {
    const { user } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.avatarContainer}>
                <View>
                    <Image
                        source={{ uri: IMAGES_URL + '/' + user.avatar }}
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                    <TouchableOpacity style={styles.editAvatarButton}>
                        <Feather name="edit" style={styles.editAvatarIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.textBold}>First Name:</Text>
                <TextInput
                    style={styles.textInput}
                    value={user.firstName}
                    editable={false}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.textBold}>Last Name:</Text>
                <TextInput
                    style={styles.textInput}
                    value={user.lastName}
                    editable={false}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.textBold}>Email:</Text>
                <TextInput
                    style={styles.textInput}
                    value={user.email}
                    editable={false}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.textBold}>Role:</Text>
                <TextInput
                    style={styles.textInput}
                    value={user.role}
                    editable={false}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.textBold}>Google Account:</Text>
                <TextInput
                    style={styles.textInput}
                    value={user.googleAccount ? "Yes" : "No"}
                    editable={false}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.textBold}>Password Changed:</Text>
                <TextInput
                    style={styles.textInput}
                    value={user.passwordChangedAt
                        ? new Date(user.passwordChangedAt).toLocaleString()
                        : "Never"}
                    editable={false}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.textBold}>Status:</Text>
                <TextInput
                    style={user.active ? styles.statusSuccess : styles.statusFail}
                    value={user.active ? "Active" : "Inactive"}
                    editable={false}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: "#fff",
        shadowColor: "#4caf50",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 10,
    },
    editAvatarButton: {
        position: 'absolute',
        right: 5,
        bottom: 25,
        backgroundColor: "#fff",
        padding: 5,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    editAvatarIcon: {
        fontSize: 20,
        color: "#333",
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
    card: {
        marginBottom: 15,
    },
    textBold: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    textInput: {
        fontSize: 16,
        fontWeight: '400',
        color: '#333',
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    statusSuccess: {
        fontSize: 16,
        fontWeight: '600',
        color: "green",
        backgroundColor: "#f0fff4",
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#a3d9a5",
    },
    statusFail: {
        fontSize: 16,
        fontWeight: '600',
        color: "red",
        backgroundColor: "#fff5f5",
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#f5a3a3",
    },
});

export default Profile;
