import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const NumericInput = ({ value, onChangeText, placeholder, style }) => {
    const [internalValue, setInternalValue] = useState(value);

    const handleTextChange = (text) => {
        // Remove non-numeric characters using regex
        const numericValue = text.replace(/[^0-9]/g, '');
        setInternalValue(numericValue);
        onChangeText(numericValue); // Pass the numeric value to parent component
    };

    return (
        <TextInput
            value={internalValue}
            onChangeText={handleTextChange}
            placeholder={placeholder}
            keyboardType="numeric"
            style={[styles.input, style]}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default NumericInput;
