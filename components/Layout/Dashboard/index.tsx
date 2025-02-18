import { ScrollView, StyleSheet, View } from "react-native"
// import { LinearGradient, } from 'expo-linear-gradient';
import { DashboardHeader } from "./Header";
// import { colors } from "@/styles/colors";

interface DashboardLayoutProps {
    children: React.ReactNode
};

// export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
//     return (
//         <View className="flex-1">
//             <LinearGradient
//                 colors={[colors.light[100], colors.purple[100], colors.blue[200]]}
//                 start={[0, 0]}
//                 end={[1, 1]}
//                 locations={[0.1, 0.5, 0.9]}
//                 style={styles.background}
//             >
//                 <DashboardHeader />
//                 <ScrollView
//                     showsVerticalScrollIndicator={false}
//                     className="w-11/12 mx-auto"
//                     contentContainerClassName="pb-6"
//                 >
//                     {children}
//                 </ScrollView>
//             </LinearGradient>
//         </View>
//     )
// }
export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <View className="flex-1 bg-light-100">
            <DashboardHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="w-11/12 mx-auto"
                contentContainerClassName="pb-6"
            >
                {children}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%'
    }
});