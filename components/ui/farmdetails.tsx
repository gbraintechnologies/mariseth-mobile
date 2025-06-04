import { colors } from "@/constants/colors";
import { width } from "@/constants/generalconstants";
import { icons } from "@/constants/icons";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "./apptext";
import InfoCard from "./infocard";

const FarmDetails = React.memo(() => {
  const farmDetails = {
    information: [
      {
        key: "Farm Name",
        value: "Sunset Farms",
      },
      {
        key: "Location",
        value: "GPS 7403-435",
      },
      {
        key: "District",
        value: "Sissala East",
      },
      {
        key: "Total Land Size",
        value: "3.5 acres",
      },
      {
        key: "Land Ownership",
        value: "Other (Renting)",
      },
      {
        key: "Livestock Kept",
        value: "N/A",
      },
    ],
  };
  const agriculturalDetails = {
    headerTitle: "Agricultural Practices",

    information: [
      {
        key: "Use of Fertilizers",
        value: "Organic",
      },
      {
        key: "Farming Methods",
        value: "Conventional",
      },
      {
        key: "Irrigation",
        value: "Yes",
      },
      {
        key: "Access to Market",
        value: "Yes",
      },
    ],
  };
  return (
    <View style={{ width, paddingHorizontal: 16 }}>
      <View style={styles.farmDetailsHeader}>
        <AppText fontFamily="SemiBold" fontSize={16} color="textBold">
          Farm Details
        </AppText>
        <Pressable style={styles.editButton}>
          <Image
            source={icons.edit}
            style={{ width: 13, height: 13, marginRight: 9 }}
          />
          <AppText fontFamily="Medium" fontSize={12} color="primary">
            Edit
          </AppText>
        </Pressable>
      </View>
      <InfoCard headerVisibility={false} info={farmDetails} />

      <InfoCard headerVisibility={true} info={agriculturalDetails} />
    </View>
  );
});

export default FarmDetails;

const styles = StyleSheet.create({
  farmDetailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: colors.secondaryLight,
  },
});
