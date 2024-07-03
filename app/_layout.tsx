import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { VendorProvider } from '../context/vendor_context';

import { Session } from '@supabase/supabase-js';

export {
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [session, setSession] = useState<Session | null>(null);
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        const prepare = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) throw error;
                setSession(data.session);

                const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
                    setSession(session);
                });

                return () => {
                    authListener?.unsubscribe();
                };
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        };

        prepare();
    }, []);

    useEffect(() => {
        if (appIsReady) {
            SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return <RootLayoutNav session={session} />;
}

function RootLayoutNav({ session }: { session: Session | null }) {
    return (
        <VendorProvider>
            <ThemeProvider value={DefaultTheme}>
                <Stack
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#F4F4FF',
                        },
                        headerTintColor: '#2F394B',
                    }}
                >
                    {session && session.user ? (
                        <Stack.Screen name="(tabs)" options={{ headerShown: false, headerBackTitleVisible: false }} />
                    ) : (
                        <>
                            <Stack.Screen name="index" options={{ headerTitle: 'Welcome' }} />
                            <Stack.Screen name="auth_screen" options={{ headerShown: false }} />
                            <Stack.Screen name="vendor_screen" options={{ headerShown: false }} />

                            <Stack.Screen name="projects" options={{ headerShown: false }} />
                            <Stack.Screen name="forms" options={{ headerShown: false }} />
                            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
                        </>
                    )}
                </Stack>
            </ThemeProvider>
        </VendorProvider>
    );
}
