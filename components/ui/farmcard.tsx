import { colors } from "@/constants/colors";
import { getColorForItem } from "@/utils/commonmethods";
import { differenceInDays, parseISO } from "date-fns";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./apptext";
interface farmCard {
  item?: any;
}
const FarmCard: React.FC<farmCard> = ({ item }) => {
  const dateCreated = item?.date_created;
  const isLessThanTwoWeeks =
    differenceInDays(new Date(), parseISO(dateCreated)) < 14;
  return (
    <View style={styles.farmCardContainer}>
      <View style={styles.farmCardInfoContainer}>
        <AppText
          fontFamily="SemiBold"
          fontSize={14}
          color="textBold"
          style={{ marginBottom: 6 }}
        >
          {`${item?.name}${
            item?.farmer?.first_name
              ? ` (${item.farmer.first_name} ${item.farmer.last_name ?? ""})`
              : ""
          }`}
        </AppText>

        <View style={{ flexDirection: "row" }}>
          <AppText
            fontFamily="Medium"
            fontSize={13}
            color="textPrimary"
            style={{}}
          >
            {"GPS " + item?.location} .
          </AppText>

          <AppText fontFamily="Medium" fontSize={13} color="primary">
            {`${item?.region?.name ?? ""}`}
          </AppText>
        </View>
        <View style={styles.farmCropsContainer}>
          {item?.crops &&
            item?.crops.slice(0, 2).map((item: any, index: number) => {
              const { bgColor, textColor } = getColorForItem(item.product.name);
              return (
                <View
                  key={index}
                  style={[
                    styles.farmCropContainer,
                    { backgroundColor: bgColor },
                  ]}
                >
                  <AppText
                    fontFamily="SemiBold"
                    fontSize={10}
                    style={{ color: textColor }}
                  >
                    {item?.product?.name}
                  </AppText>
                </View>
              );
            })}

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

      {isLessThanTwoWeeks && (
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
