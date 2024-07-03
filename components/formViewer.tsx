import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { forms } from '../app/forms/formConfig';

const DynamicForm = ({ formName, formData }) => {
    const formFields = forms[formName];

    return (
        <View style={styles.formContainer}>
            {formFields.map((field, index) => {
                const { name, label, type, readOnly } = field;
                const value = formData ? formData[name] : '';

                return (
                    <View key={index} style={styles.fieldContainer}>
                        <Text style={styles.label}>{label}</Text>
                        <TextInput
                            style={styles.input}
                            value={value}
                            placeholder={`Enter ${label}`}
                            editable={!readOnly}
                            keyboardType={type === 'number' ? 'numeric' : 'default'}
                        />
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        padding: 10,
    },
    fieldContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
});

export default DynamicForm;
