import { StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Typography } from "./Typography";
import { colors } from "@/styles/colors";

interface ButtonProps extends TouchableOpacityProps {
    children?: React.ReactNode;
    title?: string;
    typoStyles?: StyleProp<any>;
}

export const Button = ({ children = <></>, title, onPress, className, ...props }: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            {...props}
            style={StyleSheet.flatten([
                styles.buttonContainer,
                props.style
                // props.disabled && { backgroundColor: colors.gray[200] },
            ])}
        >
            {!title ? children : (
                <Typography
                    variant="button"
                    style={
                        StyleSheet.flatten([
                            props.typoStyles,
                            styles.buttonText,
                        ])}
                >
                    {title}
                </Typography>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 12,
        borderRadius: 10,
        backgroundColor: colors.green[500],
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: colors.light[100],
    },
});