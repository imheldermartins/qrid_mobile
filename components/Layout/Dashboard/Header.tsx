import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { colors } from "@/styles/colors";
import { Typography } from '../../ui/Typography/index';
import clsx from "clsx";
import { useBottomSheet } from "@/contexts/ui/BottomSheet";
import { MoreActions } from "./MoreActions";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/Avatar";
import { router } from "expo-router";

interface DashboardHeaderProps {
    user: {
        name: string;
        avatar: string;
    }
    bussiness?: {
        name: string;
        logo: string;
    }
};

export const DashboardHeader = ({ user, bussiness }: DashboardHeaderProps) => {
    const { expand, snapTo } = useBottomSheet();

    const handleQuickTransaction = () => {
        expand(<MoreActions />)
        snapTo(2);
    };

    const handleNavigateToProfile = () => router.push('/(tabs)/profile');

    const hasBusiness = Object.keys(bussiness ?? {}).length > 0;

    return (
        <View className="w-full mt-12 py-4">
            <View className="w-11/12 mx-auto flex flex-row items-center justify-between">
                <TouchableOpacity onPress={handleNavigateToProfile}
                    className={clsx("h-[60px] max-h-[60px] rounded-lg flex flex-row items-center", {
                        "gap-3": !hasBusiness,
                        "gap-6": hasBusiness
                    })}
                >
                    {hasBusiness ? (
                        <View className="relative">
                            <Avatar
                                size={50}
                                source={bussiness?.logo}
                                label={bussiness?.name || ''}
                                isActive
                            />
                            <Avatar
                                size={40}
                                source={user.avatar}
                                label={user.name}
                                style={styles.subPic}
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
                        <Typography variant="h3">
                            Olá {user.name}!
                        </Typography>
                        {hasBusiness && <Typography variant="h6" className="text-green-500">
                            {bussiness?.name}
                        </Typography>}
                    </View>
                </TouchableOpacity>
                <Button
                    className="!px-0 !py-0 !bg-transparent w-[60px] h-[60px] rounded-lg flex !items-center !justify-center"
                    onPress={handleQuickTransaction}
                >
                    <Ionicons name="apps" size={32} color={colors.light[700]} />
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    subPic: {
        borderRadius: 10,
        position: 'absolute',
        right: -15,
        bottom: -15
    }
});