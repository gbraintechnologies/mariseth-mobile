import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "./apptext";

const ActiveCreditCard = () => {
  return (
    <View style={styles.activeCreditContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Image source={icons.arrowCorner} style={{ height: 30, width: 30 }} />
        <View style={{ flexDirection: "column", marginLeft: 12, flex: 1 }}>
          <AppText
            fontFamily="SemiBold"
            fontSize={14}
            color="textBold"
            style={{}}
          >
            Active Credits
          </AppText>

          <AppText fontFamily="Medium" fontSize={10} color="primary" style={{}}>
            due 15th June, 2025
          </AppText>
        </View>
        <TouchableOpacity
          style={{
            padding: 12,
            backgroundColor: colors.primary,
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={icons.money}
            style={{ width: 20, height: 20, marginRight: 8 }}
          />
          <AppText fontFamily="SemiBold" fontSize={12} color="white" style={{}}>
            Pay Credit
          </AppText>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.activeCreditBorder,
          marginBottom: 20,
        }}
      >
        <View style={{ flexDirection: "column", flex: 0.7 }}>
          <AppText
            fontFamily="Medium"
            fontSize={12}
            color="primary"
            style={{ marginBottom: 7 }}
          >
            Input Credit
          </AppText>
          <AppText fontFamily="SemiBold" fontSize={16} color="formLabelText">
            NPK Fertilizer
          </AppText>
        </View>
        <View style={{ flexDirection: "column" }}>
          <AppText
            fontFamily="Medium"
            fontSize={12}
            color="primary"
            style={{ marginBottom: 7 }}
          >
            Total amount
          </AppText>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <AppText
              fontFamily="Medium"
              fontSize={10}
              color="formLabelText"
              style={{ marginBottom: 2 }}
            >
              GHC
            </AppText>
            <AppText fontFamily="SemiBold" fontSize={16} color="formLabelText">
              1,250.00
            </AppText>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          paddingBottom: 20,
        }}
      >
        <View style={{ flexDirection: "column", flex: 0.7 }}>
          <AppText
            fontFamily="Medium"
            fontSize={12}
            color="primary"
            style={{ marginBottom: 7 }}
          >
            Number of Bags
          </AppText>
          <AppText fontFamily="SemiBold" fontSize={16} color="formLabelText">
            50
          </AppText>
        </View>
        <View style={{ flexDirection: "column" }}>
          <AppText
            fontFamily="Medium"
            fontSize={12}
            color="primary"
            style={{ marginBottom: 7 }}
          >
            Interest Rate
          </AppText>

          <AppText fontFamily="SemiBold" fontSize={16} color="formLabelText">
            8%
          </AppText>
        </View>
      </View>
      <View style={{ flexDirection: "column" }}>
        <AppText
          fontFamily="Medium"
          fontSize={12}
          color="primary"
          style={{ marginBottom: 7 }}
        >
          Extra Information/Notes
        </AppText>
        <AppText fontFamily="SemiBold" fontSize={15} color="formLabelText">
          Extra Information/Notes goes here
        </AppText>
      </View>
    </View>
  );
};

export default ActiveCreditCard;

const styles = StyleSheet.create({
  activeCreditContainer: {
    backgroundColor: colors.backgroundPrimary,
    paddingVertical: 16,
    paddingHorizontal: 15,
    boxShadow: "0px 4px 19px 0px rgba(63, 30, 87, 0.10)",
    marginTop: 32,
    borderRadius: 16,
  },
});
