import AppText from "@/components/ui/apptext";
import FarmDetails from "@/components/ui/farmdetails";
import FarmProducts from "@/components/ui/farmproducts";
import { SegmentedScrollView } from "@/components/ui/segmentedview";
import { colors } from "@/constants/colors";
import { universalBlurhash } from "@/constants/generalconstants";
import { images } from "@/constants/images";
import { ImageBackground } from "expo-image";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const MyFarm = () => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}
      contentContainerStyle={{}}
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
              Sunset Farms
            </AppText>
            <AppText fontFamily="SemiBold" fontSize={16} color="white">
              EF-110203 · Sissala East · SF
            </AppText>
          </View>
        </ImageBackground>
      </View>

      <SegmentedScrollView
        storeKey="myFarm"
        options={["Farm Details", "Farm Products"]}
      >
        <FarmDetails />
        <FarmProducts />
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
