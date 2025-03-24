import { View } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
    const {
        user,
        logout
    } = useAuth();
    return (
        <View className="flex-1 flex flex-col justify-end">
            <Typography variant='h1'>
                Olá, {user?.first_name}
            </Typography>

            <Button title='Logout' className='bg-red-600' onPress={logout} />
        </View>
    )
}