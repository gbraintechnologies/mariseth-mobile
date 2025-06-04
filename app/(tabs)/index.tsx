import AppText from "@/components/ui/apptext";
import FarmerCard from "@/components/ui/farmercard";
import WeatherCard from "@/components/ui/weathercard";
import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { Image } from "expo-image";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
const Index = () => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}
      contentContainerStyle={{ paddingBottom: "10%" }}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <WeatherCard />
        <View style={{}}>
          <AppText fontFamily="SemiBold" fontSize={16} color="black">
            Quick Actions
          </AppText>
          <View style={styles.quickActionsContainer}>
            <Pressable style={styles.quickActionButton}>
              <Image
                source={icons.phone}
                style={{ height: 24, width: 24, marginRight: 12 }}
              />

              <AppText fontFamily="SemiBold" fontSize={13} color="textBold">
                Apply for Credit
              </AppText>
            </Pressable>
            <Pressable style={styles.quickActionButton}>
              <Image
                source={icons.bill}
                style={{ height: 24, width: 24, marginRight: 12 }}
              />
              <AppText fontFamily="SemiBold" fontSize={13} color="textBold">
                Add New Farmer
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>
      <FarmerCard type="big" onPress={() => console.log("pressed")} />
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.activeCreditContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Image
              source={icons.arrowCorner}
              style={{ height: 30, width: 30 }}
            />
            <View style={{ flexDirection: "column", marginLeft: 12, flex: 1 }}>
              <AppText
                fontFamily="SemiBold"
                fontSize={14}
                color="textBold"
                style={{}}
              >
                Active Credits
              </AppText>

              <AppText
                fontFamily="Medium"
                fontSize={10}
                color="primary"
                style={{}}
              >
                due 15th June, 2025
              </AppText>
            </View>
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 7,
                backgroundColor: colors.secondaryLight,
                borderRadius: 40,
                alignItems: "center",
              }}
            >
              <AppText fontFamily="SemiBold" fontSize={12} color="primary">
                View
              </AppText>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
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
              <AppText
                fontFamily="SemiBold"
                fontSize={16}
                color="formLabelText"
              >
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
                <AppText
                  fontFamily="SemiBold"
                  fontSize={16}
                  color="formLabelText"
                >
                  1,250.00
                </AppText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  quickActionsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 13,
  },
  quickActionButton: {
    flexDirection: "row",
    width: "48%",
    alignItems: "center",
    paddingVertical: 13,
    boxShadow: "0px 4px 19px 0px rgba(63, 30, 87, 0.10);",
    borderRadius: 12,
    paddingLeft: 13,
    backgroundColor: colors.backgroundPrimary,
  },
  activeCreditContainer: {
    backgroundColor: colors.backgroundPrimary,
    paddingVertical: 16,
    paddingHorizontal: 15,
    boxShadow: "0px 4px 19px 0px rgba(63, 30, 87, 0.10)",
    borderRadius: 16,
  },
});
