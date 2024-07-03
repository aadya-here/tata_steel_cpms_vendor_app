import React, { useState, useRef, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Animated, Easing, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

const Accordion = ({ title, data }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const animatedController = useRef(new Animated.Value(0)).current;
    const [refresh, setRefresh] = useState(true);

    const toggleExpand = () => {
        Animated.timing(animatedController, {
            duration: 500, // Increase duration for smoother animation
            toValue: isExpanded ? 0 : 1,
            easing: Easing.inOut(Easing.ease), // Change easing for smoother effect
            useNativeDriver: false
        }).start();
        setIsExpanded(!isExpanded);
    };

    const rotate = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    const renderItem = ({ item }) => (
        <Pressable style={styles.button} onPress={() => router.push(item.route)}>
            <Text style={styles.buttonText}>{item.label}</Text>
        </Pressable>
    );

    useEffect(() => {
        if (data.length > 0) {
            setRefresh(false);
            setTimeout(() => setRefresh(true), 0);
        }
    }, [data]);

    return (
        <View style={styles.accordionContainer}>
            <Pressable style={styles.header} onPress={toggleExpand}>
                <Text style={styles.headerText}>{title}</Text>
                <Animated.View style={{ transform: [{ rotate }] }}>
                    <Entypo name="chevron-down" size={24} color="#F4F4FF" />
                </Animated.View>
            </Pressable>
            {refresh && isExpanded && (
                <Animated.View style={styles.checklist}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={<Text style={styles.emptyText}>No items available</Text>}
                    />
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    accordionContainer: {
        width: '100%',
        height: 'auto',
        marginVertical: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#060665',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 7,
        borderWidth: 0,
        borderColor: '#E0E0E0',
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F4F4FF',
    },
    checklist: {
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderTopWidth: 0,
        marginBottom: 0,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        alignItems: 'flex-start',
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        padding: 20,
        color: '#888',
    },
});

export default Accordion;
