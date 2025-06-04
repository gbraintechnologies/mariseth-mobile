import AppText from "@/components/ui/apptext";
import { colors } from "@/constants/colors";
import { isIOS } from "@/constants/generalconstants";
import { images } from "@/constants/images";
import { authStyles } from "@/styles/auth";
import { BlurView } from "expo-blur";
import { ImageBackground } from "expo-image";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AuthLoading = () => {
  const bottomInset = useSafeAreaInsets().bottom;
  return (
    <ImageBackground
      style={{ flex: 1 }}
      contentFit="cover"
      source={images.authLoadingBg}
    >
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: "#00000050" },
        ]}
      />
      <View
        style={[
          authStyles.welcomeContainer,
          {
            paddingBottom: bottomInset + 25,
          },
        ]}
      >
        <BlurView
          intensity={isIOS ? 40 : 80}
          tint="dark"
          // experimentalBlurMethod="dimezisBlurView"
          style={[authStyles.blur, { paddingVertical: 15 }]}
        >
          <AppText
            fontFamily="Bold"
            fontSize={26}
            color="white"
            style={{ lineHeight: 36, marginBottom: "10%", textAlign: "center" }}
          >
            Hang in there, we’re signing you in.
          </AppText>

          <ActivityIndicator size={"large"} color={colors.primary} />
        </BlurView>
      </View>
    </ImageBackground>
  );
};

export default AuthLoading;

const styles = StyleSheet.create({});
