import { View } from "react-native"
import { StatsView } from "./StatsView";
import { financeSummaryStyles } from "./style";

export const FinanceSummary = () => {
    return (
        <View style={financeSummaryStyles.container}>
            <View style={financeSummaryStyles.rowStats}>
                <StatsView title="receitas" value="0.0" type="incomes" />
                <StatsView title="despesas" value="0.0" type="expenses" />
            </View>
            <View style={financeSummaryStyles.rowStats}>
                <StatsView title="p/ receber" value="0.0" type="toPay" />
                <StatsView title="p/ pagar" value="0.0" type="toReceive" />
            </View>
        </View>
    )
}