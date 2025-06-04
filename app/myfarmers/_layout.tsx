import { headerHandler } from "@/utils/layoutmethods";
import { Stack } from "expo-router";
import React from "react";

export default function MyFarmersLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="farmerdetails"
        options={{
          ...headerHandler("Abena Bonsu"),
        }}
      />
    </Stack>
  );
}
