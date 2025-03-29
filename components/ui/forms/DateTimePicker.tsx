import DateTimePicker, {
    DatePickerOptions,
    AndroidNativeProps
} from '@react-native-community/datetimepicker';
import { forwardRef, useState } from 'react';
// import { Input } from './Input';
import { Controller, FieldValues } from 'react-hook-form';
import RHFControlReturn from '@/utils/RHFControlReturn';
import { TextInput as InputType, View } from 'react-native';
// import { Typography } from '../Typography';
import clsx from 'clsx';
import { Typography } from '../Typography';
import { InputProps } from '../defaults/rhf_input.type';
import { TextInput } from '../defaults/TextInput';

type DateTimePickerProps<T extends FieldValues> = InputProps<T> & {
    mode?: AndroidNativeProps['mode'];
    datePickerOptions?: DatePickerOptions;
};

const Picker = forwardRef(<T extends FieldValues>(
    {
        mode = 'date',
        control,
        name,
        error = "",
        required = false,
        typeField = "text",
        rules,
        value,
        title,
        datePickerOptions,
        ...textInputProps
    }: DateTimePickerProps<T>,
    ref: React.Ref<InputType>
) => {
    const [visible, setVisible] = useState<boolean>(false);

    // const inputRef = useRef(null);

    return (
        <Controller
            name={name}
            control={RHFControlReturn(control)}
            render={({ field: { onChange, value } }) => {
                const dateValue = value ? new Date(value) : new Date();
                const formattedDate = dateValue.toLocaleDateString();
                return (
                    <View className='flex-1'>
                        <Typography variant="body1" className="ml-2 mb-3 text-dark-900 text-xl">
                            {required && "*"}{title || textInputProps.placeholder}
                        </Typography>
                        <TextInput
                            ref={ref}
                            value={formattedDate}
                            // {...textInputProps}
                            // editable={false}
                            onTouchStart={() => setVisible(true)}
                            placeholder='Selecione uma data'
                            {...textInputProps}
                            className={clsx(
                                "w-full outline-none px-4 py-3 rounded-lg bg-light-200 text-dark-900 border border-light-300 focus:border-green-400 !placeholder:text-dark-100",
                                textInputProps.className,
                                // error?.length && "!border-red-500 text-red-500"
                            )}
                        />
                        {/* {error?.length > 0 && typeof error === 'string' && (
                            <Typography variant="body2" className="text-red-500 pt-0.5 mt-2">{error}</Typography>
                        )} */}
                        {visible && (
                            <DateTimePicker
                                value={dateValue}
                                mode={mode}
                                onChange={({ type }, selectedDate) => {
                                    if (type === 'set' && selectedDate) {
                                        const localDate = new Date(selectedDate);
                                        const year = localDate.getFullYear();
                                        const month = String(localDate.getMonth() + 1).padStart(2, '0');
                                        const day = String(localDate.getDate()).padStart(2, '0');
                                        const formatted = `${year}-${month}-${day}`; // Local format
                                        onChange(formatted);
                                    }
                                    setVisible(false);
                                }}
                                {...datePickerOptions}
                            />
                        )}
                    </View>
                )
            }}
        />
    )
});

export { Picker as DateTimePicker };