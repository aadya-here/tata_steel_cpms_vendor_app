import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from 'react-native-check-box';

interface ChecklistItemProps {
    label: string;
    value: boolean;
    setValue: (value: boolean) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ label, value, setValue }) => {
    return (
        <View style={styles.checklistItem}>
            <Text style={styles.checklistText}>{label}</Text>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    onClick={() => setValue(true)}
                    isChecked={value === true}
                    leftText={"OK"}
                    style={styles.checkbox}
                />
                <CheckBox
                    onClick={() => setValue(false)}
                    isChecked={value === false}
                    leftText={"Not OK"}
                    style={styles.checkbox}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    checklistItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    checklistText: {
        fontSize: 16,
        flex: 1,
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
    },
    checkbox: {
        flex: 1,
        padding: 10,
    },
});

export default ChecklistItem;
