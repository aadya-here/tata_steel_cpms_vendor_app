import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Form {
    log_id: number;
    project_id: number;
    form_name: string;
    date: string;  // Assuming date is stored as string in the format 'YYYY-MM-DD'
    project_title: string;
}

interface FormCardProps {
    form_log: Form;
}

const FormCard: React.FC<FormCardProps> = ({ form_log }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.text}>
                Project {form_log.project_id} : {form_log.project_title}
            </Text>
            <Text style={styles.text}>{form_log.form_name} </Text>
            <Text style={styles.text}>Date: {form_log.date}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    text: {
        fontSize: 16,
        margin: 7,
        marginTop: 5,
        marginBottom: 0,
    },
});

export default FormCard;