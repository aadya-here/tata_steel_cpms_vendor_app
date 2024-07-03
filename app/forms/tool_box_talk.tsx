import { StyleSheet, Text, TextInput, View, Alert, KeyboardAvoidingView, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import supabase from '../../lib/supabase';
import InputField from '../../components/input_field';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-check-box';

import { useVendor } from '../../context/vendor_context';
import { router, useLocalSearchParams } from 'expo-router';
import moment from 'moment';
import CustomButton from '../../components/button_primary';
import TextAreaInput from '../../components/multi_line_input';

const ToolBoxTalk = () => {
    const { vendorId, user_id } = useVendor();
    const { logId, projectId } = useLocalSearchParams<{ logId: string }>();


    const [sopNumber, setSopNumber] = useState('');
    const [location, setLocation] = useState('');
    const [department, setDepartment] = useState('');
    const [supervisor, setSupervisor] = useState('');
    const [safetyRep, setSafetyRep] = useState('');
    const [contractorRep, setContractorRep] = useState('');
    const [safetyContact, setSafetyContact] = useState('');
    const [actionItems, setActionItems] = useState('');
    const [prevIncidents, setPrevIncidents] = useState('');
    const [safetyMessage, setSafetyMessage] = useState('');
    const [checkedItems, setCheckedItems] = useState([]);
    const [numWorkers, setNumWorkers] = useState('');
    const [numSupervisors, setNumSupervisors] = useState('');
    const [hazard, setHazard] = useState('');
    const [checkedStripes, setCheckedStripes] = useState([]);

    const checkBoxLabels = [
        "PPE", "Housekeeping", "Tools and Tackles", "Electrical Equipment Condition",
        "Six Directional Hazards", "Work Permits", "No Alcohol regulations",
        "Safe Behaviour and Its Importance", "Gas Hazards", "First Aid",
        "Other Hazardous Material", "Team Work Approach"
    ];

    const stripesList = ['Red Stripes', 'Orange Stripes', 'Green Stripes'];

    const handleCheckboxChange = (label) => {
        setCheckedItems(prev => {
            if (prev.includes(label)) {
                return prev.filter(item => item !== label);
            } else {
                return [...prev, label];
            }
        });
    };

    const handleStripesChange = (label) => {
        setCheckedStripes(prev => {
            if (prev.includes(label)) {
                return prev.filter(item => item !== label);
            } else {
                return [...prev, label];
            }
        });
    };

    const addEntry = async () => {
        const { data, error } = await supabase
            .from('tool_box_talk')
            .insert([
                {
                    created_on: moment().format(),
                    department: department,
                    safety_rep: safetyRep,
                    contractor_rep: contractorRep,
                    num_workers: parseInt(numWorkers),
                    num_supervisors: parseInt(numSupervisors),
                    supervisor_or_manager: supervisor,
                    SOP_no: sopNumber,
                    action_items: actionItems,
                    prev_incident: prevIncidents,
                    reminders: checkedItems,
                    safety_msg: safetyMessage,
                    hazards: hazard,
                    location: location,
                    safety_contact: parseInt(safetyContact),
                    stripes: checkedStripes,
                    vendor_id: vendorId,
                    project_id: projectId,
                    created_by: user_id,
                    log_id: logId,
                }
            ]);

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            Alert.alert('Success', 'Entry added successfully');
            router.back();


        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollView}>
                <InputField placeholder="SOP Number" iconLib={Icon} iconName="file" onChangeText={setSopNumber} value={sopNumber} />
                <InputField placeholder="Location" iconLib={Icon} iconName="map-marker" onChangeText={setLocation} value={location} />
                <InputField placeholder="Department" iconLib={Icon} iconName="building" onChangeText={setDepartment} value={department} />
                <InputField placeholder="Company Supervisor / Line Manager" iconLib={Icon} iconName="user" onChangeText={setSupervisor} value={supervisor} />
                <InputField placeholder="Safety Representative" iconLib={Icon} iconName="shield" onChangeText={setSafetyRep} value={safetyRep} />
                <InputField placeholder="Contractor's Representative" iconLib={Icon} iconName="user-secret" onChangeText={setContractorRep} value={contractorRep} />
                <InputField placeholder="Safety Contact" iconLib={Icon} iconName="phone" onChangeText={setSafetyContact} value={safetyContact} keyboardType="numeric" />
                <InputField placeholder="Potential Hazards Present" iconLib={Icon} iconName="exclamation-triangle" onChangeText={setHazard} value={hazard} />

                {/* <View style={styles.flex_row}> */}
                <InputField placeholder="No. of Workers" iconLib={Icon} iconName="users" onChangeText={setNumWorkers} value={numWorkers} keyboardType="numeric" />
                <InputField placeholder="No. of Supervisors" iconLib={Icon} iconName="users" onChangeText={setNumSupervisors} value={numSupervisors} keyboardType="numeric" />
                {/* </View> */}

                <TextAreaInput
                    placeholder="Review of action items from previous meeting"
                    onChangeText={setPrevIncidents}
                    value={prevIncidents}
                />
                <TextAreaInput
                    placeholder="General Safety items and any recent near miss incidents"
                    onChangeText={setActionItems}
                    value={actionItems}
                />

                <Text style={styles.checklistHeader}>Reminders to employees on their personal responsibilities regarding:</Text>
                <View style={styles.checkboxContainer}>
                    {checkBoxLabels.map((label) => (
                        <CheckBox
                            key={label}
                            style={styles.checkbox}
                            onClick={() => handleCheckboxChange(label)}
                            isChecked={checkedItems.includes(label)}
                            rightText={label}
                        />
                    ))}
                </View>

                <Text style={styles.checklistHeader}>Stripes List:</Text>
                <View style={styles.checkboxContainer}>
                    {stripesList.map((label) => (
                        <CheckBox
                            key={label}
                            style={styles.checkbox}
                            onClick={() => handleStripesChange(label)}
                            isChecked={checkedStripes.includes(label)}
                            rightText={label}
                        />
                    ))}
                </View>

                <TextAreaInput
                    placeholder="Safety message/handouts shared with employees"
                    onChangeText={setSafetyMessage}
                    value={safetyMessage}
                />

                <CustomButton text="Add Entry" onPress={addEntry} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ToolBoxTalk;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4FF',
        padding: 15,
    },
    scrollView: {
        padding: 20,
    },

    flex_row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    checklistHeader: {
        fontSize: 16,
        marginVertical: 10,
    },
    checkboxContainer: {
        marginBottom: 20,
    },
    checkbox: {
        paddingVertical: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        marginVertical: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});
