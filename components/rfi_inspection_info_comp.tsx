import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import InputField from './input_field'; // Adjust import path as per your project structure
import CustomButton from './button_primary'; // Adjust import path as per your project structure
import supabase from '../lib/supabase'; // Adjust import path as per your project structure
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome6 } from '@expo/vector-icons';
import moment from 'moment';

const RFIInspectionInfoForm = ({ rfiId, onClose }) => {
    const [inspectionData, setInspectionData] = useState({
        descriptionOfWork: '',
        date: new Date(),
        timeStart: new Date(),
        timeFinish: new Date(),
        // signTsl: '',
        remarks: '',
        rfiId: rfiId,
    });

    const [showTimePicker, setShowTimePicker] = useState({
        start: false,
        finish: false,
    });

    const handleInspectionInputChange = (field, value) => {
        setInspectionData({ ...inspectionData, [field]: value });
    };

    const handleTimeChange = (event, selectedDate, field) => {
        const currentDate = selectedDate || inspectionData[field];
        setShowTimePicker({ ...showTimePicker, [field]: false });
        handleInspectionInputChange(field, currentDate);
    };

    const showPicker = (field) => {
        setShowTimePicker({ ...showTimePicker, [field]: true });
    };

    const fetchRfiId = async () => {
        try {
            const { data, error } = await supabase
                .from('rfi_details')
                .eq('project_id', formData.projectID)
                .select('rfi_id');
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

    useEffect(() => {
        fetchRfiId();
    }, []);

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
                onClose(); // Close modal or perform any other necessary action
                return true;
            }
        } catch (error) {
            console.error('Error submitting inspection information:', error);
            Alert.alert('Error', 'An unexpected error occurred while submitting the form.');
            return false;
        }
    };

    return (
        <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add RFI Inspection Info</Text>
            <Text>RFI ID: {inspectionData.rfiId}</Text>

            <InputField
                placeholder="Description of Work"
                iconLib={FontAwesome6}
                iconName="file-alt"
                onChangeText={(value) => handleInspectionInputChange('descriptionOfWork', value)}
            />
            <InputField
                placeholder="Date"
                iconLib={FontAwesome6}
                iconName="calendar"
                value={moment(inspectionData.date).format('YYYY-MM-DD')}
                onChangeText={(value) => handleInspectionInputChange('date', value)}
            />

            <Pressable onPress={() => showPicker('start')}>
                <Text style={styles.timePickerText}>Select Time Start</Text>
            </Pressable>
            {showTimePicker.start && (
                <DateTimePicker
                    value={inspectionData.timeStart}
                    mode="time"
                    display="default"
                    onChange={(event, date) => handleTimeChange(event, date, 'timeStart')}
                />
            )}

            <Pressable onPress={() => showPicker('finish')}>
                <Text style={styles.timePickerText}>Select Time Finish</Text>
            </Pressable>
            {showTimePicker.finish && (
                <DateTimePicker
                    value={inspectionData.timeFinish}
                    mode="time"
                    display="default"
                    onChange={(event, date) => handleTimeChange(event, date, 'timeFinish')}
                />
            )}

            <CustomButton text="Submit Inspection Info" onPress={handleInspectionSubmit} />
            <Pressable style={[styles.button, styles.buttonClose]} onPress={onClose}>
                <Text style={styles.textStyle}>Close</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    timePickerText: {
        fontSize: 16,
        color: '#007AFF',
        marginBottom: 10,
    },
});

export default RFIInspectionInfoForm;
