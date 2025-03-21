import clsx from "clsx";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    children?: React.ReactNode;
    title?: string;
}

export const Button = ({ children = <></>, title, onPress, className, ...props }: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={clsx("bg-green-400 text-light-300 py-3 px-6 rounded-lg capitalize", className)}
            {...props}
        >
            {!title ? children : <Text className="text-xl tracking-wider font-semibold text-white capitalize">{title}</Text>}
        </TouchableOpacity>
    )
}