import { FlatList, TouchableOpacity, View } from "react-native";
import { Typography } from "../ui/Typography";
import { Button } from "../ui/Button";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

export const QuickActions = () => {
    const transactionOptions = [
        {
            icon: 'map-pin',
            title: 'Localização'
        },
        {
            icon: 'clipboard',
            title: 'Descrição'
        },
        {
            icon: 'calendar',
            title: 'Data'
        },
        {
            icon: 'credit-card',
            title: 'Forma de pagamento'
        },
        {
            icon: 'dollar-sign',
            title: 'Valor'
        },
        {
            icon: 'gift',
            title: 'Categoria'
        }
    ];
    return (
        <View className='flex-1'>
            <Typography variant='h3' className='text-center my-4'>Ações <Typography variant='h3' className='text-green-500'>Rápidas</Typography></Typography>
            <FlatList
                className="flex-1 pt-3"
                keyExtractor={({ title }) => title.toLowerCase()}
                data={transactionOptions}
                ItemSeparatorComponent={() => <View className='h-5' />}
                renderItem={({ item, index }) => (
                    <View key={index} className='flex-1 flex flex-col items-center gap-1 m-0.5'>
                        <TouchableOpacity className='bg-transparent px-0 py-0 min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px] border-2 border-light-300 rounded-lg flex items-center justify-center'>
                            <Feather name={item.icon as any} size={28} color={colors.green[500]} />
                        </TouchableOpacity>
                        <Typography variant="body1" className='text-center text-dark-700'>{item.title}</Typography>
                    </View>
                )}
                numColumns={3}
            />
        </View>
    )
}