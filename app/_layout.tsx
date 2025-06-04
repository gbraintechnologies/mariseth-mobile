import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  SplashScreen.setOptions({
    fade: true,
    duration: 400,
  });
  const [loaded] = useFonts({
    Light: require("../assets/fonts/Inter-Light.ttf"),
    Regular: require("../assets/fonts/Inter-Regular.ttf"),
    Medium: require("../assets/fonts/Inter-Medium.ttf"),
    SemiBold: require("../assets/fonts/Inter-SemiBold.ttf"),
    Bold: require("../assets/fonts/Inter-Bold.ttf"),
  });
  React.useEffect(() => {
    if (loaded) {
      // setTimeout(() => {
      SplashScreen.hideAsync();
      // }, 3000);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <Stack>
      <Stack.Protected guard={false}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={true}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="more" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="myfarm" options={{ headerShown: false }} />
        <Stack.Screen name="myfarmers" options={{ headerShown: false }} />
        <Stack.Screen name="credits" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
