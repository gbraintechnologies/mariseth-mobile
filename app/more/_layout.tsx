import { Stack } from "expo-router";
import React from "react";

export default function MoreLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="profileinformation"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="changepassword" options={{ headerShown: false }} />
      <Stack.Screen name="profileedit" options={{}} />
    </Stack>
  );
}
