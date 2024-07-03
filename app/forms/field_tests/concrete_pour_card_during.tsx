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


const ConcretePourCardDuringForm = () => {
    const { pourCardID, projectID } = useLocalSearchParams();

    const [formData, setFormData] = useState({
        mixGrade: '',
        slump: '',
        pourStartTime: new Date(),
        pourEndTime: new Date(),
        concreteQuantity: '',
        leakageOfSlurry: '',
        cubesTaken: '',
        cubeReference: '',
        remarks: '',
        contractorName: '',
        contractorGpNo: '',
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
                .from('concrete_pour_card_during')
                .insert([{
                    pour_card_id: pourCardID,
                    project_id: projectID,
                    mix_grade: formData.mixGrade,
                    slump: formData.slump,
                    pour_start_time: formData.pourStartTime.toTimeString().split(' ')[0],
                    pour_end_time: formData.pourEndTime.toTimeString().split(' ')[0],
                    concrete_quantity: parseFloat(formData.concreteQuantity),
                    leakage_of_slurry: formData.leakageOfSlurry,
                    cubes_taken: formData.cubesTaken,
                    cube_reference: formData.cubeReference,
                    remarks: formData.remarks,
                    contractor_name: formData.contractorName,
                    // contractor_gp_no: parseInt(formData.contractorGpNo),
                    // tsl_site_engg_name: formData.tslSiteEnggName,
                    // tsl_engg_p_no: parseInt(formData.tslEnggPNo),
                    // tsl_qa_name: formData.tslQaName,
                    // tsl_qa_p_no: parseInt(formData.tslQaPNo),
                }]);

            if (error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Success', 'Concrete Pour Card (During) details submitted successfully.');
            }
        } catch (error) {
            console.error('Error submitting concrete pour card during details:', error);
            Alert.alert('Error', 'An unexpected error occurred while submitting the form.');
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding">
            <ScrollView style={styles.container}>
                <Subheading text={`Project ID : ${projectID}`} />

                <Title text="During Concreting" />

                <InputField
                    placeholder="Mix Grade"
                    iconLib={FontAwesome6}
                    iconName="flask"
                    onChangeText={value => handleInputChange('mixGrade', value)}
                />
                <InputField
                    placeholder="Slump"
                    iconLib={FontAwesome6}
                    iconName="chart-line"
                    onChangeText={value => handleInputChange('slump', value)}
                />

                <Text style={styles.label}>Pour Start Time</Text>
                <DateTimePicker
                    value={formData.pourStartTime}
                    mode="time"
                    display="default"
                    onChange={(event, selectedDate) => handleDateChange('pourStartTime', event, selectedDate)}
                />

                <Text style={styles.label}>Pour End Time</Text>
                <DateTimePicker
                    value={formData.pourEndTime}
                    mode="time"
                    display="default"
                    onChange={(event, selectedDate) => handleDateChange('pourEndTime', event, selectedDate)}
                />


                <InputField
                    placeholder=" Concrete Quantity as per no. of TM"
                    iconLib={FontAwesome6}
                    iconName="weight"
                    onChangeText={value => handleInputChange('concreteQuantity', value)}
                />
                <InputField
                    placeholder="Any Leakage of Slurry"
                    iconLib={FontAwesome6}
                    iconName="water"
                    onChangeText={value => handleInputChange('leakageOfSlurry', value)}
                />
                <InputField
                    placeholder="Cubes Taken"
                    iconLib={FontAwesome6}
                    iconName="cube"
                    onChangeText={value => handleInputChange('cubesTaken', value)}
                />
                <InputField
                    placeholder="Identification (Cube Reference)"
                    iconLib={FontAwesome6}
                    iconName="tags"
                    onChangeText={value => handleInputChange('cubeReference', value)}
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

export default ConcretePourCardDuringForm;
