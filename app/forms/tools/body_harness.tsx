import { StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Text, } from 'react-native';
import React, { useState } from 'react';

import supabase from '../../../lib/supabase';

import InputField from '../../../components/input_field';
import ChecklistItem from '../../../components/tools_checklist_item';
import CustomButton from '../../../components/button_primary';
import Subheading from '../../../components/subheading';
import Title from '../../../components/title';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useVendor } from '../../../context/vendor_context';
import { addFormLog } from '../../helpers/addFormLog';

const FullBodyHarness = () => {
    const [parachuteBuckle, setParachuteBuckle] = useState(false);
    const [strap44mmChest, setStrap44mmChest] = useState(false);
    const [chestSlidingPlate, setChestSlidingPlate] = useState(false);
    const [shoulderStraps, setShoulderStraps] = useState(false);
    const [loops, setLoops] = useState(false);
    const [webHolder, setWebHolder] = useState(false);
    const [dRing, setDRing] = useState(false);
    const [idPlate, setIdPlate] = useState(false);
    const [fallIndicator, setFallIndicator] = useState(false);
    const [legStrap, setLegStrap] = useState(false);
    const [sitStrap, setSitStrap] = useState(false);
    const [lanyardRope, setLanyardRope] = useState(false);
    const [snapHook, setSnapHook] = useState(false);

    const [siteName, setSiteName] = useState('');
    const [identificationNo, setIdentificationNo] = useState('');
    const [auditedByName, setAuditedByName] = useState('');
    const [auditedByPersonalNo, setAuditedByPersonalNo] = useState('');
    const [responsibility, setResponsibility] = useState('');
    const [remarks, setRemarks] = useState('');
    const [projectID, setProjectID] = useState('');

    const { vendorId } = useVendor();
    const form_num = 5;


    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('form_full_body_harness')
                .insert([
                    {
                        form_num: form_num,
                        // tool_name: 'Full Body Harness',
                        project_id: parseInt(projectID),
                        parachute_buckle: parachuteBuckle,
                        strap_44mm_chest: strap44mmChest,
                        chest_sliding_plate: chestSlidingPlate,
                        shoulder_straps: shoulderStraps,
                        loops: loops,
                        web_holder: webHolder,
                        d_ring: dRing,
                        id_plate: idPlate,
                        fall_indicator: fallIndicator,
                        leg_strap: legStrap,
                        sit_strap: sitStrap,
                        lanyard_rope: lanyardRope,
                        snap_hook: snapHook,
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

                // Alert.alert('Success', 'Full body harness checklist inserted successfully.');
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
                <Title text="Full Body Harness Checklist" />
                <InputField placeholder="Site Name / Location" iconLib={Ionicons} iconName="location-sharp" onChangeText={setSiteName} />
                <InputField placeholder="Identification/Machine Number" iconLib={Octicons} iconName="number" onChangeText={setIdentificationNo} />
                <InputField placeholder="Project ID" iconLib={FontAwesome6} iconName="hashtag" onChangeText={setProjectID} />

                <Subheading text="Front Side" />
                <ChecklistItem
                    label="Parachute buckle"
                    value={parachuteBuckle}
                    setValue={setParachuteBuckle}
                />
                <ChecklistItem
                    label="44mm chest strap(adjustable)"
                    value={strap44mmChest}
                    setValue={setStrap44mmChest}
                />
                <ChecklistItem
                    label="Chest sliding plate"
                    value={chestSlidingPlate}
                    setValue={setChestSlidingPlate}
                />
                <ChecklistItem
                    label="Shoulder straps (non adjustable)"
                    value={shoulderStraps}
                    setValue={setShoulderStraps}
                />
                <ChecklistItem
                    label="Loops"
                    value={loops}
                    setValue={setLoops}
                />
                <ChecklistItem
                    label="Web holder"
                    value={webHolder}
                    setValue={setWebHolder}
                />

                <Subheading text="Back Side" />
                <ChecklistItem
                    label="D-ring"
                    value={dRing}
                    setValue={setDRing}
                />
                <ChecklistItem
                    label="ID plate"
                    value={idPlate}
                    setValue={setIdPlate}
                />
                <ChecklistItem
                    label="Fall indicator"
                    value={fallIndicator}
                    setValue={setFallIndicator}
                />
                <ChecklistItem
                    label="Leg strap(adjustable)"
                    value={legStrap}
                    setValue={setLegStrap}
                />
                <ChecklistItem
                    label="Sit strap"
                    value={sitStrap}
                    setValue={setSitStrap}
                />
                <ChecklistItem
                    label="Lanyard rope 1.8m"
                    value={lanyardRope}
                    setValue={setLanyardRope}
                />
                <ChecklistItem
                    label="Snap hook"
                    value={snapHook}
                    setValue={setSnapHook}
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

export default FullBodyHarness;
