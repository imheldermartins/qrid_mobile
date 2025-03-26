import { Feather, Ionicons } from "@expo/vector-icons";
import clsx from "clsx";

export interface IconProps {
    name: any;
    size?: number;
    from?: 'ionicons' | 'feather';
    color?: string;
    className?: string;
}

export const Icon = ({ from = 'feather', size = 24, className, ...props }: IconProps) => {
    const sourceIcon = {
        ionicons: Ionicons,
        feather: Feather
    }

    const IconComponent = sourceIcon[from];
    return (
        <IconComponent
            size={size}
            className={clsx(className)}
            {...props}
        />
    )
}