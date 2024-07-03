import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { router } from 'expo-router';

const Index = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../assets/index_img.png')}
                contentFit='contain'
            />

            <Text style={styles.title}>Tata Steel CPMS</Text>
            <Text style={styles.subtitle_bold}>Construction Project Managment System</Text>

            <Text style={styles.subtitle}>Track your projects anywhere, anytime.</Text>

            <Pressable style={styles.button} onPress={() => router.push('auth_screen')}>
                <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>

            <Text style={styles.subtitle_bold}>For Vendor Partners</Text>


            {/* <Text style={styles.link} onPress={() => { router.push('signup') }}>join the fam</Text> */}
        </View>
    );
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4FF',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1, // This maintains the aspect ratio
        marginTop: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2F394B',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 17,
        color: '#2F394B',
        margin: 7,
    },

    subtitle_bold: {
        fontSize: 16,
        color: '#2F394B',
        marginTop: 10,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#060665',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 10,
        margin: 30,
    },
    buttonText: {
        fontSize: 18,
        color: '#F4F4FF',
        fontWeight: 'black',
    },
    link: {
        fontSize: 14,
        color: '#2F394B',
        marginTop: 10,
        textDecorationLine: 'underline',
    }
});
