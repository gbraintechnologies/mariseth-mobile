import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "./apptext";
interface farmerCard {
  type: "small" | "big";
  item?: any;
  onPress?: () => void;
}
const FarmerCard: React.FC<farmerCard> = ({ type = "big", item, onPress }) => {
  const cardTypes = {
    small: {
      title: "Abena Bonsu",
      phone: "+233 24 555 0124",
      count: "",
      subtitle: "Smallholder Farmer",
      abstractImage: images.otherLooper,
      abtractStyle: styles.otherLooper,
    },
    big: {
      title: "My Smallholder Farmers",
      count: "25",
      phone: "",
      subtitle: "Farmers",
      abstractImage: images.looper,
      abtractStyle: styles.looper,
    },
  };
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View style={styles.farmerCardContainer}>
        <Image
          source={cardTypes[type]?.abstractImage}
          style={cardTypes[type]?.abtractStyle}
        />
        <View style={styles.farmerCardTitleContainer}>
          <Image
            source={icons.farmer}
            style={{ width: 24, height: 24, marginRight: 12 }}
          />
          <AppText
            fontFamily="SemiBold"
            fontSize={13}
            color="textBold"
            style={{ flex: 1 }}
          >
            {cardTypes[type]?.title}
          </AppText>
          {onPress && (
            <Pressable style={styles.viewAllButton} onPress={onPress}>
              <AppText fontFamily="SemiBold" fontSize={10} color="primary">
                View All
              </AppText>
            </Pressable>
          )}
        </View>
        <View style={styles.farmerCardCountContainer}>
          {type === "big" && (
            <AppText
              fontFamily="SemiBold"
              fontSize={25}
              color="textBold"
              style={{ marginRight: 12 }}
            >
              {cardTypes[type]?.count}
            </AppText>
          )}

          <AppText fontFamily="SemiBold" fontSize={12} color="primary">
            {cardTypes[type]?.subtitle}
          </AppText>

          {type !== "big" && (
            <AppText fontFamily="SemiBold" fontSize={12} color="textPrimary">
              {` . ${cardTypes[type]?.phone}`}
            </AppText>
          )}
        </View>
      </View>
    </View>
  );
};

export default FarmerCard;

const styles = StyleSheet.create({
  farmerCardContainer: {
    backgroundColor: colors.backgroundPrimary,
    boxShadow: "0px 4px 19px 0px rgba(63, 30, 87, 0.10)",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 32,
    borderRadius: 16,
    flexDirection: "column",
    overflow: "hidden",
  },
  farmerCardTitleContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 22,
    alignItems: "center",
  },
  farmerCardCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    overflow: "hidden",
  },
  looper: {
    width: 180,
    height: "100%",
    position: "absolute",
    right: 0,
    bottom: 0,
  },

  otherLooper: {
    width: 225 / 2.1,
    height: 190 / 2.15,
    position: "absolute",
    right: 0,
    top: 0,
  },
  viewAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 50,
    backgroundColor: colors.secondaryLight,
  },
});
