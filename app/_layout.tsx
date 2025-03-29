import { useEffect } from "react";
import {
  useFonts,
} from "@expo-google-fonts/inter";
import { Slot } from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import "@/styles/global.css";
import { StatusBar } from "expo-status-bar";
import { Provider } from "@/contexts/Provider";
import { ProtectedLayout } from "@/components/Layout";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_Light: require("@assets/fonts/Inter/Inter_Light.ttf"),
    Inter_Regular: require("@assets/fonts/Inter/Inter_Regular.ttf"),
    Inter_Medium: require("@assets/fonts/Inter/Inter_Medium.ttf"),
    Inter_SemiBold: require("@assets/fonts/Inter/Inter_SemiBold.ttf"),
    Inter_Bold: require("@assets/fonts/Inter/Inter_Bold.ttf"),
    Inter_ExtraBold: require("@assets/fonts/Inter/Inter_ExtraBold.ttf"),
    Inter_Black: require("@assets/fonts/Inter/Inter_Black.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Provider>
        <ProtectedLayout>
          <Slot />
        </ProtectedLayout>
      </Provider>

      <StatusBar style="dark" />
    </>
  )
}
