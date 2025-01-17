import { useAuth } from '@/contexts/SessionContext';
import { View, Text } from 'react-native';

export default function Home() {
    const { user } = useAuth();
    return (
        <View>
            <Text>Home</Text>
            <Text>Hello {user?.name}!</Text>
        </View>
    )
}