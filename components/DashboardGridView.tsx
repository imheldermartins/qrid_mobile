import { View } from "react-native"
import { Typography } from './ui/Typography/index';
import { Feather } from '@expo/vector-icons';
import { colors } from "@/styles/colors";

const StatsView = ({ title, value, type }: any) => {

    const stats = {
        incomes: { icon: 'trending-up', color: colors.green[500], bg: colors.green[100] },
        expenses: { icon: 'trending-down', color: colors.red[500], bg: colors.red[100] },
        toPay: { icon: 'arrow-down', color: colors.orange[500], bg: colors.orange[100] },
        toReceive: { icon: 'arrow-up', color: colors.blue[500], bg: colors.blue[100] }
    } as any

    return (
        <View className="flex-1 flex flex-row items-center gap-3 p-4 bg-light-200 border-2 border-light-300 rounded-lg">
            <View className="p-2 rounded-lg" style={{ backgroundColor: stats[type].bg }}>
                <Feather
                    name={stats[type].icon}
                    size={24}
                    color={stats[type].color}
                />
            </View>
            <View>
                <Typography variant="overline" className="text-dark-100">{title}</Typography>
                <Typography
                    variant="h4"
                    returnCurrencyFormat
                    currencyType='BRL'
                    className="bg-dark-700"
                >{value}</Typography>
            </View>
        </View>
    )
}

export const DashboardGridView = () => {
    return (
        <View className="w-full flex flex-col gap-2 mb-6">
            <View className="flex flex-row items-center justify-between gap-2">
                <StatsView title="receitas" value="0.0" type="incomes" />
                <StatsView title="despesas" value="0.0" type="expenses" />
            </View>
            <View className="flex flex-row items-center justify-between gap-2">
                <StatsView title="à Receber" value="0.0" type="toPay" />
                <StatsView title="à pagar" value="0.0" type="toReceive" />
            </View>
        </View>
    )
}