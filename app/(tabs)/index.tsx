import { useAuth } from '@/contexts/AuthContext';
import { View, Text, FlatList } from 'react-native';
import { api } from '../../utils/api';
import { Fragment, useEffect } from 'react';
import { HeaderBalance } from '@/components/HeaderBalance';
import { jsonFormatter } from '@/utils/jsonFormatter';
import { FinanceSummary } from '@/components/FinanceSummary';
import { Typography } from '../../components/ui/Typography/index';
import { Icon } from '../../components/Icon';
import { colors } from '@/styles/colors';
import clsx from 'clsx';

async function getUser() {
    const { data } = await api.get('user/');
    return jsonFormatter(data);
}

export default function HomeScreen() {
    const { user, setUser } = useAuth();

    useEffect(() => {
        getUser().then((user) => {
            if (user) {
                setUser(user);
            }
        });
    }, []);

    const latestTransactions = [
        {
            description: 'Corte de Cabelo',
            value: 30,
            category: {
                name: 'Serviço',
                color: 'green',
                type: 'income'
            }
        },
        {
            title: 'Barbearia do M.A.',
            description: 'Corte de Cabelo',
            value: 60,
            category: {
                name: 'Serviço',
                color: 'green',
                type: 'income'
            }
        },
        {
            description: 'Pgto. ref. ao Aluguel do mês de Fevereiro',
            value: -2300,
            category: {
                name: 'Aluguel',
                color: 'red',
                type: 'expense'
            }
        }
    ];

    return (
        <>
            <View className='flex flex-col gap-3 items-center'>
                <HeaderBalance
                    username={user.firstName}
                    balance={user.balance}
                />

                <FinanceSummary />

                {/* <Button title='Logout' className='bg-red-600' onPress={logout} /> */}

                {/* <View className='bg-light-200 w-full rounded-lg border border-light-300 px-3 py-2'>
                    <View>
                        <Typography variant='h4'>Últimos Lançamentos</Typography>
                        <View>
                            <Typography variant='h4'>Últimos Lançamentos</Typography>
                        </View>
                    </View>
                </View> */}

                <View className='w-full bg-light-200 border border-light-300 rounded-lg p-3'>
                    <Typography variant='h4' className='text-dark-700 mb-4'>
                        Últimas Transações
                    </Typography>

                    <View className="flex-1">
                        {latestTransactions.map((item, index) => (
                            <Fragment key={index}>
                                {index > 0 &&
                                    index < latestTransactions.length && (
                                        <View className='w-full my-4 border border-light-300' />
                                    )}
                                <View className='flex flex-row items-center justify-between gap-3 rounded-lg py-1'>
                                    <View className={clsx('w-10 h-10 rounded-lg flex items-center justify-center', {
                                        'bg-green-100': item.category.type === 'income',
                                        'bg-red-100': item.category.type === 'expense'
                                    })}>
                                        {/* @ts-ignore */}
                                        <Icon name='trending-down' size={24} color={colors[(item.category.color)][500]} />
                                    </View>
                                    <View className='flex-1 flex gap-1 items-start'>
                                        {item.title && <Typography variant="h5" className='text-center text-dark-700'>{item.title}</Typography>}
                                        <Typography variant="body1" className='font-medium text-center text-dark-700'>{item.description}</Typography>
                                    </View>
                                    <View>
                                        <Typography
                                            variant='h5'
                                            currencyType='BRL'
                                            returnCurrencyFormat
                                            className={`text-${item.category.type === 'income' ? 'green' : 'red'}-500`}
                                        >
                                            {item.value}
                                        </Typography>
                                    </View>
                                </View>
                            </Fragment>
                        ))}
                    </View>
                </View>
            </View>
        </>
    )
}