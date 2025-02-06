import { useAuth } from '@/contexts/AuthContext';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { api } from '../../utils/api';
import { useEffect } from 'react';
import clsx from 'clsx';
import { Button } from '../../components/Button';

async function getUser() {
    const response = await api.get('/user');
    return response.data;
}

export default function HomeScreen() {
    const { user, setUser, logout } = useAuth();

    useEffect(() => {
        getUser().then((user) => {
            if (user) {
                setUser(user);
            }
        });
    }, []);

    return (
        <>
            <Stack.Screen name="home" />
            <View className='flex-1 justify-center items-center gap-2'>
                <Text className='text-lg'>Saldo Atual: <Text className={clsx("font-semibold", {
                    "text-red-400": user?.balance < 0,
                    "text-green-400": user?.balance >= 0,
                    "text-gray-400": user?.balance === 0
                })}>R$ {user.balance}</Text></Text>
                <Text className='text-4xl font-medium'>Olá <Text className='text-green-500 font-semibold'>{user.name}</Text>!</Text>

                <Button className="bg-red-500 w-[200px] mt-6" onPress={logout}>
                    <Text className="font-semibold text-xl text-white text-center">Sair</Text>
                </Button>
            </View>
        </>
    )
}