import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, KeyboardAvoidingView } from 'react-native';
import InputField from '../../../components/input_field';
import CustomButton from '../../../components/button_primary';
import supabase from '../../../lib/supabase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome6, Octicons, Entypo } from '@expo/vector-icons';
import Title from '../../../components/title';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";

const ConcretePourCardDetailsForm = () => {

    const navigation = useNavigation();
    const router = useRouter();
    const params = useLocalSearchParams();

    const [formData, setFormData] = useState({
        projectID: null,
        location: '',
        consultant: '',
        customer: '',
        workOrder: '',
        contractor: '',
        dateOfPour: null,
        area: '',
        pourNo: null,
        nameOfStructure: '',
        refDrawing: '',
        gradeOfConcrete: '',
        appxQty: '',
        requiredQty: '',
        actualQty: '',
    });
    const [buttonsState, setButtonsState] = useState({
        pre: false,
        during: false,
        post: false,
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('concrete_pour_card_details')
                .insert([{
                    checklist_id: 2,
                    project_id: formData.projectID,
                    location: formData.location,
                    consultant: formData.consultant,
                    customer: formData.customer,
                    work_order: formData.workOrder,
                    contractor: formData.contractor,
                    date_of_pour: formData.dateOfPour,
                    area: formData.area,
                    pour_no: formData.pourNo,
                    name_of_structure: formData.nameOfStructure,
                    ref_drawing: formData.refDrawing,
                    grade_of_concrete: formData.gradeOfConcrete,
                    appx_qty: parseFloat(formData.appxQty),
                    required_qty: parseFloat(formData.requiredQty),
                    actual_qty: parseFloat(formData.actualQty),
                }])
                .select();

            if (error) {
                Alert.alert('Error', error.message);
            } else {
                const pourCardID = data[0].pour_card_id;
                Alert.alert('Success', 'Concrete Pour Card details submitted successfully.');
                // checkButtonStates(pourCardID);
            }
        } catch (error) {
            console.error('Error submitting concrete pour card details:', error);
            Alert.alert('Error', 'An unexpected error occurred while submitting the form.');
        }
    };

    const fetchPCid = async (project_id) => {
        try {
            const { data, error } = await supabase
                .from('concrete_pour_card_details')
                .select('pour_card_id')
                .eq('project_id', project_id)
                .single();

            if (error) {
                console.error('Error fetching pour card id:', error);
                return;
            }
            // console.log('data:', data);
            return data.pour_card_id;
        } catch (error) {
            console.error('Unexpected error fetching pour card id:', error);
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding">
            <ScrollView style={styles.container}>
                <Title text="Concrete Pour Card Details Form" />
                <InputField placeholder="Project ID" iconLib={FontAwesome6} iconName="hashtag" onChangeText={value => handleInputChange('projectID', value)} />
                <InputField placeholder="Location" iconLib={Icon} iconName="map-marker" onChangeText={value => handleInputChange('location', value)} />
                <InputField placeholder="Consultant" iconLib={Entypo} iconName="user" onChangeText={value => handleInputChange('consultant', value)} />
                <InputField placeholder="Customer" iconLib={Entypo} iconName="user" onChangeText={value => handleInputChange('customer', value)} />
                <InputField placeholder="Work Order" iconLib={FontAwesome6} iconName="file" onChangeText={value => handleInputChange('workOrder', value)} />
                <InputField placeholder="Contractor" iconLib={Entypo} iconName="user" onChangeText={value => handleInputChange('contractor', value)} />
                <InputField placeholder="Date of Pour" iconLib={FontAwesome6} iconName="calendar" onChangeText={value => handleInputChange('dateOfPour', value)} />
                <InputField placeholder="Area" iconLib={Icon} iconName="map" onChangeText={value => handleInputChange('area', value)} />
                <InputField placeholder="Pour No" iconLib={FontAwesome6} iconName="hashtag" onChangeText={value => handleInputChange('pourNo', value)} />
                <InputField placeholder="Name of Structure" iconLib={FontAwesome6} iconName="building" onChangeText={value => handleInputChange('nameOfStructure', value)} />
                <InputField placeholder="Ref Drawing" iconLib={FontAwesome6} iconName="file" onChangeText={value => handleInputChange('refDrawing', value)} />
                <InputField placeholder="Grade of Concrete" iconLib={FontAwesome6} iconName="hashtag" onChangeText={value => handleInputChange('gradeOfConcrete', value)} />
                <InputField placeholder="Approx. Qty" iconLib={FontAwesome6} iconName="balance-scale" onChangeText={value => handleInputChange('appxQty', value)} />
                <InputField placeholder="Required Qty" iconLib={FontAwesome6} iconName="balance-scale" onChangeText={value => handleInputChange('requiredQty', value)} />
                <InputField placeholder="Actual Qty" iconLib={FontAwesome6} iconName="balance-scale" onChangeText={value => handleInputChange('actualQty', value)} />
                <CustomButton text="Submit" onPress={handleSubmit} />
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.button, buttonsState.pre && styles.buttonActive]}
                        onPress={async () => {
                            const pour_card_id = await fetchPCid(formData.projectID);
                            // console.log('pour_card_id:', pour_card_id);
                            router.push({ pathname: "./concrete_pour_card_pre", params: { pourCardID: pour_card_id, projectID: formData.projectID } })
                        }}
                    >
                        <Text style={styles.buttonText}>Pre</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, buttonsState.during && styles.buttonActive]}
                        onPress={async () => {
                            const pour_card_id = await fetchPCid(formData.projectID);
                            router.push({ pathname: "./concrete_pour_card_during", params: { pourCardID: pour_card_id, projectID: formData.projectID } })
                        }}
                    >
                        <Text style={styles.buttonText}>During</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, buttonsState.post && styles.buttonActive]}
                        onPress={async () => {
                            const pour_card_id = await fetchPCid(formData.projectID);
                            router.push({ pathname: "./concrete_pour_card_post", params: { pourCardID: pour_card_id, projectID: formData.projectID } })
                        }}
                    >
                        <Text style={styles.buttonText}>Post</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F4F4FF',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        padding: 15,
        backgroundColor: '#DDD',
        alignItems: 'center',
        margin: 5,
        borderRadius: 5,
        marginBottom: 100
    },
    buttonActive: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default ConcretePourCardDetailsForm;
