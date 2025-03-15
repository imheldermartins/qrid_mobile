import { View } from 'react-native';
import { Typography } from '@/components/ui/Typography';

export default function TransactionsListScreen() {
    return (
        <View className="flex-1 flex flex-col justify-end">
            <Typography variant='overline'>
                Transactions...
            </Typography>
        </View>
    )
}