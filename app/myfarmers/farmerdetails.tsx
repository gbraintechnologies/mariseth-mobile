import FarmerCard from "@/components/ui/farmercard";
import InfoCard from "@/components/ui/infocard";
import { SegmentedScrollView } from "@/components/ui/segmentedview";
import { colors } from "@/constants/colors";
import { width } from "@/constants/generalconstants";
import { livestockKept } from "@/types/farm";
import { smallHolder } from "@/types/farmers";
import { dataDecoder } from "@/utils/commonmethods";
import { format, parseISO } from "date-fns";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const FarmerDetails = () => {
  const params = useLocalSearchParams<{ data: string }>();
  const data: smallHolder = dataDecoder(params?.data);
  // const {
  //   name: farmName,
  //   location,
  //   district,
  //   size,
  //   size_metric,
  //   land_ownership,
  //   livestock_kept,
  //   livestock,
  // }: myFarm = data?.farm;

  const farmerPersonalInformation = {
    headerTitle: "Personal Information",
    information: [
      {
        key: "Gender",
        value: (data?.gender === "m" ? "Male" : "Female") as any,
      },
      {
        key: "Date of Birth",
        value: format(parseISO(data.date_of_birth), "do MMMM, yyyy") || "N/A",
      },
      { key: "National ID/Passport Number", value: data?.id_number || "N/A" },
      { key: "Contact Number", value: "+" + data?.phone_number || "N/A" },
      { key: "Email", value: data?.email || "N/A" },
      { key: "Address", value: data?.address || "N/A" },
      { key: "Village/Community", value: data?.village || "N/A" },
      { key: "District", value: data?.district?.name || "N/A" },
      { key: "Country", value: data?.country || "N/A" },
    ],
  };

  const farmInformation = {
    headerTitle: "Farm Information",
    information: [
      { key: "Farm Name", value: data?.farm?.name || "N/A" },
      { key: "Location", value: data?.farm?.location || "N/A" },
      { key: "District", value: data?.farm?.district?.name || "N/A" },
      {
        key: "Total Land Size",
        value: (data?.farm?.size ||
          "N/A" + (data?.farm?.size_metric || "")) as string,
      },
      { key: "Land Ownership", value: data?.farm?.land_ownership || "N/A" },
      {
        key: "Livestock Kept",
        value:
          data?.farm?.livestock
            .map((item: livestockKept) => item.product.name)
            .join(", ") || "N/A",
      },
    ],
  };
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}
      contentContainerStyle={{}}
    >
      <FarmerCard type="small" item={data} />
      <SegmentedScrollView
        storeKey="myFarmerDetails"
        options={["Personal", "Farm"]}
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
