import { View } from "react-native"
import { StatsView } from "./StatsView";

export const FinanceSummary = () => {
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