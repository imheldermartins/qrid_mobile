import { StyleSheet, View } from "react-native";
import { Typography } from "../ui/Typography";
import { Icon } from "../Icon";
import { Button } from "../ui/Button";
import { TransactionForm } from "../Forms/TransactionForm";
import { useBottomSheet } from "@/contexts/ui/BottomSheet";
import { quickActionsStyles } from "./style";

type TransactionType = 'income' | 'expense' | 'transfer';

export const QuickActions = () => {

    const { setContent } = useBottomSheet();

    const handleOpenTransactionForm = (type: TransactionType) => {
        setContent(<TransactionForm type={type} />);
    };

    const transactionOptions = [
        {
            icon: 'trending-up',
            title: 'Receita',
            from: 'feather',
            type: 'income'
        },
        {
            icon: 'trending-down',
            title: 'Despesa',
            from: 'feather',
            type: 'expense'
        },
        {
            icon: 'repeat-sharp',
            title: 'Movimentação',
            from: 'ionicons',
            type: 'transfer'
        }
    ] as {
        icon: any;
        title: string;
        from: 'ionicons' | 'feather';
        type: TransactionType;
    }[];


    return (
        <View style={quickActionsStyles.container}>

            <Typography variant='h6' f="medium" style={quickActionsStyles.title}>
                nova{" "}
                <Typography
                    variant='h6'
                    f="bold"
                    style={quickActionsStyles.title}
                >
                    Transação
                </Typography>
            </Typography>

            <View style={quickActionsStyles.actionsContainer}>
                {transactionOptions.map(({
                    title,
                    icon,
                    from,
                    type
                }, index) => (
                    <Button
                        key={`${index}-${title.toLowerCase()}`}
                        style={StyleSheet.flatten([
                            quickActionsStyles.actionButton,
                            quickActionsStyles[`${type}Bg`]
                        ]) as {}}
                        onPress={() => handleOpenTransactionForm(type)}
                    >
                        <Icon name={icon} from={from} size={24} color={quickActionsStyles[`${type}Label`].color} />
                        <Typography
                            variant='body2'
                            style={StyleSheet.flatten([
                                quickActionsStyles.actionLabel,
                                quickActionsStyles[`${type}Label`]
                            ])}
                        >
                            {title}
                        </Typography>
                    </Button>
                ))}
            </View>
        </View>
    )
}