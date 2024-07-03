import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, KeyboardAvoidingView } from 'react-native';
import ChecklistItem from '../../../components/jobs_checklist';
import supabase from '../../../lib/supabase';
import InputField from '../../../components/input_field';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome6 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Title from '../../../components/title';
import CustomButton from '../../../components/button_primary';
import Subheading from '../../../components/subheading';

const MortarPlasteringQCForm = () => {
    const [projectID, setProjectID] = useState('');
    const [structure, setStructure] = useState('');
    const [quantity, setQuantity] = useState('');
    const [refDrgNo, setRefDrgNo] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const [properMixingMortar, setProperMixingMortar] = useState('');
    const [cleaningSurface, setCleaningSurface] = useState('');
    const [chippingSurface, setChippingSurface] = useState('');
    const [anticorrosivePaint, setAnticorrosivePaint] = useState('');
    const [corrosionInhibitor, setCorrosionInhibitor] = useState('');
    const [bondingAgent, setBondingAgent] = useState('');
    const [fiberMortar, setFiberMortar] = useState('');
    const [completionOverheadPlaster, setCompletionOverheadPlaster] = useState('');
    const [startTopWorkDownwards, setStartTopWorkDownwards] = useState('');
    const [thicknessNumberCoats, setThicknessNumberCoats] = useState('');
    const [initialSettingTime, setInitialSettingTime] = useState('');
    const [architecturalFeatures, setArchitecturalFeatures] = useState('');
    const [trueLevelSmoothness, setTrueLevelSmoothness] = useState('');
    const [removalDeadMortarDebris, setRemovalDeadMortarDebris] = useState('');
    const [curingSpecifiedDuration, setCuringSpecifiedDuration] = useState('');

    const [contractor, setContractor] = useState('');
    const [tslSiteEngg, setTslSiteEngg] = useState('');
    const [tslQA, setTslQA] = useState('');

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('form_mortar_plastering_qc')
                .insert([
                    {
                        project_id: parseInt(projectID),
                        structure: structure,
                        date: new Date(),
                        quantity: parseInt(quantity),
                        ref_drg_no: refDrgNo,
                        location: location,
                        checklist_id: 3,
                        description: description,
                        proper_mixing_mortar: properMixingMortar,
                        cleaning_surface: cleaningSurface,
                        chipping_surface: chippingSurface,
                        anticorrosive_paint: anticorrosivePaint,
                        corrosion_inhibitor: corrosionInhibitor,
                        bonding_agent: bondingAgent,
                        fiber_mortar: fiberMortar,
                        completion_overhead_plaster: completionOverheadPlaster,
                        start_top_work_downwards: startTopWorkDownwards,
                        thickness_number_coats: thicknessNumberCoats,
                        initial_setting_time: initialSettingTime,
                        architectural_features: architecturalFeatures,
                        true_level_smoothness: trueLevelSmoothness,
                        removal_dead_mortar_debris: removalDeadMortarDebris,
                        curing_specified_duration: curingSpecifiedDuration,
                        contractor: contractor,
                        tsl_site_engg: tslSiteEngg,
                        tsl_qa: tslQA
                    }
                ]);
            if (error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Success', 'Mortar Plastering QC checklist submitted successfully.');
            }
        } catch (error) {
            console.error('Error submitting checklist:', error);
            Alert.alert('Error', 'An unexpected error occurred while submitting the checklist.');
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding">
            <ScrollView style={styles.container}>
                <Title text="Mortar QC Checklist" />
                <InputField placeholder="Project ID" iconLib={FontAwesome6} iconName="hashtag" onChangeText={setProjectID} />
                <InputField placeholder="Structure" iconLib={Icon} iconName="building" onChangeText={setStructure} />
                <InputField placeholder="Quantity" iconLib={Octicons} iconName="number" onChangeText={setQuantity} />
                <InputField placeholder="Ref Drg No" iconLib={FontAwesome6} iconName="barcode" onChangeText={setRefDrgNo} />
                <InputField placeholder="Location" iconLib={Icon} iconName="map-marker" onChangeText={setLocation} />
                <InputField placeholder="Description" iconLib={Icon} iconName="align-left" onChangeText={setDescription} />

                <Subheading text="During" />

                <ChecklistItem label="Check for proper mixing of mortar." value={properMixingMortar} setValue={setProperMixingMortar} />
                <ChecklistItem label="Cleaning of surface (Grinding, wire brush)" value={cleaningSurface} setValue={setCleaningSurface} />
                <ChecklistItem label="Chipping of Surface (chisel)" value={chippingSurface} setValue={setChippingSurface} />
                <ChecklistItem label="Application of anti - corrosive paint Rust Top." value={anticorrosivePaint} setValue={setAnticorrosivePaint} />
                <ChecklistItem label="Application of corrosion inhibitor ferro guard 903." value={corrosionInhibitor} setValue={setCorrosionInhibitor} />
                <ChecklistItem label="Application of bonding agent sikadur 32LP." value={bondingAgent} setValue={setBondingAgent} />
                <ChecklistItem label="Application of fiber mortar sika monotop 122F." value={fiberMortar} setValue={setFiberMortar} />
                <ChecklistItem label="Check for completion of overhead plaster prior to plastering of vertical surface." value={completionOverheadPlaster} setValue={setCompletionOverheadPlaster} />
                <ChecklistItem label="Check whether plastering is started from the top and worked downwards to the floor." value={startTopWorkDownwards} setValue={setStartTopWorkDownwards} />
                <ChecklistItem label="Check for thickness & number of coats of plaster. (2 coats)" value={thicknessNumberCoats} setValue={setThicknessNumberCoats} />
                <ChecklistItem label="Is mortar being consumed within the initial setting time of cement? ( As soon as mortar has started to stiffen)." value={initialSettingTime} setValue={setInitialSettingTime} />
                <ChecklistItem label="Check for architectural features such as grooves, bands etc. (24mm)" value={architecturalFeatures} setValue={setArchitecturalFeatures} />

                <Subheading text="After" />

                <ChecklistItem label="Check for true level surface and smoothness of plaster." value={trueLevelSmoothness} setValue={setTrueLevelSmoothness} />
                <ChecklistItem label="Check for removal of dead mortar and debris. (Housekeeping)" value={removalDeadMortarDebris} setValue={setRemovalDeadMortarDebris} />
                <ChecklistItem label="Check for curing upto specified duration. ( air curing)" value={curingSpecifiedDuration} setValue={setCuringSpecifiedDuration} />

                <InputField placeholder="Contractor" iconLib={Entypo} iconName="briefcase" onChangeText={setContractor} />
                <InputField placeholder="TSL Site Engg" iconLib={FontAwesome6} iconName="helmet-safety" onChangeText={setTslSiteEngg} />
                <InputField placeholder="TSL QA" iconLib={FontAwesome6} iconName="user-check" onChangeText={setTslQA} />

                <CustomButton text="Submit" onPress={handleSubmit} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f4f4ff'
    },
});

export default MortarPlasteringQCForm;
