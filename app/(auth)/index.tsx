import { useAuth } from '@/contexts/AuthContext';
import { View, Text } from 'react-native';

export default function Home() {
    const { user } = useAuth();
    return (
        <View className='flex-1 justify-center items-center gap-2'>
            <Text className='text-4xl font-medium'>Olá <Text className='text-green-500 font-semibold'>{user?.name}</Text>!</Text>
        </View>
    )
}