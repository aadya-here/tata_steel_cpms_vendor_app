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

const PlasteringQCForm = () => {
    const [projectID, setProjectID] = useState('');
    const [structure, setStructure] = useState('');
    const [quantity, setQuantity] = useState('');
    const [refDrgNo, setRefDrgNo] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const [properMixingOfMortar, setProperMixingOfMortar] = useState('');
    const [mortarMixProportion, setMortarMixProportion] = useState('');
    const [waterproofingCompound, setWaterproofingCompound] = useState('');
    const [ceilingPlasterCompletion, setCeilingPlasterCompletion] = useState('');
    const [plasteringSequence, setPlasteringSequence] = useState('');
    const [wettingSurfaceBeforePlastering, setWettingSurfaceBeforePlastering] = useState('');
    const [thicknessAndNumberOfCoats, setThicknessAndNumberOfCoats] = useState('');
    const [trueLevelSurface, setTrueLevelSurface] = useState('');
    const [initialSettingTime, setInitialSettingTime] = useState('');
    const [straightEdgesSharpCorners, setStraightEdgesSharpCorners] = useState('');
    const [architecturalFeatures, setArchitecturalFeatures] = useState('');

    const [levelSurfaceSmoothness, setLevelSurfaceSmoothness] = useState('');
    const [straightEdges, setStraightEdges] = useState('');
    const [rightAnglesPlumb, setRightAnglesPlumb] = useState('');
    const [removalOfDeadMortarDebris, setRemovalOfDeadMortarDebris] = useState('');
    const [sealingOpeningsInMasonry, setSealingOpeningsInMasonry] = useState('');
    const [plasteringDateMarked, setPlasteringDateMarked] = useState('');
    const [curingDuration, setCuringDuration] = useState('');

    const [contractor, setContractor] = useState('');
    const [tslSiteEngg, setTslSiteEngg] = useState('');
    const [tslQA, setTslQA] = useState('');

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('form_plastering_qc')
                .insert([
                    {
                        project_id: parseInt(projectID),
                        structure: structure,
                        date: new Date(),
                        quantity: parseInt(quantity),
                        ref_drg_no: refDrgNo,
                        location: location,
                        checklist_id: 5,
                        description: description,
                        proper_mixing_of_mortar: properMixingOfMortar,
                        mortar_mix_proportion: mortarMixProportion,
                        waterproofing_compound: waterproofingCompound,
                        ceiling_plaster_completion: ceilingPlasterCompletion,
                        plastering_sequence: plasteringSequence,
                        wetting_surface_before_plastering: wettingSurfaceBeforePlastering,
                        thickness_and_number_of_coats: thicknessAndNumberOfCoats,
                        true_level_surface: trueLevelSurface,
                        initial_setting_time: initialSettingTime,
                        straight_edges_sharp_corners: straightEdgesSharpCorners,
                        architectural_features: architecturalFeatures,
                        level_surface_smoothness: levelSurfaceSmoothness,
                        straight_edges: straightEdges,
                        right_angles_plumb: rightAnglesPlumb,
                        removal_of_dead_mortar_debris: removalOfDeadMortarDebris,
                        sealing_openings_in_masonry: sealingOpeningsInMasonry,
                        plastering_date_marked: plasteringDateMarked,
                        curing_duration: curingDuration,
                        contractor: contractor,
                        tsl_site_engg: tslSiteEngg,
                        tsl_qa: tslQA
                    }
                ]);
            if (error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Success', 'Plastering QC checklist submitted successfully.');
            }
        } catch (error) {
            console.error('Error submitting checklist:', error);
            Alert.alert('Error', 'An unexpected error occurred while submitting the checklist.');
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding">
            <ScrollView style={styles.container}>
                <Title text="Plastering QC Checklist" />
                <InputField placeholder="Project ID" iconLib={FontAwesome6} iconName="hashtag" onChangeText={setProjectID} />
                <InputField placeholder="Structure" iconLib={Icon} iconName="building" onChangeText={setStructure} />
                <InputField placeholder="Quantity" iconLib={Octicons} iconName="number" onChangeText={setQuantity} />
                <InputField placeholder="Ref Drg No" iconLib={FontAwesome6} iconName="barcode" onChangeText={setRefDrgNo} />
                <InputField placeholder="Location" iconLib={Icon} iconName="map-marker" onChangeText={setLocation} />
                <InputField placeholder="Description" iconLib={Icon} iconName="align-left" onChangeText={setDescription} />

                <Subheading text="During Plastering" />
                <ChecklistItem label="Proper Mixing of Mortar" value={properMixingOfMortar} setValue={setProperMixingOfMortar} />
                <ChecklistItem label="Mortar Mix Proportion" value={mortarMixProportion} setValue={setMortarMixProportion} />
                <ChecklistItem label="Waterproofing Compound" value={waterproofingCompound} setValue={setWaterproofingCompound} />
                <ChecklistItem label="Ceiling Plaster Completion" value={ceilingPlasterCompletion} setValue={setCeilingPlasterCompletion} />
                <ChecklistItem label="Plastering Sequence" value={plasteringSequence} setValue={setPlasteringSequence} />
                <ChecklistItem label="Wetting Surface Before Plastering" value={wettingSurfaceBeforePlastering} setValue={setWettingSurfaceBeforePlastering} />
                <ChecklistItem label="Thickness and Number of Coats" value={thicknessAndNumberOfCoats} setValue={setThicknessAndNumberOfCoats} />
                <ChecklistItem label="True Level Surface" value={trueLevelSurface} setValue={setTrueLevelSurface} />
                <ChecklistItem label="Initial Setting Time" value={initialSettingTime} setValue={setInitialSettingTime} />
                <ChecklistItem label="Straight Edges and Sharp Corners" value={straightEdgesSharpCorners} setValue={setStraightEdgesSharpCorners} />
                <ChecklistItem label="Architectural Features" value={architecturalFeatures} setValue={setArchitecturalFeatures} />

                <Subheading text="After Plastering" />
                <ChecklistItem label="Level Surface Smoothness" value={levelSurfaceSmoothness} setValue={setLevelSurfaceSmoothness} />
                <ChecklistItem label="Straight Edges" value={straightEdges} setValue={setStraightEdges} />
                <ChecklistItem label="Right Angles and Plumb" value={rightAnglesPlumb} setValue={setRightAnglesPlumb} />
                <ChecklistItem label="Removal of Dead Mortar Debris" value={removalOfDeadMortarDebris} setValue={setRemovalOfDeadMortarDebris} />
                <ChecklistItem label="Sealing Openings in Masonry" value={sealingOpeningsInMasonry} setValue={setSealingOpeningsInMasonry} />
                <ChecklistItem label="Plastering Date Marked" value={plasteringDateMarked} setValue={setPlasteringDateMarked} />
                <ChecklistItem label="Curing Duration" value={curingDuration} setValue={setCuringDuration} />


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
        backgroundColor: '#f4f4ff',
    },
});

export default PlasteringQCForm;
