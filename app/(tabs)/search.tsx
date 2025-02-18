import { View } from 'react-native';
import { Input } from '../../components/ui/Input';
import { Typography } from '@/components/ui/Typography';

export default function SearchScreen() {
    return (
        <View className="flex-1 flex flex-col justify-end">
            <Typography variant='overline'>
                Pesquise por: Transações, Categorias, Descrições, Localizações ou Clientes.
            </Typography>
        </View>
    )
}