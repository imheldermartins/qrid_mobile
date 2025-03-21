import { View } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
    const { logout } = useAuth();
    return (
        <View className="flex-1 flex flex-col justify-end">
            <Typography variant='overline'>
                MyProfile
            </Typography>

            <Button title='Logout' className='bg-red-600' onPress={logout} />
        </View>
    )
}