import { endpoints } from "@/constants/endpoints";
import { width } from "@/constants/generalconstants";
import { usePaginatedInfiniteQuery } from "@/hooks/usefetchquery";
import React from "react";
import { StyleSheet, View } from "react-native";
import CustomList from "./customlist";
import FarmCard from "./farmcard";
import SectionHeader from "./sectionheader";

const Farms = () => {
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
    endpoints.leadFarmersFarms,
    "leadfarmersfarms",
    {
      page_size: 10,
      query: "",
    }
  );

  // console.log(JSON.stringify(items));

  // if (isLoading) return <ActivityIndicator />;
  // if (isError) return <Text>Error loading farms.</Text>;

  return (
    <View style={{ width: width, paddingHorizontal: 16 }}>
      <SectionHeader
        title="Farms"
        btnIcon="refresh"
        btnTitle="Refresh"
        marginBottom={0}
        onPress={() => refetch()}
      />

      {/* <FlashList
        data={farms}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={1}
        estimatedListSize={{ height, width }}
        removeClippedSubviews={true}
        getItemType={(item: any) => {
          return item?.id;
        }}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        renderItem={({ item }) => <FarmCard item={item} />}
        estimatedItemSize={200}
        ListFooterComponent={<RenderFooter />}
        refreshing={isRefetching}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={[colors.primary]}
          />
        }
      /> */}
      <CustomList
        data={items}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        refetch={refetch}
        isRefetching={isRefetching}
        renderItem={({ item }: any) => <FarmCard item={item} />}
        type={"farms"}
      />
    </View>
  );
};

export default Farms;

const styles = StyleSheet.create({});
