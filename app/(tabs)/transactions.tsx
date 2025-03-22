import React, { useReducer } from 'react';
import { View, FlatList } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import clsx from 'clsx';
import { Icon } from '@/components/Icon';
import { colors } from '@/styles/colors';
import { Reducer } from '@/types/reducerDefaultTypes';
import { api } from '@/utils/api';

type Transaction = {
    id: number;
    title: string;
    description: string;
    tags: string[];
    payment_method: string;
    amount: number;
    scheduled_date: `${number}-${number}-${number}`;
    created_at: string | Date;
    updated_at: string | Date;
    category: number;
    wallet_monthly: number;
    owner: number
};

type TransactionReducer = Reducer<
    Transaction[],
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
                return newState;
            }

            return state as Transaction[];
        case 'ADD':
            return [...state, action.payload.newItem] as Transaction[];
        case 'REMOVE':
            return state.filter(_ => _.id !== action.payload?.id);
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

export default function TransactionsListScreen() {
    const [transactions, dispatch] = useReducer<TransactionReducer>(reducer, []);

    const load = (set: Transaction[]) => {
        console.log(set);
        dispatch({ type: 'SET', payload: { set } });
    }

    React.useEffect(() => {
        getTransactions()
            .then(load);
    }, []);

    return (
        <View className="flex-1 flex flex-col justify-end">
            <FlatList
                contentContainerClassName='my-6'
                data={transactions}
                renderItem={({ item, index }) => {
                    return (
                        <React.Fragment key={index}>
                            {index > 0 &&
                                index < transactions.length && (
                                    <View className='w-full my-4 border border-light-300' />
                                )}
                            <View className='flex flex-row items-center justify-between gap-3 rounded-lg py-1'>
                                {/* <View className={clsx('w-10 h-10 rounded-lg flex items-center justify-center', {
                                    'bg-green-100': item.category.type === 'income',
                                    'bg-red-100': item.category.type === 'expense'
                                })}>
                                    <Icon name='trending-down' size={24} color={colors[(item.category.color)][500]} />
                                </View> */}
                                <View className='flex-1 flex gap-1 items-start'>
                                    {item.title && <Typography variant="h5" className='text-center text-dark-700'>{item.title}</Typography>}
                                    <Typography variant="body1" className='font-medium text-center text-dark-700'>{item.description}</Typography>
                                </View>
                                <View>
                                    <Typography
                                        variant='h5'
                                        currencyType='BRL'
                                        returnCurrencyFormat
                                    // className={`text-${item.category.type === 'income' ? 'green' : 'red'}-500`}
                                    >
                                        {item.amount}
                                    </Typography>
                                </View>
                            </View>
                        </React.Fragment>
                    )
                }}
            />
        </View>
    )
}