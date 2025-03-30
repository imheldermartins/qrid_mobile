import { useAuth } from '@/contexts/AuthContext';
import { View } from 'react-native';
import { api } from '../../utils/api';
import { Fragment, useEffect } from 'react';
import { HeaderBalance } from '@/components/HeaderBalance';
import { FinanceSummary } from '@/components/FinanceSummary';
import { Typography } from '../../components/ui/Typography/index';
import { Icon } from '../../components/Icon';
import { colors } from '@/styles/colors';
import clsx from 'clsx';
import { styles } from '@/styles/screens/homeStyle';

async function getUser() {
    const { data } = await api.get('user/');
    return data;
}

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

export default function HomeScreen() {
    const { user, setUser } = useAuth();

    useEffect(() => {
        if (user.is_active) return;

        getUser().then((user) => {
            if (user) {
                setUser(user);
            }
        });
    }, []);

    return (
        <View style={styles.screen}>

            <HeaderBalance balance={0} />

            <FinanceSummary />

            {/* <View className='w-full bg-light-200 border border-light-300 rounded-lg p-3'>
                <Typography variant='h4' className='text-dark-700 font-semibold mb-4'>
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
            </View> */}
        </View>
    )
}