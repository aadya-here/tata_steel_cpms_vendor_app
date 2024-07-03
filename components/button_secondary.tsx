import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const SecondaryButton = ({ onPress, text }) => {
    return (
        <Pressable onPress={onPress} style={styles.secButton}>
            <Text style={styles.secButtonText}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    secButton: {
        borderWidth: 2,
        borderColor: '#060665',
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 35,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secButtonText: {
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default SecondaryButton;
