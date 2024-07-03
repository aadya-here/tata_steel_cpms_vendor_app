import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Linking, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import supabase from '../../../lib/supabase'; // Adjust the path as necessary
import { useVendor } from '../../../context/vendor_context'; // Adjust the path as necessary
import Collapsible from 'react-native-collapsible';
import { AntDesign } from '@expo/vector-icons';
import Subheading from '../../../components/subheading';
import Title from '../../../components/title';

import FormFieldView from '../../../components/form_field_view';

import { Image } from 'expo-image';
import AddPhoto from '../../../components/add_photos';
import CollapsibleSection from '../../../components/collapsible_section';

interface LogInfo {
    project_id: number;
    vendor_id: number;
    work_permit: string;
    valid_from: string;
    valid_till: string;
    num_workers: number;
    ppe_checklist_id: number; // Assume this is the correct reference key
}

interface PPEEntry {
    p_no: number;
    name: string;
    ppe_items: string[];
    remarks: string;
}

interface ToolboxTalk {
    department: string;
    safety_rep: string;
    contractor_rep: string;
    num_workers: number;
    num_supervisors: number;
    supervisor_or_manager: string;
    SOP_no: string;
    action_items: string;
    prev_incident: string;
    reminders: string[];
    safety_msg: string;
    hazards: string;
    location: string;
    safety_contact: number;
    stripes: boolean;
}

interface FirstAidForm {
    incident_id: number;
    description: string;
    treatment: string;
    date: string;
    time: string;
    first_aid_given_by: string;
    follow_up_required: boolean;
}

interface FIMForm {
    log_id: number;
    cement: number;
    reinforcement: number;
    foundation_bolts: number;
    bar_dia_info: { dia: number, amount: number }[];
    bolts_remarks: string;
}

interface UpdateForm {
    update_id: number;
    description: string;
    issues: string;
    photo_url: string;
}

