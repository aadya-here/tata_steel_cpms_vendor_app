// ToolboxTalkEntry.js

import React from 'react';
import { Text, StyleSheet } from 'react-native';

const FormFieldView = ({ label, value }) => {
    return (
        <Text style={styles.entryText}>
            <Text style={styles.boldText}>{label}: </Text>
            {value}
        </Text>
    );
};

const styles = StyleSheet.create({
    entryText: {
        fontSize: 16,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 17,
    },
});

export default FormFieldView;
