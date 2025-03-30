import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const quickActionsStyles = StyleSheet.create({
    container: { flex: 1 },
    title: {
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 24,
    },
    actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: 20,
    },
    actionButton: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 24,
        borderRadius: 16,
    },

    actionLabel: { marginLeft: 16 },

    incomeBg: { 
        backgroundColor: colors.green[400],
        borderColor: colors.green[600],
        borderWidth: 1,
    },
    expenseBg: { 
        backgroundColor: colors.red[400],
        borderColor: colors.red[600],
        borderWidth: 1,
    },
    transferBg: { 
        backgroundColor: colors.blue[400],
        borderColor: colors.blue[600],
        borderWidth: 1,
    },
    
    incomeLabel: { color: colors.green[700] },
    expenseLabel: { color: colors.red[700] },
    transferLabel: { color: colors.blue[700] },
});