import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Modal, Pressable } from 'react-native';
import InputField from '../../../components/input_field';
import CustomButton from '../../../components/button_primary';
import supabase from '../../../lib/supabase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome, Octicons, Entypo } from '@expo/vector-icons';
import Title from '../../../components/title';

import CompressiveStrengthDetailsForm from '../../../components/compressive_strength_comp';

const CompressiveStrengthForm = () => {
    const [user, setUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [testID, setTestID] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error);
            } else {
                setUser(data.user);
                console.log('User:', data.user);
            }
        };

        fetchUser();
    }, []);

    const [formData, setFormData] = useState({
        projectID: '',
        nameOfWork: '',
        typeOfSample: '',
        contractor: '',
        batchNo: '',
        stockDetails: '',
        supplier: '',
        typeOfBricks: '',
        dateOfStartOfSoaking: null,
        dateOfEndOfSoaking: null,
        testReportNo: '',
        dateOfTesting: null,
        avgCompressiveStrength: null,
        contractorSign: '',
        tslQASign: '',
        remarks: '',
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('compressive_strength')
                .insert([{
                    project_id: formData.projectID,
                    checklist_id: 1,
                    name_of_work: formData.nameOfWork,
                    type_of_sample: formData.typeOfSample,
                    contractor: formData.contractor,
                    batch_no: formData.batchNo,
                    stock_details: formData.stockDetails,
                    supplier: formData.supplier,
                    type_of_bricks: formData.typeOfBricks,
                    date_of_start_of_soaking: formData.dateOfStartOfSoaking,
                    date_of_end_of_soaking: formData.dateOfEndOfSoaking,
                    test_report_no: formData.testReportNo,
                    date_of_testing: formData.dateOfTesting,
                    avg_compressive_strength: formData.avgCompressiveStrength,
                    contractor_sign: formData.contractorSign,
                    tsl_qa_sign: formData.tslQASign,
                    remarks: formData.remarks,
                    created_on: new Date(),
                    created_by: user.id
                }]).select();

            if (error) {
                Alert.alert('Error', error.message);
                return false;
            } else {
                Alert.alert('Success', 'Compressive Strength record submitted successfully.');
                setTestID(data[0].test_id);
                return true;
            }
        } catch (error) {
            console.error('Error submitting compressive strength:', error);
            Alert.alert('Error', 'An unexpected error occurred while submitting the form.');
            return false;
        }
    };

    const redirect = async () => {
        const result = await handleSubmit();

        if (result) {
            setModalVisible(true);
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding">
            <ScrollView style={styles.container}>
                <Title text="Compressive Strength Form" />
                <InputField placeholder="Project ID" iconLib={FontAwesome} iconName="hashtag" onChangeText={value => handleInputChange('projectID', value)} />
                <InputField placeholder="Name of Work" iconLib={Icon} iconName="briefcase" onChangeText={value => handleInputChange('nameOfWork', value)} />
                <InputField placeholder="Type of Sample" iconLib={Octicons} iconName="beaker" onChangeText={value => handleInputChange('typeOfSample', value)} />
                <InputField placeholder="Contractor" iconLib={Entypo} iconName="user" onChangeText={value => handleInputChange('contractor', value)} />
                <InputField placeholder="Batch No" iconLib={FontAwesome} iconName="barcode" onChangeText={value => handleInputChange('batchNo', value)} />
                <InputField placeholder="Stock Details" iconLib={FontAwesome} iconName="boxes-stacked" onChangeText={value => handleInputChange('stockDetails', value)} />
                <InputField placeholder="Supplier" iconLib={Icon} iconName="truck" onChangeText={value => handleInputChange('supplier', value)} />
                <InputField placeholder="Type of Bricks" iconLib={Icon} iconName="cube" onChangeText={value => handleInputChange('typeOfBricks', value)} />
                <InputField placeholder="Date of Start of Soaking" iconLib={FontAwesome} iconName="calendar" onChangeText={value => handleInputChange('dateOfStartOfSoaking', value)} />
                <InputField placeholder="Date of End of Soaking" iconLib={FontAwesome} iconName="calendar" onChangeText={value => handleInputChange('dateOfEndOfSoaking', value)} />
                <InputField placeholder="Date of Testing" iconLib={FontAwesome} iconName="calendar" onChangeText={value => handleInputChange('dateOfTesting', value)} />
                <InputField placeholder="Test Report No" iconLib={FontAwesome} iconName="file" onChangeText={value => handleInputChange('testReportNo', value)} />
                <InputField placeholder="Avg. Compressive Strength" iconLib={FontAwesome} iconName="chart-line" onChangeText={value => handleInputChange('avgCompressiveStrength', value)} />
                <InputField placeholder="Contractor Sign" iconLib={FontAwesome} iconName="signature" onChangeText={value => handleInputChange('contractorSign', value)} />
                <InputField placeholder="TSL QA Sign" iconLib={FontAwesome} iconName="signature" onChangeText={value => handleInputChange('tslQASign', value)} />
                <InputField placeholder="Remarks" iconLib={FontAwesome} iconName="comment" onChangeText={value => handleInputChange('remarks', value)} />
                <CustomButton text="Submit" onPress={redirect} />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalView}>
                        <CompressiveStrengthDetailsForm
                            testID={testID}
                            projectID={formData.projectID}
                            onClose={() => setModalVisible(false)}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F4F4FF'
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CompressiveStrengthForm;
