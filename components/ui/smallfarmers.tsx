import { height, width } from "@/constants/generalconstants";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AppText from "./apptext";
import SmallFarmerCard from "./smallfarmercard";
interface smallFarmersProps {
  data: any;
  fetchNextPage: any;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}
const SmallFarmers: React.FC<smallFarmersProps> = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const RenderFooter = () => {
    if (isFetchingNextPage) {
      return (
        <View style={{ padding: 16, alignItems: "center" }}>
          <ActivityIndicator size="small" color="#666" />
        </View>
      );
    }

    if (!hasNextPage) {
      return (
        <View style={{ padding: 16, alignItems: "center" }}>
          <AppText
            color="formPlaceholderText"
            fontFamily="Medium"
            fontSize={14}
          >
            No more items to load
          </AppText>
        </View>
      );
    }

    return null;
  };
  return (
    <View style={{ width: width, paddingHorizontal: 16 }}>
      <AppText
        fontFamily="SemiBold"
        fontSize={16}
        color="primary"
        style={{ marginBottom: 7 }}
      >
        Smallholder Farmers
      </AppText>
      {/* {smallFarmers.map((item, index) => (
        <SmallFarmerCard item={item} key={index} />
      ))} */}

      <FlashList
        data={data}
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
        renderItem={({ item }) => <SmallFarmerCard item={item} />}
        estimatedItemSize={200}
        ListFooterComponent={<RenderFooter />}
        //  refreshControl={
        //     <RefreshControl
        //       refreshing={refreshing}
        //       onRefresh={onRefresh}
        //       colors={[colors.primary]}
        //     />
        //   }
      />
    </View>
  );
};

export default SmallFarmers;

const styles = StyleSheet.create({});
