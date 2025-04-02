import { colors } from "@/styles/colors"
import { StyleSheet, View } from "react-native"
import { Typography } from "../ui/Typography"
import { Icon, IconProps } from "../ui/Icon"
import { statsView } from "./style"

export const StatsView = ({ title, value, type }: any) => {

    const stats = {
        incomes: { icon: 'trending-up', color: colors.green[500], bg: colors.green[100] },
        expenses: { icon: 'trending-down', color: colors.red[500], bg: colors.red[100] },
        toPay: { icon: 'time-outline', from: 'ionicons', color: colors.orange[500], bg: colors.orange[100] },
        toReceive: { icon: 'time-outline', from: 'ionicons', color: colors.blue[500], bg: colors.blue[100] }
    } as Record<string, Partial<IconProps> & { bg: string; icon: string; }>;

    return (
        <View style={statsView.container}>
            <View
                style={StyleSheet.flatten([
                    statsView.icon,
                    { backgroundColor: stats[type].bg }
                ])}
            >
                <Icon
                    name={stats[type].icon}
                    size={24}
                    color={stats[type].color}
                    from={stats[type].from}
                />
            </View>
            <View>
                <Typography variant="overline" s="xs">{title}</Typography>
                <Typography
                    variant="body1"
                    returnCurrencyFormat
                    currencyType='BRL'
                    f="bold"
                >{value}</Typography>
            </View>
        </View>
    )
}