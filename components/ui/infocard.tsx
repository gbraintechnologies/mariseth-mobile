import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "./apptext";
interface infoCard {
  headerVisibility?: boolean;
  info: {
    headerTitle?: string;
    headerIcon?: any;
    onEditPress?: () => void;
    information: Array<{ key: string; value: string }>;
  };
}
const InfoCard: React.FC<infoCard> = ({ info, headerVisibility = true }) => {
  return (
    <View style={styles.infoCardContainer}>
      {headerVisibility && (
        <View style={styles.infoCardHeaderContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {info?.headerIcon && (
              <Image
                source={info?.headerIcon}
                style={{ width: 24, height: 24, marginRight: 12 }}
              />
            )}
            <AppText fontFamily="SemiBold" fontSize={16} color="textBold">
              {info?.headerTitle}
            </AppText>
          </View>
          {info.headerIcon && (
            <Pressable
              style={styles.editButton}
              onPress={() => info.onEditPress?.()}
            >
              <Image
                source={icons.edit}
                style={{ width: 13, height: 13, marginRight: 9 }}
              />
              <AppText fontFamily="Medium" fontSize={12} color="primary">
                Edit
              </AppText>
            </Pressable>
          )}
        </View>
      )}

      {info?.information.map((item, index) => (
        <View style={styles.info} key={item?.key}>
          <AppText
            fontFamily="Medium"
            fontSize={12}
            color="primary"
            style={{ width: "49%" }}
          >
            {item?.key}
          </AppText>
          <View
            style={{
              alignItems: "flex-end",
              width: "49%",
            }}
          >
            <AppText
              fontFamily="Medium"
              fontSize={13}
              color="textBold"
              style={{ textAlign: "right" }}
            >
              {item?.value}
            </AppText>
          </View>
        </View>
      ))}
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  infoCardContainer: {
    padding: 15,
    backgroundColor: colors.backgroundPrimary,
    marginBottom: 18,
    borderRadius: 18,
    boxShadow: "0px 4px 19px 0px rgba(63, 30, 87, 0.10)",
    width: "100%",
  },
  infoCardHeaderContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: colors.secondaryLight,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    // marginBottom: 6,
    borderBottomWidth: 1,
    borderColor: colors.light,
  },
});
