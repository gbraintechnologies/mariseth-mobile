import AppText from "@/components/ui/apptext";
import ErrorComponent from "@/components/ui/errorcomponent";
import FarmDetails from "@/components/ui/farmdetails";
import FarmProducts from "@/components/ui/farmproducts";
import { SegmentedScrollView } from "@/components/ui/segmentedview";
import MyFarmSP from "@/components/ui/skeletonplaceholders/myfarm";
import { colors } from "@/constants/colors";
import { endpoints } from "@/constants/endpoints";
import { isIOS, universalBlurhash } from "@/constants/generalconstants";
import { images } from "@/constants/images";
import { useFetchQuery } from "@/hooks/usefetchquery";
import { userStore } from "@/stores/userstore";
import { myFarm } from "@/types/farm";
import { useQueryClient } from "@tanstack/react-query";
import { ImageBackground } from "expo-image";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useStore } from "zustand";

const MyFarm = () => {
  const user = useStore(userStore, (state) => state.user);
  const {
    data,
    isLoading,
    error,
  }: { data: myFarm; isLoading: boolean; error: unknown } = useFetchQuery(
    endpoints.myFarm,
    "myfarm"
  );
  const queryClient = useQueryClient();
  if (isLoading) return <MyFarmSP />;
  if (error) {
    return (
      <ErrorComponent
        type={(error as any)?.problem}
        message={(error as any)?.message?.detail}
        refetch={() => queryClient.invalidateQueries({ queryKey: ["myfarm"] })}
      />
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}
      contentContainerStyle={{ paddingBottom: isIOS ? "30%" : "20%" }}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <ImageBackground
          source={images.myFarm}
          style={styles.farmImage}
          imageStyle={{ borderRadius: 20 }}
          placeholder={{ blurhash: universalBlurhash }}
          contentFit="cover"
          priority={"high"}
          transition={500}
        >
          <View style={{ paddingLeft: 25, paddingBottom: 22 }}>
            <AppText fontFamily="Bold" fontSize={20} color="white">
              {data?.name}
            </AppText>
            <AppText fontFamily="SemiBold" fontSize={16} color="white">
              {user?.farmer?.farmer_id} · {data?.location} · {data?.farm_id}
            </AppText>
          </View>
        </ImageBackground>
      </View>

      <SegmentedScrollView
        storeKey="myFarm"
        options={["Farm Details", "Farm Products"]}
      >
        <FarmDetails item={data} />
        <FarmProducts products={data} />
      </SegmentedScrollView>
    </ScrollView>
  );
};

export default MyFarm;

const styles = StyleSheet.create({
  farmImage: {
    height: 175,
    width: "100%",
    borderRadius: 30,
    marginVertical: 32,
    justifyContent: "flex-end",
  },
});
