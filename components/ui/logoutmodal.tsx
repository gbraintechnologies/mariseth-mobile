import { colors } from "@/constants/colors";
import { useUniversalStore } from "@/stores/useuniversalstore";
import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useStore } from "zustand";
import AppButton from "./appbutton";
import AppText from "./apptext";
const LogoutModal = React.memo(() => {
  const logoutModalVisible = useStore(
    useUniversalStore,
    (state) => state.logoutModalVisible
  );

  const translateY = useSharedValue(300);

  React.useEffect(() => {
    translateY.value = logoutModalVisible
      ? withSpring(0, { damping: 50, stiffness: 400 })
      : withSpring(80, { damping: 50, stiffness: 400 });
  }, [logoutModalVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal
      visible={logoutModalVisible}
      animationType="fade"
      statusBarTranslucent
      transparent
    >
      <View style={[styles.loadingContainer, StyleSheet.absoluteFill]}>
        <Animated.View
          style={[
            {
              backgroundColor: colors.backgroundPrimary,
              paddingVertical: 24,
              borderRadius: 20,
              paddingHorizontal: 30,
            },
            animatedStyle,
          ]}
        >
          <AppText
            fontFamily="SemiBold"
            fontSize={17}
            color="textBold"
            style={{ textAlign: "center", marginBottom: 10 }}
          >
            Logout?
          </AppText>

          <AppText
            fontFamily="Regular"
            fontSize={14}
            color="textPrimary"
            style={{ textAlign: "center", marginBottom: 8 }}
          >
            You are about to log out of this account. You will have to log back
            in to access your information and use the app.
          </AppText>

          <AppText
            fontFamily="SemiBold"
            fontSize={15}
            color="textBold"
            style={{ textAlign: "center" }}
          >
            Proceed?
          </AppText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginTop: 20,
            }}
          >
            <AppButton
              title="Log out"
              textColor="white"
              btnColor="error"
              width={"46%"}
              style={{}}
              onPress={() => {}}
            />

            <AppButton
              title="Cancel"
              textColor="textPrimary"
              btnColor="white"
              borderColor="formBorder"
              borderWidth={1}
              width={"46%"}
              style={{}}
              onPress={() => {
                useUniversalStore.setState({ logoutModalVisible: false });
              }}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
});

export default LogoutModal;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.backgroundTransparent,
    // position: "absolute",
    // width: "100%",
    // height: "100%",
    zIndex: 1,
  },
});
