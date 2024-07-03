import { Alert, StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import TextAreaInput from '../../components/multi_line_input';
import AddPhoto from '../../components/add_photos';
import supabase from '../../lib/supabase';
import { useVendor } from '../../context/vendor_context';
import moment from 'moment';
import { useLocalSearchParams } from 'expo-router';
import InputField from '../../components/input_field';
import SecondaryButton from '../../components/button_secondary';
import CustomButton from '../../components/button_primary';

const CreateUpdate = () => {
    const { vendorId, user_id } = useVendor();
    const { logId, projectId } = useLocalSearchParams();

    const [description, setDescription] = useState('');
    const [issues, setIssues] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [photoURL, setPhotoURL] = useState('');

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const fetchURL = async () => {
        try {
            const { data, error } = await supabase
                .from('photos')
                .select('photo_url')
                .eq('log_id', logId)
                .eq('tag', 'update')
                .order('created_on', { ascending: false })
                .limit(1)
                .single();

            if (error) throw error;

            return data.photo_url;
        } catch (error) {
            console.error('Error fetching photo URL:', error);
            return null;
        }
    };

    const addUpdate = async () => {
        try {
            const photo_url = await fetchURL();
            const { error } = await supabase
                .from('updates')
                .insert([
                    {
                        description,
                        update_photo_url: photo_url,
                        issues,
                        created_by: user_id,
                        log_id: logId,
                        created_on: moment().format()
                    }
                ]);

            if (error) {
                throw error;
            }

            Alert.alert('Success', 'Update added successfully.');
        } catch (error) {
            console.error('Error adding update:', error.message);
            Alert.alert('Error', error.message);
        }
    };

    useEffect(() => {
        if (isModalVisible) {
            fetchURL().then(setPhotoURL);
        }
    }, [isModalVisible]);

    return (
        <View style={styles.container}>
            <TextAreaInput
                placeholder="Description of Update"
                onChangeText={setDescription}
                value={description}
            />

            <TextAreaInput
                placeholder="Description of Issues Faced (if any)"
                onChangeText={setIssues}
                value={issues}
            />

            <SecondaryButton onPress={openModal} text="Add Photo" />
            {isModalVisible && (
                <AddPhoto
                    isVisible={isModalVisible}
                    closeModal={closeModal}
                    folderPath={`updates`}
                    logId={logId}
                    createdBy={user_id}
                    tag='update'
                />
            )}

            <CustomButton onPress={addUpdate} text="Add Update" />
        </View>
    );
};

export default CreateUpdate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4FF',
        padding: 20,
    },
});
