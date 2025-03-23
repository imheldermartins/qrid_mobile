import { colors } from "@/styles/colors";
import { Picker } from "@react-native-picker/picker"
import clsx from "clsx";
import { useState } from "react";
import { View } from "react-native";

interface SelectProps {
    value: string | number;
    onChange: (value: SelectProps['value']) => void;
    options: {
        label: string;
        value: string | number;
    }[];
    className?: string;
    defaultLabel?: string;
    control: any;
};

export const Select = ({ value, options, onChange, className, ...props }: SelectProps) => {
    const [selectedItem, setSelectedItem] = useState<SelectProps['value']>(value);

    const selectOptions = [
        { label: props.defaultLabel || 'Selecione uma opção', value: '' },
        ...options
    ];

    const isNotSelected = selectedItem === '';

    return (
        <View className={clsx("bg-light-200 border border-light-300 focus:border-green-400 rounded-lg", className)}>
            <Picker
                selectedValue={selectedItem}
                onValueChange={(itemValue, _) => {
                    setSelectedItem(itemValue)
                    onChange(itemValue as SelectProps['value'])
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
}