import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Project {
    project_id: number;
    type: string;
    status: string;
    location: string;
    vendor_id: number;
}

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Project ID: {project.project_id}</Text>
            <Text>Type: {project.type}</Text>
            <Text>Status: {project.status}</Text>
            <Text>Location: {project.location}</Text>
            <Text>Vendor ID: {project.vendor_id}</Text>
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
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

export default ProjectCard;
