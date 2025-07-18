import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppButton from "./appbutton";
import AppText from "./apptext";

const ListEmptyComponent = ({
  type,
}: {
  type: "farmers" | "crops" | "farms" | "credits" | "new_farmer";
}) => {
  const types = {
    farmers: {
      title: "No farmers here yet",
      subtitle:
        "There is nothing to view right now. Click the button below to add a farmer and it to show up here.",
      btnTitle: "",
      btnAction: null,
    },
    crops: {
      title: "No crops here yet",
      subtitle:
        "There is nothing to view right now. Add some crops and it to show up here.",
      btnTitle: "Edit Farm Details",
      btnAction: () => router.navigate(`/myfarm/editfarmdetails`),
    },
    farms: {
      title: "No farms here yet",
      subtitle:
        "There is nothing to view right now. Click the button below to add a new farm and it to show up here.",
      btnTitle: "",
      btnAction: null,
    },
    credits: {
      title: "No Information to show yet",
      subtitle:
        "There is nothing to view right now. Apply for credit and it to show up here.",
      btnTitle: "Apply for Credit",
      btnAction: () => router.navigate(`/credits/applycredit`),
    },

    new_farmer: {
      title: "No farms yet",
      subtitle:
        "To add a new farmer, you need to create a farm first. Tap the button below to get started.",
      btnTitle: "Create New Farm",
      btnAction: () => router.navigate(`/myfarmers/addfarm`),
    },
  };
  return (
    <View style={styles.listEmptyContainer}>
      <AppText
        color="formLabelText"
        fontFamily="Medium"
        fontSize={15}
        style={{ marginBottom: 12, textAlign: "center" }}
      >
        {types[type].title}
      </AppText>

      <AppText
        color="formInputText"
        fontFamily="Medium"
        fontSize={14}
        style={{ textAlign: "center" }}
      >
        {types[type].subtitle}
      </AppText>

      {types[type].btnTitle && (
        <AppButton
          title={types[type].btnTitle}
          textColor="white"
          style={{ marginTop: 36 }}
          btnColor="buttonPrimary"
          width={"50%"}
          height={43}
          onPress={() => types[type].btnAction?.()}
        />
      )}
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  listEmptyContainer: {
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "20%",
  },
});
