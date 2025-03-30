import clsx from 'clsx';
import { forwardRef } from 'react';
import { TextInput as Input, TextInputProps } from 'react-native';

export const TextInput = forwardRef<Input, TextInputProps>((props, ref) => (
    <Input
        {...props}
        ref={ref}
        className={clsx('!font-inter', props.className)}
    />
))