import { REGEX_VALIDATORS } from "@/constants/REGEX_VALIDATORS";
import clsx from "clsx";
import React, { forwardRef } from "react";
import {
    Controller,
    UseControllerProps,
    Control,
    FieldValues,
    Path,
    PathValue,
} from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";

/** 
 * Mantém <T extends FieldValues> para que esse Input possa ser usado
 * em qualquer formulário.
 */
type Props<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    error?: string;
    required?: string;
    typeField?: "text" | "password" | "email";
    value?: PathValue<T, Path<T>>;
} & Omit<UseControllerProps<T>, "control" | "name">
    & TextInputProps;

export const Input = forwardRef(function Input<T extends FieldValues>(
    {
        control,
        name,
        error = "",
        required = "Campo é Obrigatório",
        typeField = "text",
        rules,
        value,
        // Demais props do TextInput
        ...textInputProps
    }: Props<T>,
    ref: React.Ref<TextInput>
) {
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
                <View>
                    <TextInput
                        ref={ref}
                        value={field.value || value}
                        onChangeText={field.onChange}
                        // unindo custom configs com as props que vieram no TextInputProps
                        {...customInputType[typeField]}
                        {...textInputProps}
                        className={clsx(
                            "w-full outline-none px-4 py-3 rounded-lg text-slate-950 border border-zinc-600 focus:border-blue-500",
                            textInputProps.className,
                            error?.length && "!border-red-500 text-red-500"
                        )}
                    />
                    {error?.length > 0 && typeof error === 'string' && (
                        <Text className="text-red-500 pt-0.5 mt-2">{error}</Text>
                    )}
                </View>
            )}
        />
    );
});