const LogInfoPage = () => {
    const { id } = useLocalSearchParams();
    const { vendorId, user_id } = useVendor(); // Assuming useVendor is a custom hook that returns vendorId and userId
    const [logInfo, setLogInfo] = useState<LogInfo | null>(null);
    const [ppeChecklist, setPpeChecklist] = useState<PPEEntry[]>([]);
    const [toolboxTalk, setToolboxTalk] = useState<ToolboxTalk | null>(null);
    const [firstAidForms, setFirstAidForms] = useState<FirstAidForm[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPPECollapsed, setIsPPECollapsed] = useState(true); // State for collapsible
    const [isTBTCollapsed, setIsTBTCollapsed] = useState(true); // State for toolbox talk collapsible
    const [isFirstAidCollapsed, setIsFirstAidCollapsed] = useState(true); // State for first aid collapsible
    const [fimForms, setFimForms] = useState<FIMForm[]>([]);
    const [isFIMCollapsed, setIsFIMCollapsed] = useState(true);
    const [isPhotosCollapsed, setIsPhotosCollapsed] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);

    const [updates, setUpdates] = useState<UpdateForm[]>([]);
    const [isUpdatesCollapsed, setIsUpdatesCollapsed] = useState(true);

    useEffect(() => {
        if (!isPhotosCollapsed) {
            fetchLogPhotos();

        }
    }, [isPhotosCollapsed]);

    useEffect(() => {
        fetchLogInfo();
    }, [id]);

    const fetchLogInfo = async () => {
        try {
            const { data, error } = await supabase
                .from('logs')
                .select('*')
                .eq('log_id', id)
                .eq('vendor_id', vendorId)
                .single();

            if (error) throw error;
            setLogInfo(data);

        } catch (error) {
            console.error('Error fetching log info:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPpeChecklist = async () => {
        try {
            const { data, error } = await supabase
                .from('ppe_checklist')
                .select('*')
                .eq('log_id', id);

            if (error) throw error;
            setPpeChecklist(data);
        } catch (error) {
            console.error('Error fetching PPE checklist:', error);
        }
    };

    const fetchToolboxTalk = async () => {
        try {
            const { data, error } = await supabase
                .from('tool_box_talk')
                .select('*')
                .eq('log_id', id)
                .single();

            if (error) throw error;
            setToolboxTalk(data);
        } catch (error) {
            console.error('Error fetching Toolbox Talk:', error);
        }
    };

    const fetchFirstAidForms = async () => {
        try {
            const { data, error } = await supabase
                .from('first_aid')
                .select('*')
                .eq('log_id', id);

            if (error) throw error;
            setFirstAidForms(data);
        } catch (error) {
            console.error('Error fetching First Aid Forms:', error);
        }
    };

    const fetchFIMForms = async () => {
        try {
            const { data, error } = await supabase
                .from('FIM_use')
                .select('*')
                .eq('log_id', id);

            if (error) throw error;

            const parsedData = data.map(form => ({
                ...form,
                bar_dia_info: JSON.parse(form.bar_dia_info)
            }));

            setFimForms(parsedData);
        } catch (error) {
            console.error('Error fetching FIM Forms:', error);
        }
    };

    const fetchLogPhotos = async () => {
        try {
            const { data, error } = await supabase
                .from('photos')
                .select('photo_url')
                .eq('log_id', id)
                .eq('tag', 'log')

            if (error) throw error;

            return data.photo_url;
        } catch (error) {
            console.error('Error fetching photo URL:', error);
            return null;
        }
    };


    const fetchUpdates = async () => {
        try {
            const { data, error } = await supabase
                .from('updates')
                .select('*')
                .eq('log_id', id);

            if (error) throw error;
            setUpdates(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching updates:', error);
        }
    };










    const openUrl = (url) => {
        Linking.openURL(url);
        console.log('Opening URL:', url);
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };



    if (loading) {
        return <ActivityIndicator size="small" color="#0000ff" />;
    }

    if (!logInfo) {
        return <Text>No log information found.</Text>;
    }


    return (
        <ScrollView style={styles.container}>
            <Title text={new Date(logInfo.created_on).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} />

            <FormFieldView label="Project ID" value={logInfo.project_id} />

            <FormFieldView label="Vendor ID" value={logInfo.vendor_id} />
            <FormFieldView label="Work Permit" value={logInfo.work_permit} />
            <FormFieldView label="Valid From" value={new Date(logInfo.valid_from).toLocaleDateString()} />
            <FormFieldView label="Valid Till" value={new Date(logInfo.valid_till).toLocaleDateString()} />
            <FormFieldView label="Number of Workers" value={logInfo.num_workers} />

            <View style={styles.listContainer}>
                <CollapsibleSection
                    isCollapsed={isPPECollapsed}
                    toggleCollapsed={setIsPPECollapsed}
                    fetchContent={fetchPpeChecklist}
                    headingText="PPE Checklist"
                />
                <Collapsible collapsed={isPPECollapsed}>
                    {ppeChecklist.length > 0 ? (
                        ppeChecklist.map((entry, index) => (
                            <View key={index} style={styles.entry}>
                                <FormFieldView label="P No" value={entry.p_no} />
                                <FormFieldView label="Name" value={entry.name} />
                                <FormFieldView label="Items" value={entry.ppe_items.join(', ')} />
                                <FormFieldView label="Remarks" value={entry.remarks} />

                            </View>
                        ))
                    ) : (
                        <Text>No entries found.
                            <Text onPress={() => {
                                router.push({
                                    pathname: '../../forms/ppe_checklist',
                                    params: { logId: id, projectId: logInfo.project_id }

                                });
                            }} style={styles.link}> Add Here</Text></Text>
                    )}

                </Collapsible>

                <CollapsibleSection
                    isCollapsed={isTBTCollapsed}
                    toggleCollapsed={setIsTBTCollapsed}
                    fetchContent={fetchToolboxTalk}
                    headingText="Toolbox Talk"
                />
                <Collapsible collapsed={isTBTCollapsed}>
                    {toolboxTalk ? (
                        <View style={styles.entry}>
                            <FormFieldView label="Department" value={toolboxTalk.department} />
                            <FormFieldView label="Safety Rep" value={toolboxTalk.safety_rep} />
                            <FormFieldView label="Contractor Rep" value={toolboxTalk.contractor_rep} />
                            <FormFieldView label="No. of Workers" value={toolboxTalk.num_workers} />
                            <FormFieldView label="No. of Supervisors" value={toolboxTalk.num_supervisors} />
                            <FormFieldView label="Supervisor/Manager" value={toolboxTalk.supervisor_or_manager} />
                            <FormFieldView label="SOP Number" value={toolboxTalk.SOP_no} />
                            <FormFieldView label="Action Items" value={toolboxTalk.action_items} />
                            <FormFieldView label="Previous Incidents" value={toolboxTalk.prev_incident} />
                            <FormFieldView label="Reminders" value={toolboxTalk.reminders.join(', ')} />
                            <FormFieldView label="Safety Message" value={toolboxTalk.safety_msg} />
                            <FormFieldView label="Hazards" value={toolboxTalk.hazards} />
                            <FormFieldView label="Location" value={toolboxTalk.location} />
                            <FormFieldView label="Safety Contact" value={toolboxTalk.safety_contact} />
                            <FormFieldView label="Stripes" value={toolboxTalk.stripes} />

                        </View>
                    ) : (
                        <Text>No Toolbox Talk Data found.
                            <Text onPress={() => {
                                router.push({
                                    pathname: '../../forms/tool_box_talk',
                                    params: { logId: id, projectId: logInfo.project_id }

                                });
                            }} style={styles.link}> Add Here</Text></Text>
                    )}
                </Collapsible>


                <CollapsibleSection
                    isCollapsed={isFirstAidCollapsed}
                    toggleCollapsed={setIsFirstAidCollapsed}
                    fetchContent={fetchFirstAidForms}
                    headingText="First Aid Forms"
                />

                <Collapsible collapsed={isFirstAidCollapsed}>
                    {firstAidForms.length > 0 ? (
                        firstAidForms.map((form, index) => (
                            <View key={index} style={styles.entry}>
                                <FormFieldView label="First Aid Box" value={form.first_aid_box ? 'Yes' : 'No'} />
                                <FormFieldView label="Stretcher" value={form.stretcher ? 'Yes' : 'No'} />
                                <FormFieldView label="Oxy Pack" value={form.oxy_pack ? 'Yes' : 'No'} />
                                <FormFieldView label="Gas Detector" value={form.gas_detector ? 'Yes' : 'No'} />
                                <FormFieldView label="Gas Detector Calibration" value={form.gas_detector_calibration} />
                                <FormFieldView label="Gas Detector Expiry" value={form.gas_detector_expiry} />
                                <FormFieldView label="Remarks" value={form.remarks} />
                            </View>
                        ))
                    ) : (
                        <Text>No First Aid Checklist found.
                            <Text
                                onPress={() => {
                                    router.push({
                                        pathname: '../../forms/first_aid',
                                        params: { logId: id, projectId: logInfo.project_id }
                                    });
                                }}
                                style={styles.link}
                            >
                                Add Here
                            </Text>
                        </Text>
                    )}
                </Collapsible>

                <CollapsibleSection
                    isCollapsed={isFIMCollapsed}
                    toggleCollapsed={setIsFIMCollapsed}
                    fetchContent={fetchFIMForms}
                    headingText="FIM Forms"
                />
                <Collapsible collapsed={isFIMCollapsed}>
                    {fimForms.length > 0 ? (
                        fimForms.map((form, index) => (
                            <View key={index} style={styles.entry}>
                                <FormFieldView label="Cement" value={form.cement} />
                                <FormFieldView label="Reinforcement" value={form.reinforcement} />
                                <FormFieldView label="Foundation Bolts" value={form.foundation_bolts} />
                                <FormFieldView label="Bar Dia Info" value={form.bar_dia_info.map(info => `Dia: ${info.dia}, Amount: ${info.amount}`).join(', ')} />
                                <FormFieldView label="Bolts Remarks" value={form.bolts_remarks} />
                            </View>
                        ))
                    ) : (
                        <Text>No FIM Forms found.
                            <Text
                                onPress={() => {
                                    router.push({
                                        pathname: '../../forms/FIM',
                                        params: { logId: id, projectId: logInfo.project_id }
                                    });
                                }}
                                style={styles.link}
                            >
                                Add Here
                            </Text>
                        </Text>
                    )}
                </Collapsible>

                <CollapsibleSection
                    isCollapsed={isPhotosCollapsed}
                    toggleCollapsed={setIsPhotosCollapsed}
                    fetchContent={fetchLogPhotos}
                    headingText="Photos"
                />
                <Collapsible collapsed={isPhotosCollapsed}>
                    {photos.length > 0 ? (
                        photos.map((photo, index) => (
                            <View key={index} style={styles.entry}>
                                {/* <TouchableOpacity onPress={() => openUrl(photo.photo_url)}>
                                <Image source={{ uri: photo.photo_url }} style={styles.photo} />
                            </TouchableOpacity> */}
                                <TouchableOpacity onPress={() => openUrl(photo.photo_url)}>
                                    <Text style={styles.link}>{photo.caption}</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <View>
                            <Text>No photos found.</Text>
                            <Text style={styles.link} onPress={openModal}>
                                Add here
                            </Text>
                            {isModalVisible && <AddPhoto isVisible={isModalVisible} closeModal={closeModal} />}
                        </View>

                    )}
                </Collapsible>



                <View style={styles.updateContainer}>

                    <Title text="Updates" />
                    <Text
                        onPress={() => {
                            router.push({
                                pathname: '../../forms/create_update',
                                params: { logId: id, projectId: logInfo.project_id }
                            });
                        }}
                        style={styles.link}
                    >
                        Add Here
                    </Text>

                </View>

                <CollapsibleSection
                    isCollapsed={isUpdatesCollapsed}
                    toggleCollapsed={setIsUpdatesCollapsed}
                    fetchContent={fetchUpdates}
                    headingText="Today's Updates"
                />

                <Collapsible collapsed={isUpdatesCollapsed}>
                    {updates.length > 0 ? (
                        updates.map((update, index) => (
                            <View key={index} style={styles.entry}>
                                <FormFieldView label="Description" value={update.description} />
                                <FormFieldView label="Issues" value={update.issues} />
                                <TouchableOpacity onPress={() => openUrl(update.update_photo_url)}>
                                    <Text style={styles.link}>View Photo</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <Text>No Updates found.</Text>
                    )}
                </Collapsible>

                <Title text="EOD Compliances" />


            </View>
        </ScrollView >
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
        marginBottom: 20,
    },
    info: {
        fontSize: 16,
        marginBottom: 10,
    },
    listContainer: {
        marginTop: 20,
    },
    listHeader: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    entry: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    entryText: {
        fontSize: 16,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 17,
    },
    section_heading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    link: {
        color: '#0000EE',
    },
    updateContainer: {
        flexDirection: 'row',   // Arrange items in a row
        justifyContent: 'space-between',  // Distribute space between items
        alignItems: 'center'
    }
});

export default LogInfoPage;
