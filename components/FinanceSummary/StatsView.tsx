import { colors } from "@/styles/colors"
import { View } from "react-native"
import { Typography } from "../ui/Typography"
import { Icon, IconProps } from "../Icon"

export const StatsView = ({ title, value, type }: any) => {

    const stats = {
        incomes: { icon: 'trending-up', color: colors.green[500], bg: colors.green[100] },
        expenses: { icon: 'trending-down', color: colors.red[500], bg: colors.red[100] },
        toPay: { icon: 'time-outline', from: 'ionicons', color: colors.orange[500], bg: colors.orange[100] },
        toReceive: { icon: 'time-outline', from: 'ionicons', color: colors.blue[500], bg: colors.blue[100] }
    } as Record<string, Partial<IconProps> & { bg: string; icon: string; }>;

    return (
        <View className="flex-1 flex flex-row items-center gap-3 p-4 bg-light-200 border border-light-300 rounded-lg">
            <View className="p-2 rounded-lg" style={{ backgroundColor: stats[type].bg }}>
                <Icon
                    name={stats[type].icon}
                    size={24}
                    color={stats[type].color}
                    from={stats[type].from}
                />
            </View>
            <View>
                <Typography variant="overline" className="text-dark-100">{title}</Typography>
                <Typography
                    variant="h4"
                    returnCurrencyFormat
                    currencyType='BRL'
                >{value}</Typography>
            </View>
        </View>
    )
}