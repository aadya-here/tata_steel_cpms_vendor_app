import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import FormCard from '../../components/formCard';
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
                .from('forms_logs')
                .select('*, forms_list(form_name), projects(project_title)')
                .eq('vendor_id', vendorId)
                .order('created_on', { ascending: false });

            if (logError) {
                console.error('Error fetching logs:', logError);
                return;
            }

            // console.log('Fetched log data:', test);

            const processedLogs = logData.map(log => {
                const createdOn = new Date(log.created_on);
                const date = createdOn.toLocaleDateString();
                const projectName = log.projects ? log.projects.project_title : 'Unknown Project';
                const formName = log.forms_list ? log.forms_list.form_name : 'Unknown Form';

                return {
                    ...log,
                    date,
                    project_title: projectName,
                    form_name: formName,
                };
            }).sort((a, b) => new Date(b.created_on).getTime() - new Date(a.created_on).getTime());

            // console.log('Processed logs:', processedLogs);

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
                keyExtractor={(item) => item.form_log_id.toString()}
                renderItem={({ item }) => (
                    <Pressable
                    // onPress={() =>
                    //     router.push({
                    //         pathname: "../records/logs/[log_id]",
                    //         params: { id: item.log_id },
                    //     })
                    // }
                    >
                        <FormCard form_log={item} />
                    </Pressable>
                )}
                refreshing={refreshing}
                onRefresh={fetchLogs}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F4F4FF',
    },
});

export default Logs;
