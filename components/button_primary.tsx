import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const CustomButton = ({ text, onPress }) => {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#060665',
        paddingVertical: 10,
        margin: 20,
        marginBottom: 50,
        borderRadius: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomButton;
