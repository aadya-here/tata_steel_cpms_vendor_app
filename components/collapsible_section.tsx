import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Subheading from './subheading'; // Assuming you have a Subheading component
import { AntDesign } from '@expo/vector-icons'; // Import the icon from Expo vector icons

const CollapsibleSection = ({ isCollapsed, toggleCollapsed, fetchContent, headingText }) => {
    return (
        <TouchableOpacity onPress={() => { toggleCollapsed(!isCollapsed); fetchContent(); }} style={styles.section_heading}>
            <Subheading text={headingText} />
            {isCollapsed ? (
                <AntDesign name="down" size={20} color="black" />
            ) : (
                <AntDesign name="up" size={20} color="black" />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    section_heading: {
        flexDirection: 'row',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default CollapsibleSection;
