import DateTimePicker, {
    DatePickerOptions,
    AndroidNativeProps
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
// import { Input } from './Input';
import { Control, Controller } from 'react-hook-form';
import RHFControlReturn from '@/utils/RHFControlReturn';
import { TextInput, TextInputProps, View } from 'react-native';
// import { Typography } from '../Typography';
import clsx from 'clsx';
import { Typography } from '../Typography';

interface DateTimePickerProps
    extends Omit<DatePickerOptions, 'value'> {
    mode?: AndroidNativeProps['mode'];

    // Input props
    name: string;
    control: Control<any>;
    className?: string;
    title?: string;
    placeholder?: string;
    required?: boolean;
    mt?: number;
}

const Picker = ({ name, control, className, required, ...props }: DateTimePickerProps) => {
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
                    <View style={{ marginTop: props.mt }}>
                        <Typography variant="body1" className="ml-2 mb-3 text-dark-900 text-xl">
                            {required && "*"}{props.title || props.placeholder}
                        </Typography>
                        <TextInput
                            // ref={ref}
                            value={formattedDate}
                            // unindo custom configs com as props que vieram no TextInputProps
                            // {...customInputType[typeField]}
                            // {...textInputProps}
                            className={clsx(
                                "w-full outline-none px-4 py-3 rounded-lg bg-light-200 text-dark-900 border border-light-300 focus:border-green-400 !placeholder:text-dark-100",
                                className
                                // textInputProps.className,
                                // error?.length && "!border-red-500 text-red-500"
                            )}
                            // editable={false}
                            onTouchStart={() => setVisible(true)}
                            placeholder='Selecione uma data'
                        />
                        {/* {error?.length > 0 && typeof error === 'string' && (
                            <Typography variant="body2" className="text-red-500 pt-0.5 mt-2">{error}</Typography>
                        )} */}
                        {visible && (
                            <DateTimePicker
                                value={dateValue}
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
                                {...props}
                            />
                        )}
                    </View>
                )
            }}
        />
    )
}

export { Picker as DateTimePicker };