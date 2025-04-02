import DropDownPicker, {
    DropDownPickerProps
} from 'react-native-dropdown-picker';

import RHFControlReturn from "@/utils/RHFControlReturn";
import { Controller, FieldValues } from "react-hook-form";
import { StyleSheet, View } from 'react-native';
import { Typography } from "../../Typography";
import { typographyStyles } from "../../Typography/style";
import { forwardRef, useState } from "react";
import { InputProps } from "../../defaults/rhf_input.type";
import { RenderListItem } from './RenderListItem';
import { rhfSelectStyle as styles } from './style';
import { Icon } from '../../Icon';

type SelectProps<T extends FieldValues> =
    InputProps<T> &
    Partial<DropDownPickerProps<T>> &
    {
        options: {
            label: string;
            value: string | number;
            icon?: any;
            color?: string;
        }[];
    };

export const RHFSelect = forwardRef(function Select<T extends FieldValues>(
    {
        control,
        name,
        error = "",
        required = false,
        typeField = "text",
        rules,
        title,
        options,
        // mode = 'dropdown',
        f: family = 'regular',
        s: size = 'sm',
        c = 'none',
        ...textInputProps
    }: SelectProps<T>,
    ref: React.Ref<DropDownPickerProps<T>>
) {
    const [open, setOpen] = useState<boolean>(false);

    const customStyles = typographyStyles({ size, family, case: c });

    const selectOptionsParsed = options.flatMap(({ icon, color, ...rest }) => ({
        ...rest,
        icon: icon ? () => <Icon name={icon} size={18} style={{ marginRight: 8 }} color={color} /> : undefined
    }))

    return (
        <Controller
            name={name}
            control={RHFControlReturn(control)}
            render={({ field: { onChange, value } }) => {
                return (
                    <View style={styles.container}>
                        <Typography variant="caption" style={styles.label}>
                            {required && "*"}{title || textInputProps.placeholder}
                        </Typography>
                        <DropDownPicker
                            schema={
                                textInputProps.schema ||
                                {
                                    label: 'label',
                                    value: 'value'
                                }
                            }
                            renderListItem={RenderListItem}
                            // hideSelectedItemIcon={true}
                            open={open}
                            value={value}
                            items={selectOptionsParsed as any}
                            setOpen={setOpen}
                            setValue={onChange}
                            onChangeValue={onChange}
                            placeholder={textInputProps.placeholder || 'Selecione uma opção'}

                            style={styles.input}
                            dropDownContainerStyle={styles.dropDownContainerStyle}
                            placeholderStyle={StyleSheet.flatten([
                                { ...customStyles as any },
                                styles.placeholder
                            ])}
                            labelStyle={{
                                ...customStyles,
                                color: 'colors.dark[900]',
                            }}
                            /** Settings specified to Select<CMP> */
                            closeAfterSelecting={true}
                            multiple={false}
                        />
                    </View>
                )
            }}
        />
    )
});