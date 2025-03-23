import DateTimePicker, {
    DatePickerOptions,
    AndroidNativeProps
} from '@react-native-community/datetimepicker';
import { useRef, useState } from 'react';
import { Input } from './Input';

interface DateTimePickerProps extends Omit<DatePickerOptions, 'value'> {
    value?: string | Date;
    mode?: AndroidNativeProps['mode'];

    // Input props
    name: string;
    control: any;
    className?: string;
}

const Picker = ({ value, name, control, className, ...props }: DateTimePickerProps) => {
    const [date, setDate] = useState<string | Date>(value || new Date());
    const [visible, setVisible] = useState<boolean>(false);

    const inputRef = useRef(null);

    return (
        <>
            <Input
                ref={inputRef}
                name={name}
                value={String(date)}
                control={control}
                onFocus={() => setVisible(true)}
                className={className}
            />
            {visible && (
                <DateTimePicker
                    value={new Date(date)}
                    onChange={({ type }, selectedDate) => {
                        switch (type) {
                            case 'set':
                                const currentDate = new Date(selectedDate || date);
                                setDate(currentDate);
                                break;
                            case 'dismissed':
                                setVisible(false);
                                break;
                            default:
                                setVisible(false);
                                break;
                        }
                    }}
                    {...props}
                />
            )}
        </>
    )
}

export { Picker as DateTimePicker };