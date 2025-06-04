import AppText from "@/components/ui/apptext";
import InfoCard from "@/components/ui/infocard";
import ProfileCard from "@/components/ui/profilecard";
import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfileInformation = () => {
  const topInset = useSafeAreaInsets().top;

  const basicProfileInfo = {
    headerTitle: "My Information",
    headerIcon: icons.user,
    onEditPress: () => router.navigate("/more/profileinformation"),
    information: [
      {
        key: "Gender",
        value: "Male",
      },
      {
        key: "Date of Birth",
        value: "21st March, 1983",
      },
      {
        key: "National ID/Passport Number",
        value: "GHA-33533-2443",
      },
      {
        key: "Contact Number",
        value: "+233 25 456 7889",
      },
      {
        key: "Email",
        value: "kwame.ansah@gh.com",
      },
      {
        key: "Address",
        value: "Buluga, Northern Reg.",
      },
      {
        key: "Village/Community",
        value: "Sampaga",
      },
      {
        key: "District",
        value: "Sissala East",
      },
      {
        key: "Country",
        value: "Ghana",
      },
    ],
  };

  const leadershipExperienceInfo = {
    headerTitle: "Leadership & Experience",
    headerIcon: null,
    onEditPress: () => router.navigate("/more/profileinformation"),
    information: [
      {
        key: "Are you currently mentoring other farmers?",
        value: "Yes",
      },
      {
        key: "If Yes, how many farmers are you mentoring",
        value: "12",
      },
      {
        key: "Membership in Farming Cooperatives/Associations",
        value: "No",
      },
      {
        key: "Have you received any leadership or agricultural training?",
        value: "No",
      },
    ],
  };
  return (
    <ScrollView
      style={styles.profileInfoContainer}
      contentContainerStyle={{
        padding: 16,
        paddingTop: topInset + 16,
        paddingBottom: 60,
      }}
    >
      <ProfileCard />
      <Pressable
        style={styles.backButtonContainer}
        onPress={() => {
          router.back();
        }}
      >
        <View style={styles.backIcon}>
          <Image source={icons.arrowLeft} style={{ width: 18, height: 18 }} />
        </View>
        <AppText fontFamily="SemiBold" fontSize={14} color="textBold">
          Back
        </AppText>
      </Pressable>

      <InfoCard info={basicProfileInfo} />
      <InfoCard info={leadershipExperienceInfo} />
    </ScrollView>
  );
};

export default ProfileInformation;

const styles = StyleSheet.create({
  profileInfoContainer: { flex: 1, backgroundColor: colors.backgroundPrimary },
  backButtonContainer: {
    marginVertical: 18,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
  },

  backIcon: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: colors.formBorder,
    padding: 8,
    marginRight: 9,
  },
});
