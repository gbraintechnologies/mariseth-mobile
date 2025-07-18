import AppText from "@/components/ui/apptext";
import FarmerCard from "@/components/ui/farmercard";
import HomeActiveCreditCard from "@/components/ui/homeactivecreditcard";
import QuickActionButton from "@/components/ui/quickactionbutton";
import WeatherCard from "@/components/ui/weathercard";
import { colors } from "@/constants/colors";
import { endpoints } from "@/constants/endpoints";
import { isIOS } from "@/constants/generalconstants";
import { usePaginatedInfiniteQuery } from "@/hooks/usefetchquery";
import { userStore } from "@/stores/userstore";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
const Index = () => {
  const user = userStore((state) => state.user);
  const isLeaderFarmer = user?.farmer?.type === "lead";

  const { data, isLoading, isError } = usePaginatedInfiniteQuery<any>(
    endpoints.myFarmers,
    "smallholders",
    {
      page_size: 10,
      query: "",
    }
  );
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}
      contentContainerStyle={{ paddingBottom: isIOS ? "30%" : "20%" }}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <WeatherCard />
        <View style={{}}>
          <AppText fontFamily="SemiBold" fontSize={16} color="black">
            Quick Actions
          </AppText>
          <View style={styles.quickActionsContainer}>
            <QuickActionButton
              type="credit"
              width={isLeaderFarmer ? "48%" : "100%"}
            />
            {isLeaderFarmer ? <QuickActionButton type="farmer" /> : null}
          </View>
        </View>
      </View>
      {isLeaderFarmer ? (
        <FarmerCard
          type="big"
          onPress={() => router.navigate("/myfarmers")}
          isLoading={isLoading}
          count={isError ? "..." : data?.pages?.[0]?.pagination?.total ?? 0}
        />
      ) : null}

      <HomeActiveCreditCard />
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
});
