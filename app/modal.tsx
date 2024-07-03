import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import supabase from '../lib/supabase'
import { router } from 'expo-router'

const handleSignout = async () => {
    // const { error } = await supabase.auth.signOut()
    // if (error) {
    //     console.error('Error signing out:', error.message)
    //     return
    // }
    // console.log('Signed out successfully')
    router.push('auth_screen')
}

const Modal = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleSignout}>
                <Text>Signout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Modal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
