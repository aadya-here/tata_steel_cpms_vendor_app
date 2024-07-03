import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import DynamicForm from '../../components/formViewer';
import supabase from '../../lib/supabase';
import { useVendor } from '../../context/vendor_context';

const XYZ = () => {
    const [formData, setFormData] = useState(null);
    const formName = 'form_painting_qc'; // Example form name
    const { vendorId, user_id } = useVendor();


    useEffect(() => {
        const fetchFormData = async () => {
            const { data, error } = await supabase
                .from(formName)
                .select('*')
                .eq('vendor_id', vendorId)
                .single();

            if (error) {
                console.error(error);
            } else {
                setFormData(data);
            }
        };

        fetchFormData();
    }, [formName, vendorId]);

    return (
        <SafeAreaView>
            <ScrollView>
                {formData ? (
                    <DynamicForm formName={formName} formData={formData} />
                ) : (
                    <Text>Loading...</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default XYZ;
