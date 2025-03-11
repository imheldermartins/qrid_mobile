import { View, Text } from 'react-native';
import { Typography } from './ui/Typography';

interface HeaderBalanceProps {
    username: string;
    businessName?: string;
    balance: number;
};

export const HeaderBalance = ({ username, businessName, balance = 0 }: HeaderBalanceProps) => {
    return (
        <View className='flex flex-col items-center gap-2 mb-6'>
            <Typography variant='h3' className='text-dark-800 text-2xl font-medium'>Olá, <Typography variant='h3' className='text-green-500'>{username}</Typography></Typography>
            <Typography
                variant='h1'
                returnCurrencyFormat
                currencyType='BRL'
                className='text-dark-100'
            >
                {balance}
            </Typography>
            {businessName && <View className='flex flex-col items-center'>
                <Text className='text-dark-800 text-xl font-medium'>Saldo atual</Text>
                <Text className='text-dark-800 text-xl font-medium'>da <Text className='font-bold text-green-700'>{businessName}</Text></Text>
            </View>}
        </View>
    )
}