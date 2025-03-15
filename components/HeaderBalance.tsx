import { View, Text } from 'react-native';
import { Typography } from './ui/Typography';

interface HeaderBalanceProps {
    username: string;
    businessName?: string;
    balance: number;
};

export const HeaderBalance = ({ username, businessName, balance = 0 }: HeaderBalanceProps) => {
    return (
        <View className='flex flex-col items-center gap-2 mb-3'>
            <Typography variant='h5' className='text-dark-800 text-2xl font-medium'>Março de 2025</Typography>
            <Typography
                variant='h1'
                returnCurrencyFormat
                currencyType='BRL'
                className='text-dark-100'
            >
                {balance}
            </Typography>
        </View>
    )
}