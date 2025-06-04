import { width } from "@/constants/generalconstants";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./apptext";
import FarmCard from "./farmcard";

const Farms = () => {
  const farms = [
    {
      name: "Sunset Farms",
      owner: "Abena Bonsu",
      gps: "7403-435",
      region: "Ashanti Region",
      crops: [
        { name: "Soya Beans", bgColor: "#FFFBEB", textColor: "#D97706" },
        { name: "Cocoa", bgColor: "#EFF6FF", textColor: "#2563EB" },

        { name: "Soya Beans", bgColor: "#FFFBEB", textColor: "#D97706" },
        { name: "Cocoa", bgColor: "#EFF6FF", textColor: "#2563EB" },
        { name: "Soya Beans", bgColor: "#FFFBEB", textColor: "#D97706" },
        { name: "Cocoa", bgColor: "#EFF6FF", textColor: "#2563EB" },
      ],
      status: "New",
    },
    {
      name: "Starlight Acres",
      owner: "Gifty Adom",
      gps: "7403-435",
      region: "Ashanti Region",
      crops: [
        { name: "Oil Palm", bgColor: "#FEF2F2", textColor: "#DC2626" },
        { name: "Maize", bgColor: "#F0FDF4", textColor: "#16A34A" },
      ],
      status: "New",
    },
    {
      name: "Sunrise Fields",
      owner: "Comfort Adomako",
      gps: "5821-789",
      region: "Ashanti Region",
      crops: [{ name: "Shea Nuts", bgColor: "#F5F3FF", textColor: "#7C3AED" }],
    },
    {
      name: "Twilight Grove",
      owner: "Matilda Coffie",
      gps: "9347-215",
      region: "Greater Accra Region",
      crops: [
        { name: "Maize", bgColor: "#F0FDF4", textColor: "#16A34A" },
        { name: "Soya Beans", bgColor: "#FFFBEB", textColor: "#D97706" },
      ],
    },
    {
      name: "Harvest Hill",
      owner: "Stacy Ofori",
      gps: "1764-902",
      region: "Western Region",
      crops: [{ name: "Maize", bgColor: "#F0FDF4", textColor: "#16A34A" }],
    },
    {
      name: "Green Valley",
      owner: "Kwame Nkrumah",
      gps: "3485-631",
      region: "Northern Region",
      crops: [
        { name: "Cashew Nuts", bgColor: "#FFF7ED", textColor: "#F97316" },
        { name: "Rice", bgColor: "#ECFEFF", textColor: "#0891B2" },
      ],
    },
    {
      name: "Meadow View",
      owner: "Akosua Agyemang",
      gps: "2198-457",
      region: "Eastern Region",
      crops: [{ name: "Soya Beans", bgColor: "#FFFBEB", textColor: "#D97706" }],
    },
  ];
  return (
    <View style={{ width: width, paddingHorizontal: 16 }}>
      <AppText
        fontFamily="SemiBold"
        fontSize={16}
        color="primary"
        style={{ marginBottom: 7 }}
      >
        Farms
      </AppText>

      {farms.map((item, index) => (
        <FarmCard item={item} key={index} />
      ))}
    </View>
  );
};

export default Farms;

const styles = StyleSheet.create({});
