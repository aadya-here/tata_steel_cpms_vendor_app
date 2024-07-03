import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from 'react-native-check-box';

interface ChecklistItemProps {
    label: string;
    value: string;
    setValue: (value: string) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ label, value, setValue }) => {
    return (
        <View style={styles.checklistItem}>
            <Text style={styles.checklistText}>{label}</Text>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    onClick={() => setValue('YES')}
                    isChecked={value === 'YES'}
                    leftText={"YES"}
                    style={styles.checkbox}
                />
                <CheckBox
                    onClick={() => setValue('NO')}
                    isChecked={value === 'NO'}
                    leftText={"NO"}
                    style={styles.checkbox}
                />
                <CheckBox
                    onClick={() => setValue('NA')}
                    isChecked={value === 'NA'}
                    leftText={"NA"}
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
        flex: 2,
        marginRight: 8,
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1.5,
    },
    checkbox: {
        flex: 1,
        paddingVertical: 7,
        paddingHorizontal: 0,
    },
});

export default ChecklistItem;
