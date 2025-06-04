import AppButton from "@/components/ui/appbutton";
import AppText from "@/components/ui/apptext";
import OtpInput from "@/components/ui/otpinput";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";
import { authStyles } from "@/styles/auth";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ConfirmPin = () => {
  const bottomInset = useSafeAreaInsets().bottom;
  const [enteredOtp, setEnteredOtp] = React.useState<string | any>();
  const [clearValue, setClearValue] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  return (
    <>
      <KeyboardAwareScrollView
        extraHeight={100}
        enableOnAndroid={true}
        bounces={false}
        style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}
        contentContainerStyle={authStyles.container}
      >
        <Image
          source={images.logo}
          style={authStyles.logo}
          contentFit="contain"
        />

        <AppText
          fontSize={22}
          fontFamily="SemiBold"
          color="textBold"
          style={{ marginBottom: 22 }}
        >
          Confirm Pin
        </AppText>

        <OtpInput
          onOtpEntered={(otp: string) => {
            setEnteredOtp(otp);
          }}
          borderColor={error ? colors.error : colors.formBorder}
          clearValue={clearValue}
        />

        {/* <View style={{ paddingTop: 10 }}>
          <FormErrorMessage error={error} />
        </View> */}
      </KeyboardAwareScrollView>
      <View style={[authStyles.buttonContainer, { bottom: bottomInset + 20 }]}>
        <AppButton
          title="Sign In"
          textColor="white"
          btnColor="buttonPrimary"
          style={{}}
          // onPress={formik.submitForm}
          // loading={loading}
          // disabled={!(formik.isValid && formik.dirty)}
        />
      </View>
    </>
  );
};

export default ConfirmPin;

const styles = StyleSheet.create({});
