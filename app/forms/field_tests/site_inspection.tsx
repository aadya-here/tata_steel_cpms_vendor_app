import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, StyleSheet, KeyboardAvoidingView, Modal, Pressable, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputField from '../../../components/input_field';
import CustomButton from '../../../components/button_primary';
import supabase from '../../../lib/supabase';
import Title from '../../../components/title';
import { FontAwesome6 } from '@expo/vector-icons';
import moment from 'moment';

// Import the RFIInspectionInfoForm component
import RFIInspectionInfoForm from '../../../components/rfi_inspection_info_comp'; // Adjust the import path as per your project structure

const RFIDetailsForm = () => {
    const [formData, setFormData] = useState({
        contractor: '',
        workOrderNo: '',
        projectID: '',
        nameOfActivity: '',
        locationArea: '',
        approvedDrawingNo: '',
        previousWorkApproved: '',
        remarks: '',
        contractorRepName: '',
        contractorRepGpNo: '',
        rfiSubmissionDatetime: new Date(),
    });

    const [inspectionData, setInspectionData] = useState({
        rfiId: '',
        descriptionOfWork: '',
        date: new Date(),
        timeStart: new Date(),
        timeFinish: new Date(),
        signTsl: '',
        remarks: '',
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState({ start: false, finish: false });
    const [user, setUser] = useState(null);

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

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleInspectionInputChange = (field, value) => {
        setInspectionData({ ...inspectionData, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('rfi_details')
                .insert([{
                    contractor: formData.contractor,
                    work_order_no: formData.workOrderNo,
                    project_id: formData.projectID,
                    name_of_activity: formData.nameOfActivity,
                    location_area: formData.locationArea,
                    approved_drawing_no: formData.approvedDrawingNo,
                    previous_work_approved: formData.previousWorkApproved,
                    remarks: formData.remarks,
                    contractor_rep_name: formData.contractorRepName,
                    contractor_rep_gp_no: formData.contractorRepGpNo,
                    rfi_submission_datetime: moment().format(),
                }]);

            if (error) {
                Alert.alert('Error', error.message);
                return false;
            } else {
                Alert.alert('Success', 'RFI details submitted successfully.');
                return true;
            }
        } catch (error) {
            console.error('Error submitting RFI details:', error);
            Alert.alert('Error', 'An unexpected error occurred while submitting the form.');
            return false;
        }
    };

    const handleInspectionSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('rfi_inspection_info')
                .insert([{
                    rfi_id: inspectionData.rfiId,
                    description_of_work: inspectionData.descriptionOfWork,
                    date: inspectionData.date,
                    time_start: inspectionData.timeStart,
                    time_finish: inspectionData.timeFinish,
                    sign_tsl: inspectionData.signTsl,
                    remarks: inspectionData.remarks,
                }]);

            if (error) {
                Alert.alert('Error', error.message);
                return false;
            } else {
                Alert.alert('Success', 'Inspection information submitted successfully.');
                return true;
            }
        } catch (error) {
            console.error('Error submitting inspection information:', error);
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

    const fetch_rfi_id = async () => {
        try {
            const { data, error } = await supabase
                .from('rfi_details')
                .eq('project_id', formData.projectID)
                .select('rfi_id')
            if (error) {
                Alert.alert('Error', error.message);
            } else {
                return data[0]?.rfi_id || null;
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'An unexpected error occurred while submitting the form.');
            return null;
        }
    };

    const handleTimeChange = (event, selectedDate, field) => {
        const currentDate = selectedDate || inspectionData[field];
        setShowTimePicker({ ...showTimePicker, [field]: false });
        handleInspectionInputChange(field, currentDate);
    };

    const showPicker = (field) => {
        setShowTimePicker({ ...showTimePicker, [field]: true });
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView>
                <Title text="RFI Details Form" />

                <InputField
                    placeholder="Contractor"
                    iconLib={FontAwesome6}
                    iconName="user-tie"
                    onChangeText={value => handleInputChange('contractor', value)}
                />

                <InputField
                    placeholder="ProjectID"
                    iconLib={FontAwesome6}
                    iconName="hashtag"
                    onChangeText={value => handleInputChange('projectID', value)}
                />
                <InputField
                    placeholder="Work Order No"
                    iconLib={FontAwesome6}
                    iconName="file-contract"
                    onChangeText={value => handleInputChange('workOrderNo', value)}
                />
                <InputField
                    placeholder="Name of Activity"
                    iconLib={FontAwesome6}
                    iconName="tasks"
                    onChangeText={value => handleInputChange('nameOfActivity', value)}
                />
                <InputField
                    placeholder="Location Area"
                    iconLib={FontAwesome6}
                    iconName="map-marker-alt"
                    onChangeText={value => handleInputChange('locationArea', value)}
                />
                <InputField
                    placeholder="Approved Drawing No"
                    iconLib={FontAwesome6}
                    iconName="clipboard-check"
                    onChangeText={value => handleInputChange('approvedDrawingNo', value)}
                />
                <InputField
                    placeholder="Previous Work Approved"
                    iconLib={FontAwesome6}
                    iconName="check"
                    onChangeText={value => handleInputChange('previousWorkApproved', value)}
                />
                <InputField
                    placeholder="Remarks"
                    iconLib={FontAwesome6}
                    iconName="comment"
                    onChangeText={value => handleInputChange('remarks', value)}
                />
                <InputField
                    placeholder="Contractor Rep Name"
                    iconLib={FontAwesome6}
                    iconName="user"
                    onChangeText={value => handleInputChange('contractorRepName', value)}
                />
                <InputField
                    placeholder="Contractor Rep GP No"
                    iconLib={FontAwesome6}
                    iconName="id-badge"
                    onChangeText={value => handleInputChange('contractorRepGpNo', value)}
                />
                <CustomButton text="Submit" onPress={redirect} />

                {/* Modal for RFI Inspection Info */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <RFIInspectionInfoForm rfiId={inspectionData.rfiId} onClose={() => setModalVisible(false)} />
                </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4ff',
    },
    modalView: {
        marginTop: 100,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxHeight: '60%', // Modal height adjustment
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
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

export default RFIDetailsForm;
