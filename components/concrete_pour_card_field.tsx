import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../components/input_field';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const ActivityDetails = ({ activity, onChange }) => {
    const [formData, setFormData] = useState({
        description: '',
        required: '',
        actual: '',
        remarks: '',
        // projectID: ''
    });

    const handleInputChange = (field, value) => {
        const updatedFormData = { ...formData, [field]: value };
        setFormData(updatedFormData);
        onChange(JSON.stringify(updatedFormData));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.activity}>{activity}</Text>
            <InputField
                placeholder="Description"
                iconLib={FontAwesome6}
                iconName="align-left"
                onChangeText={value => handleInputChange('description', value)}
            />
            <View style={styles.row}>
                <InputField
                    placeholder="Required"
                    iconLib={AntDesign}
                    iconName="exclamationcircleo"
                    // style={styles.halfWidth}
                    onChangeText={value => handleInputChange('required', value)}
                />
                <InputField
                    placeholder="Actual"
                    iconLib={FontAwesome6}
                    iconName="check"
                    // style={styles.halfWidth}
                    onChangeText={value => handleInputChange('actual', value)}
                />
            </View>
            <InputField
                placeholder="Remarks"
                iconLib={FontAwesome6}
                iconName="comment"
                onChangeText={value => handleInputChange('remarks', value)}
            />
            {/* <InputField
                placeholder="Project ID"
                iconLib={FontAwesome6}
                iconName="hashtag"
                onChangeText={value => handleInputChange('projectID', value)}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    activity: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '49%',
        marginHorizontal: 5
    },
    halfWidth: {
        width: '48%'
    }
});

export default ActivityDetails;
