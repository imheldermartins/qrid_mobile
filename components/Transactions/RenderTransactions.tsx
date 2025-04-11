import { colors, STATIC_COLORS } from "@/styles/colors";
import { Transaction } from "@/types/transactions";
import { Divider } from "../ui/Divider";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import clsx from "clsx";
import { Icon, IconFrom } from '../ui/Icon';
import { Typography } from "../ui/Typography";

interface RenderTransactionsProps {
    transactions: Transaction[];
};

export const RenderTransactions = ({ transactions }: RenderTransactionsProps) => {
    return transactions.map((item, _i) => {
        const { type, color, icon } = item.category;

        const [iconFrom, iconName] = icon.split(':')

        const isIncome = type === 'income';

        // TODO: Refactor this to use a function that returns the color based on the type of transaction
        const getHexColor = (c: STATIC_COLORS, scale: number = 500) => colors[c as STATIC_COLORS][scale as 50];
        const [bgColorCat, iconColorCat] = [
            getHexColor(color as STATIC_COLORS, 200),
            getHexColor(color as STATIC_COLORS, 500),
        ];
        const currencyIcon = getHexColor(!isIncome ? 'red' : 'green');

        return (
            <React.Fragment key={`${_i}-${item.id}`}>

                {_i !== 0 && <Divider className="my-3" />}

                <TouchableOpacity className="my-2">
                    {/* GenericInfo */}
                    <View className='flex flex-row items-center justify-between gap-3 rounded-lg py-1'>
                        <View
                            className={clsx('w-10 h-10 rounded-lg flex items-center justify-center')}
                            style={StyleSheet.flatten([
                                { backgroundColor: bgColorCat },
                            ])}
                        >
                            <Icon
                                from={iconFrom as IconFrom}
                                name={iconName}
                                color={iconColorCat}
                                size={24}
                                style={{ marginRight: -4 }}
                            />
                        </View>
                        <View className='flex-1 flex gap-1 items-start'>
                            {item.title && <Typography variant="body2" className='text-center text-dark-700'>{item.title}</Typography>}
                            <Typography variant={!item.title ? "body2" : "body3"} className='font-medium text-center text-dark-700'>{item.description}</Typography>
                        </View>
                        <View className='flex flex-row items-center'>
                            <Icon
                                name={isIncome ? 'trending-up' : 'trending-down'}
                                size={18}
                                color={currencyIcon}
                                style={{ marginRight: 8 }}
                            />
                            <Typography
                                variant='body2'
                                currencyType='BRL'
                                returnCurrencyFormat
                                className={clsx({
                                    '!text-green-500': isIncome,
                                    '!text-red-500': !isIncome
                                })}
                            >
                                {item.amount}
                            </Typography>
                        </View>
                    </View>
                    {/* TransactionInfoFooter */}
                    <View className="flex flex-row justify-end gap-2 mt-2">
                        <View className="flex flex-row items-center px-3 py-0.5 rounded-2xl border border-yellow-500 bg-yellow-100">
                            <Typography variant="body3" className="text-yellow-600">
                                {item.wallet.name}
                            </Typography>
                        </View>
                        <View className="flex flex-row items-center px-3 py-0.5 rounded-2xl border border-light-300 bg-light-200">
                            <Icon size={18} name={
                                (item.payment_method).includes('CARD') ? 'ionicons:card' :
                                    (item.payment_method).includes('PIX') ? 'ionicons:qr-code' :
                                        (item.payment_method).includes('CASH') ? 'feather:dollar-sign' : 'ionicons:wallet-outline'
                            } style={{ marginRight: 4 }} />
                            <Typography variant="caption">
                                {item.payment_method}
                            </Typography>
                        </View>
                    </View>
                </TouchableOpacity>
            </React.Fragment>
        )
    })
}