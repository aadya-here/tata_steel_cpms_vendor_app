import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';

interface DatePickerFieldProps {
    placeholder: string;
    date: Date;
    setDate: (date: Date) => void;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({ placeholder, date, setDate }) => {
    const [mode, setMode] = useState<'date' | 'time'>('date');
    const [show, setShow] = useState(false);
    const [displayDate, setDisplayDate] = useState(placeholder);

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);

        const tempDate = new Date(currentDate);
        const weekdayIdx = tempDate.getDay();
        const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const dateStr = `${tempDate.getDate()}/${tempDate.getMonth() + 1}/${tempDate.getFullYear()} | ${weekday[weekdayIdx]}`;
        setDisplayDate(dateStr); // Update the display date
    };

    const showMode = (currentMode: 'date' | 'time') => {
        setShow(true);
        setMode(currentMode);
    };

    return (
        <View style={styles.dateField}>
            <FontAwesome5 name="calendar-alt" size={24} color="grey" style={styles.icon} />
            <TouchableOpacity onPress={() => showMode('date')} style={styles.dateTextContainer}>
                <Text style={styles.dateText}>{displayDate}</Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    value={date}
                    mode={mode}
                    display="default"
                    onChange={onDateChange}
                    minimumDate={new Date()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    dateField: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
        backgroundColor: '#fff',
        width: '100%',
        borderColor: 'grey',
        marginVertical: 10,
        padding: 12,
        borderRadius: 10,
    },
    icon: {
        marginRight: 10,
    },
    dateTextContainer: {
        flex: 1,
    },
    dateText: {
        fontSize: 16,
        color: '#b2b2b2'
    },
});

export default DatePickerField;
