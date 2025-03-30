import { StyleSheet, View } from 'react-native';
import { Typography } from './ui/Typography';
import { colors } from '@/styles/colors';

interface HeaderBalanceProps {
    balance: number;
};

export const HeaderBalance = ({ balance = 0 }: HeaderBalanceProps) => {
    return (
        <View style={styles.container}>
            <Typography variant='body1' f='medium'>
                Março de 2025
            </Typography>
            <Typography
                variant='h3'
                returnCurrencyFormat
                currencyType='BRL'
                style={styles.balance}
                f='extraBold'
            >
                {balance}
            </Typography>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        marginVertical: 12,
    },
    balance: {
        color: colors.dark[100]
    },
});