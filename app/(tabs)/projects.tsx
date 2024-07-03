import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import supabase from '../../lib/supabase';
import { useVendor } from '../../context/vendor_context';
import ProjectCard from '../../components/projectCard';
import { useRouter } from 'expo-router';

const VendorProjects = () => {
    const { vendorId, user_id } = useVendor();
    const [projects, setProjects] = useState([]);
    const [vendorName, setVendorName] = useState('');
    const [activeTab, setActiveTab] = useState('ongoing');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    const fetchVendorDetails = async () => {
        try {
            const { data, error } = await supabase
                .from('vendors')
                .select('vendor_name')
                .eq('vendor_id', vendorId)
                .single();

            if (error) {
                console.error('Error fetching vendor details:', error);
                return;
            }

            setVendorName(data.vendor_name);
        } catch (error) {
            console.error('Unexpected error fetching vendor details:', error);
        }
    };

    const fetchProjects = async () => {
        setRefreshing(true);
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('vendor_id', vendorId)
                .eq('sent_to_vendor', true);

            if (error) {
                console.error('Error fetching projects:', error);
                return;
            }

            setProjects(data);
            filterProjectsByTab(activeTab, data);
        } catch (error) {
            console.error('Unexpected error fetching projects:', error);
        }
        setRefreshing(false);
    };

    const filterProjectsByTab = (tab, projects) => {
        const filtered = projects.filter(project => project.status === tab);
        setFilteredProjects(filtered);
    };

    useEffect(() => {
        if (vendorId) {
            fetchVendorDetails();
            fetchProjects();
        }
    }, [vendorId]);

    useEffect(() => {
        filterProjectsByTab(activeTab, projects);
    }, [activeTab, projects]);

    return (
        <View style={styles.container}>
            <Text style={styles.vendorDetails}>Vendor ID: {vendorId}</Text>
            {vendorName && <Text style={styles.vendorDetails}>Vendor Name: {vendorName}</Text>}
            <View style={styles.tabs}>
                <Pressable
                    style={activeTab === 'ongoing' ? styles.tabActive : styles.tab}
                    onPress={() => setActiveTab('ongoing')}
                >
                    <Text style={activeTab === 'ongoing' ? styles.tabTextActive : styles.tabText}>
                        Ongoing
                    </Text>
                </Pressable>
                <Pressable
                    style={activeTab === 'upcoming' ? styles.tabActive : styles.tab}
                    onPress={() => setActiveTab('upcoming')}
                >
                    <Text style={activeTab === 'upcoming' ? styles.tabTextActive : styles.tabText}>
                        Upcoming
                    </Text>
                </Pressable>
                <Pressable
                    style={activeTab === 'completed' ? styles.tabActive : styles.tab}
                    onPress={() => setActiveTab('completed')}
                >
                    <Text style={activeTab === 'completed' ? styles.tabTextActive : styles.tabText}>
                        Completed
                    </Text>
                </Pressable>
            </View>
            <FlatList
                data={filteredProjects}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() =>
                            router.push({
                                pathname: "../records/projects/[project_id]",
                                params: { id: item.project_id },
                            })
                        }
                    >
                        <ProjectCard project={item} />
                    </Pressable>


                )}
                keyExtractor={item => item.project_id.toString()}
                refreshing={refreshing}
                onRefresh={fetchProjects}
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
    vendorDetails: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        borderRadius: 15,
        backgroundColor: '#fff',
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginHorizontal: 5,
    },
    tabActive: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#060665',
        borderRadius: 20,
        marginHorizontal: 5,
    },
    tabText: {
        color: '#293462',
    },
    tabTextActive: {
        color: '#FFFFFF',
    },
});

export default VendorProjects;
