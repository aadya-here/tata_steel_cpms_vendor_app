import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Alert, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import supabase from '../../../lib/supabase';
import { MaterialIcons } from '@expo/vector-icons';
import { useVendor } from '../../../context/vendor_context';
import { useNavigation, useRouter } from 'expo-router';
import moment from 'moment';

interface Project {
    project_id: number;
    type: string;
    status: string;
    location: string;
    vendor_id: number;
    project_title: string;
    project_goal: string;
    network_num: string;
    scheme_num: string;
    planned_start_date: Date;
    actual_start_date: Date;
    planned_end_date: Date;
    actual_end_date: Date;
    delivery_end_date: Date;
    validity_end_date: Date;
    work_order_num: string;
    created_on: Date;
    sent_to_vendor: boolean;
}

const ProjectPage = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { vendorId } = useVendor();
    const [projectId, setProjectId] = useState<string | null>(null);
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSent, setIsSent] = useState<boolean>(false);

    const navigation = useNavigation();
    const router = useRouter();
    const params_send = useLocalSearchParams();

    useEffect(() => {
        if (id) {
            setProjectId(id);
        } else {
            console.error('No project ID found in URL parameters');
        }
    }, [id]);

    useEffect(() => {
        const fetchProject = async () => {
            if (!projectId) {
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('project_id', projectId)
                    .single();

                if (error) {
                    console.error('Error fetching project:', error);
                    Alert.alert('Error', 'Error fetching project details.');
                } else {
                    setProject(data);
                    setIsSent(data.sent_to_vendor);
                }
            } catch (error) {
                console.error('Error fetching project:', error);
                Alert.alert('Error', 'An unexpected error occurred while fetching the project details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    const fetchLog = async () => {
        try {

            const today_date = new Date()
            const { data, error } = await supabase
                .from('logs')
                .select('*')
                .eq('project_id', projectId)
                .eq('vendor_id', vendorId)
                .order('log_id', { ascending: false })
            // .eq('created_on', today_date);

            if (error) {
                console.error('Error fetching logs:', error);
                return;
            }
            const todayDate = new Date().toISOString().split('T')[0];
            const latestLogDate = data[0]['created_on'].split('T')[0];


            if (todayDate == latestLogDate) {
                // console.log(new Date().toISOString().split('T')[0]);
                // console.log(data[0]['created_on'].split('T')[0]);
                Alert.alert("Today's log has already been created. Edit from the logs page.");
            } else {
                console.log(data[0]);
                router.push({
                    pathname: '../../forms/create_log',
                    params: { projectId }
                });
            }
        } catch (error) {
            console.error('Error fetching log:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!project) {
        return (
            <View style={styles.container}>
                <Text>No project found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{project.project_title}</Text>
            {/* Display project details */}
            <Text style={styles.label}>Vendor ID: <Text style={styles.value}>{vendorId}</Text></Text>
            <Text style={styles.label}>Type: <Text style={styles.value}>{project.type}</Text></Text>
            <Text style={styles.label}>Status: <Text style={styles.value}>{project.status}</Text></Text>
            <Text style={styles.label}>Location: <Text style={styles.value}>{project.location}</Text></Text>

            <Pressable style={styles.addButton} onPress={fetchLog}>
                <MaterialIcons name="add" size={24} color="#F4F4FF" />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F4F4FF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#060665',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    value: {
        fontWeight: 'normal',
        color: '#666',
    },
    button: {
        backgroundColor: '#060665',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 18,
        color: '#F4F4FF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    addButton: {
        position: 'absolute',
        bottom: 50,
        right: 40,
        backgroundColor: '#060665',
        padding: 10,
        borderRadius: 50,
        elevation: 5,
    },
});

export default ProjectPage;
