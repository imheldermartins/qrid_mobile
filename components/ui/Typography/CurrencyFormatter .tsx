import clsx from 'clsx';
import React from 'react';
import { Text } from 'react-native';

export type CurrencyType = 'USD' | 'BRL';

interface CurrencyFormatterProps {
    value: number;
    currency?: CurrencyType;
    className?: string;
    style?: React.CSSProperties;
};

export const parseCurrency = (currency: CurrencyType) => new Intl.NumberFormat(currency === "BRL" ? "pt-BR" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
});

export const CurrencyFormatter = ({ value, currency, className, style = {} }: CurrencyFormatterProps) => {
    const formatter = parseCurrency(currency || "BRL");
    return (
        <Text className={clsx(className)} style={style as {}}>
            {formatter.format(value)}
        </Text>
    )
};