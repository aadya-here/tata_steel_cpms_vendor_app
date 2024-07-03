import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../lib/supabase';

interface VendorContextProps {
    vendorId: number | null;
    setVendorId: (vendor_id: number | null) => Promise<void>;
    user_id: string | null;
    isLoading: boolean;
}

const VendorContext = createContext<VendorContextProps | undefined>(undefined);

export const VendorProvider = ({ children }: { children: ReactNode }) => {
    const [vendorId, setVendorIdState] = useState<number | null>(null);
    const [user_id, setUser_id] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const setVendorId = async (vendor_id: number | null) => {
        setVendorIdState(vendor_id);
        try {
            if (vendor_id !== null) {
                await AsyncStorage.setItem('vendorId', vendor_id.toString());
            } else {
                await AsyncStorage.removeItem('vendorId');
            }
        } catch (error) {
            console.error('Error saving vendor ID:', error);
        }
    };

    const fetchUserAndVendor = async () => {
        setIsLoading(true);
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error getting session:', error);
                setIsLoading(false);
                return;
            }
            if (session) {
                const { access_token, refresh_token } = session;
                await supabase.auth.setSession({ access_token, refresh_token });
            }

            const { data: userData, error: userError } = await supabase.auth.getUser();
            if (userError) {
                console.error('Error fetching user:', userError);
                setIsLoading(false);
                return;
            }
            const userId = userData?.user?.id ?? null;
            setUser_id(userId);

            // Retrieve vendorId from AsyncStorage
            const storedVendorId = await AsyncStorage.getItem('vendorId');
            if (storedVendorId) {
                setVendorIdState(parseInt(storedVendorId, 10));
            }
        } catch (error) {
            console.error('Unexpected error fetching user and vendor:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserAndVendor();
    }, []);

    return (
        <VendorContext.Provider value={{ vendorId, user_id, setVendorId, isLoading }}>
            {children}
        </VendorContext.Provider>
    );
};

export const useVendor = (): VendorContextProps => {
    const context = useContext(VendorContext);
    if (!context) {
        throw new Error('useVendor must be used within a VendorProvider');
    }
    return context;
};