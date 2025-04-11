import { LogBox, ScrollView, StyleSheet, View } from "react-native";
import { DashboardHeader } from "./Header";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { dashboardStyles } from "./styles";

interface DashboardLayoutProps {
    children: React.ReactNode
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const {
        user: {
            first_name,
            last_name
        }
    } = useAuth();

    const user = {
        name: `${first_name} ${last_name}`,
        avatar: ''
    };

    const business = null;

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    return (
        <View style={dashboardStyles.container}>
            <DashboardHeader user={user} business={business} />
            <ScrollView
                style={dashboardStyles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
        </View>
    )
}

// const busyUrl = "https://instagram.fbnu4-1.fna.fbcdn.net/v/t51.2885-19/469835722_1565401127477908_6088566037585042234_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fbnu4-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2AGl0FSJHEtM1FgdEpQby5jRFboUYD6azXm8-u9tU7nTUUiTXiE9nyAO7HsqyBUvJmR7GMGiwskhe0g-KlAfGMXN&_nc_ohc=8ur1LXtqE78Q7kNvgG4nZ3X&_nc_gid=iviVbaWkOo8k2xIcAm0rWA&edm=AEYEu-QBAAAA&ccb=7-5&oh=00_AYF2y38xbq_fLqth_eGIcXjewb1rj8gSiinz8XDpIhmXDw&oe=67DABFB2&_nc_sid=ead929";
// const userUrl = "https://instagram.fbnu4-1.fna.fbcdn.net/v/t51.2885-15/470675515_18041734310241281_7303680870657253904_n.webp?efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmY3NTc2MS5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fbnu4-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2AE6uaHf94KdOpCmxoBASTGZiyFCtU0_Ei_iLbdB2leNCXZXJK0wWzCMvN9WBAbjH8rcmBGQ5CdvGYtvhi32fCOV&_nc_ohc=xuCxLiW5OBMQ7kNvgHkOL2C&_nc_gid=vB0Ph6nMOSTY2Fh56aHduQ&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzUyNDU1MTM3NTgyNjMyNzE4NQ%3D%3D.3-ccb7-5&oh=00_AYFmWaO1moTqRS6d49EydteHFKTRNwrvZfw5SPeHKAyJrQ&oe=67DAB378&_nc_sid=7a9f4b";