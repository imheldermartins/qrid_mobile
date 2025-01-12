import { REGEX_VALIDATORS } from "@/constants/REGEX_VALIDATORS";
import clsx from "clsx";
import { forwardRef } from "react";
import { Controller, UseControllerProps } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from 'react-native';

type Props = TextInputProps & UseControllerProps & {
    required?: string;
    error?: string;
    typeField?: 'text' | 'password' | 'email';
};

export const Input = forwardRef<TextInput, Props>(({
    name = "field",
    value,
    placeholder,
    className,
    error = '',
    required = 'Campo é Obrigatório',
    typeField = 'text',
    ...props
}, ref) => (
    <Controller
        name={name}
        defaultValue={value}
        render={({ field }) => {
            return (
                <View>
                    <TextInput
                        ref={ref}
                        value={field.value || value}
                        onChangeText={field.onChange}
                        placeholder={placeholder || "Digite algo..."}
                        className={clsx("w-full outline-none px-4 py-3 rounded-lg text-slate-950 border border-zinc-600 dark:border-zinc-400 focus:border-green-500 !placeholder:text-zinc-400",
                            className,
                            {
                                "!border-red-500 text-red-500": error.length > 0
                            }
                        )}
                        {...props}
                    />
                    {error.length > 0 && <Text className="text-red-500 pt-0.5 mt-2">{error}</Text>}
                </View>
            )
        }}
        rules={{
            required: required || !!props.rules?.required,
            ...(typeField === 'email' && {
                pattern: {
                    value: REGEX_VALIDATORS.email,
                    message: 'E-mail inválido'
                }
            }),
            ...props.rules
        }}
        {...props}
    />
));