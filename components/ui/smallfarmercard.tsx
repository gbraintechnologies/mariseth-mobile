import { colors } from "@/constants/colors";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "./apptext";
import InitialsAvatar from "./initialsavatar";
interface smallCardFarmer {
  item?: any;
}
const SmallFarmerCard: React.FC<smallCardFarmer> = ({ item }) => {
  return (
    <Pressable
      style={styles.smallFarmerCardContainer}
      onPress={() => {
        router.navigate("/myfarmers/farmerdetails");
      }}
    >
      <InitialsAvatar name={item?.name} />
      <View style={{ flexDirection: "column", flex: 1, marginLeft: 12 }}>
        <AppText
          fontFamily="SemiBold"
          fontSize={14}
          color="textBold"
          style={{ marginBottom: 6 }}
        >
          {item?.name}
        </AppText>

        <View style={{ flexDirection: "row" }}>
          <AppText
            fontFamily="Medium"
            fontSize={13}
            color="textPrimary"
            style={{}}
          >
            {item?.phone} .
          </AppText>

          <AppText fontFamily="Medium" fontSize={13} color="primary">
            {"" + item?.farm}
          </AppText>
        </View>
      </View>

      {item?.status === "New" && (
        <View style={styles.smallFarmerStatusContainer}>
          <AppText fontFamily="Medium" fontSize={10} color="primary">
            New
          </AppText>
        </View>
      )}
    </Pressable>
  );
};

export default SmallFarmerCard;

const styles = StyleSheet.create({
  smallFarmerCardContainer: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    alignItems: "center",
  },
  smallFarmerStatusContainer: {
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: "center",
  },
});
