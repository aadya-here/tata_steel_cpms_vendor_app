import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, AppState, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import supabase from '../lib/supabase';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleAppStateChange = (state) => {
            if (state === 'active') {
                supabase.auth.startAutoRefresh();
            } else {
                supabase.auth.stopAutoRefresh();
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        // Cleanup the event listener
        return () => {
            subscription.remove();
        };
    }, []);

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            Alert.alert(error.message);
            console.log(error);
        } else {
            Alert.alert('Signed in successfully!');
            router.push('vendor_screen');
        }
        setLoading(false);
    }

    return (
        // <SafeAreaView
        //     edges={["top"]}
        //     style={{ flex: 0, backgroundColor: "#FFFDEB" }}>

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Sign In</Text>
                {/* <Image
                    style={styles.image}
                    source={require('../assets/splash_img.png')}
                    contentFit='contain'
                /> */}
                {/* <Text style={styles.welcomeText}>Welcome Back</Text> */}
                <TextInput
                    style={[styles.input, emailFocused && styles.inputFocused]}
                    placeholder="Enter your Email"
                    placeholderTextColor="#888"
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    onChangeText={setEmail}
                    value={email}
                />
                <TextInput
                    style={[styles.input, passwordFocused && styles.inputFocused]}
                    placeholder="Enter your Password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    onChangeText={setPassword}
                    value={password}
                />
                <Pressable onPress={() => { }}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={signInWithEmail} disabled={loading}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F4F4FF',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#2F394B',
        marginBottom: 20,
        textAlign: 'center',
    },
    image: {
        width: '70%',
        height: undefined,
        aspectRatio: 1, // This maintains the aspect ratio
        marginBottom: 20,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 20,
        color: '#2F394B',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        width: '90%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#FBFBFD',
        color: '#2F394B',
    },
    inputFocused: {
        borderColor: '#060665',
    },
    forgotPassword: {
        color: '#888',
        alignSelf: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#060665',
        paddingVertical: 15,
        paddingHorizontal: 125,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#F4F4FF',
    },
    switchText: {
        color: '#888',
        marginTop: 10,
        textAlign: 'center',
    },
    linkText: {
        color: '#FF9900',
        fontWeight: 'bold',
    },
});
