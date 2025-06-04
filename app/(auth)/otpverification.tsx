import AppButton from "@/components/ui/appbutton";
import AppText from "@/components/ui/apptext";
import FormErrorMessage from "@/components/ui/formerrormessage";
import OtpInput from "@/components/ui/otpinput";
import ResendTimer from "@/components/ui/resendtimer";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";
import { authStyles } from "@/styles/auth";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OtpVerification = () => {
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
          style={{ marginBottom: 6 }}
        >
          We just sent you an SMS
        </AppText>
        <View style={{ flexDirection: "row", marginBottom: 22 }}>
          <AppText
            fontSize={14}
            fontFamily="Regular"
            color="textPrimary"
            style={{ lineHeight: 22 }}
          >
            Enter the PIN we sent to
          </AppText>

          <AppText
            fontSize={14}
            fontFamily="Medium"
            color="textBold"
            style={{ lineHeight: 22, marginLeft: 5 }}
          >
            0558460987
          </AppText>
        </View>

        <OtpInput
          onOtpEntered={(otp: string) => {
            setEnteredOtp(otp);
          }}
          borderColor={error ? colors.error : colors.formBorder}
          clearValue={clearValue}
        />

        <View style={{ paddingTop: 10 }}>
          <FormErrorMessage error={error} />
        </View>

        <ResendTimer setOtp={() => setClearValue(true)} />
      </KeyboardAwareScrollView>

      <View style={[authStyles.buttonContainer, { bottom: bottomInset + 20 }]}>
        <AppButton
          title="Continue"
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

export default OtpVerification;

const styles = StyleSheet.create({});
