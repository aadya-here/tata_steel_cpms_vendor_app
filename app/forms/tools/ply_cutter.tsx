import { StyleSheet, ScrollView, Alert, KeyboardAvoidingView, } from 'react-native';
import React, { useState } from 'react';
import ChecklistItem from '../../../components/tools_checklist_item';
import supabase from '../../../lib/supabase';
import InputField from '../../../components/input_field';
import Title from '../../../components/title';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import CustomButton from '../../../components/button_primary';
import { useVendor } from '../../../context/vendor_context';
import { addFormLog } from '../../helpers/addFormLog';

const PlyCutterMachine = () => {
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

    const form_num = 3;
    const { vendorId } = useVendor();




    const handleSubmit = async () => {
        try {

            const { data, error } = await supabase
                .from('form_ply_cutter_machine')
                .insert([
                    {
                        form_num: form_num,
                        project_id: parseInt(projectID),
                        tool_name: 'Ply Cutter Machine',
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
                Alert.alert('Error', error.message);
            } else {
                console.log('Form submitted successfully:', data[0].log_id);
                return data[0].log_id;
                // Alert.alert('Success', 'Ply cutter machine checklist inserted successfully.');
            }
        } catch (error) {
            console.error('Error creating project:', error);
            Alert.alert('Error', 'An unexpected error occurred while creating the project.');
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
                <Title text="Ply Cutter Machine Checklist" />
                <InputField placeholder="Site Name / Location" iconLib={Ionicons} iconName="location-sharp" onChangeText={setSiteName} />
                <InputField placeholder="Identification/Machine Number" iconLib={Octicons} iconName="number" onChangeText={setIdentificationNo} />
                <InputField placeholder="Project ID" iconLib={FontAwesome6} iconName="hashtag" onChangeText={setProjectID} />

                <ChecklistItem
                    label="Double insulated"
                    value={doubleInsulated}
                    setValue={setDoubleInsulated}
                />
                <ChecklistItem
                    label="Free from damage"
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
                    label="Cutting blade guard condition"
                    value={cuttingBladeGuardCondition}
                    setValue={setCuttingBladeGuardCondition}
                />
                <ChecklistItem
                    label="Cutting wheel condition"
                    value={cuttingWheelCondition}
                    setValue={setCuttingWheelCondition}
                />
                <ChecklistItem
                    label="Specific cutting blade used"
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

                <CustomButton text="Submit" onPress={handleFormLog} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F4F4FF',
    },
});

export default PlyCutterMachine;
