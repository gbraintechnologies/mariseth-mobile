import { tabbarScreenOptions, tabScreenOptions } from "@/utils/layoutmethods";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  const isLeaderFarmer = true;

  return (
    <Tabs initialRouteName="index" screenOptions={tabbarScreenOptions()}>
      <Tabs.Screen name="index" options={tabScreenOptions("Home")} />
      <Tabs.Screen name="credits" options={tabScreenOptions("Credits")} />
      <Tabs.Screen name="myfarm" options={tabScreenOptions("My Farm")} />
      <Tabs.Screen
        name="myfarmers"
        options={{
          ...tabScreenOptions("My Farmers"),
          ...(isLeaderFarmer ? {} : { href: null }),
        }}
      />
      <Tabs.Screen name="more" options={tabScreenOptions("More")} />
    </Tabs>
  );
}
