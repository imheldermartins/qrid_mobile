import clsx from "clsx";
import { Text, TextProps } from "react-native"
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
    "text-4xl font-bold": variant === 'h1',
    "text-3xl font-bold": variant === 'h2',
    "text-2xl font-bold": variant === 'h3',
    "text-xl font-bold": variant === 'h4',
    "text-lg font-bold": variant === 'h5',
    "text-base font-bold": variant === 'h6',
    "text-base": variant === 'body1',
    "text-sm": variant === 'body2',
    "text-xs": variant === 'caption',
    "text-base font-bold uppercase !text-center": variant === 'button',
    "text-xs uppercase": variant === 'overline'
})

export const Typography = ({ variant = 'body1', returnCurrencyFormat = false, className, ...props }: TypographyProps) => {
    if (returnCurrencyFormat) {
        const value = parseFloat(reactNodeToString(props.children));
        return <CurrencyFormatter value={value} currency={props.currencyType} className={clsx(className, getVariantSize(variant))} />
    }

    return (
        <Text className={clsx(
            "!text-left",
            getVariantSize(variant),
            className
        )} {...props}
        />
    )
}