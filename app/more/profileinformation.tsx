import AppText from "@/components/ui/apptext";
import InfoCard from "@/components/ui/infocard";
import ProfileCard from "@/components/ui/profilecard";
import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { userStore } from "@/stores/userstore";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfileInformation = () => {
  const topInset = useSafeAreaInsets().top;

  const user = userStore((state) => state.user);
  const isLeaderFarmer = user?.farmer?.type === "lead";
  const basicProfileInfo = {
    headerTitle: "My Information",
    headerIcon: icons.user,
    onEditPress: () => router.navigate("/more/profileedit"),
    information: [
      {
        key: "Gender",
        value: user?.farmer?.gender === "m" ? "Male" : "Female",
      },
      {
        key: "Date of Birth",
        value: user?.farmer?.date_of_birth as string,
      },
      {
        key: "National ID/Passport Number",
        value: user?.farmer?.id_number as string,
      },
      {
        key: "Contact Number",
        value: user?.farmer?.phone_number as string,
      },
      {
        key: "Email",
        value: (user?.farmer?.email as string) ?? "N/A",
      },
      {
        key: "Address",
        value: user?.farmer?.address as string,
      },
      {
        key: "Village/Community",
        value: user?.farmer?.village as string,
      },
      {
        key: "District",
        value: user?.farmer?.district?.name as string,
      },
      {
        key: "Country",
        value: user?.farmer?.country as string,
      },
    ],
  };
  const leaderShipExperience = user?.farmer?.leadership_experience;
  const isMentoring = leaderShipExperience?.is_mentoring_other_farmers;

  const leadershipExperienceInfo = {
    headerTitle: "Leadership & Experience",
    headerIcon: icons.leadership,
    onEditPress: () => router.navigate("/more/leadershipinfoedit"),
    information: [
      {
        key: "Are you currently mentoring other farmers?",
        value: isMentoring ? "Yes" : "No",
      },
      // {
      //   key: "If Yes, how many farmers are you mentoring",
      //   value: leaderShipExperience?.number_of_farmers_mentoring || "N/A",
      // },
      ...(isMentoring
        ? [
            {
              key: "If Yes, how many farmers are you mentoring",
              value:
                user?.farmer?.leadership_experience
                  ?.number_of_farmers_mentoring || "",
            },
          ]
        : []),
      {
        key: "Membership in Farming Cooperatives/Associations",
        value: leaderShipExperience?.has_farming_membership ? "Yes" : "No",
      },
      {
        key: "Have you received any leadership or agricultural training?",
        value: leaderShipExperience?.has_received_farming_leadership_training
          ? "Yes"
          : "No",
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
      <ProfileCard item={user} />
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
      {isLeaderFarmer ? <InfoCard info={leadershipExperienceInfo} /> : null}
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
