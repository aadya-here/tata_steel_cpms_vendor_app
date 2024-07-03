import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Subheading = ({ text }) => {
    return <Text style={styles.subheading}>{text}</Text>;
};

const styles = StyleSheet.create({
    subheading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 15,
        textAlign: 'left',
        // Add any additional styles you need
    },
});

export default Subheading;
