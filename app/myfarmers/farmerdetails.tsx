import FarmerCard from "@/components/ui/farmercard";
import InfoCard from "@/components/ui/infocard";
import { SegmentedScrollView } from "@/components/ui/segmentedview";
import { colors } from "@/constants/colors";
import { width } from "@/constants/generalconstants";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const FarmerDetails = () => {
  const farmerPersonalInformation = {
    headerTitle: "Personal Information",
    information: [
      { key: "Gender", value: "Female" },
      { key: "Date of Birth", value: "21st March, 1983" },
      { key: "National ID/Passport Number", value: "GHA-33533-2443" },
      { key: "Contact Number", value: "+233 25 456 7889" },
      { key: "Email", value: "-" },
      { key: "Address", value: "Buluga, Northern Reg." },
      { key: "Village/Community", value: "Sampaga" },
      { key: "District", value: "Sissala West" },
      { key: "Country", value: "Ghana" },
    ],
  };

  const farmInformation = {
    headerTitle: "Farm Information",
    information: [
      { key: "Farm Name", value: "Sunset Farms" },
      { key: "Location", value: "GPS 7403-435" },
      { key: "District", value: "Sissala East" },
      { key: "Total Land Size", value: "3.5 acres" },
      { key: "Land Ownership", value: "Other (Renting)" },
      { key: "Livestock Kept", value: "N/A" },
    ],
  };
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}
      contentContainerStyle={{}}
    >
      <FarmerCard type="small" />
      <SegmentedScrollView
        storeKey="myFarm"
        options={["Farm Details", "Farm Products"]}
      >
        <View style={{ width: width, paddingHorizontal: 16 }}>
          <InfoCard headerVisibility={true} info={farmerPersonalInformation} />
        </View>

        <View style={{ width: width, paddingHorizontal: 16 }}>
          <InfoCard headerVisibility={true} info={farmInformation} />
        </View>
      </SegmentedScrollView>
    </ScrollView>
  );
};

export default FarmerDetails;

const styles = StyleSheet.create({});
