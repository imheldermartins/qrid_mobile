import { Image, ImageStyle } from "expo-image";
import { StyleProp, StyleSheet, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { colors } from "@/styles/colors";
import { Typography } from '../../ui/Typography/index';
import clsx from "clsx";
import { useBottomSheet } from "@/contexts/ui/BottomSheet";
import { QuickActions } from "./QuickActions";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/Avatar";


const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

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
        expand(<QuickActions />)
        snapTo(2);
    };
    return (
        <View className="w-full mt-12 py-4">
            <View className="w-11/12 mx-auto flex flex-row items-center justify-between">
                <View className={clsx("h-[60px] max-h-[60px] rounded-lg flex flex-row items-center", {
                    "gap-3": !bussiness?.logo,
                    "gap-6": !!bussiness?.logo
                })}>
                    <Avatar
                        source={user.avatar}
                        subPic={{ source: bussiness?.logo }}
                    />
                    <View>
                        <Typography variant="h3">
                            Olá, {user.name}!
                        </Typography>
                        <Typography variant="h6" className="text-emerald-400">
                            {bussiness?.name}
                        </Typography>
                    </View>
                </View>
                <Button
                    className="!px-0 !py-0 bg-transparent w-[60px] h-[60px] rounded-lg flex !items-center !justify-center"
                    onPress={handleQuickTransaction}
                >
                    <Feather name="grid" size={32} color={colors.light[700]} />
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        borderRadius: 50
        // borderColor: colors.green[500],
        // borderWidth: 2
    },
    subPic: {
        width: 40,
        height: 40,
        borderRadius: 50,
        position: 'absolute',
        right: -10,
        bottom: -10,
        borderColor: colors.light[100],
        borderWidth: 3
    }
});