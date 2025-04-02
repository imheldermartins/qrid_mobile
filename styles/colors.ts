import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../tailwind.config';

export type STATIC_COLORS = 'red' | 'blue' | 'green' | 'yellow' | 'pink' | 'purple';

export const checkIsHex = (color: string): boolean => /^#[0-9A-F]{6}$/i.test(color || '');

const fullConfig = resolveConfig(tailwindConfig);

export const colors = {
    ...fullConfig.theme.colors,
    light: {
        glass: "rgba(247, 247, 247, 0.3)",
        100: "#F7F7F7",
        200: "#F0F0F0",
        300: "#D7D7D7",
        400: "#D0D0D0",
        500: "#C7C7C7",
        600: "#C0C0C0",
        700: "#B7B7B7",
        800: "#B0B0B0",
        900: "#A7A7A7",
    },
    dark: {
        glass: "rgba(32, 32, 32, 0.3)",
        100: "#606060",
        200: "#575757",
        300: "#505050",
        400: "#474747",
        500: "#404040",
        600: "#373737",
        700: "#303030",
        800: "#272727",
        900: "#202020",
    }
};

export const staticPallete = {
    red: colors.red[600],
    blue: colors.blue[600],
    green: colors.green[600],
    yellow: colors.yellow[600],
    pink: colors.pink[600],
    purple: colors.purple[600],
};