import { rhfDateTimePickerStyle as styles } from './style';

import { TextInput as InputType, StyleSheet, View } from 'react-native';
import { forwardRef, useState } from 'react';

import DateTimePicker, {
    DatePickerOptions,
    AndroidNativeProps
} from '@react-native-community/datetimepicker';

import { Controller, FieldValues } from 'react-hook-form';

import { Typography } from '../../Typography';
import { InputProps } from '../../defaults/rhf_input.type';
import { TextInput } from '../../defaults/TextInput';

import RHFControlReturn from '@/utils/RHFControlReturn';
import { fontFamilyStyles, typographyStyles } from '../../Typography/style';

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
        f: family = 'regular',
        s: size = 'sm',
        c = 'none',
        ...textInputProps
    }: DateTimePickerProps<T>,
    ref: React.Ref<InputType>
) {
    const [visible, setVisible] = useState<boolean>(false);

    const customStyles = typographyStyles({ size, family, case: c });

    return (
        <Controller
            name={name}
            control={RHFControlReturn(control)}
            render={({ field: { onChange, value } }) => {
                const now = new Date();
                const localMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

                const dateValue = value ? new Date(value) : localMidnight;
                const formattedDate = dateValue.toLocaleDateString('pt-BR', {
                    timeZone: 'UTC',
                });
                return (
                    <View style={styles.container}>
                        <Typography variant="caption" style={styles.label}>
                            {required && "*"}{title || textInputProps.placeholder}
                        </Typography>
                        <TextInput
                            {...textInputProps}
                            ref={ref}
                            value={formattedDate}
                            onTouchStart={() => setVisible(true)}
                            placeholder='Selecione uma data'
                            style={StyleSheet.flatten([
                                styles.input,
                                customStyles,
                            ])}
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

export { Picker as RHFDateTimePicker };