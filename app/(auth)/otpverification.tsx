import AppButton from "@/components/ui/appbutton";
import AppText from "@/components/ui/apptext";
import FormErrorMessage from "@/components/ui/formerrormessage";
import OtpInput from "@/components/ui/otpinput";
import ResendTimer from "@/components/ui/resendtimer";
import { colors } from "@/constants/colors";
import { endpoints } from "@/constants/endpoints";
import { images } from "@/constants/images";
import useAuthMutation from "@/hooks/usemutation";
import { authStyles } from "@/styles/auth";
import { handleAuthApiError } from "@/utils/apierrorhandler";
import { dataDecoder, dataEncoder } from "@/utils/commonmethods";
import { otpverificationSchema } from "@/utils/validationschema";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

const OtpVerification = () => {
  const params = useLocalSearchParams<{ data: string }>();
  const paramData: { phone_number: string; action: "signup" | "pinreset" } =
    dataDecoder(params?.data);
  const phoneNumber = paramData?.phone_number;
  const isSignup = paramData?.action === "signup";
  const bottomInset = useSafeAreaInsets().bottom;
  const toast = useToast();

  const [clearValue, setClearValue] = React.useState<boolean>(false);

  const { mutate, isLoading } = useAuthMutation(
    endpoints.verify,
    "POST",
    "otpverification",
    {
      onSuccess: (data) => {
        const item = {
          phone_number: phoneNumber,
          code: isSignup ? null : formik.values.code,
        };
        router.replace(`/createpin?data=${dataEncoder(item)}`);
        // console.log(data);
      },
      onError: (error: any) => {
        handleAuthApiError(error, formik, toast);
      },
    }
  );

  const formik = useFormik({
    initialValues: { phone_number: phoneNumber || "", code: "" },
    validationSchema: otpverificationSchema,
    onSubmit: async (values: { phone_number: string; code: string }) => {
      mutate(values);
    },
  });
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
            {phoneNumber}
          </AppText>
        </View>

        <OtpInput
          onOtpEntered={(otp: string) => {
            formik.setFieldValue("code", otp);
          }}
          borderColor={formik.errors.code ? colors.error : colors.formBorder}
          clearValue={clearValue}
        />

        <View style={{ paddingTop: 10 }}>
          <FormErrorMessage error={formik.errors.code as string} />
        </View>

        <ResendTimer setOtp={() => setClearValue(true)} formik={formik} />
      </KeyboardAwareScrollView>

      <View style={[authStyles.buttonContainer, { bottom: bottomInset + 20 }]}>
        <AppButton
          title="Continue"
          textColor="white"
          btnColor="buttonPrimary"
          style={{}}
          onPress={formik.submitForm}
          loading={isLoading}
          disabled={!(formik.isValid && formik.dirty)}
        />
      </View>
    </>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({});
