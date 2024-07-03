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
import moment from 'moment';
import { addFormLog } from '../../helpers/addFormLog';


const VibratorMachine = () => {
    const [authorizedOperatorWithPPE, setAuthorizedOperatorWithPPE] = useState(false);
    const [motorCasingWithoutDamage, setMotorCasingWithoutDamage] = useState(false);
    const [sheathed3CorePowerCableWithPlug, setSheathed3CorePowerCableWithPlug] = useState(false);
    const [powerConnectionThrough30maELCB, setPowerConnectionThrough30maELCB] = useState(false);
    const [protectedStarterBox, setProtectedStarterBox] = useState(false);
    const [motorWithProtectedPowerTerminalBox, setMotorWithProtectedPowerTerminalBox] = useState(false);
    const [protectiveGuardOnMovingParts, setProtectiveGuardOnMovingParts] = useState(false);
    const [vibratorCaseCondition, setVibratorCaseCondition] = useState(false);
    const [protectedFuelTank, setProtectedFuelTank] = useState(false);
    const [fuelPipeWithoutDamageLeakage, setFuelPipeWithoutDamageLeakage] = useState(false);
    const [healthyNeedleHoseCoupling, setHealthyNeedleHoseCoupling] = useState(false);
    const [healthyNeedleNoseSpring, setHealthyNeedleNoseSpring] = useState(false);
    const [singlePullStartingMechanism, setSinglePullStartingMechanism] = useState(false);
    const [chokeMechanism, setChokeMechanism] = useState(false);
    const [safeLocationForPositioningVibrator, setSafeLocationForPositioningVibrator] = useState(false);

    const [siteName, setSiteName] = useState('');
    const [identificationNo, setIdentificationNo] = useState('');
    const [projectID, setProjectID] = useState('');
    const [auditedByName, setAuditedByName] = useState('');
    const [auditedByPersonalNo, setAuditedByPersonalNo] = useState('');
    const [responsibility, setResponsibility] = useState('');
    const [remarks, setRemarks] = useState('');

    const { vendorId } = useVendor();
    const [logID, setLogID] = useState<number | null>(null);

    const form_num = 4;


    const handleSubmit = async () => {
        try {
            if (!projectID) {
                Alert.alert('Error', 'Project ID is required.');
                return null;
            }

            const { data, error } = await supabase
                .from('form_vibrator_machine')
                .insert([{
                    form_num: form_num,
                    project_id: parseInt(projectID),
                    authorized_operator_with_ppe: authorizedOperatorWithPPE,
                    motor_casing_without_damage: motorCasingWithoutDamage,
                    sheathed_3core_power_cable_with_plug: sheathed3CorePowerCableWithPlug,
                    power_connection_through_30ma_elcb: powerConnectionThrough30maELCB,
                    protected_starter_box: protectedStarterBox,
                    motor_with_protected_power_terminal_box: motorWithProtectedPowerTerminalBox,
                    protective_guard_on_moving_parts: protectiveGuardOnMovingParts,
                    vibrator_case_condition: vibratorCaseCondition,
                    protected_fuel_tank: protectedFuelTank,
                    fuel_pipe_without_damage_leakage: fuelPipeWithoutDamageLeakage,
                    healthy_needle_hose_coupling: healthyNeedleHoseCoupling,
                    healthy_needle_nose_spring: healthyNeedleNoseSpring,
                    single_pull_starting_mechanism: singlePullStartingMechanism,
                    choke_mechanism: chokeMechanism,
                    safe_location_for_positioning_vibrator: safeLocationForPositioningVibrator,
                    site_name: siteName,
                    identification_no: identificationNo,
                    date: new Date().toISOString(),
                    audited_by_name: auditedByName,
                    audited_by_personal_no: auditedByPersonalNo ? parseInt(auditedByPersonalNo) : null,
                    responsibility: responsibility,
                    remarks: remarks,
                }]).select();




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
                <Title text="Vibrator Machine Checklist" />
                <InputField placeholder="Site Name / Location" iconLib={Ionicons} iconName="location-sharp" onChangeText={setSiteName} />
                <InputField placeholder="Identification/Machine Number" iconLib={Octicons} iconName="number" onChangeText={setIdentificationNo} />
                <InputField placeholder="Project ID" iconLib={FontAwesome6} iconName="hashtag" onChangeText={setProjectID} />

                <ChecklistItem
                    label="Authorized operator with Job Specific PPE"
                    value={authorizedOperatorWithPPE}
                    setValue={setAuthorizedOperatorWithPPE}
                />
                <ChecklistItem
                    label="Motor casing without damage"
                    value={motorCasingWithoutDamage}
                    setValue={setMotorCasingWithoutDamage}
                />
                <ChecklistItem
                    label="Sheathed 3-core power cable with industrial plug cable"
                    value={sheathed3CorePowerCableWithPlug}
                    setValue={setSheathed3CorePowerCableWithPlug}
                />
                <ChecklistItem
                    label="Power connection through 30mA ELCB"
                    value={powerConnectionThrough30maELCB}
                    setValue={setPowerConnectionThrough30maELCB}
                />
                <ChecklistItem
                    label="Protected starter box/non-latching on-off switch"
                    value={protectedStarterBox}
                    setValue={setProtectedStarterBox}
                />
                <ChecklistItem
                    label="Motor with protected power terminal box"
                    value={motorWithProtectedPowerTerminalBox}
                    setValue={setMotorWithProtectedPowerTerminalBox}
                />
                <ChecklistItem
                    label="Protective guard on moving parts"
                    value={protectiveGuardOnMovingParts}
                    setValue={setProtectiveGuardOnMovingParts}
                />
                <ChecklistItem
                    label="Vibrator case frame/bottom condition"
                    value={vibratorCaseCondition}
                    setValue={setVibratorCaseCondition}
                />
                <ChecklistItem
                    label="Protected fuel tank with leakage"
                    value={protectedFuelTank}
                    setValue={setProtectedFuelTank}
                />
                <ChecklistItem
                    label="Fuel pipe without damage/leakage"
                    value={fuelPipeWithoutDamageLeakage}
                    setValue={setFuelPipeWithoutDamageLeakage}
                />
                <ChecklistItem
                    label="Healthy needle hose & coupling"
                    value={healthyNeedleHoseCoupling}
                    setValue={setHealthyNeedleHoseCoupling}
                />
                <ChecklistItem
                    label="Healthy needle nose & spring"
                    value={healthyNeedleNoseSpring}
                    setValue={setHealthyNeedleNoseSpring}
                />
                <ChecklistItem
                    label="Single pull starting mechanism"
                    value={singlePullStartingMechanism}
                    setValue={setSinglePullStartingMechanism}
                />
                <ChecklistItem
                    label="Choke mechanism"
                    value={chokeMechanism}
                    setValue={setChokeMechanism}
                />
                <ChecklistItem
                    label="Safe location for positioning vibrator"
                    value={safeLocationForPositioningVibrator}
                    setValue={setSafeLocationForPositioningVibrator}
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

export default VibratorMachine;
