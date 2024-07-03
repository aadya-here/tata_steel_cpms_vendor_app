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

const PaintingQCForm = () => {
    const [projectID, setProjectID] = useState('');
    const [structure, setStructure] = useState('');
    const [quantity, setQuantity] = useState('');
    const [refDrgNo, setRefDrgNo] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const [cleaningSurface, setCleaningSurface] = useState('');
    const [specsAvailable, setSpecsAvailable] = useState('');
    const [fillingPits, setFillingPits] = useState('');
    const [safetyScaffolding, setSafetyScaffolding] = useState('');
    const [scaffoldingClearance, setScaffoldingClearance] = useState('');
    const [chemicalPaint, setChemicalPaint] = useState('');
    const [paintingGangs, setPaintingGangs] = useState('');
    const [bondingAgent, setBondingAgent] = useState('');
    const [consistencyPaint, setConsistencyPaint] = useState('');
    const [applicationUniform, setApplicationUniform] = useState('');
    const [numberCoats, setNumberCoats] = useState('');
    const [timeBetweenCoats, setTimeBetweenCoats] = useState('');
    const [removalScaffoldsCleaning, setRemovalScaffoldsCleaning] = useState('');

    const [contractor, setContractor] = useState('');
    const [tslSiteEngg, setTslSiteEngg] = useState('');
    const [tslQA, setTslQA] = useState('');

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('form_painting_qc')
                .insert([
                    {
                        project_id: parseInt(projectID),
                        structure: structure,
                        date: new Date(),
                        quantity: parseInt(quantity),
                        ref_drg_no: refDrgNo,
                        location: location,
                        checklist_id: 2,
                        description: description,
                        cleaning_surface: cleaningSurface,
                        specs_available: specsAvailable,
                        filling_pits: fillingPits,
                        safety_scaffolding: safetyScaffolding,
                        scaffolding_clearance: scaffoldingClearance,
                        chemical_paint: chemicalPaint,
                        painting_gangs: paintingGangs,
                        bonding_agent: bondingAgent,
                        consistency_paint: consistencyPaint,
                        application_uniform: applicationUniform,
                        number_coats: numberCoats,
                        time_between_coats: timeBetweenCoats,
                        removal_scaffolds_cleaning: removalScaffoldsCleaning,
                        contractor: contractor,
                        tsl_site_engg: tslSiteEngg,
                        tsl_qa: tslQA
                    }
                ]);
            if (error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Success', 'Painting QC checklist submitted successfully.');
            }
        } catch (error) {
            console.error('Error submitting checklist:', error);
            Alert.alert('Error', 'An unexpected error occurred while submitting the checklist.');
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding">
            <ScrollView style={styles.container}>
                <Title text="Painting QC Checklist" />
                <InputField placeholder="Project ID" iconLib={FontAwesome6} iconName="hashtag" onChangeText={setProjectID} />
                <InputField placeholder="Structure" iconLib={Icon} iconName="building" onChangeText={setStructure} />
                <InputField placeholder="Quantity" iconLib={Octicons} iconName="number" onChangeText={setQuantity} />
                <InputField placeholder="Ref Drg No" iconLib={FontAwesome6} iconName="barcode" onChangeText={setRefDrgNo} />
                <InputField placeholder="Location" iconLib={Icon} iconName="map-marker" onChangeText={setLocation} />
                <InputField placeholder="Description" iconLib={Icon} iconName="align-left" onChangeText={setDescription} />

                <Subheading text="Before Painting" />
                <ChecklistItem label="Check for cleaning of wall & ceiling surface. Is it free from dead mortar, dirt, dust, algae, grease etc." value={cleaningSurface} setValue={setCleaningSurface} />
                <ChecklistItem label="SAre manufacturer’s specifications for painting available for reference." value={specsAvailable} setValue={setSpecsAvailable} />
                <ChecklistItem label="Check for filling of pits or undulations in the plaster" value={fillingPits} setValue={setFillingPits} />
                <ChecklistItem label="Check for suitability & safety of scaffolding." value={safetyScaffolding} setValue={setSafetyScaffolding} />
                <ChecklistItem label="Is the scaffolding erected away from the surface so as not to touch the surface being painted?" value={scaffoldingClearance} setValue={setScaffoldingClearance} />
                <ChecklistItem label="Availability of sufficient number of Chemical protection paint Sikaguard 67,63 containers." value={chemicalPaint} setValue={setChemicalPaint} />
                <ChecklistItem label="Availability of painting gangs." value={paintingGangs} setValue={setPaintingGangs} />

                <Subheading text="During & After Painting" />


                <ChecklistItem label="Check for application of Bonding agent." value={bondingAgent} setValue={setBondingAgent} />
                <ChecklistItem label="Check for consistency of paint." value={consistencyPaint} setValue={setConsistencyPaint} />
                <ChecklistItem label="Check for application of paint. Is it uniform?" value={applicationUniform} setValue={setApplicationUniform} />
                <ChecklistItem label="Check for number of coats." value={numberCoats} setValue={setNumberCoats} />
                <ChecklistItem label="Check for time interval between two coats." value={timeBetweenCoats} setValue={setTimeBetweenCoats} />
                <ChecklistItem label="Check for removal of scaffolds and cleaning." value={removalScaffoldsCleaning} setValue={setRemovalScaffoldsCleaning} />

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

export default PaintingQCForm;
