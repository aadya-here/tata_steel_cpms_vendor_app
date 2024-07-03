import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import LogCard from '../../components/logCard';
import { useVendor } from '../../context/vendor_context';
import supabase from '../../lib/supabase';
import { useRouter } from 'expo-router';
import Title from '../../components/title';

const Logs = () => {
    const { vendorId } = useVendor();
    const [logs, setLogs] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchLogs();
    }, [vendorId]);

    const fetchLogs = async () => {
        setRefreshing(true);
        try {
            const { data: logData, error: logError } = await supabase
                .from('logs')
                .select('*')
                .eq('vendor_id', vendorId)
                .order('created_on', { ascending: false });

            if (logError) {
                console.error('Error fetching logs:', logError);
                return;
            }

            const projectIds = [...new Set(logData.map(log => log.project_id))];
            const { data: projectData, error: projectError } = await supabase
                .from('projects')
                .select('project_id, project_title')
                .in('project_id', projectIds);

            if (projectError) {
                console.error('Error fetching project names:', projectError);
                return;
            }

            const projectMap = projectData.reduce((pid, project) => {
                pid[project.project_id] = project.project_title;
                return pid;
            }, {});

            const processedLogs = logData.map(log => {
                const createdOn = new Date(log.created_on);
                const date = createdOn.toLocaleDateString();
                const day = createdOn.toLocaleDateString('en-US', { weekday: 'long' });
                const projectName = projectMap[log.project_id] || 'Unknown Project';

                return {
                    ...log,
                    date,
                    day,
                    project_title: projectName,
                };
            }).sort((a, b) => new Date(b.created_on).getTime() - new Date(a.created_on).getTime());

            setLogs(processedLogs);
        } catch (error) {
            console.error('Error fetching logs:', error.message);
        }
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <Title text="Daily Logs" />
            <FlatList
                data={logs}
                keyExtractor={(item) => item.log_id.toString()}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() =>
                            router.push({
                                pathname: "../records/logs/[log_id]",
                                params: { id: item.log_id },
                            })
                        }
                    >
                        <LogCard log={item} />
                    </Pressable>
                )}
                refreshing={refreshing}
                onRefresh={fetchLogs}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     paddingHorizontal: 16,
    //     paddingTop: 16,
    //     backgroundColor: '#f0f0f0',
    // },

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F4F4FF',
    },
});

export default Logs;