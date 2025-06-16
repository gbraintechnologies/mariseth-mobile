import AppText from "@/components/ui/apptext";
import InitialsAvatar from "@/components/ui/initialsavatar";
import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { userStore } from "@/stores/userstore";
import { Image } from "expo-image";
import { router } from "expo-router";

import { Pressable, StyleSheet, View } from "react-native";
import { useStore } from "zustand";

export function headerHandler(route_label?: string): any {
  return {
    headerBackVisible: false,
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: colors.backgroundPrimary,
    },

    headerTitleAlign: "center",
    headerTitle: () => {
      return (
        <AppText fontFamily="SemiBold" fontSize={15} color="textBold">
          {route_label}
        </AppText>
      );
    },

    headerLeft: () => {
      return (
        <Pressable
          style={styles.backButtonContainer}
          onPress={() => {
            router.back();
          }}
        >
          <View style={styles.backIcon}>
            <Image source={icons.arrowLeft} style={{ width: 20, height: 20 }} />
          </View>
          <AppText fontFamily="SemiBold" fontSize={14} color="textBold">
            Back
          </AppText>
        </Pressable>
      );
    },
  };
}
export function tabScreenOptions(tabLabel: string) {
  const tabIcons: Record<string, string> = {
    Home: icons?.home,
    Credits: icons?.credits,
    "My Farm": icons?.farm,
    "My Farmers": icons?.farmers,
    More: icons?.more,
  };

  const isHome = tabLabel === "Home";
  const isCredits = tabLabel === "Credits";
  const isMore = tabLabel === "More";
  const isFarm = tabLabel === "My Farm";
  const isFarmers = tabLabel === "My Farmers";

  return {
    headerShown: isMore ? false : true,
    title: "",
    headerShadowVisible: false,

    tabBarIcon: ({ focused }: { focused: boolean }) => (
      <Image
        source={tabIcons[tabLabel]}
        style={{
          height: 23,
          width: 23,
          tintColor: focused ? colors.tabBarActive : colors.tabBarInactive,
        }}
      />
    ),

    headerLeft: () => {
      return (
        <AppText
          fontFamily="SemiBold"
          fontSize={18}
          color="textBold"
          style={{ marginLeft: 16 }}
        >
          {tabLabel}
        </AppText>
      );
    },

    headerRight: () => {
      const user = useStore(userStore, (state) => state.user);
      const fullName = user?.first_name + " " + user?.last_name;
      return (
        <View
          style={{
            marginRight: 16,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={icons.notification}
            style={{ height: 24, width: 24, marginRight: 20 }}
          />
          <InitialsAvatar name={fullName} />
        </View>
      );
    },
    tabBarLabel: ({ focused }: { focused: boolean }) => (
      <AppText
        fontSize={13}
        numberOfLines={1}
        color={focused ? "tabBarActive" : "tabBarInactive"}
        fontFamily={"SemiBold"}
      >
        {tabLabel}
      </AppText>
    ),
  };
}
export function tabbarScreenOptions() {
  return {
    tabBarAllowFontScaling: false,
    tabBarHideOnKeyboard: true,
    lazy: false,
  };
}

const styles = StyleSheet.create({
  backButtonContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
  },

  backIcon: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: colors.formBorder,
    padding: 5,
    marginRight: 9,
  },
});
