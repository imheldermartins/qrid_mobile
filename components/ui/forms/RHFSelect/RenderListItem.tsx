import { View, StyleSheet, TouchableHighlight } from "react-native";
import { RenderListItemPropsInterface } from "react-native-dropdown-picker";

import { colors } from "@/styles/colors";

import { Typography } from "@/components/ui/Typography";
import { renderListItemStyle as styles } from "./style";


type RenderListItemProps = RenderListItemPropsInterface<any> & {
    item:
    RenderListItemPropsInterface<any>['item'] & {
        color?: string;
    };
};

export const RenderListItem = (props: RenderListItemProps) => {
    const {
        item: {
            label,
            icon = () => null,
            color = colors.dark[100]
        },
        ...others
    } = props;

    return (
        <TouchableHighlight onPress={() => props.onPress(props)}>
            <View
                style={StyleSheet.flatten([
                    styles.container,
                    { backgroundColor: others.isSelected ? color : colors.light[100] },
                ])}
            >
                {icon && icon()}
                <Typography variant='caption' style={{ color }}>
                    {label}
                </Typography>
            </View>
        </TouchableHighlight>
    )
};