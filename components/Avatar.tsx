import { colors } from "@/styles/colors";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import {
    Avatar as A,
    AvatarTextProps
} from "react-native-paper";

type AvatarProps =
    AvatarTextProps &
    {
        isActive?: boolean;
        source?: string;
    };

export const Avatar = ({ source, label, size = 24, isActive = false, style }: AvatarProps) => {
    const labelFormatted =
        (String(label).length > 2 ?
            label.split(' ')
                .slice(0, 2)
                .map((word) => word[0])
                .join('') : label);

    return source ? (
        <View style={{
            ...(isActive ? styles.avatarContainer : {}),
            ...style as {}
        }}>
            <Image
                style={{
                    ...styles.avatar,
                    height: size,
                    width: size,
                }}
                source={source}
                transition={1000}
                placeholder={{ blurhash }}
            />
        </View>
    ) : (
        <View style={{
            ...(isActive ? styles.avatarContainer : {}),
            ...style as {}
        }}>
            <A.Text
                style={styles.avatar}
                label={labelFormatted}
                labelStyle={{
                    fontSize: size / 3,
                    height: size,
                    width: size,
                }}
                size={size}
                color={colors.light[100]}
                theme={{
                    colors: {
                        text: colors.light[100],
                        primary: colors.green[500]
                    }
                }}

            />
        </View>

    );
}

const styles = StyleSheet.create({
    avatarContainer: {
        borderWidth: 2,
        borderColor: colors.green[400],
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.light[100],
    }
});

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
