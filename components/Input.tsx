import clsx from "clsx";
import { forwardRef } from "react";
import { Controller, UseControllerProps } from "react-hook-form";
import { TextInput, TextInputProps } from 'react-native';

type Props = TextInputProps & UseControllerProps;

export const Input = forwardRef<TextInput, Props>(({
    name = "input",
    value,
    placeholder,
    className,
    ...props
}, ref) => (
    <Controller
        name={name}
        defaultValue={value}
        render={({ field }) => {
            return (
                <TextInput
                    ref={ref}
                    value={field.value || value}
                    onChangeText={field.onChange}
                    placeholder={placeholder || "Digite algo..."}
                    className={clsx("w-full outline-none px-4 py-3 rounded-lg text-slate-950 dark:text-white dark:bg-zinc-800 border border-zinc-600 dark:border-zinc-400 focus:border-blue-500 !placeholder:text-zinc-400", className)}
                    {...props}
                />
            )
        }}
        {...props}
    />
));