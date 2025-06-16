import { user } from "@/types/user";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "./apptext";
import InitialsAvatar from "./initialsavatar";
interface profileCard {
  item: user | null;
}
const ProfileCard: React.FC<profileCard> = ({ item }) => {
  const fullName = item?.first_name + " " + item?.last_name;
  const type = item?.farmer?.type;
  const formattedType = type
    ? type.charAt(0).toUpperCase() + type.slice(1)
    : "";
  const phone = item?.phone_number;
  return (
    <Pressable style={styles.profileCardContainer}>
      <InitialsAvatar
        name={fullName}
        fontSize={22}
        containerSize={55}
        bgColor="grey"
        textColor="black"
      />
      <View style={styles.profileCardTextContainer}>
        <AppText
          fontSize={16}
          fontFamily="SemiBold"
          color="textBold"
          style={{ marginBottom: 2 }}
        >
          {fullName}
        </AppText>
        <View style={{ flexDirection: "row" }}>
          <AppText
            fontSize={12}
            fontFamily="Medium"
            color="primary"
            style={{ marginRight: 3 }}
          >
            {formattedType} Farmer
          </AppText>

          <AppText fontSize={12} fontFamily="Medium" color="textPrimary">
            . {`+${phone}`}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  profileCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 31,
  },
  profileCardTextContainer: {
    flexDirection: "column",
    marginLeft: 15,
  },
});
