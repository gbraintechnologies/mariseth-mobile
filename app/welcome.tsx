import AppButton from "@/components/ui/appbutton";
import AppText from "@/components/ui/apptext";
import { isIOS } from "@/constants/generalconstants";
import { images } from "@/constants/images";
import { authStyles } from "@/styles/auth";
import { BlurView } from "expo-blur";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const Welcome = () => {
  const bottomInset = useSafeAreaInsets().bottom;
  return (
    <ImageBackground
      style={{ flex: 1 }}
      contentFit="cover"
      source={images.welcomeBg}
    >
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
          style={authStyles.blur}
        >
          <AppText
            fontFamily="Bold"
            fontSize={26}
            color="white"
            style={{ lineHeight: 36, marginBottom: 6 }}
          >
            Our passion for agriculture is at the heart of everything we do.
          </AppText>

          <AppText fontFamily="Regular" fontSize={15} color="white">
            Africa's Leading Farm
          </AppText>
        </BlurView>
        <AppButton
          title="Get Started"
          textColor="white"
          btnColor="buttonSecondary"
          style={{}}
          onPress={() => {
            router.navigate("/signup");
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default Welcome;
