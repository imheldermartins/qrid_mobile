import { Feather } from "@expo/vector-icons";
import clsx from "clsx";
import { View, Text } from "react-native";

interface AlertProps {
    message: string | React.ReactNode;
    type: 'success' | 'danger';
};

export const Alert: React.FC<AlertProps> = ({ message, type }) => {
    return (
        <View className="flex-1 flex flex-row items-center gap-2">
            <Feather name="alert-triangle" size={24} color={clsx({
                "#ef4444": type === "danger",
                "#0f0": type === "success"
            })} />
            <Text className="text-lg text-red-500">
                {message || ""}
            </Text>
        </View>
    );
}