import { colors } from "@/styles/colors";
import { Image, ImageStyle } from "expo-image";
import { StyleSheet, StyleProp, View } from "react-native";

interface AvatarProps {
    source: string;
    style?: StyleProp<ImageStyle>;
    subPic?: Omit<Partial<AvatarProps>, 'sub'>;
};

export const Avatar = ({ source, style, subPic }: AvatarProps) => !subPic ? (
    <Image
        style={{
            ...styles.image,
            ...(style as ImageStyle)
        }}
        source={source}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
    />
) : (
    <View className="relative">
        <Image
            source={source}
            style={styles.image}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
        />
        <Image
            source={subPic.source}
            style={styles.subPic}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
        />
    </View>
);

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderColor: colors.green[500],
        borderWidth: 2
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