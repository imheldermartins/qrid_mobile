import { FlatList, TouchableOpacity, View } from "react-native";
import { Typography } from "../../ui/Typography";
import { colors } from "@/styles/colors";
import { Icon, IconProps } from "@/components/Icon";

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
        <View className='flex-1'>
            <Typography variant='h3' className='!text-center my-4'>Ações <Typography variant='h3' className='text-green-500'>Rápidas</Typography></Typography>
            <FlatList
                className="flex-1 pt-3"
                keyExtractor={({ title }) => title.toLowerCase()}
                data={transactionOptions}
                ItemSeparatorComponent={() => <View className='h-5' />}
                renderItem={({ item, index }) => (
                    <View key={index} className='flex-1 flex flex-col items-center gap-1 m-0.5'>
                        <TouchableOpacity className='bg-transparent px-0 py-0 min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px] border-2 border-light-300 rounded-lg flex items-center justify-center'>
                            <Icon name={item.icon} from={item.from} size={28} color={colors.green[500]} />
                        </TouchableOpacity>
                        <Typography variant="body1" className='text-center text-dark-700'>{item.title}</Typography>
                    </View>
                )}
                numColumns={3}
            />
        </View>
    )
}