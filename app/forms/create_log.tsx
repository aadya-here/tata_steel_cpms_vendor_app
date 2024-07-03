import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useVendor } from '../../context/vendor_context';
import InputField from '../../components/input_field';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter, useLocalSearchParams } from 'expo-router';
import CustomButton from '../../components/button_primary';
import supabase from '../../lib/supabase';
import DatePickerField from '../../components/datepicker';
import moment from 'moment';
import AddPhotos from '../../components/add_photos';
import SecondaryButton from '../../components/button_secondary';
import AddPhoto from '../../components/add_photos';

const CreateLog = () => {
    const router = useRouter();
    const { vendorId, user_id } = useVendor();
    const { projectId } = useLocalSearchParams<{ projectId: string }>();

    const [workPermit, setWorkPermit] = useState('');
    const [sopNumber, setSopNumber] = useState('');
    const [numberOfWorkers, setNumberOfWorkers] = useState('');
    const [validFrom, setValidFrom] = useState(new Date());
    const [validTill, setValidTill] = useState(new Date());
    const [logId, setLogId] = useState<number | null>(null);

    const addLog = async () => {
        try {
            const { data, error } = await supabase.from('logs').insert([
                {
                    vendor_id: vendorId,
                    project_id: projectId,
                    work_permit: workPermit,
                    valid_from: validFrom.toISOString(),
                    valid_till: validTill.toISOString(),
                    num_workers: parseInt(numberOfWorkers),
                    created_by: user_id,
                    created_on: new Date()
                }
            ]).select();

            if (error) {
                console.error('Error adding log:', error);
                return;
            }

            const logID = data[0].log_id;
            setLogId(logID);
            Alert.alert('Log added successfully');
            console.log('Log added with ID:', logID);
        } catch (error) {
            Alert.alert('Unexpected error:', error.message);
            console.error('Unexpected error:', error);
        }
    };

    const handleNavigation = (pathname: string) => {
        if (logId) {
            router.push({ pathname, params: { logId, projectId } });
        } else {
            Alert.alert('Please Create the Log First');
        }
    };

    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text>Vendor ID: {vendorId}</Text>
            <Text>Date: {new Date().toDateString()}</Text>
            <Text>Project ID: {projectId}</Text>

            <InputField placeholder="Work Permit ID" iconLib={Icon} iconName="id-badge" onChangeText={setWorkPermit} />
            <InputField placeholder="SOP Number" iconLib={Icon} iconName="file-text" onChangeText={setSopNumber} />
            <InputField placeholder="Number of Workers" iconLib={Icon} iconName="users" onChangeText={setNumberOfWorkers} />

            <DatePickerField placeholder="Valid From" date={validFrom} setDate={setValidFrom} />
            <DatePickerField placeholder="Valid Till" date={validTill} setDate={setValidTill} />

            <CustomButton text="Create Today's Log" onPress={addLog} />

            <SecondaryButton onPress={() => handleNavigation('../forms/ppe_checklist')} text="PPE Checklist" />
            <SecondaryButton onPress={() => handleNavigation('../forms/tool_box_talk')} text="Tool Box Talk" />
            <SecondaryButton onPress={() => handleNavigation('../forms/first_aid')} text="First Aid Checklist" />
            <SecondaryButton onPress={() => handleNavigation('../forms/FIM')} text="FIM Requirement" />
            <SecondaryButton onPress={openModal} text="Add Photo" />
            {isModalVisible && (
                <AddPhoto
                    isVisible={isModalVisible}
                    closeModal={closeModal}
                    folderPath={`logs`}
                    logId={logId} // Example log_id
                    createdBy={user_id}
                    tag='log'

                />
            )}
        </View>
    );
};

export default CreateLog;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4FF',
        padding: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});
