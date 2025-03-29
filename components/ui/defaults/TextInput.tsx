import clsx from 'clsx';
import { TextInput as Input, TextInputProps } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
    ref: React.Ref<Input>
};

export const TextInput = (props: CustomTextInputProps) => (
    <Input
        {...props}
        className={clsx('!font-inter', props.className)}
    />
)