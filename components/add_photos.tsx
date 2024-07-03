import React, { useState } from 'react';
import { Pressable, Image, View, StyleSheet, Alert, ActivityIndicator, Modal, Text, KeyboardAvoidingView, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import Icon from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import supabase from '../lib/supabase';
import { useVendor } from '../context/vendor_context';
import moment from 'moment';
import InputField from './input_field';

const AddPhoto = ({ closeModal, isVisible, folderPath, logId, createdBy, tag }) => {
    const { vendorId, user_id } = useVendor();
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [caption, setCaption] = useState('');

    const pickImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.6,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            return result.assets[0].uri;
        }
    };

    const takePhotoWithCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.6,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            return result.assets[0].uri;
        }
    };

    const compressImage = async (uri, format = SaveFormat.JPEG) => {
        const result = await manipulateAsync(
            uri,
            [{ resize: { width: 1200 } }],
            { compress: 0.75, format }
        );

        return { name: `${Date.now()}.${format}`, type: `image/${format}`, ...result };
    };

    const uploadImage = async (uri) => {
        try {
            setUploading(true);
            const compressedImage = await compressImage(uri);
            const filePath = `${folderPath}/${compressedImage.name}`;

            const formData = new FormData();
            formData.append('file', {
                uri: compressedImage.uri,
                name: compressedImage.name,
                type: compressedImage.type,
            } as any);

            const { error: uploadError } = await supabase.storage.from('images').upload(filePath, formData);

            if (uploadError) {
                throw uploadError;
            }

            const { data, error } = await supabase.storage.from('images').getPublicUrl(filePath);
            if (error) {
                throw error;
            }

            const { error: insertError } = await supabase
                .from('photos')
                .insert([{
                    photo_url: data.publicUrl,
                    log_id: logId,
                    created_on: moment().format(),
                    created_by: createdBy,
                    caption: caption,
                    tag: tag
                }]);


            if (insertError) {
                throw insertError;
            }

            setImage(data.publicUrl);
            Alert.alert('Success', 'Image uploaded and URL inserted successfully.');
        } catch (error) {
            Alert.alert('Error!', error.message);
        } finally {
            setUploading(false);
            closeModal();
        }
    };

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}
        >
            <KeyboardAvoidingView
                behavior='padding'
                style={styles.keyboardAvoidingContainer}
            >

                <View style={styles.modalContainer}>
                    <View style={styles.container}>
                        <Pressable style={styles.closeButton} onPress={closeModal}>
                            <Icon name="cross" size={24} color="black" />
                        </Pressable>
                        <View style={styles.caption}>
                            <TextInput
                                placeholder='Enter Caption'
                                placeholderTextColor='#555'
                                onChangeText={setCaption}
                                multiline={true}
                                style={styles.captionInput}
                            />

                        </View>
                        <Pressable style={styles.button} onPress={async () => {
                            const uri = await pickImageFromGallery();
                            if (uri) {
                                uploadImage(uri);
                            }
                        }}>
                            <Fontisto name="photograph" size={24} color="white" />
                            <Text style={styles.buttonText}>Pick from gallery</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={async () => {
                            const uri = await takePhotoWithCamera();
                            if (uri) {
                                uploadImage(uri);
                            }
                        }}>
                            <Icon name="camera" size={24} color="white" />
                            <Text style={styles.buttonText}>Click a photo</Text>
                        </Pressable>
                        {uploading && <ActivityIndicator size="small" color="#000000" />}
                        {image && <Image source={{ uri: image }} style={styles.image} />}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default AddPhoto;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    keyboardAvoidingContainer: {
        flex: 1,
    },
    container: {
        backgroundColor: '#F4F4FF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#060665',
        padding: 12,
        borderRadius: 7,
        marginTop: 15,
        width: '80%',
    },
    buttonText: {
        color: 'white',
        marginLeft: 10,
    },
    image: {
        width: 250,
        height: 250,
        marginTop: 20,
    },

    caption: {
        width: '80%'
    },

    captionInput: {
        top: 0,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        width: '100%',
        height: 80,
    },
});
