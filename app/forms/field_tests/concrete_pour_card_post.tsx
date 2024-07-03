import React, { useState } from 'react';
import { View, ScrollView, Alert, StyleSheet, KeyboardAvoidingView, Text } from 'react-native';
import InputField from '../../../components/input_field';
import CustomButton from '../../../components/button_primary';
import supabase from '../../../lib/supabase';
import Title from '../../../components/title';
import DateTimePicker from '@react-native-community/datetimepicker'; // Ensure to install this package
import { useLocalSearchParams } from 'expo-router'; // Ensure to install this package
import { FontAwesome6 } from '@expo/vector-icons';
import Subheading from '../../../components/subheading';
const ConcretePourCardPostForm = () => {
    const { pourCardID, projectID } = useLocalSearchParams();

    const [formData, setFormData] = useState({
        curing: null,
        surfaceFinish: '',
        dimension: '',
        lineLevel: '',
        insertsInConcrete: '',
        postConcreteProtocol: '',
        dateOfCastingMentioned: new Date(),
        majorMinorCracks: '',
        repairingDone: '',
        houseKeeping: '',
        remarks: '',
        contractorName: '',
        contractorGpNo: null,
        // tslSiteEnggName: '',
        // tslEnggPNo: '',
        // tslQaName: '',
        // tslQaPNo: '',
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleDateChange = (field, event, selectedDate) => {
        const currentDate = selectedDate || formData[field];
        setFormData({ ...formData, [field]: currentDate });
    };

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('concrete_pour_card_post')
                .insert([{
                    pour_card_id: pourCardID,
                    project_id: projectID,
                    curing: formData.curing,
                    surface_finish: formData.surfaceFinish,
                    dimension: formData.dimension,
                    line_level: formData.lineLevel,
                    inserts_in_concrete: formData.insertsInConcrete,
                    post_concrete_protocol: formData.postConcreteProtocol,
                    date_of_casting_mentioned: formData.dateOfCastingMentioned.toISOString().split('T')[0],
                    major_minor_cracks: formData.majorMinorCracks,
                    repairing_done: formData.repairingDone,
                    house_keeping: formData.houseKeeping,
                    remarks: formData.remarks,
                    contractor_name: formData.contractorName,
                    contractor_gp_no: formData.contractorGpNo,
                    // tsl_site_engg_name: formData.tslSiteEnggName,
                    // tsl_engg_p_no: formData.tslEnggPNo,
                    // tsl_qa_name: formData.tslQaName,
                    // tsl_qa_p_no: formData.tslQaPNo,
                }]);

            if (error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Success', 'Concrete Pour Card (Post) details submitted successfully.');
            }
        } catch (error) {
            console.error('Error submitting concrete pour card post details:', error);
            Alert.alert('Error', 'An unexpected error occurred while submitting the form.');
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding">
            <ScrollView style={styles.container}>
                <Title text="Post Concreting" />
                <Subheading text={`Project ID : ${projectID}`} />


                <InputField
                    placeholder="Curing"
                    iconLib={FontAwesome6}
                    iconName="flask"
                    onChangeText={value => handleInputChange('curing', value)}
                />
                <InputField
                    placeholder="Surface Finish  ( Honeycomb / Bulging )"
                    iconLib={FontAwesome6}
                    iconName="chart-line"
                    onChangeText={value => handleInputChange('surfaceFinish', value)}
                />
                <InputField
                    placeholder="Dimension"
                    iconLib={FontAwesome6}
                    iconName="ruler-combined"
                    onChangeText={value => handleInputChange('dimension', value)}
                />
                <InputField
                    placeholder="Line & Level"
                    iconLib={FontAwesome6}
                    iconName="level"
                    onChangeText={value => handleInputChange('lineLevel', value)}
                />
                <InputField
                    placeholder="Inserts in Concrete"
                    iconLib={FontAwesome6}
                    iconName="plug"
                    onChangeText={value => handleInputChange('insertsInConcrete', value)}
                />
                <InputField
                    placeholder="Post Concrete Protocol"
                    iconLib={FontAwesome6}
                    iconName="file-contract"
                    onChangeText={value => handleInputChange('postConcreteProtocol', value)}
                />

                <Text style={styles.label}>Date of Casting Mentioned</Text>
                <DateTimePicker
                    value={formData.dateOfCastingMentioned}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => handleDateChange('dateOfCastingMentioned', event, selectedDate)}
                />

                <InputField
                    placeholder="Major/Minor Cracks"
                    iconLib={FontAwesome6}
                    iconName="exclamation-triangle"
                    onChangeText={value => handleInputChange('majorMinorCracks', value)}
                />
                <InputField
                    placeholder="Repairing Done (If Any)"
                    iconLib={FontAwesome6}
                    iconName="tools"
                    onChangeText={value => handleInputChange('repairingDone', value)}
                />
                <InputField
                    placeholder="House Keeping"
                    iconLib={FontAwesome6}
                    iconName="broom"
                    onChangeText={value => handleInputChange('houseKeeping', value)}
                />

                <InputField
                    placeholder="Remarks"
                    iconLib={FontAwesome6}
                    iconName="comment"
                    onChangeText={value => handleInputChange('remarks', value)}
                />
                <InputField
                    placeholder="Contractor Name"
                    iconLib={FontAwesome6}
                    iconName="user-tie"
                    onChangeText={value => handleInputChange('contractorName', value)}
                />
                <InputField
                    placeholder="Contractor GP No"
                    iconLib={FontAwesome6}
                    iconName="id-badge"
                    onChangeText={value => handleInputChange('contractorGpNo', value)}
                />
                {/* <InputField
                    placeholder="TSL Site Engg Name"
                    iconLib={FontAwesome6}
                    iconName="hard-hat"
                    onChangeText={value => handleInputChange('tslSiteEnggName', value)}
                />
                <InputField
                    placeholder="TSL Engg P No"
                    iconLib={FontAwesome6}
                    iconName="phone"
                    onChangeText={value => handleInputChange('tslEnggPNo', value)}
                />
                <InputField
                    placeholder="TSL QA Name"
                    iconLib={FontAwesome6}
                    iconName="user-check"
                    onChangeText={value => handleInputChange('tslQaName', value)}
                />
                <InputField
                    placeholder="TSL QA P No"
                    iconLib={FontAwesome6}
                    iconName="phone-alt"
                    onChangeText={value => handleInputChange('tslQaPNo', value)}
                /> */}

                <CustomButton text="Submit" onPress={handleSubmit} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F4F4FF',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
});

export default ConcretePourCardPostForm;