import { REGEX_VALIDATORS } from "@/constants/REGEX_VALIDATORS";
import clsx from "clsx";
import React, { forwardRef } from "react";
import { TextInput as InputType, TextInputProps, View } from "react-native";
import { Typography } from "../Typography";
import { TextInput } from "../defaults/TextInput";
import { InputProps } from "../defaults/rhf_input.type";
import { Controller, FieldValues } from "react-hook-form";

export const Input = forwardRef(<T extends FieldValues>(
    {
        control,
        name,
        error = "",
        required = false,
        typeField = "text",
        rules,
        value,
        title,
        ...textInputProps
    }: InputProps<T>,
    ref: React.Ref<InputType>
) => {
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
            defaultValue={value} // Depende do seu campo
            render={({ field }) => (
                <View className="flex-1">
                    <Typography variant="body1" className="ml-2 mb-3 text-dark-900 text-xl">
                        {required && "*"}{title || textInputProps.placeholder}
                    </Typography>
                    <TextInput
                        ref={ref}
                        value={field.value || value}
                        onChangeText={field.onChange}
                        // unindo custom configs com as props que vieram no TextInputProps
                        {...customInputType[typeField]}
                        {...textInputProps}
                        className={clsx(
                            "w-full outline-none px-4 py-3 rounded-lg bg-light-200 text-dark-900 border border-light-300 focus:border-green-400 !placeholder:text-dark-100",
                            textInputProps.className,
                            error?.length && "!border-red-500 text-red-500"
                        )}
                    />
                    {error?.length > 0 && typeof error === 'string' && (
                        <Typography variant="body2" className="text-red-500 pt-0.5 mt-2">{error}</Typography>
                    )}
                </View>
            )}
        />
    );
});
