import DateTimePicker, {
    DatePickerOptions,
    AndroidNativeProps
} from '@react-native-community/datetimepicker';
import { forwardRef, useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import RHFControlReturn from '@/utils/RHFControlReturn';
import { StyleSheet, TextInput as InputType, View } from 'react-native';
import { Typography } from '../Typography';
import { InputProps } from '../defaults/rhf_input.type';
import { TextInput } from '../defaults/TextInput';
import { colors } from '@/styles/colors';

type DateTimePickerProps<T extends FieldValues> = InputProps<T> & {
    mode?: AndroidNativeProps['mode'];
    datePickerOptions?: DatePickerOptions;
};

const Picker = forwardRef(function Picker<T extends FieldValues>(
    {
        mode = 'date',
        control,
        name,
        error = "",
        required = false,
        typeField = "text",
        rules,
        value,
        title,
        datePickerOptions,
        ...textInputProps
    }: DateTimePickerProps<T>,
    ref: React.Ref<InputType>
) {
    const [visible, setVisible] = useState<boolean>(false);

    // const inputRef = useRef(null);

    return (
        <Controller
            name={name}
            control={RHFControlReturn(control)}
            render={({ field: { onChange, value } }) => {
                const dateValue = value ? new Date(value) : new Date();
                const formattedDate = dateValue.toLocaleDateString();
                return (
                    <View style={styles.container}>
                        <Typography variant="caption" style={styles.label}>
                            {required && "*"}{title || textInputProps.placeholder}
                        </Typography>
                        <TextInput
                            ref={ref}
                            value={formattedDate}
                            // {...textInputProps}
                            // editable={false}
                            onTouchStart={() => setVisible(true)}
                            placeholder='Selecione uma data'
                            {...textInputProps}
                            style={styles.input}
                        />
                        {/* {error?.length > 0 && typeof error === 'string' && (
                            <Typography variant="body2" className="text-red-500 pt-0.5 mt-2">{error}</Typography>
                        )} */}
                        {visible && (
                            <DateTimePicker
                                value={dateValue}
                                mode={mode}
                                onChange={({ type }, selectedDate) => {
                                    if (type === 'set' && selectedDate) {
                                        const localDate = new Date(selectedDate);
                                        const year = localDate.getFullYear();
                                        const month = String(localDate.getMonth() + 1).padStart(2, '0');
                                        const day = String(localDate.getDate()).padStart(2, '0');
                                        const formatted = `${year}-${month}-${day}`; // Local format
                                        onChange(formatted);
                                    }
                                    setVisible(false);
                                }}
                                {...datePickerOptions}
                            />
                        )}
                    </View>
                )
            }}
        />
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.light[200],
        borderWidth: 1,
        borderColor: colors.light[300],
        borderRadius: 8,
    },
});

export { Picker as DateTimePicker };