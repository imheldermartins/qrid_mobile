import React, { useReducer, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Reducer } from '@/types/reducerDefaultTypes';
import { api } from '@/utils/api';
import { TListDate, Transaction, TransactionList } from '@/types/transactions';
import { transactionListStyle as styles } from '@/styles/screens/transacionsStyle';
import { ScheduledTransactions } from '@/components/Transactions/ScheduledTransactions';

type TransactionReducer = Reducer<
    TransactionList,
    Partial<{
        page: number;
        id: number;
        newItem: Transaction;
        set: Transaction[];
    }>>;

const reducer: TransactionReducer = (state, action) => {
    // const { page } = action.payload;
    // const [from, to] = [page, page + 20];
    switch (action.type) {
        case 'SET':
            const newState = action.payload?.set;

            if (newState) {
                const scheduledTransactions = newState.reduce((acc, transaction) => {
                    const { scheduled_date: date } = transaction;

                    if (!acc[date]) {
                        acc[date] = [];
                    }

                    acc[date].push(transaction);

                    return acc;
                }, {} as TransactionList);

                return scheduledTransactions as TransactionList;
            }

            return state as TransactionList;
        // case 'ADD':
        //     return [...state, action.payload.newItem] as Transaction[];
        // case 'REMOVE':
        //     return state.filter(_ => _.id !== action.payload?.id);
        //   case 'DESTROY':
        //     return state.filter((_, index) => index < from || index > to);
        default:
            return state;
    }
};

async function getTransactions(): Promise<Transaction[]> {
    const { data } = await api.get('transactions/');
    return data;
}

// async function createTransactions(): Promise<Transaction> {
//     const { data } = await api.post('transactions/create');
//     return data;
// }

export default function TransactionsListScreen() {
    const [transactions, dispatch] = useReducer<TransactionReducer>(reducer, {});

    const filteredTransactions = Object.keys(transactions).sort((a, b) => {
        const dateA = new Date(a).getTime();
        const dateB = new Date(b).getTime();
        return dateB - dateA; // Sort in descending order
    })

    const load = (set: Transaction[]) => {
        dispatch({ type: 'SET', payload: { set } });
    };

    useEffect(() => {
        getTransactions()
            .then(load);
    }, []);

    return (
        <View className='flex-1 w-11/12 mx-auto mt-4'>
            <FlatList
                contentContainerStyle={styles.flatList}
                /**
                 * @todo
                 * 
                 * Fix the ObjectKeys to apply or not reorder of the transactions
                 * 
                 * For now apply the sort to the transactions list (*most rencently)
                 */
                data={filteredTransactions}
                renderItem={({ item, index }) => {
                    const key = item as TListDate;
                    const transactionList: Transaction[] = transactions[key];
                    return (
                        <ScheduledTransactions
                            key={index}
                            dateSection={item as TListDate}
                            transactions={transactionList}
                        />
                    )
                }}
            />
        </View>
    )
}