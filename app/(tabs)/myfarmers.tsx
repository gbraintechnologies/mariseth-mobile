import FarmerCard from "@/components/ui/farmercard";
import Farms from "@/components/ui/farms";
import FloatingButton from "@/components/ui/floatingbutton";
import { SegmentedScrollView } from "@/components/ui/segmentedview";
import SmallFarmers from "@/components/ui/smallfarmers";
import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { useUniversalStore } from "@/stores/useuniversalstore";
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
        console.log("farmers");
      },
    },
    Farms: {
      icon: icons.location,
      action: () => {
        console.log("farms");
      },
    },
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}
        contentContainerStyle={{ paddingBottom: "10%" }}
      >
        <FarmerCard type="big" />

        <SegmentedScrollView
          storeKey="myFarmers"
          options={["Farmers", "Farms"]}
        >
          <SmallFarmers />
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
