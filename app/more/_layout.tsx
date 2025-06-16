import { headerHandler } from "@/utils/layoutmethods";
import { Stack } from "expo-router";
import React from "react";

export default function MoreLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="profileinformation"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="changepin" options={headerHandler("Change Pin")} />
      <Stack.Screen name="profileedit" options={{}} />
    </Stack>
  );
}
