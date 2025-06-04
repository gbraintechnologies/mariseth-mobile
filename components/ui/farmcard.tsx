import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./apptext";
interface farmCard {
  item?: any;
}
const FarmCard: React.FC<farmCard> = ({ item }) => {
  return (
    <View style={styles.farmCardContainer}>
      <View style={styles.farmCardInfoContainer}>
        <AppText
          fontFamily="SemiBold"
          fontSize={14}
          color="textBold"
          style={{ marginBottom: 6 }}
        >
          {`${item?.name} (${item?.owner})`}
        </AppText>

        <View style={{ flexDirection: "row" }}>
          <AppText
            fontFamily="Medium"
            fontSize={13}
            color="textPrimary"
            style={{}}
          >
            {"GPS " + item?.gps} .
          </AppText>

          <AppText fontFamily="Medium" fontSize={13} color="primary">
            {`${item?.region}`}
          </AppText>
        </View>
        <View style={styles.farmCropsContainer}>
          {item?.crops.slice(0, 2).map((item: any, index: number) => (
            <View
              key={index}
              style={[
                styles.farmCropContainer,
                { backgroundColor: item?.bgColor },
              ]}
            >
              <AppText
                fontFamily="SemiBold"
                fontSize={10}
                style={{ color: item?.textColor }}
              >
                {item?.name}
              </AppText>
            </View>
          ))}

          {item?.crops?.length > 3 && (
            <View
              style={[
                styles.farmCropContainer,
                { backgroundColor: colors.light },
              ]}
            >
              <AppText fontFamily="SemiBold" fontSize={10} color="textPrimary">
                +{item?.crops?.length - 2} more
              </AppText>
            </View>
          )}
        </View>
      </View>

      {item?.status === "New" && (
        <View style={styles.farmCardStatusContainer}>
          <AppText fontFamily="Medium" fontSize={10} color="primary">
            New
          </AppText>
        </View>
      )}
    </View>
  );
};

export default FarmCard;

const styles = StyleSheet.create({
  farmCardContainer: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    alignItems: "center",
  },
  farmCardInfoContainer: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 12,
  },
  farmCropContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  farmCropsContainer: {
    flexDirection: "row",
    gap: 5,
    marginTop: 5,
    flexWrap: "wrap",
  },
  farmCardStatusContainer: {
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: "center",
  },
});
