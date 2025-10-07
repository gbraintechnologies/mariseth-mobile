import { colors } from "@/constants/colors";
import { statusTypes } from "@/constants/generalconstants";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";
import AppText from "./apptext";
import CreditActionSheet from "./creditactionsheet";
interface creditHistoryCard {
  item?: any;
}

const CreditHistoryCard: React.FC<creditHistoryCard> = ({ item }) => {
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const sheetRef = React.useRef<ActionSheetRef>(null);
  const handlePress = () => {
    setSelectedItem(item);
    sheetRef.current?.show();
  };
  return (
    <>
      <CreditActionSheet sheetRef={sheetRef} item={selectedItem} />
      <Pressable
        style={styles.creditHistoryCardContainer}
        onPress={handlePress}
      >
        <View style={{ flexDirection: "column", flex: 1 }}>
          <AppText
            fontFamily="SemiBold"
            fontSize={15}
            color="textBold"
            style={{ marginBottom: 10 }}
          >
            {item?.input_credit}
          </AppText>
          <View style={{ flexDirection: "row" }}>
            <AppText
              fontFamily="Medium"
              fontSize={13}
              color="textPrimary"
              style={{}}
            >
              {item?.credit_id} .
            </AppText>

            <AppText fontFamily="Medium" fontSize={13} color="primary">
              {` GH₵ ${item?.credit_amount}`}
            </AppText>
          </View>
        </View>
        <View
          style={[
            styles.creditHistoryStatusContainer,
            {
              backgroundColor: statusTypes[item?.approval_status]?.bgColor,
            },
          ]}
        >
          <AppText
            fontFamily="Medium"
            fontSize={10}
            color={statusTypes[item?.approval_status]?.textColor}
          >
            {statusTypes[item?.approval_status]?.text}
          </AppText>
        </View>
      </Pressable>
    </>
  );
};

export default CreditHistoryCard;

const styles = StyleSheet.create({
  creditHistoryCardContainer: {
    paddingVertical: 16,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    flexDirection: "row",
    alignItems: "center",
  },
  creditHistoryStatusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: "center",
  },

  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
