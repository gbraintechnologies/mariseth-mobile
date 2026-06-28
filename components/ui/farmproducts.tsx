import { width } from "@/constants/generalconstants";
import { userStore } from "@/stores/userstore";
import { myFarm } from "@/types/farm";
import { dataEncoder } from "@/utils/commonmethods";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import FarmProduct from "./farmproduct";
import ListEmptyComponent from "./listemptycomponent";
import SectionHeader from "./sectionheader";

interface farmProductsProps {
  products: myFarm;
}

const FarmProducts: React.FC<farmProductsProps> = ({ products }) => {
  const user = userStore((state) => state.user);
  const isLeaderFarmer = user?.farmer?.type === "lead";

  const handleEdit = () => {
    if (!products) return;
    router.navigate(
      `/myfarm/editfarmdetails?data=${dataEncoder(products)}`
    );
  };

  if (!products) {
    return (
      <View style={{ width, paddingHorizontal: 16 }}>
        <ListEmptyComponent type="crops" variant="inline" />
      </View>
    );
  }

  const crops = products?.crops ?? [];
  const livestock = products?.livestock ?? [];

  return (
    <View style={{ width, paddingHorizontal: 16 }}>
      <SectionHeader
        title="Crops"
        btnIcon="edit"
        btnTitle="Edit"
        titleColor="black"
        dualEdit={isLeaderFarmer}
        editVariant="muted"
        {...(isLeaderFarmer ? { onPress: handleEdit } : {})}
      />
      {crops.length > 0 ? (
        <FarmProduct products={crops} type="crop" showTitle={false} />
      ) : (
        <ListEmptyComponent
          type="crops"
          variant="inline"
          {...(isLeaderFarmer ? { onPress: handleEdit } : {})}
        />
      )}
      {livestock.length > 0 ? (
        <>
          <SectionHeader title="Livestock" titleColor="black" marginTop={12} />
          <FarmProduct products={livestock} type="livestock" showTitle={false} />
        </>
      ) : null}
    </View>
  );
};

export default FarmProducts;
