import { colors } from "@/styles/colors";
import RHFControlReturn from "@/utils/RHFControlReturn";
import { Picker, PickerProps } from "@react-native-picker/picker"
import { Controller, FieldValues } from "react-hook-form";
import { TextInput as InputType, StyleSheet, View } from 'react-native';
import { Typography } from "../Typography";
import { forwardRef } from "react";
import { InputProps } from "../defaults/rhf_input.type";
import { fontFamilyStyles } from "../Typography/style";

type SelectProps<T extends FieldValues> =
    InputProps<T> &
    PickerProps &
    {
        options: {
            label: string;
            value: string | number;
        }[];
    };

export const Select = forwardRef(function Select<T extends FieldValues>(
    {
        control,
        name,
        error = "",
        required = false,
        typeField = "text",
        rules,
        value,
        title,
        options,
        mode = 'dropdown',
        f = 'regular',
        ...textInputProps
    }: SelectProps<T>,
    ref: React.Ref<Picker<T>>
) {
    const selectOptions = [
        { label: textInputProps.placeholder || 'Selecione uma opção', value: '' },
        ...options
    ];

    return (
        <Controller
            name={name}
            control={RHFControlReturn(control)}
            render={({ field: { onChange, value } }) => {
                const isNotSelected = value === '' || value === undefined || value === null;
                return (
                    <View style={styles.container}>
                        <Typography variant="caption" style={styles.label}>
                            {required && "*"}{title || textInputProps.placeholder}
                        </Typography>
                        <View style={StyleSheet.flatten([
                            styles.input,
                        ])}>
                            <Picker
                                ref={ref}
                                selectedValue={value}
                                onValueChange={(itemValue, _) => {
                                    onChange(itemValue);
                                }}
                                mode={mode}
                            >
                                {selectOptions.map((option, index) => (
                                    <Picker.Item
                                        key={index}
                                        label={option.label}
                                        value={option.value}
                                        enabled={option.value !== ''}
                                        style={StyleSheet.flatten([
                                            { color: isNotSelected ? colors.dark[100] : colors.dark[900] },
                                        ])}
                                        fontFamily={'Inter'}
                                    />
                                ))}
                            </Picker>
                        </View>
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
    // bg-light-200 border border-light-300 focus:border-green-400 rounded-lg
    input: {
        backgroundColor: colors.light[200],
        borderWidth: 1,
        borderColor: colors.light[300],
        borderRadius: 8,
    },
});