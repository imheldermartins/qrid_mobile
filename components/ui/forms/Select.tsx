import { colors } from "@/styles/colors";
import RHFControlReturn from "@/utils/RHFControlReturn";
import { Picker } from "@react-native-picker/picker"
import clsx from "clsx";
import { Controller, FieldValues } from "react-hook-form";
import { TextInput as InputType, View } from 'react-native';
import { Typography } from "../Typography";
import { forwardRef } from "react";
import { InputProps } from "../defaults/rhf_input.type";

type SelectProps<T extends FieldValues> = InputProps<T> & {
    options: {
        label: string;
        value: string | number;
    }[];
};

export const Select = forwardRef(<T extends FieldValues>(
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
        ...textInputProps
    }: SelectProps<T>,
    ref: React.Ref<InputType>
) => {
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
                    <View className="flex-1">
                        <Typography variant="body1" className="ml-2 mb-3 text-dark-900 text-xl">
                            {required && "*"}{title || textInputProps.placeholder}
                        </Typography>
                        <View className={clsx("bg-light-200 border border-light-300 focus:border-green-400 rounded-lg", textInputProps.className)}>
                            <Picker
                                selectedValue={value}
                                onValueChange={(itemValue, _) => {
                                    onChange(itemValue);
                                }}
                                style={{
                                    color: isNotSelected ? colors.dark[100] : colors.dark[900],
                                }}
                            >
                                {selectOptions.map((option, index) => (
                                    <Picker.Item
                                        key={index}
                                        label={option.label}
                                        value={option.value}
                                        enabled={option.value !== ''}
                                        style={{
                                            fontSize: 18,
                                            color: isNotSelected ? colors.dark[100] : colors.dark[900]
                                        }}
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