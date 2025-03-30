import { Feather, Ionicons } from "@expo/vector-icons";

export interface IconProps {
    name: any;
    size?: number;
    from?: 'ionicons' | 'feather';
    color?: string;
    style?: any;
}

export const Icon = ({ from = 'feather', size = 24, ...props }: IconProps) => {
    const sourceIcon = {
        ionicons: Ionicons,
        feather: Feather
    }

    const IconComponent = sourceIcon[from];
    return (
        <IconComponent
            size={size}
            {...props}
        />
    )
}