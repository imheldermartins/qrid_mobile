import { colors } from "@/styles/colors";
import RHFControlReturn from "@/utils/RHFControlReturn";
import { Picker } from "@react-native-picker/picker"
import clsx from "clsx";
import { Controller, Control } from "react-hook-form";
import { View } from "react-native";
import { Typography } from "../Typography";

interface SelectProps {
    // value: string | number;
    name: string;
    // onChange: (value: SelectProps['value']) => void;
    options: {
        label: string;
        value: string | number;
    }[];
    className?: string;
    placeholder?: string;
    control: Control<any>;
    required?: boolean;
    title?: string;
    mt?: number;
};

export const Select = ({
    name,
    control,
    placeholder,
    options,
    className,
    required,
    title,
    ...props
}: SelectProps) => {
    const selectOptions = [
        { label: placeholder || 'Selecione uma opção', value: '' },
        ...options
    ];

    return (
        <Controller
            name={name}
            control={RHFControlReturn(control)}
            {...props}
            render={({ field: { onChange, value } }) => {
                const isNotSelected = value === '';
                return (
                    <View style={{ marginTop: props.mt }}>
                        <Typography variant="body1" className="ml-2 mb-3 text-dark-900 text-xl">
                            {required && "*"}{title || placeholder}
                        </Typography>
                        <View className={clsx("bg-light-200 border border-light-300 focus:border-green-400 rounded-lg", className)}>
                            <Picker
                                selectedValue={value}
                                onValueChange={(itemValue, _) => {
                                    onChange(itemValue);
                                }}
                                style={{
                                    color: isNotSelected ? colors.dark[100] : colors.dark[900]
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
}