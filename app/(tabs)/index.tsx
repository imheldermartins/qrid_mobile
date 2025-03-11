import { useAuth } from '@/contexts/AuthContext';
import { View, Text, FlatList } from 'react-native';
import { api } from '../../utils/api';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { HeaderBalance } from '@/components/HeaderBalance';
import { useBottomSheet } from '@/contexts/ui/BottomSheet';
import { Feather } from '@expo/vector-icons';
import { Typography } from '../../components/ui/Typography/index';
import { jsonFormatter } from '@/utils/jsonFormatter';

async function getUser() {
    const { data } = await api.get('user/');
    return jsonFormatter(data);
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
            <View className='flex flex-col gap-3 items-center'>
                <HeaderBalance
                    username={user.firstName}
                    balance={user.balance}
                    businessName={"Barbearia do John Doe"}
                />

                <Button title='Logout' className='bg-red-500' onPress={logout} />

                {/* <View className='bg-light-200 w-full rounded-lg border border-light-300 px-3 py-2'>
                    <View>
                        <Typography variant='h4'>Últimos Lançamentos</Typography>
                        <View>
                            <Typography variant='h4'>Últimos Lançamentos</Typography>
                        </View>
                    </View>
                </View> */}

                {Array.from({ length: 10 }).map((_, index) => (
                    <Text key={index} className='px-6 py-3 rounded-lg bg-green-900 w-full min-h-[80px] text-green-200 font-bold text-2xl align-middle'>Hello World - {index + 1}</Text>
                ))}
            </View>
        </>
    )
}