import { Feather } from '@expo/vector-icons';
import clsx from 'clsx';
import { View } from 'react-native';

interface LoadingProps {
    size?: number;
    type: "spinner" | "dots";
};

export const Loading = ({ size = 24, type }: LoadingProps) => {
    return (
        <View className={clsx({
            "animate-spin": type === "spinner",
        })}>
            <Feather name={"loader"} size={size} className='!text-white' />
        </View>
    );
}