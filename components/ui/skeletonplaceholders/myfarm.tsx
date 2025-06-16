import { colors } from "@/constants/colors";
import { skeletonStyles } from "@/styles/skeletonplaceholder";
import React from "react";
import { StyleSheet, View } from "react-native";

const MyFarmSP = () => {
  return (
    <View style={styles.myFarmSPContainer}>
      <View style={styles.myFarmSPImage} />
      <View style={skeletonStyles.segmentedControl} />
      <View style={skeletonStyles.rowContainer}>
        <View style={skeletonStyles.titleText} />
        <View style={skeletonStyles.editBtn} />
      </View>
      <View style={skeletonStyles.farmInfoCard} />
      <View style={skeletonStyles.farmAgricInfoCard} />
    </View>
  );
};

export default MyFarmSP;

const styles = StyleSheet.create({
  myFarmSPContainer: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: 16,
  },
  myFarmSPImage: {
    marginVertical: 32,
    height: 175,
    width: "100%",
    borderRadius: 20,
    backgroundColor: colors.skeletonPlaceholder,
  },
});
