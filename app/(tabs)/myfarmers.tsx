import ErrorComponent from "@/components/ui/errorcomponent";
import FarmerCard from "@/components/ui/farmercard";
import Farms from "@/components/ui/farms";
import FloatingButton from "@/components/ui/floatingbutton";
import { SegmentedScrollView } from "@/components/ui/segmentedview";
import MyFarmersSP from "@/components/ui/skeletonplaceholders/myfarmers";
import SmallFarmers from "@/components/ui/smallfarmers";
import { colors } from "@/constants/colors";
import { endpoints } from "@/constants/endpoints";
import { isIOS } from "@/constants/generalconstants";
import { icons } from "@/constants/icons";
import { usePaginatedInfiniteQuery } from "@/hooks/usefetchquery";
import { useUniversalStore } from "@/stores/useuniversalstore";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const MyFarmers = () => {
  const selectedOption = useUniversalStore(
    (state) => state.selectedSegmentedOption.myFarmers
  );
  const options = {
    Farmers: {
      icon: icons.userAdd,
      action: () => {
        router.navigate(`/myfarmers/addfarmer?data=""`);
      },
    },
    Farms: {
      icon: icons.location,
      action: () => {
        router.navigate(`/myfarmers/addfarm?data=""`);
      },
    },
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    items,
    refetch,
    isRefetching,
    error,
  } = usePaginatedInfiniteQuery<any>(endpoints.myFarmers, "smallholders", {
    page_size: 10,
    query: "",
  });

  // console.log(JSON.stringify(items));

  if (isLoading) return <MyFarmersSP />;

  if (error) {
    return (
      <ErrorComponent
        type={(error as any)?.problem}
        refetch={() => refetch()}
      />
    );
  }
  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}
        contentContainerStyle={{ paddingBottom: isIOS ? "30%" : "20%" }}
      >
        <FarmerCard
          type="big"
          item={items}
          count={data?.pages?.[0]?.pagination?.total ?? 0}
        />

        <SegmentedScrollView
          storeKey="myFarmers"
          options={["Farmers", "Farms"]}
        >
          <SmallFarmers
            data={items}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            refetch={refetch}
            isRefetching={isRefetching}
          />
          <Farms />
        </SegmentedScrollView>
      </ScrollView>

      <FloatingButton
        icon={options[selectedOption]?.icon}
        onPress={options[selectedOption]?.action}
      />
    </>
  );
};

export default MyFarmers;

const styles = StyleSheet.create({});
