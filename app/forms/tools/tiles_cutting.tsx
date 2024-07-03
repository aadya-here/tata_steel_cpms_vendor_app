import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import ChecklistItem from '../../../components/tools_checklist_item';
import supabase from '../../../lib/supabase';
import InputField from '../../../components/input_field';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useVendor } from '../../../context/vendor_context';
import moment from 'moment';
import { addFormLog } from '../../helpers/addFormLog';

const TilesCuttingMachine = () => {
    const [doubleInsulated, setDoubleInsulated] = useState(false);
    const [freeFromDamage, setFreeFromDamage] = useState(false);
    const [wireCondition, setWireCondition] = useState(false);
    const [machinePlugCondition, setMachinePlugCondition] = useState(false);
    const [cuttingBladeGuardCondition, setCuttingBladeGuardCondition] = useState(false);
    const [cuttingWheelCondition, setCuttingWheelCondition] = useState(false);
    const [specificCuttingBladeUsed, setSpecificCuttingBladeUsed] = useState(false);
    const [onOffSwitchCondition, setOnOffSwitchCondition] = useState(false);

    const [siteName, setSiteName] = useState('');
    const [identificationNo, setIdentificationNo] = useState('');
    const [projectID, setProjectID] = useState('');
    const [auditedByName, setAuditedByName] = useState('');
    const [auditedByPersonalNo, setAuditedByPersonalNo] = useState('');
    const [responsibility, setResponsibility] = useState('');
    const [remarks, setRemarks] = useState('');
    const [logID, setLogID] = useState<number | null>(null);

    const { vendorId, } = useVendor();

    const form_num = 6;

    const handleSubmit = async () => {
        try {

            const { data, error } = await supabase
                .from('form_tiles_cutting_machine')
                .insert([
                    {
                        form_num: form_num,
                        project_id: parseInt(projectID),
                        // tool_name: 'Tiles Cutting Machine',
                        double_insulated: doubleInsulated,
                        free_from_damage: freeFromDamage,
                        wire_condition: wireCondition,
                        machine_plug_condition: machinePlugCondition,
                        cutting_blade_guard_condition: cuttingBladeGuardCondition,
                        cutting_wheel_condition: cuttingWheelCondition,
                        specific_cutting_blade_used: specificCuttingBladeUsed,
                        on_off_switch_condition: onOffSwitchCondition,
                        site_name: siteName,
                        identification_no: identificationNo,
                        date: new Date(),
                        audited_by_name: auditedByName,
                        audited_by_personal_no: parseInt(auditedByPersonalNo),
                        responsibility: responsibility,
                        remarks: remarks,
                    }
                ]).select();
            if (error) {
                console.error('Database error:', error);
                Alert.alert('Error', 'A database error occurred. Please try again.');
                return null;
            }

            if (!data || !data[0]) {
                console.error('No data returned from database.');
                Alert.alert('Error', 'No data returned from database.');
                return null;
            }

            console.log('Form submitted successfully:', data[0].log_id);
            setLogID(data[0].log_id)
            return data[0].log_id;

        } catch (error) {
            console.error('Error creating project:', error);
            Alert.alert('Error', 'An unexpected error occurred while creating the project.');
            return null;
        }
    };

    const handleFormLog = async () => {
        const formLogData = await addFormLog(handleSubmit, projectID, vendorId, form_num);

        if (formLogData) {
            Alert.alert('Success', 'Form log created successfully.');
            console.log("Form log created successfully:", formLogData);
        }
    };




    return (
        <KeyboardAvoidingView behavior="padding">
            <ScrollView style={styles.container}>
                <InputField placeholder="Site Name / Location" iconLib={Icon} iconName="user" onChangeText={setSiteName} />
                <InputField placeholder="Identification/Machine Number" iconLib={Icon} iconName="user" onChangeText={setIdentificationNo} />
                <InputField placeholder="Project ID" iconLib={Icon} iconName="user" onChangeText={setProjectID} />

                <ChecklistItem
                    label="Equipment is double insulated"
                    value={doubleInsulated}
                    setValue={setDoubleInsulated}
                />
                <ChecklistItem
                    label="Equipment is free from damage like cracks, handle damange, etc"
                    value={freeFromDamage}
                    setValue={setFreeFromDamage}
                />
                <ChecklistItem
                    label="Wire condition"
                    value={wireCondition}
                    setValue={setWireCondition}
                />
                <ChecklistItem
                    label="Machine plug condition"
                    value={machinePlugCondition}
                    setValue={setMachinePlugCondition}
                />
                <ChecklistItem
                    label="Cutting blade guard condition (free from crack, damage, etc)"
                    value={cuttingBladeGuardCondition}
                    setValue={setCuttingBladeGuardCondition}
                />
                <ChecklistItem
                    label="Cutting wheel condition (free from crack, sharp edge is visible)"
                    value={cuttingWheelCondition}
                    setValue={setCuttingWheelCondition}
                />
                <ChecklistItem
                    label="Specific cutting blade used (matches machine RPM)"
                    value={specificCuttingBladeUsed}
                    setValue={setSpecificCuttingBladeUsed}
                />
                <ChecklistItem
                    label="On/Off switch condition"
                    value={onOffSwitchCondition}
                    setValue={setOnOffSwitchCondition}
                />

                <InputField placeholder="Audited By (Name)" iconLib={Icon} iconName="user" onChangeText={setAuditedByName} />
                <InputField placeholder="Audited By (Personal Number)" iconLib={Icon} iconName="user" onChangeText={setAuditedByPersonalNo} />
                <InputField placeholder="Responsibility" iconLib={Icon} iconName="user" onChangeText={setResponsibility} />
                <InputField placeholder="Remarks" iconLib={Icon} iconName="user" onChangeText={setRemarks} />

                <Pressable style={styles.button} onPress={handleFormLog}>
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F4F4FF',
    },
    button: {
        backgroundColor: '#060665',
        paddingVertical: 10,
        margin: 20,
        marginBottom: 50,
        borderRadius: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TilesCuttingMachine;
