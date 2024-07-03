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
import { addFormLog } from '../../helpers/addFormLog';
import { useVendor } from '../../../context/vendor_context';

const RodCuttingMachine = () => {
    const [onOffKnobCondition, setOnOffKnobCondition] = useState(false);
    const [powerSupplyCableInsulation, setPowerSupplyCableInsulation] = useState(false);
    const [cuttingWheelCondition, setCuttingWheelCondition] = useState(false);
    const [cuttingWheelGuardProvided, setCuttingWheelGuardProvided] = useState(false);
    const [cuttingWheelGuardLocking, setCuttingWheelGuardLocking] = useState(false);
    const [jobHoldingClampCondition, setJobHoldingClampCondition] = useState(false);
    const [machineHandleCondition, setMachineHandleCondition] = useState(false);
    const [baseCondition, setBaseCondition] = useState(false);
    const [ppesUsed, setPpesUsed] = useState(false);
    const [specificCuttingBladeUsed, setSpecificCuttingBladeUsed] = useState(false);

    const [siteName, setSiteName] = useState('');
    const [identificationNo, setIdentificationNo] = useState('');
    const [projectID, setProjectID] = useState('');
    const [auditedByName, setAuditedByName] = useState('');
    const [auditedByPersonalNo, setAuditedByPersonalNo] = useState('');
    const [responsibility, setResponsibility] = useState('');
    const [remarks, setRemarks] = useState('');

    const { vendorId, } = useVendor();
    const form_num = 7;

    const handleSubmit = async () => {
        try {

            const { data, error } = await supabase
                .from('form_rod_cutting_machine')
                .insert([
                    {
                        form_num: form_num,
                        project_id: parseInt(projectID),
                        // tool_name: 'Rod Cutting Machine',
                        on_off_knob_condition: onOffKnobCondition,
                        power_supply_cable_insulation: powerSupplyCableInsulation,
                        cutting_wheel_condition: cuttingWheelCondition,
                        cutting_wheel_guard_provided: cuttingWheelGuardProvided,
                        cutting_wheel_guard_locking: cuttingWheelGuardLocking,
                        job_holding_clamp_condition: jobHoldingClampCondition,
                        machine_handle_condition: machineHandleCondition,
                        base_condition: baseCondition,
                        ppes_used: ppesUsed,
                        specific_cutting_blade_used: specificCuttingBladeUsed,
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
                Alert.alert('Success', 'Rod cutting machine checklist inserted successfully.');
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
                <Title text="Rod Cutting Machine Checklist" />
                <InputField placeholder="Site Name / Location" iconLib={Ionicons} iconName="location-sharp" onChangeText={setSiteName} />
                <InputField placeholder="Identification/Machine Number" iconLib={Octicons} iconName="number" onChangeText={setIdentificationNo} />
                <InputField placeholder="Project ID" iconLib={FontAwesome6} iconName="hashtag" onChangeText={setProjectID} />

                <ChecklistItem
                    label="On/Off knob condition"
                    value={onOffKnobCondition}
                    setValue={setOnOffKnobCondition}
                />
                <ChecklistItem
                    label="Power supply cable insulation and plug top is used"
                    value={powerSupplyCableInsulation}
                    setValue={setPowerSupplyCableInsulation}
                />
                <ChecklistItem
                    label="Cutting wheel condition (cracks and damages) "
                    value={cuttingWheelCondition}
                    setValue={setCuttingWheelCondition}
                />
                <ChecklistItem
                    label="Cutting wheel guard provided"
                    value={cuttingWheelGuardProvided}
                    setValue={setCuttingWheelGuardProvided}
                />
                <ChecklistItem
                    label="Cutting wheel guard locking properly"
                    value={cuttingWheelGuardLocking}
                    setValue={setCuttingWheelGuardLocking}
                />
                <ChecklistItem
                    label="Job holding clamp in condition"
                    value={jobHoldingClampCondition}
                    setValue={setJobHoldingClampCondition}
                />
                <ChecklistItem
                    label="Machine handle condition"
                    value={machineHandleCondition}
                    setValue={setMachineHandleCondition}
                />
                <ChecklistItem
                    label="Base of machine condition"
                    value={baseCondition}
                    setValue={setBaseCondition}
                />
                <ChecklistItem
                    label="Specified and standard PPEs used during cutting"
                    value={ppesUsed}
                    setValue={setPpesUsed}
                />
                <ChecklistItem
                    label="Specific cutting blade used with machine that matches RPM speicification "
                    value={specificCuttingBladeUsed}
                    setValue={setSpecificCuttingBladeUsed}
                />

                <InputField placeholder="Audited By (Name)" iconLib={Icon} iconName="user" onChangeText={setAuditedByName} />
                <InputField placeholder="Audited By (Personal Number)" iconLib={AntDesign} iconName="idcard" onChangeText={setAuditedByPersonalNo} />
                <InputField placeholder="Responsibility" iconLib={MaterialIcons} iconName="label" onChangeText={setResponsibility} />
                <InputField placeholder="Remarks" iconLib={AntDesign} iconName="exception1" onChangeText={setRemarks} />

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

export default RodCuttingMachine;
