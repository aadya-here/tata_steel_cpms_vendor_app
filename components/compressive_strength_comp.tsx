import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Pressable } from 'react-native';
import InputField from '../components/input_field';
import CustomButton from '../components/button_primary';
import supabase from '../lib/supabase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome6, Octicons } from '@expo/vector-icons';
import Title from '../components/title';

const CompressiveStrengthDetailsForm = ({ testID, projectID, onClose }) => {
    const [formData, setFormData] = useState({
        identificationSize: '',
        area: '',
        load: '',
        compressiveStrength: '',
        remarks: ''
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('compressive_strength_details')
                .insert([{
                    test_id: testID,
                    identification_size: formData.identificationSize,
                    area: parseFloat(formData.area),
                    load: parseFloat(formData.load),
                    compressive_strength: parseFloat(formData.compressiveStrength),
                    remarks: formData.remarks
                }]).select();

            if (error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Success', 'Compressive Strength Details submitted successfully.');

            }
        } catch (error) {
            console.error('Error submitting compressive strength details:', error);
            Alert.alert('Error', 'An unexpected error occurred while submitting the form.');
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding">
            <ScrollView style={styles.container}>
                <Title text="Compressive Strength Details Form" />
                <Text>Test ID: {testID}</Text>
                <Text>Project ID: {projectID}</Text>
                <InputField placeholder="Identification Size" iconLib={FontAwesome6} iconName="ruler" onChangeText={value => handleInputChange('identificationSize', value)} />
                <InputField placeholder="Area" iconLib={FontAwesome6} iconName="chart-area" onChangeText={value => handleInputChange('area', value)} />
                <InputField placeholder="Load" iconLib={Octicons} iconName="flame" onChangeText={value => handleInputChange('load', value)} />
                <InputField placeholder="Compressive Strength" iconLib={FontAwesome6} iconName="chart-line" onChangeText={value => handleInputChange('compressiveStrength', value)} />
                <InputField placeholder="Remarks" iconLib={FontAwesome6} iconName="comment" onChangeText={value => handleInputChange('remarks', value)} />
                <CustomButton text="close" onPress={onClose} />
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

export default CompressiveStrengthDetailsForm;
