import AppText from "@/components/ui/apptext";
import LogoutModal from "@/components/ui/logoutmodal";
import ProfileCard from "@/components/ui/profilecard";
import { colors } from "@/constants/colors";
import { moreLinks } from "@/constants/generalconstants";
import { icons } from "@/constants/icons";
import { userStore } from "@/stores/userstore";
import { useUniversalStore } from "@/stores/useuniversalstore";
import { moreLink } from "@/types/more";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const More = () => {
  const topInset = useSafeAreaInsets().top;
  const user = userStore((state) => state.user);
  return (
    <>
      <LogoutModal />
      <View
        style={[
          styles.moreContainer,
          {
            paddingTop: topInset + 16,
          },
        ]}
      >
        <ProfileCard item={user} />
        <View style={{ marginTop: 31 }}>
          {moreLinks.map((item: moreLink, index: number) => {
            const isLast = index === moreLinks.length - 1;
            return (
              <Pressable
                key={index}
                style={styles.moreLinkContainer}
                onPress={() =>
                  isLast
                    ? useUniversalStore.setState({ logoutModalVisible: true })
                    : router.navigate(item?.route)
                }
              >
                <Image
                  source={item?.icon}
                  style={{ height: 24, width: 24, marginRight: 12 }}
                />
                <AppText
                  fontSize={16}
                  fontFamily="Regular"
                  color={isLast ? "error" : "black"}
                  style={{ flex: 1 }}
                >
                  {item?.name}
                </AppText>
                <Image
                  source={icons.arrowRight}
                  style={{
                    height: 16,
                    width: 16,
                    tintColor: isLast ? colors.error : colors.primary,
                  }}
                />
              </Pressable>
            );
          })}
        </View>
      </View>
    </>
  );
};

export default More;

const styles = StyleSheet.create({
  moreContainer: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    padding: 16,
  },
  moreLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    marginBottom: 8,
  },
});
