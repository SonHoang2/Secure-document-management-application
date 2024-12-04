import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { IMAGES_URL } from '../shareVariables';

const Profile = ({ navigation, route }) => {
    const { user } = route.params
    console.log(route.params.user);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: IMAGES_URL + '/' + user.avatar }}
                    style={styles.avatar}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>
                    {user.firstName} {user.lastName}
                </Text>
                <View style={styles.infoItem}>
                    <Text style={styles.textBold}>Email:</Text>
                    <Text style={styles.text}>{user.email}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.textBold}>Role:
                    </Text>
                    <Text style={styles.text}>{user.role}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.textBold}>
                        Google Account:
                    </Text>
                    <Text style={styles.text}>
                        {user.googleAccount ? "Yes" : "No"}
                    </Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.textBold}>
                        Password Changed:
                    </Text>
                    <Text style={styles.text}>
                        {user.passwordChangedAt
                            ? new Date(user.passwordChangedAt).toLocaleDateString()
                            : "Never"
                        }
                    </Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.textBold}>
                        Status:
                    </Text>
                    {user.active ?
                        <Text style={styles.statusSuccess}>Active</Text>
                        :
                        <Text style={styles.statusFail}>Inactive</Text>
                    }
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: 20,
        backgroundColor: "#f9f9f9",
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 20,
        paddingLeft: 20
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    infoContainer: {
        justifyContent: 'start',
        paddingLeft: 20,
    },
    infoItem: {
        flexDirection: 'row',
        marginBottom: 10
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    textBold: {
        fontSize: 20,
        fontWeight: '700',
        color: 'black',
        paddingRight: 10
    },
    text: {
        fontSize: 20,
        fontWeight: '400',
        color: 'black',
    },
    statusSuccess: {
        fontSize: 20,
        fontWeight: '400',
        color: "green"
    },
    statusFail: {
        fontSize: 20,
        fontWeight: '400',
        color: "red"
    },
});

export default Profile;
