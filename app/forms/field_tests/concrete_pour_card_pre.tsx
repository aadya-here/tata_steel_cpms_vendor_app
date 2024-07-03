import React, { useState } from 'react';
import { View, ScrollView, Alert, StyleSheet, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';
import InputField from '../../../components/input_field';
import CustomButton from '../../../components/button_primary';
import supabase from '../../../lib/supabase';
import Title from '../../../components/title';
import ActivityDetails from '../../../components/concrete_pour_card_field';
import { useLocalSearchParams } from "expo-router";
import { FontAwesome6 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import { AntDesign } from '@expo/vector-icons';
import Subheading from '../../../components/subheading';

const ConcretePourCardPreForm = () => {
    const { pourCardID, projectID } = useLocalSearchParams();

    const [general, setGeneral] = useState({
        pccRcc: null,
        safeApproachAndIllum: null,
        centreLinesChecked: null,
        availabilityOfVibrators: null,
        bbsAttach: null,
    });

    const [reinforcement, setReinforcement] = useState({
        diameter: null,
        noOfBars: null,
        bindingOfReinforcement: null,
        lapLength: null,
        coverToReinforcement: null,
        angleOfBindingStirrups: null,
    });

    const [formwork, setFormwork] = useState({
        shutteringLine: null,
        shutteringOil: null,
        leakTightness: null,
        surfaceFreeFromDebris: null,
        concreteTopLevelMarking: null,
        shearKeyPockets: null,
        supportsAdequacy: null,
    });

    const [embeddedItems, setEmbeddedItems] = useState({
        noOfBolts: null,
        boltDetails: null,
        adequacyForBolts: null,
        insertPipeSleeves: null,
        cutoutsOpenings: null,
    });

    const [additionalInfo, setAdditionalInfo] = useState({
        remarks: null,
        contractorName: null,
        contractorGpNo: null,
        // tslSiteEnggName: null,
        // tslEnggPNo: null,
        // tslQaName: null,
        // tslQaPNo: null,
    });

    const [isGeneralCollapsed, setGeneralCollapsed] = useState(true);
    const [isReinforcementCollapsed, setReinforcementCollapsed] = useState(true);
    const [isFormworkCollapsed, setFormworkCollapsed] = useState(true);
    const [isEmbeddedItemsCollapsed, setEmbeddedItemsCollapsed] = useState(true);

    const handleGeneralChange = (field, data) => {
        setGeneral({ ...general, [field]: data });
    };

    const handleReinforcementChange = (field, data) => {
        setReinforcement({ ...reinforcement, [field]: data });
    };

    const handleFormworkChange = (field, data) => {
        setFormwork({ ...formwork, [field]: data });
    };

    const handleEmbeddedItemsChange = (field, data) => {
        setEmbeddedItems({ ...embeddedItems, [field]: data });
    };

    const handleAdditionalInfoChange = (field, value) => {
        setAdditionalInfo({ ...additionalInfo, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('concrete_pour_card_pre')
                .insert([{
                    pour_card_id: pourCardID,
                    project_id: projectID,
                    pcc_rcc: general.pccRcc,
                    safe_approach_and_illum: general.safeApproachAndIllum,
                    centre_lines_checked: general.centreLinesChecked,
                    availability_of_vibrators: general.availabilityOfVibrators,
                    bbs_attach: general.bbsAttach,
                    diameter: reinforcement.diameter,
                    no_of_bars: reinforcement.noOfBars,
                    binding_of_reinforcement: reinforcement.bindingOfReinforcement,
                    lap_length: reinforcement.lapLength,
                    cover_to_reinforcement: reinforcement.coverToReinforcement,
                    angle_of_binding_stirrups: reinforcement.angleOfBindingStirrups,
                    shuttering_line: formwork.shutteringLine,
                    shuttering_oil: formwork.shutteringOil,
                    leak_tightness: formwork.leakTightness,
                    surface_free_from_debris: formwork.surfaceFreeFromDebris,
                    concrete_top_level_marking: formwork.concreteTopLevelMarking,
                    shear_key_pockets: formwork.shearKeyPockets,
                    supports_adequacy: formwork.supportsAdequacy,
                    no_of_bolts: embeddedItems.noOfBolts,
                    bolt_details: embeddedItems.boltDetails,
                    adequacy_for_bolts: embeddedItems.adequacyForBolts,
                    insert_pipe_sleeves: embeddedItems.insertPipeSleeves,
                    cutouts_openings: embeddedItems.cutoutsOpenings,
                    remarks: additionalInfo.remarks,
                    contractor_name: additionalInfo.contractorName,
                    contractor_gp_no: additionalInfo.contractorGpNo,
                    // tsl_site_engg_name: additionalInfo.tslSiteEnggName,
                    // tsl_engg_p_no: additionalInfo.tslEnggPNo,
                    // tsl_qa_name: additionalInfo.tslQaName,
                    // tsl_qa_p_no: additionalInfo.tslQaPNo,
                }]);

            if (error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Success', 'Concrete Pour Card (Pre) details submitted successfully.');
            }
        } catch (error) {
            console.error('Error submitting concrete pour card pre details:', error);
            Alert.alert('Error', 'An unexpected error occurred while submitting the form.');
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Title text="Pre Concreting Form" />
                <Subheading text={`Project ID : ${projectID}`} />
                {/* <Subheading text='Pour Card ID'{pourCardID} /> */}


                <TouchableOpacity onPress={() => setGeneralCollapsed(!isGeneralCollapsed)} style={styles.section_heading}>
                    <Subheading text="General" />
                    {isGeneralCollapsed ? (
                        <AntDesign name="down" size={20} color="black" />
                    ) : (
                        <AntDesign name="up" size={20} color="black" />
                    )}
                </TouchableOpacity>
                <Collapsible collapsed={isGeneralCollapsed}>
                    <ActivityDetails activity="PCC/RCC Top Level" onChange={(data) => handleGeneralChange('pccRcc', data)} />
                    <ActivityDetails activity="Safe Approach and Adequate Illumination" onChange={(data) => handleGeneralChange('safeApproachAndIllum', data)} />
                    <ActivityDetails activity="Centre Lines Checked" onChange={(data) => handleGeneralChange('centreLinesChecked', data)} />
                    <ActivityDetails activity="Availability of Vibrators" onChange={(data) => handleGeneralChange('availabilityOfVibrators', data)} />
                    <ActivityDetails activity="BBS Attach" onChange={(data) => handleGeneralChange('bbsAttach', data)} />
                </Collapsible>

                <TouchableOpacity onPress={() => setReinforcementCollapsed(!isReinforcementCollapsed)} style={styles.section_heading}>
                    <Subheading text="Reinforcement" />
                    {isReinforcementCollapsed ? (
                        <AntDesign name="down" size={20} color="black" />
                    ) : (
                        <AntDesign name="up" size={20} color="black" />
                    )}
                </TouchableOpacity>
                <Collapsible collapsed={isReinforcementCollapsed}>
                    <ActivityDetails activity="Diameter" onChange={(data) => handleReinforcementChange('diameter', data)} />
                    <ActivityDetails activity="No of Barss(Column / Beams) / Spacing (others)" onChange={(data) => handleReinforcementChange('noOfBars', data)} />
                    <ActivityDetails activity="Binding of Reinforcement" onChange={(data) => handleReinforcementChange('bindingOfReinforcement', data)} />
                    <ActivityDetails activity="Lap Length" onChange={(data) => handleReinforcementChange('lapLength', data)} />
                    <ActivityDetails activity="Cover to Reinforcement" onChange={(data) => handleReinforcementChange('coverToReinforcement', data)} />
                    <ActivityDetails activity="Angle of Binding Stirrups" onChange={(data) => handleReinforcementChange('angleOfBindingStirrups', data)} />
                </Collapsible>

                <TouchableOpacity onPress={() => setFormworkCollapsed(!isFormworkCollapsed)} style={styles.section_heading}>
                    <Subheading text="Formwork" />
                    {isFormworkCollapsed ? (
                        <AntDesign name="down" size={20} color="black" />
                    ) : (
                        <AntDesign name="up" size={20} color="black" />
                    )}
                </TouchableOpacity>
                <Collapsible collapsed={isFormworkCollapsed} >
                    <ActivityDetails activity="Shuttering Line, Level and Size of Plumb" onChange={(data) => handleFormworkChange('shutteringLine', data)} />
                    <ActivityDetails activity="Shuttering Oil" onChange={(data) => handleFormworkChange('shutteringOil', data)} />
                    <ActivityDetails activity="Leak Tightness" onChange={(data) => handleFormworkChange('leakTightness', data)} />
                    <ActivityDetails activity="Surface Free from Debris/Dust/Grease" onChange={(data) => handleFormworkChange('surfaceFreeFromDebris', data)} />
                    <ActivityDetails activity="Concrete Top Level Marking" onChange={(data) => handleFormworkChange('concreteTopLevelMarking', data)} />
                    <ActivityDetails activity="Shear Key Pockets" onChange={(data) => handleFormworkChange('shearKeyPockets', data)} />
                    <ActivityDetails activity="Supports Adequacy(Formwork Support)" onChange={(data) => handleFormworkChange('supportsAdequacy', data)} />
                </Collapsible>

                <TouchableOpacity onPress={() => setEmbeddedItemsCollapsed(!isEmbeddedItemsCollapsed)} style={styles.section_heading}>
                    <Subheading text="Embedded Items" />
                    {isEmbeddedItemsCollapsed ? (
                        <AntDesign name="down" size={20} color="black" />
                    ) : (
                        <AntDesign name="up" size={20} color="black" />
                    )}
                </TouchableOpacity>
                <Collapsible collapsed={isEmbeddedItemsCollapsed}>
                    <ActivityDetails activity="No of Bolts" onChange={(data) => handleEmbeddedItemsChange('noOfBolts', data)} />
                    <ActivityDetails activity="Bolt Details : ) Grade of Steel/ Dia/ Length of Bolts" onChange={(data) => handleEmbeddedItemsChange('boltDetails', data)} />
                    <ActivityDetails activity="Availability of Protocols / Support adequacy for Bolts" onChange={(data) => handleEmbeddedItemsChange('adequacyForBolts', data)} />
                    <ActivityDetails activity=" Insert/ Pipe Sleeves/ Curb Angles etc. ( Availbility of Protocols/ Fixing arrangements/ Support adequacy)" onChange={(data) => handleEmbeddedItemsChange('insertPipeSleeves', data)} />
                    <ActivityDetails activity=" Cutouts/ Openings (Availbility of Protocols/ Fixing/arrangements/ support adequacy etc)" onChange={(data) => handleEmbeddedItemsChange('cutoutsOpenings', data)} />
                </Collapsible>

                <Subheading text="Additional Info" />
                <InputField placeholder="Remarks" iconLib={FontAwesome6} iconName="comment" onChangeText={value => handleAdditionalInfoChange('remarks', value)} />
                <InputField placeholder="Contractor Name" iconLib={Entypo} iconName="user" onChangeText={value => handleAdditionalInfoChange('contractorName', value)} />
                <InputField placeholder="Contractor GP No" iconLib={FontAwesome6} iconName="id-badge" onChangeText={value => handleAdditionalInfoChange('contractorGpNo', value)} />
                {/* <InputField placeholder="TSL Site Engg Name" iconLib={Entypo} iconName="user" onChangeText={value => handleAdditionalInfoChange('tslSiteEnggName', value)} />
                <InputField placeholder="TSL Engg P No" iconLib={FontAwesome6} iconName="phone" onChangeText={value => handleAdditionalInfoChange('tslEnggPNo', value)} />
                <InputField placeholder="TSL QA Name" iconLib={Entypo} iconName="user" onChangeText={value => handleAdditionalInfoChange('tslQaName', value)} />
                <InputField placeholder="TSL QA P No" iconLib={FontAwesome6} iconName="phone" onChangeText={value => handleAdditionalInfoChange('tslQaPNo', value)} /> */}

                <CustomButton text="Submit" onPress={handleSubmit} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F4F4FF',
    },
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#F4F4FF',
    },

    section_heading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    }
});

export default ConcretePourCardPreForm;
