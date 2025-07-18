import ActiveCreditCard from "@/components/ui/activecreditcard";
import CreditHistoryCard from "@/components/ui/credithistorycard";
import CustomList from "@/components/ui/customlist";
import ErrorComponent from "@/components/ui/errorcomponent";
import SectionHeader from "@/components/ui/sectionheader";
import CreditsSP from "@/components/ui/skeletonplaceholders/credits";
import { colors } from "@/constants/colors";
import { endpoints } from "@/constants/endpoints";
import { isIOS } from "@/constants/generalconstants";
import { usePaginatedInfiniteQuery } from "@/hooks/usefetchquery";
import React from "react";
import { StyleSheet, View } from "react-native";

const Credits = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    items,
    refetch,
    isRefetching,
    error,
  } = usePaginatedInfiniteQuery<any>(
    endpoints.creditHistory,
    "credit-history",
    {
      page_size: 10,
      query: "",
    }
  );

  if (error) {
    // console.log("CREDITS ERROR", error?.problem);

    return (
      <ErrorComponent
        type={(error as any)?.problem}
        refetch={() => refetch()}
      />
    );
  }
  if (isLoading) return <CreditsSP />;

  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}>
        <CustomList
          data={items}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: isIOS ? 100 : "10%",
          }}
          ListHeaderComponent={
            <>
              <ActiveCreditCard />
              <SectionHeader
                title="Credit Applications"
                btnIcon="refresh"
                btnTitle="Refresh"
                marginBottom={1}
                marginTop={30}
                titleColor="black"
                onPress={() => refetch()}
              />
            </>
          }
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          refetch={refetch}
          isRefetching={isRefetching}
          renderItem={({ item }: any) => <CreditHistoryCard item={item} />}
          type={"credits"}
        />
      </View>

      {/* <FloatingButton
        icon={icons.card}
        onPress={() => {
          console.log("card");
        }}
      /> */}
    </>
  );
};

export default Credits;

const styles = StyleSheet.create({});
