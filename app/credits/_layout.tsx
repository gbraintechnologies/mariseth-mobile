import { headerHandler } from "@/utils/layoutmethods";
import { Stack } from "expo-router";
import React from "react";

export default function CreditsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="applycredit"
        options={headerHandler("Apply Credit")}
      />
    </Stack>
  );
}
