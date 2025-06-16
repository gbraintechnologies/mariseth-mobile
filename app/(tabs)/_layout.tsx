import { isIOS } from "@/constants/generalconstants";
import { userStore } from "@/stores/userstore";
import { tabbarScreenOptions, tabScreenOptions } from "@/utils/layoutmethods";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { useStore } from "zustand";
const handleTabPress = async () => {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};
export default function TabsLayout() {
  const user = useStore(userStore, (state) => state.user);
  const isLeaderFarmer = user?.farmer?.type === "lead";

  function listener() {
    return {
      tabPress: async (e: any) => {
        await handleTabPress();
        e.preventDefault();
      },
    };
  }

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        ...tabbarScreenOptions(),
        animation: "none",
        // tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: {},
        }),
        ...(isIOS
          ? {
              tabBarBackground: () =>
                isIOS && (
                  <BlurView
                    tint="systemChromeMaterial"
                    intensity={60}
                    style={StyleSheet.absoluteFill}
                  />
                ),
            }
          : {}),
      }}
    >
      <Tabs.Screen
        name="index"
        options={tabScreenOptions("Home")}
        listeners={listener()}
      />
      <Tabs.Screen
        name="credits"
        options={tabScreenOptions("Credits")}
        listeners={listener()}
      />
      <Tabs.Screen
        name="myfarm"
        options={tabScreenOptions("My Farm")}
        listeners={listener()}
      />
      <Tabs.Screen
        name="myfarmers"
        options={{
          ...tabScreenOptions("My Farmers"),
          ...(isLeaderFarmer ? {} : { href: null }),
        }}
        listeners={listener()}
      />
      <Tabs.Screen
        name="more"
        options={tabScreenOptions("More")}
        listeners={listener()}
      />
    </Tabs>
  );
}
