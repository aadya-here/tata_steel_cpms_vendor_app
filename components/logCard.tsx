import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Log {
    log_id: number;
    project_id: number;
    date: string;  // Assuming date is stored as string in the format 'YYYY-MM-DD'
    day: string;
    project_title: string;
}

interface LogCardProps {
    log: Log;
}

const LogCard: React.FC<LogCardProps> = ({ log }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.text}>
                Project {log.project_id} : {log.project_title}
            </Text>
            <Text style={styles.text}>{log.date} | {log.day}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
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
        marginBottom: 8,
    },
});

export default LogCard;
