import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#0641C6',
                tabBarStyle: { backgroundColor: '#F4F4FF', padding: 10 },
                headerStyle: { backgroundColor: '#F4F4FF' },
            }}
        >
            <Tabs.Screen
                name="projects"
                options={{
                    tabBarIcon: ({ color }) => <Ionicons size={25} name="home" color={color} />,
                    headerTitle: 'Projects',
                    headerRight: () => (
                        <Link href="/modal" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="info-circle"
                                        size={25}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Tabs.Screen
                name="logs"
                options={{
                    tabBarIcon: ({ color }) => <Feather name="list" size={26} color={color} />,
                    headerTitle: 'logs',
                }}
            />

            <Tabs.Screen
                name="forms"
                options={{
                    tabBarIcon: ({ color }) => <SimpleLineIcons name="docs" size={24} color={color} />,
                    headerTitle: 'Forms',
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="person-circle" size={26} color={color} />,
                    headerTitle: 'Profile',
                }}
            />


        </Tabs>
    );
}
