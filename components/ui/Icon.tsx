import { STATIC_COLORS, staticPallete } from "@/styles/colors";
import { Feather, Ionicons } from "@expo/vector-icons";

export interface IconProps {
    name: any;
    size?: number;
    from?: 'ionicons' | 'feather';
    color?: STATIC_COLORS | string | undefined;
    style?: any;
}

export const Icon = ({
    name,
    from = 'feather',
    size = 24,
    color,
    ...props
}: IconProps) => {

    from = name.includes(':') ? name.split(':')[0] : from;
    name = name.includes(':') ? name.split(':')[1] : name;

    const sourceIcon = {
        ionicons: Ionicons,
        feather: Feather
    }

    const isHex = /^#[0-9A-F]{6}$/i.test(color || '');

    const IconComponent = sourceIcon[from];
    return (
        <IconComponent
            name={name}
            size={size}
            color={!isHex && color ? staticPallete[color as STATIC_COLORS] : color}
            {...props}
        />
    )
}