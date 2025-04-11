import { TListDate, Transaction } from "@/types/transactions";
import { View } from "react-native";
import { Typography } from "../ui/Typography";
import { format, parseISO } from "date-fns";
import { Divider } from "../ui/Divider";
import { ptBR } from "date-fns/locale";
import React from "react";
import { RenderTransactions } from './RenderTransactions';

interface ScheduledTransactionsProps {
    dateSection: TListDate;
    transactions: Transaction[];
};

export const ScheduledTransactions = ({ dateSection, transactions }: ScheduledTransactionsProps) => (
    <View className='flex flex-col mb-12'>

        <View className='flex flex-row items-center justify-between gap-2 mb-4'>
            <Typography variant='body3' f='semiBold'>
                {format(parseISO(dateSection), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </Typography>
            <Divider />
        </View>

        <RenderTransactions transactions={transactions} />

    </View>
)