import { Feather, Ionicons } from "@expo/vector-icons";

export interface IconProps {
    name: any;
    size: number;
    from?: 'ionicons' | 'feather';
    color?: string;
}

export const Icon = ({ from = 'feather', ...props }: IconProps) => {
    const sourceIcon = {
        ionicons: Ionicons,
        feather: Feather
    }

    const IconComponent = sourceIcon[from];
    return <IconComponent {...props} />
}