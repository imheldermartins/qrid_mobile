import { FlatList, TouchableOpacity, View } from "react-native";
import { Typography } from "../ui/Typography";
import { colors } from "@/styles/colors";
import { Icon } from "../Icon";
import { Button } from "../ui/Button";

export const QuickActions = () => {
    const transactionOptions = [
        {
            icon: 'trending-up',
            title: 'Receita',
            from: 'feather',
            color: colors.green[600]
        },
        {
            icon: 'trending-down',
            title: 'Despesa',
            from: 'feather',
            color: colors.red[600]
        },
        {
            icon: 'repeat-sharp',
            title: 'Movimentação',
            from: 'ionicons',
            color: colors.blue[600]
        }
    ] as {
        icon: any;
        title: string;
        from: 'ionicons' | 'feather';
        color: string;
    }[];

    return (
        <View className='flex-1'>
            <Typography variant='h3' className='!text-center mt-4 mb-6'>Crie uma <Typography variant='h3' className='text-green-500'>Transação</Typography></Typography>
            <View className="flex flex-col items-center gap-6 justify-evenly">
                {transactionOptions.map(({ title, icon, from, color }, index) => (
                    <Button
                        key={`${index}-${title.toLowerCase()}`}
                        className="w-4/5 flex flex-row items-center justify-left !py-6 rounded-xl"
                        style={{ backgroundColor: color }}
                    >
                        <Icon name={icon} from={from} size={24} color={colors.light[100]} />
                        <Typography variant='h4' className='ml-4 text-center text-light-100'>{title}</Typography>
                    </Button>
                ))}
            </View>
        </View>
    )
}