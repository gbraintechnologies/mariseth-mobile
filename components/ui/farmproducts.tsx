import { width } from "@/constants/generalconstants";
import { myFarm } from "@/types/farm";
import React from "react";
import { View } from "react-native";
import FarmProduct from "./farmproduct";
import ListEmptyComponent from "./listemptycomponent";
interface farmProductsProps {
  // products: farmProduct[];
  products: myFarm;
}

const FarmProducts: React.FC<farmProductsProps> = ({ products }) => {
  if (!products)
    return (
      <View style={{ width, paddingHorizontal: 16 }}>
        <ListEmptyComponent type="crops" />
      </View>
    );
  const crops = products?.crops;
  const livestock = products?.livestock;
  // const livestock =
  //   products &&
  //   products?.filter((product) => product?.product.type === "livestock");
  // const crops =
  //   products && products?.filter((product) => product?.product.type === "crop");
  return (
    <View style={{ width, paddingHorizontal: 16 }}>
      {crops.length > 0 && <FarmProduct products={crops} type="crop" />}
      {livestock.length > 0 && (
        <FarmProduct products={livestock} type="livestock" />
      )}
    </View>
  );
};

export default FarmProducts;
