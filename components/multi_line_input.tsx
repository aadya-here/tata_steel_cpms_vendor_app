import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const TextAreaInput = ({ placeholder, onChangeText, value }) => {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={'#555'}
            style={styles.textArea}
            onChangeText={onChangeText}
            value={value}
            multiline={true}
        />
    );
};

const styles = StyleSheet.create({
    textArea: {
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        height: 100,
        textAlignVertical: 'top',
        backgroundColor: '#fff',
        fontSize: 15,
    },
});

export default TextAreaInput;
