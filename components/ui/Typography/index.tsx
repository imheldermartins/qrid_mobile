import { Text, TextProps, StyleSheet } from 'react-native';
import { CurrencyFormatter, CurrencyType } from './CurrencyFormatter ';
import { C, F, S, typographyStyles } from "./style";
import { checkIsHex, colors, STATIC_COLORS, staticPallete } from '@/styles/colors';

type TypoVariant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline';

type TypographyProps =
    TextProps &
    {
        variant?: TypoVariant;
        returnCurrencyFormat?: boolean;
        currencyType?: CurrencyType;
        s?: S;
        f?: F;
        color?: STATIC_COLORS | string;
    };

const reactNodeToString = (node: React.ReactNode): string => {
    if (typeof node === "string" || typeof node === "number") {
        return node.toString();
    }
    return ""; // Ou tratar outros casos, se necessário
};

export const Typography = ({
    variant = 'body1',
    returnCurrencyFormat = false,
    className,
    color,
    ...props
}: TypographyProps) => {

    color = color !== '' ? (!checkIsHex(String(color)) ? staticPallete[color as STATIC_COLORS] : color) : colors.dark[100];

    const variants: Record<TypoVariant, [S, F, C?]> = {
        caption: ['sm', 'light'],
        body1: ['base', 'regular'],
        body2: ['lg', 'medium'],
        button: ['base', 'bold'],
        overline: ['base', 'medium', 'uppercase'],
        h6: ['xl', 'bold'],
        h5: ['2xl', 'bold'],
        h4: ['3xl', 'bold'],
        h3: ['4xl', 'bold'],
        h2: ['5xl', 'bold'],
        h1: ['6xl', 'extraBold']
    };

    const [variantSize, variantFamily] = variants[variant];
    const size = props.s ?? variantSize;
    const family = props.f ?? variantFamily;
    const [, , textTransform] = variants[variant];

    const sx = { size, family, case: textTransform };

    if (returnCurrencyFormat) {
        const value = parseFloat(reactNodeToString(props.children));
        return (
            <CurrencyFormatter
                value={value}
                currency={props.currencyType}
                style={StyleSheet.flatten([
                    props.style,
                    color ? { color } : {},
                    typographyStyles(sx),
                ]) as {}}
            />
        )
    }

    return (
        <Text
            {...props}
            style={StyleSheet.flatten([
                props.style,
                typographyStyles(sx),
                color ? { color } : {},
            ])}
        />
    )
}