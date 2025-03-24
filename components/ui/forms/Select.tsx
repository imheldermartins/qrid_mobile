import { colors } from "@/styles/colors";
import RHFControlReturn from "@/utils/RHFControlReturn";
import { Picker } from "@react-native-picker/picker"
import clsx from "clsx";
import { Controller, Control } from "react-hook-form";
import { View } from "react-native";

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
};

export const Select = ({
    name,
    control,
    placeholder,
    options,
    className,
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
                                />
                            ))}
                        </Picker>
                    </View>
                )
            }}
        />
    )
}