import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CheckBox from 'react-native-check-box';
import DatePickerField from '../../components/datepicker';
import CustomButton from '../../components/button_primary';
import InputField from '../../components/input_field'; // Assuming InputField is a custom component
import supabase from '../../lib/supabase';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVendor } from '../../context/vendor_context';
import { FontAwesome6 } from '@expo/vector-icons';
import Title from '../../components/title';

const FirstAidForm = () => {
    const router = useRouter();
    const { logId, projectId } = useLocalSearchParams();
    const { vendorId, user_id } = useVendor();

    const [firstAidItems, setFirstAidItems] = useState({
        stretcher: false,
        oxypack: false,
        first_aid_box: false,
        gas_detector: false,
    });
    const [gasDetectorCalibration, setGasDetectorCalibration] = useState(new Date());
    const [gasDetectorExpiry, setGasDetectorExpiry] = useState(new Date());
    const [remarks, setRemarks] = useState('');
    const [projectID, setProjectID] = useState(projectId);

    const handleCheckBoxChange = (key) => {
        setFirstAidItems(prevState => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    const handleInputChange = (key, value) => {
        if (key === 'projectID') setProjectID(value);
        if (key === 'remarks') setRemarks(value);
    };

    const addFirstAid = async () => {
        try {
            const { data, error } = await supabase.from('first_aid').insert([
                {
                    log_id: logId,
                    first_aid_box: firstAidItems.first_aid_box,
                    stretcher: firstAidItems.stretcher,
                    oxy_pack: firstAidItems.oxypack,
                    gas_detector: firstAidItems.gas_detector,
                    gas_detector_calibration: gasDetectorCalibration,
                    gas_detector_expiry: gasDetectorExpiry,
                    remarks: remarks,
                }
            ]).select();

            if (error) {
                console.error('Error adding first aid record:', error.message);
                return;
            }

            // Check gas detector calibration and notify if needed
            const currentDate = new Date();
            const threeDaysBeforeExpiry = new Date(gasDetectorExpiry);
            threeDaysBeforeExpiry.setDate(threeDaysBeforeExpiry.getDate() - 3);

            if (currentDate >= threeDaysBeforeExpiry) {
                Alert.alert('Gas Detector Needs Calibration', 'Gas Detector needs to be recalibrated, proceed with caution');
            }

            console.log('First aid record added:', data);
            router.back();  // Navigate back or to another page
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Title text="First Aid Checklist" />
            <View style={styles.checkboxContainer}>
                {Object.keys(firstAidItems).map(key => (
                    <CheckBox
                        key={key}
                        style={styles.checkbox}
                        onClick={() => handleCheckBoxChange(key)}
                        isChecked={firstAidItems[key]}
                        rightText={key.replaceAll('_', ' ')}
                    />
                ))}
            </View>

            <DatePickerField
                placeholder="Gas Detector Calibration"
                date={gasDetectorCalibration}
                setDate={setGasDetectorCalibration}
                onDateChange={(date) => {
                    const currentDate = new Date();
                    if (date <= currentDate) {
                        Alert.alert('Gas Detector Needs Calibration', 'Gas Detector needs to be recalibrated, proceed with caution');
                    }
                    setGasDetectorCalibration(date);
                }}
                maximumDate={new Date()}
            />
            <DatePickerField
                placeholder="Gas Detector Expiry"
                date={gasDetectorExpiry}
                setDate={setGasDetectorExpiry}
                onDateChange={(date) => setGasDetectorExpiry(date)}
            />

            <InputField
                placeholder="Remarks"
                iconLib={FontAwesome6}
                iconName="hashtag"
                onChangeText={value => handleInputChange('remarks', value)}
                value={projectID}
            />



            <CustomButton text="Submit" onPress={addFirstAid} />
        </View>
    );
};

export default FirstAidForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F4F4FF',
    },
    checkboxContainer: {
        flexDirection: 'column',
        marginVertical: 10,
    },
    checkbox: {
        marginBottom: 10,
    },
});
