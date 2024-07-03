import { StyleSheet, Text, View, Alert, Button, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { SelectList } from 'react-native-dropdown-select-list';
import { useVendor } from '../context/vendor_context'; // Import the custom hook
import { router } from 'expo-router';

const VendorScreen = () => {
    const [vendorList, setVendorList] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState('');
    const [vendorCode, setVendorCode] = useState('');
    const { setVendorId } = useVendor(); // Use the context

    const getUserId = async (): Promise<string | null> => {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error);
                return null;
            }
            return user?.id ?? null;
        } catch (error) {
            console.error('Unexpected error fetching user:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const userId = await getUserId();
                if (!userId) {
                    Alert.alert("Error", "Unable to fetch user ID.");
                    return;
                }

                const { data, error } = await supabase
                    .from('vendors') // replace 'vendors' with your actual table name
                    .select('*'); // replace '*' with the actual column names you need

                if (error) {
                    console.error('Error fetching vendors:', error);
                    return;
                }

                const formattedVendors = data.map((vendor) => ({
                    label: vendor.vendor_name, // replace 'vendor_name' with your actual column name
                    value: vendor.vendor_id // replace 'vendor_id' with your actual column name
                }));

                setVendorList(formattedVendors);
                console.log('Fetched vendors:', data);
            } catch (error) {
                console.log('Unexpected error fetching vendors:', error.message);
            }
        };

        fetchVendors();
    }, []);

    const handleVendorLogin = async () => {
        if (!selectedVendor || !vendorCode) {
            Alert.alert('Error', 'Please select a vendor and enter the vendor code.');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('vendors')
                .select('*')
                .eq('vendor_id', selectedVendor)
                .single();

            console.log(data);

            if (error) {
                console.error('Error fetching vendor:', error);
                console.log(data);
                Alert.alert('Error', 'Unable to fetch vendor details.');
                return;
            }

            if (data && data.vendor_code === parseInt(vendorCode)) { // replace 'vendor_code' with your actual column name
                Alert.alert('Success', 'Vendor login successful.');
                setVendorId(selectedVendor); // Set the vendor ID in context
                router.push('projects');
            } else {
                Alert.alert('Error', 'Invalid vendor code.');
                console.log('error:', error);
            }
        } catch (error) {
            console.error('Error during vendor login:', error);
            Alert.alert('Error', 'An unexpected error occurred during vendor login.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vendor Login</Text>
            <SelectList
                setSelected={setSelectedVendor}
                data={vendorList}
                placeholder="Select Vendor"
                boxStyles={styles.selectBox}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Vendor Code"
                value={vendorCode}
                onChangeText={setVendorCode}
                keyboardType="numeric" // Ensures the input is numeric
                secureTextEntry
            />
            <Button title="Login" onPress={handleVendorLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#F4F4FF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    selectBox: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});

export default VendorScreen;
