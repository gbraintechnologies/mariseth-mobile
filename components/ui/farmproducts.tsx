import { colors } from "@/constants/colors";
import { width } from "@/constants/generalconstants";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./apptext";

const FarmProducts = () => {
  const crops = ["Soya Beans", "Cocoa", "Oil Palm", "Maize"];
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
        {crops.map((crop, index) => (
          <View style={styles.cropCard} key={index}>
            <AppText fontFamily="Medium" fontSize={13} color="textBold">
              {crop}
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
