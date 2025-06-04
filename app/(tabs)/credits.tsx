import ActiveCreditCard from "@/components/ui/activecreditcard";
import AppText from "@/components/ui/apptext";
import CreditHistoryCard from "@/components/ui/credithistorycard";
import FloatingButton from "@/components/ui/floatingbutton";
import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Credits = () => {
  const creditHistory = [
    {
      item: "Hybrid Maize Seeds",
      code: "C-11023",
      amount: "800.00",
      currency: "Ghc",
      status: "Paid",
    },
    {
      item: "Fertilizer",
      code: "C-11023",
      amount: "800.00",
      currency: "Ghc",
      status: "Paid",
    },
    {
      item: "Soya Beans Seeds",
      code: "C-11023",
      amount: "800.00",
      currency: "Ghc",
      status: "Paid",
    },
    {
      item: "Agro-Chemical",
      code: "C-11023",
      amount: "800.00",
      currency: "Ghc",
      status: "Paid",
    },
    {
      item: "Fertilizer",
      code: "C-11023",
      amount: "800.00",
      currency: "Ghc",
      status: "Paid",
    },
  ];
  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: "10%" }}
      >
        <ActiveCreditCard />

        <View style={{ marginTop: 30 }}>
          <AppText fontFamily="SemiBold" fontSize={16} color="black" style={{}}>
            Credit History
          </AppText>
        </View>
        {creditHistory.map((history, index) => (
          <CreditHistoryCard item={history} key={index} />
        ))}
      </ScrollView>

      <FloatingButton
        icon={icons.card}
        onPress={() => {
          console.log("card");
        }}
      />
    </>
  );
};

export default Credits;

const styles = StyleSheet.create({});
