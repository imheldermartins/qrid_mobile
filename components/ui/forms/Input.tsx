import { REGEX_VALIDATORS } from "@/constants/REGEX_VALIDATORS";
import React, { forwardRef, useState } from "react";
import { TextInput as InputType, StyleSheet, TextInputProps, View } from "react-native";
import { Typography } from "../Typography";
import { TextInput } from "../defaults/TextInput";
import { InputProps } from "../defaults/rhf_input.type";
import { Controller, FieldValues } from "react-hook-form";
import { colors } from "@/styles/colors";
import { typographyStyles } from "../Typography/style";

export const Input = forwardRef(function Input<T extends FieldValues>(
    {
        control,
        name,
        error = "",
        required = false,
        typeField = "text",
        rules,
        value,
        title,
        f: family = 'regular',
        s: size = 'sm',
        c = 'none',
        fullWidth,
        ...textInputProps
    }: InputProps<T>,
    ref: React.Ref<InputType>
) {
    const [focused, setFocused] = useState<boolean>(false);

    const customInputType = {
        password: {
            secureTextEntry: true,
            autoCompleteType: "password",
        },
        email: {
            // Por exemplo, algo para email
            keyboardType: "email-address",
            autoCapitalize: "none",
        },
        text: {},
    } as Record<string, Partial<TextInputProps>>;

    const customStyles = typographyStyles({ size, family, case: c });

    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: required || !!rules?.required,
                ...(typeField === "email" && {
                    pattern: {
                        // Ajuste para seu REGEX
                        value: REGEX_VALIDATORS.email,
                        message: "E-mail inválido",
                    },
                }),
                ...rules,
            }}
            defaultValue={value}
            render={({ field }) => (
                <View style={!fullWidth ? ({ width: "auto" }) : ({ width: "100%" })}>
                    <Typography s="sm" f="medium" style={styles.label}>
                        {required && "*"}{title || textInputProps.placeholder}
                    </Typography>
                    <TextInput
                        {...customInputType[typeField]}
                        {...textInputProps}
                        ref={ref}
                        value={field.value || value}
                        onChangeText={field.onChange}
                        style={StyleSheet.flatten([
                            styles.input,
                            customInputType[typeField]?.style,
                            textInputProps.style,
                            focused ? styles.inputFocused : {},
                            error?.length ? styles.inputError : {},
                            customStyles
                        ])}
                        onBlur={() => {
                            setFocused(false);
                            field.onBlur();
                        }}
                        onFocus={() => {
                            setFocused(true);
                        }}
                    />
                    {error?.length > 0 && typeof error === 'string' && (
                        <Typography s="sm" style={styles.error}>{error}</Typography>
                    )}
                </View>
            )}
        />
    );
});

const styles = StyleSheet.create({
    label: {
        color: colors.dark[300],
        marginBottom: 8,
    },
    error: {
        color: colors.red[500],
        marginTop: 4,
    },
    input: {
        backgroundColor: colors.light[200],
        borderColor: colors.light[300],
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        color: colors.dark[900],
    },
    inputError: {
        borderColor: colors.red[500],
        backgroundColor: colors.red[50],
    },
    inputFocused: {
        borderColor: colors.green[500],
        backgroundColor: colors.green[50],
    },
});
