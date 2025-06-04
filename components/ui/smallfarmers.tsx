import { width } from "@/constants/generalconstants";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./apptext";
import SmallFarmerCard from "./smallfarmercard";

const SmallFarmers = () => {
  const smallFarmers = [
    {
      name: "Abena Bonsu",
      phone: "+233 24 555 0124",
      farm: "Sunset Farms",
      status: "New",
    },
    {
      name: "Gifty Adom",
      phone: "+233 55 123 7890",
      farm: "Starlight Acres",
      status: "New",
    },
    {
      name: "Comfort Adomako",
      phone: "+233 56 234 8901",
      farm: "Sunrise Fields",
      status: "New",
    },
    {
      name: "Matilda Coffie",
      phone: "+233 57 345 9012",
      farm: "Twilight Grove",
      status: "New",
    },
    {
      name: "Stacy Ofori",
      phone: "+233 58 456 0123",
      farm: "Harvest Hill",
    },
    {
      name: "Kwame Nkrumah",
      phone: "+233 59 567 1234",
      farm: "Green Valley",
    },
    {
      name: "Akosua Agyemang",
      phone: "+233 60 678 2345",
      farm: "Meadow View",
    },
    {
      name: "Kofi Appiah",
      phone: "+233 61 789 3456",
      farm: "Riverbend Estates",
    },
    {
      name: "Ama Serwaa",
      phone: "+233 62 890 4567",
      farm: "Lakeside Retreat",
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
        Smallholder Farmers
      </AppText>
      {smallFarmers.map((item, index) => (
        <SmallFarmerCard item={item} key={index} />
      ))}
    </View>
  );
};

export default SmallFarmers;

const styles = StyleSheet.create({});
