import { StyleSheet } from "react-native";
import { colors } from '../../../styles/colors';

export const transactionFormStyles = StyleSheet.create({
    container: { 
        flex: 1
    },
    title: {
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 24,
    },

    incomeTitle: { color: colors.green[500] },
    expenseTitle: { color: colors.red[500] },
    transferTitle: { color: colors.blue[500] },

    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: '90%',
        alignSelf: 'center'
    }
});