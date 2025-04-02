import { FlatList, TouchableOpacity, View } from "react-native";
import { Typography } from "../../ui/Typography";
import { colors } from "@/styles/colors";
import { Icon, IconProps } from "@/components/ui/Icon";
import { moreActionsStyles } from "./styles";

/**
 * Contas
 * Categorias
 * Tags
 * ----------------
 * Estoque
 * Agendamentos
 * Cartões
 * Metas
 * Limites
 * Clientes
 * Fornecedores
 */

{/* <Ionicons name="" /> */ }

export const MoreActions = () => {
    const transactionOptions = [
        {
            icon: 'credit-card',
            title: 'Cartões',
            from: 'feather'
        },
        {
            icon: 'wallet-outline',
            title: 'Carteiras',
            from: 'ionicons'
        },
        {
            icon: 'qr-code-outline',
            title: 'Escanear QR',
            from: 'ionicons'
        },
        {
            icon: 'user-plus',
            title: 'Clientes',
            from: 'feather'
        },
        {
            icon: 'package',
            title: 'Produtos',
            from: 'feather'
        },
        {
            icon: 'tag',
            title: 'Categoria',
            from: 'feather'
        }
    ] as Array<IconProps & { title: string; icon: string }>;

    return (
        <View style={moreActionsStyles.container}>
            <Typography s='lg' f="medium" style={moreActionsStyles.title}>
                ações{" "}
                <Typography s="lg" f="bold" style={moreActionsStyles.detached}>
                    Rápidas
                </Typography>
            </Typography>
            <FlatList
                keyExtractor={({ title }) => title.toLowerCase()}
                data={transactionOptions}
                ItemSeparatorComponent={() => <View className='h-5' />}
                renderItem={({ item, index }) => (
                    <View key={index} style={moreActionsStyles.buttonContainer}>
                        <TouchableOpacity style={moreActionsStyles.button}>
                            <Icon name={item.icon} from={item.from} size={28} color={colors.green[500]} />
                        </TouchableOpacity>
                        <Typography variant="caption">{item.title}</Typography>
                    </View>
                )}
                numColumns={3}
            />
        </View>
    )
}