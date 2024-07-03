import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ntkzcrtlciccappgmtle.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50a3pjcnRsY2ljY2FwcGdtdGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgzNzUyMzQsImV4cCI6MjAzMzk1MTIzNH0.djqSdISIfBz_49lkpNuEOMlAMBzPOF1umvzhtJbmobo';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        detectSessionInUrl: false,
    },
});

export default supabase;
