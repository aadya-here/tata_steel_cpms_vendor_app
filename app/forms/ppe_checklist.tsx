import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
import { useVendor } from '../../context/vendor_context';
import CheckBox from 'react-native-check-box';
import Collapsible from 'react-native-collapsible';
import { Entypo } from '@expo/vector-icons';
import supabase from '../../lib/supabase';
import InputField from '../../components/input_field';
import Icon from 'react-native-vector-icons/FontAwesome';
import { router, useLocalSearchParams } from 'expo-router';
import Subheading from '../../components/subheading';

const PPEChecklist = () => {
    const { vendorId, user_id } = useVendor();
    const { logId, projectId } = useLocalSearchParams<{ logId: string }>();

    const [vendorList, setVendorList] = useState([]);
    const [selectedPpeItems, setSelectedPpeItems] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [pNo, setPNo] = useState('');
    const [name, setName] = useState('');
    const [remarks, setRemarks] = useState('');

    const ppe_items = [
        { key: 'helmet', value: 'Helmet' },
        { key: 'shoes', value: 'Shoes' },
        { key: 'gloves', value: 'Gloves' },
        { key: 'goggles', value: 'Goggles' },
        { key: 'fluorescent_jacket', value: 'Fluorescent Jacket' },
        { key: 'fire_jacket', value: 'Fire Jacket' },
        { key: 'mask', value: 'Mask' },
        { key: 'ear_plugs', value: 'Ear Plugs' },
        { key: 'shin_guard', value: 'Shin Guard' },
        { key: 'rubber_gloves', value: 'Rubber Gloves' },
        { key: 'gum_boot', value: 'Gum Boot' },
        { key: 'safety_belt', value: 'Safety Belt' },
        { key: 'face_shield', value: 'Face Shield' },
        { key: 'screen_guard', value: 'Screen Guard' },
        { key: 'gas_cutting_goggles', value: 'Gas Cutting Goggles' },
        { key: 'leather_gloves', value: 'Leather Gloves' }
    ];

    useEffect(() => {
        fetchEntries();
    }, []);

    const handleCheckBoxChange = (item) => {
        setSelectedPpeItems(prevSelectedItems =>
            prevSelectedItems.includes(item)
                ? prevSelectedItems.filter(i => i !== item)
                : [...prevSelectedItems, item]
        );
    };

    const toggleExpanded = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleAdd = async () => {
        try {
            // const userId = await getUserId();
            // if (!userId) {
            //     Alert.alert("Error", "Unable to fetch user ID.");
            //     return;
            // }
            const { data, error } = await supabase
                .from('ppe_checklist')
                .insert([
                    {
                        vendor_id: vendorId,
                        log_id: logId,
                        created_on: new Date().toISOString().split('T')[0], // format date as YYYY-MM-DD
                        project_id: projectId,
                        ppe_items: selectedPpeItems,
                        p_no: pNo,
                        name: name,
                        remarks: remarks,
                        created_by: user_id,
                    }
                ]);
            if (error) {
                Alert.alert('Error', error.message);
            } else {
                console.log('PPE checklist inserted successfully:');
                setVendorList([...vendorList, { p_no: pNo, name: name, ppe_items: selectedPpeItems, remarks: remarks }]);
                setModalVisible(false);
                setPNo('');
                setName('');
                setRemarks('');
                setSelectedPpeItems([]);
                // router.back();

            }
        } catch (error) {
            console.error('Error creating project:', error);
            Alert.alert('Error', 'An unexpected error occurred while creating the project.');
        }
    };

    const fetchEntries = async () => {
        try {
            const today = new Date().toISOString().split('T')[0]; // format date as YYYY-MM-DD
            const { data, error } = await supabase
                .from('ppe_checklist')
                .select('*')
                .eq('vendor_id', vendorId)
                .eq('created_on', today)
                .eq('log_id', logId);

            if (error) {
                console.error('Error fetching entries:', error);
                return;
            }

            setVendorList(data);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Subheading text={`Project ${projectId}`} />

            <TouchableOpacity onPress={toggleExpanded}>
                <View style={[styles.card, { backgroundColor: '#f0f0f0' }]}>
                    <Text style={styles.heading}>PPE Checklist</Text>
                    <Entypo name={isCollapsed ? "chevron-down" : "chevron-up"} size={24} color="black" />
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed}>
                <View style={styles.checkboxContainer}>
                    {ppe_items.map((item) => (
                        <CheckBox
                            key={item.key}
                            style={styles.checkbox}
                            onClick={() => handleCheckBoxChange(item.value)}
                            isChecked={selectedPpeItems.includes(item.value)}
                            rightText={item.value}
                        />
                    ))}
                </View>
                <View style={styles.selectedItemsContainer}>
                    <Text style={styles.selectedItemsHeader}>Selected Items:</Text>
                    {selectedPpeItems.map(item => (
                        <Text key={item} style={styles.selectedItem}>{item}</Text>
                    ))}
                </View>
            </Collapsible>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                <Text style={styles.buttonText}>Add entry</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Add PPE Entry</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Icon name="close" size={20} color="black" />
                    </TouchableOpacity>

                    <InputField placeholder="Personal Number" iconLib={Icon} iconName="user" onChangeText={setPNo} />
                    <InputField placeholder="Name" iconLib={Icon} iconName="id-badge" onChangeText={setName} />
                    <InputField placeholder="Remarks" iconLib={Icon} iconName="comment" onChangeText={setRemarks} />
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleAdd}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.listContainer}>
                <Text style={styles.listHeader}>PPE Entries:</Text>
                {vendorList.length > 0 ? (
                    vendorList.map((entry, index) => (
                        <View key={index} style={styles.entry}>
                            <Text style={styles.entryText}>P No: {entry.p_no}</Text>
                            <Text style={styles.entryText}>Name: {entry.name}</Text>
                            <Text style={styles.entryText}>Items: {entry.ppe_items.join(', ')}</Text>
                            <Text style={styles.entryText}>Remarks: {entry.remarks}</Text>
                        </View>
                    ))
                ) : (
                    <Text>No entries found for today.</Text>
                )}
            </View>
        </View>
    );
};

export default PPEChecklist;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
    },
    card: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
    },
    heading: {
        fontSize: 18,
    },
    checkboxContainer: {
        padding: 10,
    },
    checkbox: {
        marginVertical: 5,
    },
    selectedItemsContainer: {
        marginTop: 20,
        padding: 10,
    },
    selectedItemsHeader: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedItem: {
        marginVertical: 2,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    modalView: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxHeight: '40%',  // Limiting maximum height to 40% of screen height
        alignSelf: 'center',  // Centering horizontally
        marginTop: '40%',  // Adjust vertical position as needed
    },
    modalText: {
        fontSize: 18,
        marginBottom: 15,
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
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
});
