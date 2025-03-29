import clsx from "clsx";
import { Text, TextProps, StyleSheet } from 'react-native';
import { CurrencyFormatter, CurrencyType } from './CurrencyFormatter ';

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

interface TypographyProps extends TextProps {
    variant?: TypoVariant;
    returnCurrencyFormat?: boolean;
    currencyType?: CurrencyType;
};

const reactNodeToString = (node: React.ReactNode): string => {
    if (typeof node === "string" || typeof node === "number") {
        return node.toString();
    }
    return ""; // Ou tratar outros casos, se necessário
};

const getVariantSize = (variant: TypoVariant) => ({
    "text-4xl": variant === 'h1',
    "text-3xl": variant === 'h2',
    "text-2xl": variant === 'h3',
    "text-xl": variant === 'h4',
    "text-lg": variant === 'h5',
    "text-base": ['h6', 'body1'].includes(variant),
    "text-sm": variant === 'body2',
    "text-xs": variant === 'caption',
    "text-base font-bold uppercase !text-center": variant === 'button',
    "text-xs uppercase": variant === 'overline'
})

export const Typography = ({ variant = 'body1', returnCurrencyFormat = false, className, ...props }: TypographyProps) => {
    if (returnCurrencyFormat) {
        const value = parseFloat(reactNodeToString(props.children));
        return (
            <CurrencyFormatter
                value={value}
                currency={props.currencyType}
                className={clsx(
                    "font-inter",
                    className,
                    getVariantSize(variant)
                )}
                style={StyleSheet.flatten([
                    typographyStyle[variant]
                ]) as {}}
            />
        )
    }

    return (
        <Text
            className={clsx(
                "!text-left font-inter",
                getVariantSize(variant),
                className
            )}
            style={StyleSheet.flatten([
                typographyStyle[variant],
                props.style,
            ])}
            {...props}
        />
    )
}

export const typographyStyle = StyleSheet.create({
    h1: {
        fontFamily: 'Inter_Bold',
        color: '#f0f !important',
    },
    h2: {
        fontFamily: 'Inter_Bold',
    },
    h3: {
        fontFamily: 'Inter_Bold',
    },
    h4: {
        fontFamily: 'Inter_Bold',
    },
    h5: {
        fontFamily: 'Inter_Bold',
    },
    h6: {
        fontFamily: 'Inter_Bold',
    },
    body1: {
        fontFamily: 'Inter_Regular',
    },
    body2: {
        fontFamily: 'Inter_Regular',
    },
    caption: {
        fontFamily: 'Inter_Light',
    },
    button: {
        fontFamily: 'Inter_Bold',
    },
    overline: {
        fontFamily: 'Inter_Bold',
    }
});