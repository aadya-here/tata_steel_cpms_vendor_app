import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import CustomButton from '../../components/button_primary';
import supabase from '../../lib/supabase';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVendor } from '../../context/vendor_context';
import Title from '../../components/title';
import InputField from '../../components/input_field';
import { AntDesign } from '@expo/vector-icons';
import Subheading from '../../components/subheading';

const FIMForm = () => {
    const router = useRouter();
    const { logId, projectId } = useLocalSearchParams();
    const { vendorId, user_id } = useVendor();

    const [cement, setCement] = useState('');
    const [reinforcement, setReinforcement] = useState('');
    const [foundationBolts, setFoundationBolts] = useState('');
    const [barDiaInfo, setBarDiaInfo] = useState([{ dia: '', amount: '' }]);
    const [boltsRemarks, setBoltsRemarks] = useState('');

    const addBarDiaInfo = () => {
        setBarDiaInfo([...barDiaInfo, { dia: '', amount: '' }]);
    };

    const handleBarDiaChange = (index, field, value) => {
        const newBarDiaInfo = [...barDiaInfo];
        newBarDiaInfo[index][field] = value;
        setBarDiaInfo(newBarDiaInfo);
    };

    const removeBarDiaInfo = (index) => {
        const newBarDiaInfo = [...barDiaInfo];
        newBarDiaInfo.splice(index, 1);
        setBarDiaInfo(newBarDiaInfo);
    };

    const addFIM = async () => {
        try {
            const { data, error } = await supabase.from('FIM_use').insert([
                {
                    log_id: logId,
                    cement: parseFloat(cement),
                    reinforcement: parseFloat(reinforcement),
                    foundation_bolts: parseFloat(foundationBolts),
                    bar_dia_info: JSON.stringify(barDiaInfo.map(item => ({
                        dia: parseFloat(item.dia),
                        amount: parseFloat(item.amount)
                    }))),
                    bolts_remarks: boltsRemarks

                }
            ]).select();

            if (error) {
                console.error('Error adding FIM record:', error.message);
                return;
            }

            console.log('FIM record added:', data);
            Alert.alert('FIM record added')
            router.back();
        } catch (error) {
            console.error('Unexpected error:', error);
            Alert.alert(error)
        }
    };

    return (
        <View style={styles.container}>
            <Title text="FIM Requirement" />

            <InputField placeholder="Cement" iconLib={AntDesign} iconName="caretright" onChangeText={setCement} keyboardType="numeric" />
            <InputField placeholder="Reinforcement" iconLib={AntDesign} iconName="caretright" onChangeText={setReinforcement} keyboardType="numeric" />
            <InputField placeholder="Foundation Bolts" iconLib={AntDesign} iconName="caretright" onChangeText={setFoundationBolts} keyboardType="numeric" />

            <Subheading text="Reinforcement Details" />
            <InputField placeholder="Foundation Bolts Remarks" iconLib={AntDesign} iconName="caretright" onChangeText={setBoltsRemarks} />

            {barDiaInfo.map((item, index) => (
                <View key={index} style={styles.reinforcementDetailContainer}>
                    <InputField placeholder="Diameter in mm" iconLib={AntDesign} iconName="caretright" onChangeText={(value) => handleBarDiaChange(index, 'dia', value)} keyboardType="numeric" />
                    <InputField placeholder="Amount Needed" iconLib={AntDesign} iconName="caretright" onChangeText={(value) => handleBarDiaChange(index, 'amount', value)} keyboardType="numeric" />
                    <TouchableOpacity style={styles.removeButton} onPress={() => removeBarDiaInfo(index)}>
                        <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addBarDiaInfo}>
                <Text style={styles.addButtonText}>Add Bar Dia Info</Text>
            </TouchableOpacity>


            <CustomButton text="Submit" onPress={addFIM} />
        </View>
    );
};

export default FIMForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F4F4FF',
    },
    reinforcementDetailContainer: {
        marginVertical: 10,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    removeButton: {
        backgroundColor: '#F44336',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 5,
    },
    removeButtonText: {
        color: 'white',
    },
});
