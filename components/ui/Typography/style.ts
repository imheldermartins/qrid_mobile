import { StyleSheet } from "react-native";

export type F =
    | 'light'
    | 'regular'
    | 'medium'
    | 'semiBold'
    | 'bold'
    | 'extraBold';

export type C =
    | 'lowercase'
    | 'uppercase'
    | 'capitalize'
    | 'none';

export type S =
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl';

type TypoStyles = {
    size: S;
    family: F;
    case?: C;
};

export const fontFamilyStyles = StyleSheet.create({
    light: { fontFamily: 'Inter_Light' },
    regular: { fontFamily: 'Inter_Regular' },
    medium: { fontFamily: 'Inter_Medium' },
    semiBold: { fontFamily: 'Inter_SemiBold' },
    bold: { fontFamily: 'Inter_Bold', },
    extraBold: { fontFamily: 'Inter_ExtraBold' },
});

export const fontSizeStyles = StyleSheet.create({
    xs: { fontSize: 14 },
    sm: { fontSize: 16 },
    base: { fontSize: 18 },
    lg: { fontSize: 20 },
    xl: { fontSize: 24 },
    '2xl': { fontSize: 28 },
    '3xl': { fontSize: 32 },
    '4xl': { fontSize: 36 },
    '5xl': { fontSize: 40 },
    '6xl': { fontSize: 44 },
});

export const textTransformStyles = StyleSheet.create({
    lowercase: { textTransform: 'lowercase' },
    uppercase: { textTransform: 'uppercase' },
    capitalize: { textTransform: 'capitalize' },
    none: { textTransform: 'none' },
});

export const typographyStyles = ({
    size,
    family,
    case: textTransform = 'none'
}: TypoStyles) => StyleSheet.flatten([
    fontSizeStyles[size],
    fontFamilyStyles[family],
    textTransformStyles[textTransform]
]);