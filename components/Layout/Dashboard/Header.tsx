import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { colors } from "@/styles/colors";
import { Typography } from '../../ui/Typography/index';
import { useBottomSheet } from "@/contexts/ui/BottomSheet";
import { MoreActions } from "./MoreActions";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/Avatar";
import { router } from "expo-router";
import { headerStyles } from "./styles";

type Account = {
    name: string;
    avatar: string;
};

interface DashboardHeaderProps {
    user: Account;
    business: Account | null;
};

export const DashboardHeader = ({ user, business }: DashboardHeaderProps) => {
    const { expand, snapTo } = useBottomSheet();

    const handleQuickTransaction = () => {
        expand(<MoreActions />)
        snapTo(2);
    };

    const handleNavigateToProfile = () => router.push('/(tabs)/profile');

    return (
        <View style={headerStyles.container}>
            <TouchableOpacity
                onPress={handleNavigateToProfile}
                style={StyleSheet.flatten([
                    headerStyles.avatarContainer,
                    !!business ? { gap: 12 } : { gap: 9 }
                ])}
            >
                {!!business ? (
                    <View style={headerStyles.picContainer}>
                        <Avatar
                            size={50}
                            source={business.avatar}
                            label={business.name || ''}
                            isActive
                        />
                        <Avatar
                            size={40}
                            source={user.avatar}
                            label={user.name}
                            style={headerStyles.subPic}
                        />
                    </View>
                ) : (
                    <Avatar
                        size={50}
                        source={user.avatar}
                        label={user.name}
                        isActive
                    />
                )}
                <View>
                    <Typography s="lg" f="semiBold">
                        Olá, {user.name}!
                    </Typography>
                    {business && <Typography s="sm" style={headerStyles.businessName}>
                        {business.name}
                    </Typography>}
                </View>
            </TouchableOpacity>
            <Button
                style={headerStyles.button}
                onPress={handleQuickTransaction}
            >
                <Ionicons name="apps" size={32} color={colors.light[700]} />
            </Button>
        </View>
    )
}