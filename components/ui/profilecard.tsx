import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "./apptext";
import InitialsAvatar from "./initialsavatar";
interface profileCard {
  item?: any;
}
const ProfileCard: React.FC<profileCard> = ({ item }) => {
  return (
    <Pressable style={styles.profileCardContainer}>
      <InitialsAvatar
        name="Kwame Ansah"
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
          Kwame Ansah
        </AppText>
        <View style={{ flexDirection: "row" }}>
          <AppText
            fontSize={12}
            fontFamily="Medium"
            color="primary"
            style={{ marginRight: 3 }}
          >
            Lead Farmer
          </AppText>

          <AppText fontSize={12} fontFamily="Medium" color="textPrimary">
            . +233 25 456 7889
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
