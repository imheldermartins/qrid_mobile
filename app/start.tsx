import { Typography } from '@/components/ui/Typography';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function StartScreen() {
    return (
        <>
            <View className='flex-1 justify-center items-center bg-emerald-400'>
                <View className='flex w-4/5'>
                    <Typography variant='h3' className='font-medium text-center text-emerald-100'>Criado por <Typography variant='h3' className='font-bold text-light-100'>Helder Martins</Typography></Typography>
                    <Typography variant='h1' className='text-left mt-6 text-light-100'>Aplicativo de Gerenciamento de Finanças</Typography>
                </View>
                <Link href="/sign-in" className='w-2/3 bg-light-100 p-6 rounded-xl mt-14'>
                    <Typography variant='button' className='text-center text-emerald-400'>Começar</Typography>
                </Link>

                <Typography variant='body1' className='text-left mt-6 text-emerald-50'>QR.id © {new Date().getFullYear()}</Typography>
            </View>

            <StatusBar style="light" />
        </>
    );
}
