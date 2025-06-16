import { colors } from "@/constants/colors";
import { width } from "@/constants/generalconstants";
import { farmProduct } from "@/types/farm";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./apptext";
interface farmProductsProps {
  products: farmProduct[];
}
const FarmProducts: React.FC<farmProductsProps> = ({ products }) => {
  return (
    <View style={{ width, paddingHorizontal: 16 }}>
      <AppText
        fontFamily="SemiBold"
        fontSize={16}
        color="textBold"
        style={{ marginBottom: 12 }}
      >
        Crops
      </AppText>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {products.map((crop, index: number) => (
          <View style={styles.cropCard} key={crop?.id}>
            <AppText fontFamily="Medium" fontSize={13} color="textBold">
              {crop?.product?.name}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
};

export default FarmProducts;

const styles = StyleSheet.create({
  cropCard: {
    backgroundColor: colors.backgroundPrimary,
    marginBottom: 12,
    borderRadius: 12,
    boxShadow: "0px 4px 19px 0px rgba(63, 30, 87, 0.10)",
    width: "48%",
    paddingVertical: 13,
    paddingLeft: 31,
  },
});
