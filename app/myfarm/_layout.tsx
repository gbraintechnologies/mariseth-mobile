import { headerHandler } from "@/utils/layoutmethods";
import { Stack } from "expo-router";
import React from "react";

export default function myFarmLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="editfarmdetails"
        options={headerHandler("Edit Farm Details")}
      />
    </Stack>
  );
}
