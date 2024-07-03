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

const ChipperMachine = () => {
    const [chiselCondition, setChiselCondition] = useState(false);
    const [tightnessOfChiselLock, setTightnessOfChiselLock] = useState(false);
    const [handleWithoutDamage, setHandleWithoutDamage] = useState(false);
    const [bodyCondition, setBodyCondition] = useState(false);
    const [triggerSwitchWithoutDamage, setTriggerSwitchWithoutDamage] = useState(false);
    const [electricWireWithoutCutsAndJoints, setElectricWireWithoutCutsAndJoints] = useState(false);
    const [protectiveGuardOnMovingParts, setProtectiveGuardOnMovingParts] = useState(false);
    const [isElcbAvailableWithin2m, setIsElcbAvailableWithin2m] = useState(false);
    const [isElcbTrippingChecked, setIsElcbTrippingChecked] = useState(false);
    const [bodyEarthingIncaseOfMetalBody, setBodyEarthingIncaseOfMetalBody] = useState(false);
    const [powerCableProperlyTerminatedWithGland, setPowerCableProperlyTerminatedWithGland] = useState(false);

    const [siteName, setSiteName] = useState('');
    const [identificationNo, setIdentificationNo] = useState('');
    const [projectID, setProjectID] = useState('');
    const [auditedByName, setAuditedByName] = useState('');
    const [auditedByPersonalNo, setAuditedByPersonalNo] = useState('');
    const [responsibility, setResponsibility] = useState('');
    const [remarks, setRemarks] = useState('');

    const { vendorId } = useVendor();
    const form_num = 1;


    const handleSubmit = async () => {
        try {

            const { data, error } = await supabase
                .from('form_chipper_machine')
                .insert([
                    {
                        form_num: form_num,
                        project_id: parseInt(projectID),
                        site_name: siteName,
                        date: new Date(),
                        identification_no: identificationNo,
                        chisel_condition: chiselCondition,
                        tightness_of_chisel_lock: tightnessOfChiselLock,
                        handle_without_damage: handleWithoutDamage,
                        body_condition: bodyCondition,
                        trigger_switch_without_damage: triggerSwitchWithoutDamage,
                        electric_wire_without_cuts_and_joints: electricWireWithoutCutsAndJoints,
                        protective_guard_on_moving_parts: protectiveGuardOnMovingParts,
                        is_elcb_available_within_2m: isElcbAvailableWithin2m,
                        is_elcb_tripping_checked: isElcbTrippingChecked,
                        body_earthing_incase_of_metal_body: bodyEarthingIncaseOfMetalBody,
                        power_cable_properly_terminated_with_gland: powerCableProperlyTerminatedWithGland,
                        audited_by_name: auditedByName,
                        audited_by_personal_no: parseInt(auditedByPersonalNo),
                        responsibility: responsibility,
                        remarks: remarks,
                        // created_by: userId,
                    }
                ]).select();
            if (error) {
                Alert.alert('Error', error.message);
            } else {
                console.log('Form submitted successfully:', data[0].log_id);
                return data[0].log_id;
                // Alert.alert('Success', 'Chipper machine checklist inserted successfully.');
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
                <Title text="Chipper Machine Checklist" />
                <InputField placeholder="Site Name / Location" iconLib={Ionicons} iconName="location-sharp" onChangeText={setSiteName} />
                <InputField placeholder="Identification/Machine Number" iconLib={Octicons} iconName="number" onChangeText={setIdentificationNo} />
                <InputField placeholder="Project ID" iconLib={FontAwesome6} iconName="hashtag" onChangeText={setProjectID} />

                <ChecklistItem
                    label="Chisel condition"
                    value={chiselCondition}
                    setValue={setChiselCondition}
                />
                <ChecklistItem
                    label="Tightness of chisel lock"
                    value={tightnessOfChiselLock}
                    setValue={setTightnessOfChiselLock}
                />
                <ChecklistItem
                    label="Handle without any damage"
                    value={handleWithoutDamage}
                    setValue={setHandleWithoutDamage}
                />
                <ChecklistItem
                    label="Condition of the body"
                    value={bodyCondition}
                    setValue={setBodyCondition}
                />
                {/* Add other checklist items as needed */}
                <ChecklistItem
                    label="Trigger switch without damage"
                    value={triggerSwitchWithoutDamage}
                    setValue={setTriggerSwitchWithoutDamage}
                />
                <ChecklistItem
                    label="Electric wire without cuts and joints"
                    value={electricWireWithoutCutsAndJoints}
                    setValue={setElectricWireWithoutCutsAndJoints}
                />
                <ChecklistItem
                    label="Protective guard on moving parts"
                    value={protectiveGuardOnMovingParts}
                    setValue={setProtectiveGuardOnMovingParts}
                />
                <ChecklistItem
                    label="ELCB available within 2m"
                    value={isElcbAvailableWithin2m}
                    setValue={setIsElcbAvailableWithin2m}
                />
                <ChecklistItem
                    label="ELCB tripping checked"
                    value={isElcbTrippingChecked}
                    setValue={setIsElcbTrippingChecked}
                />
                <ChecklistItem
                    label="Body earthing (metal body)"
                    value={bodyEarthingIncaseOfMetalBody}
                    setValue={setBodyEarthingIncaseOfMetalBody}
                />
                <ChecklistItem
                    label="Power cable properly terminated with gland"
                    value={powerCableProperlyTerminatedWithGland}
                    setValue={setPowerCableProperlyTerminatedWithGland}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    checklistItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    checklistText: {
        fontSize: 16,
        flex: 1,
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
    },
    checkbox: {
        flex: 1,
        padding: 10,
    },
});

export default ChipperMachine;
