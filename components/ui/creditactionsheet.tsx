import { colors } from "@/constants/colors";
import { statusTypes } from "@/constants/generalconstants";
import { icons } from "@/constants/icons";
import { dueDateFormat } from "@/utils/commonmethods";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";
import AppText from "./apptext";
import CustomActionsheet from "./customactionsheet";
interface creditActionSheetProps {
  sheetRef: React.RefObject<ActionSheetRef | null>;
  item?: any;
}
const CreditActionSheet: React.FC<creditActionSheetProps> = ({
  sheetRef,
  item,
}) => {
  const creditInfo = [
    {
      key: "Input Credit",
      value: item?.input_credit ?? "N/A",
    },
    {
      key: "Total amount",
      value: `GH₵ ${item?.credit_amount ?? "N/A"}`,
    },
    {
      key: "Issue Date",
      value: dueDateFormat(item?.issue_date) || "N/A",
    },
    {
      key: "Due Date",
      value: dueDateFormat(item?.due_date) || "N/A",
    },
    {
      key: "Quantity",
      value: `${item?.quantity} ${item?.quantity_metric_name}` || "N/A",
    },
    {
      key: "Interest Rate",
      value: `${item?.interest_rate}%` || "N/A",
    },
    {
      key: "Extra Notes",
      value: item?.notes || "N/A",
    },
  ];

  const dueDate = dueDateFormat(item?.due_date);
  return (
    <CustomActionsheet actionSheetRef={sheetRef}>
      <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        <View style={styles.creditHeaderContainer}>
          <Image
            source={icons.arrowCorner}
            style={{
              height: 24,
              width: 24,
              tintColor: colors[statusTypes[item?.approval_status]?.textColor],
            }}
            contentFit="contain"
          />
          <View style={{ flexDirection: "column", marginLeft: 12 }}>
            <AppText
              fontSize={14}
              color="textBold"
              fontFamily="SemiBold"
              style={{ marginBottom: 4 }}
            >
              {`${statusTypes[item?.approval_status]?.text ?? ""} Credit`}
            </AppText>
            <AppText
              fontSize={10}
              color={statusTypes[item?.approval_status]?.textColor}
              fontFamily="Medium"
              style={{ marginBottom: 6 }}
            >
              {`due - ${dueDate}`}
            </AppText>
          </View>
        </View>
        <View style={styles.creditInfoContainer}>
          {creditInfo?.map((item, index) => {
            const lastIndex = index === creditInfo?.length - 1;
            return (
              <View
                style={[
                  styles.creditInfo,
                  {
                    paddingVertical: lastIndex ? 0 : 10,
                    ...(lastIndex && { paddingTop: 10 }),
                  },
                ]}
                key={item?.key}
              >
                <AppText
                  fontFamily="Medium"
                  fontSize={12}
                  color="formLabelText"
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
            );
          })}
        </View>
      </View>
    </CustomActionsheet>
  );
};

export default CreditActionSheet;

const styles = StyleSheet.create({
  creditHeaderContainer: {
    padding: 12,
    borderRadius: 18,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 21,
  },
  creditInfoContainer: {
    paddingVertical: 19,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    borderRadius: 18,
  },
  creditInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
