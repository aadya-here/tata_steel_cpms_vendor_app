import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon'; // Adjust the import according to your icon library

interface InputFieldProps {
    placeholder: string;
    iconLib: React.ComponentType<IconProps>;
    iconName: string;
    onChangeText: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, iconLib: IconComponent, iconName, onChangeText }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
            <IconComponent name={iconName} size={24} color="grey" style={styles.icon} />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#555" // Set the placeholder text color to a darker shade
                style={styles.inputBox}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 10,
        marginVertical: 5,
        padding: 10,
    },
    inputContainerFocused: {
        borderColor: '#08077A',
    },
    icon: {
        marginRight: 10,
    },
    inputBox: {
        flex: 1,
        fontSize: 15,
        color: '#000',
    },
});

export default InputField;
