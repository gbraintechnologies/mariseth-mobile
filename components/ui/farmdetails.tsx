import { width } from "@/constants/generalconstants";
import { userStore } from "@/stores/userstore";
import { myFarm } from "@/types/farm";
import { dataEncoder } from "@/utils/commonmethods";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import InfoCard from "./infocard";
import SectionHeader from "./sectionheader";
interface farmDetailsProps {
  item: myFarm;
}
const FarmDetails: React.FC<farmDetailsProps> = React.memo(({ item }) => {
  const user = userStore((state) => state.user);
  const isLeaderFarmer = user?.farmer?.type === "lead";
  const farmingMethods = Array.isArray(item?.farming_methods)
    ? item?.farming_methods?.map((method: any) => method).join(", ") ?? "N/A"
    : "N/A";

  const liveStock =
    item?.livestock.length > 0
      ? item?.livestock?.map((item: any) => item.product?.name).join(", ")
      : "N/A";

  // console.log('FARMING METHODS',farmingMethods);

  // const liveStock =
  //   item?.products.length > 0
  //     ? item?.products
  //         ?.filter((item: any) => item.product?.type === "livestock")
  //         ?.map((item: any) => item.product?.name)
  //         .join(", ")
  //     : "N/A";

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
        value: item?.district?.name ?? "N/A",
      },
      {
        key: "Total Land Size",
        value: `${item?.size ?? "N/A"} ${item?.size_metric?.name ?? ""} `,
      },
      {
        key: "Land Ownership",
        value: item?.land_ownership ?? "N/A",
      },
      {
        key: "Livestock Kept",
        value: liveStock as any,
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
      <SectionHeader
        title="Farms"
        btnIcon="edit"
        btnTitle="Edit"
        titleColor="textBold"
        {...(isLeaderFarmer
          ? {
              onPress: () =>
                router.navigate(
                  `/myfarm/editfarmdetails?data=${dataEncoder(item)}`
                ),
            }
          : {})}
      />
      <InfoCard headerVisibility={false} info={farmDetails} />

      <InfoCard headerVisibility={true} info={agriculturalDetails} />
    </View>
  );
});

export default FarmDetails;

const styles = StyleSheet.create({});
