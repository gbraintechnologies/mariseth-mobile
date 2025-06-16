import { colors } from "@/constants/colors";
import { width } from "@/constants/generalconstants";
import { icons } from "@/constants/icons";
import { myFarm } from "@/types/farm";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "./apptext";
import InfoCard from "./infocard";
interface farmDetailsProps {
  item: myFarm;
}
const FarmDetails: React.FC<farmDetailsProps> = React.memo(({ item }) => {
  const farmingMethods =
    item?.farming_methods?.map((method: any) => method).join(", ") ?? "N/A";
  const farmDetails = {
    information: [
      {
        key: "Farm Name",
        value: item?.name ?? "N/A",
      },
      {
        key: "Location",
        value: item?.location ?? "N/A",
      },
      {
        key: "District",
        value: item?.district ?? "N/A",
      },
      {
        key: "Total Land Size",
        value: item?.size ?? "N/A",
      },
      {
        key: "Land Ownership",
        value: item?.land_ownership ?? "N/A",
      },
      {
        key: "Livestock Kept",
        value: (item?.livestock_kept as any) ?? "N/A",
      },
    ],
  };
  const agriculturalDetails = {
    headerTitle: "Agricultural Practices",

    information: [
      {
        key: "Use of Fertilizers",
        value: item?.use_of_fertilizers ?? "N/A",
      },
      {
        key: "Farming Methods",
        value: farmingMethods,
      },
      {
        key: "Irrigation",
        value: (item?.irrigation ? "Yes" : "No") as any,
      },
      {
        key: "Access to Market",
        value: (item?.has_access_to_market ? "Yes" : "No") as any,
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
