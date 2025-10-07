import { colors } from "@/constants/colors";
import { endpoints } from "@/constants/endpoints";
import { icons } from "@/constants/icons";
import { useFetchQuery } from "@/hooks/usefetchquery";
import { userStore } from "@/stores/userstore";
import { dueDateFormat } from "@/utils/commonmethods";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "./apptext";

const HomeActiveCreditCard = () => {
  const user = userStore((state) => state.user);
  const isLeaderFarmer = user?.farmer?.type === "lead";
  const { data, isLoading, error } = useFetchQuery(
    endpoints.activeCredit,
    "activecredit"
  );

  // console.log("ERROR", data);
  if (error?.status === 404) {
    return null;
  }
  if (isLoading) {
    return (
      <View
        style={{ paddingHorizontal: 16, marginTop: isLeaderFarmer ? 0 : 32 }}
      >
        <View
          style={{
            backgroundColor: colors.skeletonPlaceholder,
            height: 125,
            borderRadius: 16,
          }}
        />
      </View>
    );
  }

  if (data) {
    const dueDate = dueDateFormat(data?.due_date);

    // console.log("Active Credit", data);

    return (
      <View
        style={{ paddingHorizontal: 16, marginTop: isLeaderFarmer ? 0 : 32 }}
      >
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
                {`due ${dueDate}`}
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
              onPress={() => router.navigate("/credits")}
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
                {data?.input_credits ?? "N/A"}
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
                  GH₵
                </AppText>
                <AppText
                  fontFamily="SemiBold"
                  fontSize={16}
                  color="formLabelText"
                >
                  {` ${data?.credit_amount}`}
                </AppText>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

export default HomeActiveCreditCard;

const styles = StyleSheet.create({
  activeCreditContainer: {
    backgroundColor: colors.backgroundPrimary,
    paddingVertical: 16,
    paddingHorizontal: 15,
    boxShadow: "0px 4px 19px 0px rgba(63, 30, 87, 0.10)",
    borderRadius: 16,
  },
});
