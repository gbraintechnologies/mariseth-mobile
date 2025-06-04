import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./apptext";
interface creditHistoryCard {
  item?: any;
}
const CreditHistoryCard: React.FC<creditHistoryCard> = ({ item }) => {
  return (
    <View style={styles.creditHistoryCardContainer}>
      <View style={{ flexDirection: "column", flex: 1 }}>
        <AppText
          fontFamily="SemiBold"
          fontSize={15}
          color="textBold"
          style={{ marginBottom: 10 }}
        >
          {item?.item}
        </AppText>
        <View style={{ flexDirection: "row" }}>
          <AppText
            fontFamily="Medium"
            fontSize={13}
            color="textPrimary"
            style={{}}
          >
            {item?.code} .
          </AppText>

          <AppText fontFamily="Medium" fontSize={13} color="primary">
            {`${item?.currency} ${item?.amount}`}
          </AppText>
        </View>
      </View>
      <View style={styles.creditHistoryStatusContainer}>
        <AppText fontFamily="Medium" fontSize={10} color="primary">
          {item?.status}
        </AppText>
      </View>
    </View>
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
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: "center",
  },
});
