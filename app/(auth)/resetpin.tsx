import AppButton from "@/components/ui/appbutton";
import AppText from "@/components/ui/apptext";
import AppTextInput from "@/components/ui/apptextinput";
import FormErrorMessage from "@/components/ui/formerrormessage";
import OtpInput from "@/components/ui/otpinput";
import { colors } from "@/constants/colors";
import { endpoints } from "@/constants/endpoints";
import { images } from "@/constants/images";
import useAuthMutation from "@/hooks/usemutation";
import { authStyles } from "@/styles/auth";
import { handleAuthApiError, handleToastShow } from "@/utils/commonmethods";
import { resetPinSchema } from "@/utils/validationschema";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

const ResetPin = () => {
  const params = useLocalSearchParams<{ phone_number: string }>();
  const phoneNumber = params?.phone_number;
  const bottomInset = useSafeAreaInsets().bottom;
  const [clearValue, setClearValue] = React.useState<boolean>(false);
  const toast = useToast();

  const { mutate, isLoading } = useAuthMutation(
    endpoints.resetPin,
    "POST",
    "resetpin",
    {
      onSuccess: (data) => {
        handleToastShow(toast, "All set — your new password is ready to use");
        setTimeout(() => {
          router.replace(`/(auth)/signin`);
        }, 300);
        console.log(data);
      },
      onError: (error: any) => {
        handleAuthApiError(error, formik, toast);
      },
    }
  );

  const formik = useFormik({
    initialValues: { code: "", pin: "", new_pin: "" },
    validationSchema: resetPinSchema,
    onSubmit: async (values: {
      code: string;
      pin: string;
      new_pin: string;
    }) => {
      const data = {
        phone_number: phoneNumber,
        code: values.code,
        new_pin: values.new_pin,
      };
      mutate(data);
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
          style={{ marginBottom: 22 }}
        >
          Reset Pin
        </AppText>
        <AppText
          fontSize={14}
          fontFamily="SemiBold"
          style={{ marginBottom: 8 }}
        >
          Verification Code
        </AppText>
        <OtpInput
          onOtpEntered={(otp: string) => {
            formik.setFieldValue("cpde", otp);
          }}
          borderColor={formik.errors.code ? colors.error : colors.formBorder}
          clearValue={clearValue}
        />

        <View style={{ paddingTop: 10 }}>
          <FormErrorMessage error={formik.errors.code} />
        </View>

        <AppTextInput
          error={formik.touched.pin && formik.errors.pin}
          label="New Pin"
          style={{
            backgroundColor: isLoading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          editable={!isLoading}
          maxLength={4}
          keyboardType="numeric"
          onBlur={() => formik.setFieldTouched("pin")}
          onChangeText={formik.handleChange("pin")}
        />

        <FormErrorMessage
          error={(formik.touched.pin && formik.errors.pin) as string}
        />

        <AppTextInput
          error={formik.touched.new_pin && formik.errors.new_pin}
          label="Confirm Pin"
          style={{
            backgroundColor: isLoading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          editable={!isLoading}
          maxLength={4}
          keyboardType="numeric"
          onBlur={() => formik.setFieldTouched("new_pin")}
          onChangeText={formik.handleChange("new_pin")}
        />

        <FormErrorMessage
          error={(formik.touched.new_pin && formik.errors.new_pin) as string}
        />
      </KeyboardAwareScrollView>
      <View style={[authStyles.buttonContainer, { bottom: bottomInset + 20 }]}>
        <AppButton
          title="Reset"
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

export default ResetPin;

const styles = StyleSheet.create({});
