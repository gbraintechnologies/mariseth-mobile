import { colors } from "@/constants/colors";
import { endpoints } from "@/constants/endpoints";
import { icons } from "@/constants/icons";
import { useFetchQuery } from "@/hooks/usefetchquery";
import { dueDateFormat } from "@/utils/commonmethods";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./apptext";

const ActiveCreditCard = () => {
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
        style={{
          backgroundColor: colors.skeletonPlaceholder,
          height: 305,
          borderRadius: 16,
          width: "100%",
        }}
      />
    );
  }
  if (data) {
    const dueDate = dueDateFormat(data?.due_date);
    return (
      <View style={styles.activeCreditContainer}>
        <View style={styles.activeCreditHeaderContainer}>
          <Image source={icons.arrowCorner} style={{ height: 30, width: 30 }} />
          <View style={styles.activeCreditHeaderTextContainer}>
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
          {/* <TouchableOpacity style={styles.payCreditButton}>
            <Image
              source={icons.money}
              style={{ width: 20, height: 20, marginRight: 8 }}
            />
            <AppText
              fontFamily="SemiBold"
              fontSize={12}
              color="white"
              style={{}}
            >
              Pay Credit
            </AppText>
          </TouchableOpacity> */}
        </View>
        <View style={styles.inputCreditContainer}>
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
              {data?.input_credits}
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
                {data?.credit_amount}
              </AppText>
            </View>
          </View>
        </View>

        <View style={styles.interestRateContainer}>
          <View style={{ flexDirection: "column", flex: 0.7 }}>
            <AppText
              fontFamily="Medium"
              fontSize={12}
              color="primary"
              style={{ marginBottom: 7 }}
            >
              Quantity
            </AppText>
            <AppText fontFamily="SemiBold" fontSize={16} color="formLabelText">
              {`${data?.quantity} ${data?.quantity_metric_name}`}
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
              {`${data?.interest_rate}%`}
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
            {data?.notes ?? "N/A"}
          </AppText>
        </View>
      </View>
    );
  }
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
  activeCreditHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  activeCreditHeaderTextContainer: {
    flexDirection: "column",
    marginLeft: 12,
    flex: 1,
  },

  payCreditButton: {
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  inputCreditContainer: {
    flexDirection: "row",
    width: "100%",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.activeCreditBorder,
    marginBottom: 20,
  },
  interestRateContainer: {
    flexDirection: "row",
    width: "100%",
    paddingBottom: 20,
  },
});
