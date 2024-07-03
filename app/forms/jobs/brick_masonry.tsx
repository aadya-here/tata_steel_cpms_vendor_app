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


const BrickMasonryQCForm = () => {
    const [projectID, setProjectID] = useState('');
    const [structure, setStructure] = useState('');
    const [quantity, setQuantity] = useState('');
    const [refDrgNo, setRefDrgNo] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const [availabilityOfBricks, setAvailabilityOfBricks] = useState('');
    const [cleaningWorkArea, setCleaningWorkArea] = useState('');
    const [alignmentLocationMasonry, setAlignmentLocationMasonry] = useState('');
    const [suitabilitySafetyScaffolding, setSuitabilitySafetyScaffolding] = useState('');
    const [wettingBricksBeforePlacing, setWettingBricksBeforePlacing] = useState('');
    const [mortarMixProportionJointThickness, setMortarMixProportionJointThickness] = useState('');
    const [bricksLaidWithFrogsUp, setBricksLaidWithFrogsUp] = useState('');
    const [dimensionsPlumbLevelsAngles, setDimensionsPlumbLevelsAngles] = useState('');
    const [bondBetweenOldNewMasonry, setBondBetweenOldNewMasonry] = useState('');
    const [staggeringVerticalJoints, setStaggeringVerticalJoints] = useState('');
    const [sizesOpeningsDoorsWindows, setSizesOpeningsDoorsWindows] = useState('');
    const [cleaningRakingJoints, setCleaningRakingJoints] = useState('');
    const [curingOldMasonry, setCuringOldMasonry] = useState('');
    const [removalOfDebris, setRemovalOfDebris] = useState('');
    const [noOfCoursesRestricted, setNoOfCoursesRestricted] = useState('');
    const [mixProportion, setMixProportion] = useState('');

    const [contractor, setContractor] = useState('');
    const [tslSiteEngg, setTslSiteEngg] = useState('');
    const [tslQA, setTslQA] = useState('');

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('form_brick_masonry_qc')
                .insert([
                    {
                        project_id: parseInt(projectID),
                        structure: structure,
                        date: new Date(),
                        quantity: parseInt(quantity),
                        ref_drg_no: refDrgNo,
                        location: location,
                        checklist_id: 4,
                        description: description,
                        availability_of_bricks: availabilityOfBricks,
                        cleaning_work_area: cleaningWorkArea,
                        alignment_location_masonry: alignmentLocationMasonry,
                        suitability_safety_scaffolding: suitabilitySafetyScaffolding,
                        wetting_bricks_before_placing: wettingBricksBeforePlacing,
                        mortar_mix_proportion_joint_thickness: mortarMixProportionJointThickness,
                        bricks_laid_with_frogs_up: bricksLaidWithFrogsUp,
                        dimensions_plumb_levels_angles: dimensionsPlumbLevelsAngles,
                        bond_between_old_new_masonry: bondBetweenOldNewMasonry,
                        staggering_vertical_joints: staggeringVerticalJoints,
                        sizes_openings_doors_windows: sizesOpeningsDoorsWindows,
                        cleaning_raking_joints: cleaningRakingJoints,
                        curing_old_masonry: curingOldMasonry,
                        removal_of_debris: removalOfDebris,
                        no_of_courses_restricted: noOfCoursesRestricted,
                        contractor: contractor,
                        tsl_site_engg: tslSiteEngg,
                        tsl_qa: tslQA,
                        mix_proportion: mixProportion,
                    }
                ]);
            if (error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Success', 'Brick Masonry QC checklist submitted successfully.');
            }
        } catch (error) {
            console.error('Error submitting checklist:', error);
            Alert.alert('Error', 'An unexpected error occurred while submitting the checklist.');
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding">
            <ScrollView style={styles.container}>
                <Title text="Brick Masonry QC Checklist" />
                <InputField placeholder="Project ID" iconLib={FontAwesome6} iconName="hashtag" onChangeText={setProjectID} />
                <InputField placeholder="Structure" iconLib={Icon} iconName="building" onChangeText={setStructure} />
                <InputField placeholder="Quantity" iconLib={Octicons} iconName="number" onChangeText={setQuantity} />
                <InputField placeholder="Ref Drg No" iconLib={FontAwesome6} iconName="barcode" onChangeText={setRefDrgNo} />
                <InputField placeholder="Location" iconLib={Icon} iconName="map-marker" onChangeText={setLocation} />
                <InputField placeholder="Description" iconLib={Icon} iconName="align-left" onChangeText={setDescription} />

                <ChecklistItem label="Availability of bricks as per daily requirements. " value={availabilityOfBricks} setValue={setAvailabilityOfBricks} />
                <ChecklistItem label="Cleaning of work area off loose mortar, concrete debris, etc. " value={cleaningWorkArea} setValue={setCleaningWorkArea} />
                <ChecklistItem label="Check for alignment & location of masonry.  Is it as specified? " value={alignmentLocationMasonry} setValue={setAlignmentLocationMasonry} />
                <ChecklistItem label="Check for suitability & safety of scaffolding.  Is it acceptable?" value={suitabilitySafetyScaffolding} setValue={setSuitabilitySafetyScaffolding} />
                <ChecklistItem label="Check for wetting of bricks before placing." value={wettingBricksBeforePlacing} setValue={setWettingBricksBeforePlacing} />
                <ChecklistItem label="Check for mortar mix proportion & joint thickness." value={mortarMixProportionJointThickness} setValue={setMortarMixProportionJointThickness} />
                <InputField placeholder="Specify Mix Proportion" iconLib={FontAwesome6} iconName="hashtag" onChangeText={setMixProportion} />

                <ChecklistItem label="Are bricks being laid with their frogs up? " value={bricksLaidWithFrogsUp} setValue={setBricksLaidWithFrogsUp} />
                <ChecklistItem label="Check for dimensions, plumb, levels & right angles for each course. " value={dimensionsPlumbLevelsAngles} setValue={setDimensionsPlumbLevelsAngles} />
                <ChecklistItem label="Check for bond between old & new masonry.(if applicable) " value={bondBetweenOldNewMasonry} setValue={setBondBetweenOldNewMasonry} />
                <ChecklistItem label="Check for staggering of vertical joints. " value={staggeringVerticalJoints} setValue={setStaggeringVerticalJoints} />
                <ChecklistItem label="Check for sizes of openings for doors & windows? (if applicable) " value={sizesOpeningsDoorsWindows} setValue={setSizesOpeningsDoorsWindows} />
                <ChecklistItem label="Check for cleaning & raking of joints. " value={cleaningRakingJoints} setValue={setCleaningRakingJoints} />
                <ChecklistItem label="Check for sufficiency of curing for old masonry. " value={curingOldMasonry} setValue={setCuringOldMasonry} />
                <ChecklistItem label="Check for removal of debris." value={removalOfDebris} setValue={setRemovalOfDebris} />
                <ChecklistItem label="Check for no. of course restricted as per IS standard" value={noOfCoursesRestricted} setValue={setNoOfCoursesRestricted} />

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
        backgroundColor: '#F4F4FF'
    },
});

export default BrickMasonryQCForm;
