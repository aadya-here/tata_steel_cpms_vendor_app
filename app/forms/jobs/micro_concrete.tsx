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
import Subheading from '../../../components/subheading';
import CustomButton from '../../../components/button_primary';

const MicroConcreteForm = () => {
    const [projectID, setProjectID] = useState('');
    const [structure, setStructure] = useState('');
    const [quantity, setQuantity] = useState('');
    const [refDrgNo, setRefDrgNo] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const [properMixing, setProperMixing] = useState('');
    const [cleaningSurface, setCleaningSurface] = useState('');
    const [chippingSurface, setChippingSurface] = useState('');
    const [anticorrosivePaint, setAnticorrosivePaint] = useState('');
    const [corrosionInhibitor, setCorrosionInhibitor] = useState('');
    const [bondingAgent, setBondingAgent] = useState('');
    const [microConcrete, setMicroConcrete] = useState('');
    const [shutteringCheck, setShutteringCheck] = useState('');
    const [thicknessCheck, setThicknessCheck] = useState('');
    const [consumptionWithinSettingTime, setConsumptionWithinSettingTime] = useState('');
    const [architecturalFeaturesCheck, setArchitecturalFeaturesCheck] = useState('');
    const [surfaceSmoothness, setSurfaceSmoothness] = useState('');
    const [removalDebris, setRemovalDebris] = useState('');
    const [sealingOpenings, setSealingOpenings] = useState('');
    const [curing, setCuring] = useState('');

    const [contractor, setContractor] = useState('');
    const [tslSiteEngg, setTslSiteEngg] = useState('');
    const [tslQA, setTslQA] = useState('');

    const [thickness, setThickness] = useState();

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('form_micro_concrete')
                .insert([
                    {
                        project_id: parseInt(projectID),
                        structure: structure,
                        date: new Date(),
                        quantity: parseInt(quantity),
                        ref_drg_no: refDrgNo,
                        location: location,
                        checklist_id: 1,
                        description: description,
                        proper_mixing: properMixing,
                        cleaning_surface: cleaningSurface,
                        chipping_surface: chippingSurface,
                        anticorrosive_paint: anticorrosivePaint,
                        corrosion_inhibitor: corrosionInhibitor,
                        bonding_agent: bondingAgent,
                        micro_concrete: microConcrete,
                        shuttering_check: shutteringCheck,
                        thickness_check: thicknessCheck,
                        thickness: parseInt(thickness),
                        consumption_within_setting_time: consumptionWithinSettingTime,
                        architectural_features_check: architecturalFeaturesCheck,
                        surface_smoothness: surfaceSmoothness,
                        removal_debris: removalDebris,
                        sealing_openings: sealingOpenings,
                        curing: curing,
                        contractor: contractor,
                        tsl_site_engg: tslSiteEngg,
                        tsl_qa: tslQA
                    }
                ]);
            if (error) {
                console.error('Error submitting checklist:', error);
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Success', 'Micro Concrete checklist submitted successfully.');
            }
        } catch (error) {
            console.error('Error submitting checklist:', error);
            Alert.alert('Error', 'An unexpected error occurred while submitting the checklist.');
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding">
            <ScrollView style={styles.container}>
                <Title text="Micro Concrete QC Checklist" />
                <InputField placeholder="Project ID" iconLib={FontAwesome6} iconName="hashtag" onChangeText={setProjectID} />
                <InputField placeholder="Structure" iconLib={Icon} iconName="building" onChangeText={setStructure} />
                <InputField placeholder="Quantity" iconLib={Octicons} iconName="number" onChangeText={setQuantity} />
                <InputField placeholder="Ref Drg No" iconLib={FontAwesome6} iconName="barcode" onChangeText={setRefDrgNo} />
                <InputField placeholder="Location" iconLib={Icon} iconName="map-marker" onChangeText={setLocation} />
                <InputField placeholder="Description" iconLib={Icon} iconName="align-left" onChangeText={setDescription} />

                <Subheading text="Before Concrete" />

                <ChecklistItem label="Check for proper mixing of concrete" value={properMixing} setValue={setProperMixing} />
                <ChecklistItem label="Cleaning of surface((Grinding, wire brush, Air blower)" value={cleaningSurface} setValue={setCleaningSurface} />
                <ChecklistItem label="Chipping of Surface (chisel)" value={chippingSurface} setValue={setChippingSurface} />
                <ChecklistItem label="Application of anti - corrosive paint Rust Top." value={anticorrosivePaint} setValue={setAnticorrosivePaint} />
                <ChecklistItem label="Application of corrosion inhibitor ferro guard 903." value={corrosionInhibitor} setValue={setCorrosionInhibitor} />
                <ChecklistItem label="Application of bonding agent sikadur 32LP." value={bondingAgent} setValue={setBondingAgent} />
                <ChecklistItem label="Application of Sikarep micro concrete 4." value={microConcrete} setValue={setMicroConcrete} />
                <ChecklistItem label="Check whether Shuttering for concrete is on line &amp; level." value={shutteringCheck} setValue={setShutteringCheck} />
                <ChecklistItem label="Check for thickness of concrete." value={thicknessCheck} setValue={setThicknessCheck} />

                <InputField placeholder="Thickness of Concrete" iconLib={Icon} iconName="align-left" onChangeText={setThickness} />

                <Subheading text="After Concrete" />

                <ChecklistItem label="Is concrete being consumed within the initial setting time of cement?" value={consumptionWithinSettingTime} setValue={setConsumptionWithinSettingTime} />
                <ChecklistItem label="Check for architectural features & mechanical inserts such as grooves, bands etc." value={architecturalFeaturesCheck} setValue={setArchitecturalFeaturesCheck} />
                <ChecklistItem label="Check for true level surface and smoothness of concrete." value={surfaceSmoothness} setValue={setSurfaceSmoothness} />
                <ChecklistItem label="Check for removal of dead mortar and debris. (housekeeping)" value={removalDebris} setValue={setRemovalDebris} />
                <ChecklistItem label="Check for sealing of openings in concrete for scaffolds." value={sealingOpenings} setValue={setSealingOpenings} />
                <ChecklistItem label="Check for curing upto specified duration. ( Air &amp; Water Curing)" value={curing} setValue={setCuring} />
                <InputField placeholder="Contractor" iconLib={Entypo} iconName="briefcase" onChangeText={setContractor} />
                <InputField placeholder="TSL Site Engg" iconLib={FontAwesome6} iconName="helmet-safety" onChangeText={setTslSiteEngg} />
                <InputField placeholder="TSL QA" iconLib={FontAwesome6} iconName="user-check" onChangeText={setTslQA} />

                <CustomButton text="Submit" onPress={handleSubmit} />

            </ScrollView>
        </KeyboardAvoidingView >
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F4F4FF'
    },
});

export default MicroConcreteForm;
