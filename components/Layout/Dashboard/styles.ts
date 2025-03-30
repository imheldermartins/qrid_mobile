import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const headerStyles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 32,
        paddingVertical: 16,
        paddingHorizontal: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatarContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    businessName: {
        color: colors.green[600]
    },
    button: {
        backgroundColor: colors.light[100],
    },
    subPic: {
        borderRadius: 10,
        position: 'absolute',
        right: -15,
        bottom: -15
    },
    picContainer: {
        position: 'relative'
    }
});

export const dashboardStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light[100],
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingVertical: 24
    }

});

export const moreActionsStyles = StyleSheet.create({
    container: { flex: 1 },
    title: {
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 24,
    },
    detached: {
        color: colors.green[500],
    },
    buttonContainer: { 
        flex: 1,
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: colors.light[100],
        width: 60,
        height: 60,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.light[300],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});