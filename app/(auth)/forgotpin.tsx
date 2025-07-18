import AppButton from "@/components/ui/appbutton";
import AppText from "@/components/ui/apptext";
import AppTextInput from "@/components/ui/apptextinput";
import FormErrorMessage from "@/components/ui/formerrormessage";
import { colors } from "@/constants/colors";
import { endpoints } from "@/constants/endpoints";
import { images } from "@/constants/images";
import useAuthMutation from "@/hooks/usemutation";
import { authStyles } from "@/styles/auth";
import { handleAuthApiError } from "@/utils/apierrorhandler";
import { dataEncoder } from "@/utils/commonmethods";
import { phoneNumberSchema } from "@/utils/validationschema";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

const ForgotPin = () => {
  const bottomInset = useSafeAreaInsets().bottom;
  // const [loading, setLoading] = React.useState<boolean>(false);
  const toast = useToast();
  const { mutate, isLoading, error } = useAuthMutation(
    endpoints.forgotPin,
    "POST",
    "forgotpin",
    {
      onSuccess: (data) => {
        console.log(data);
        const number = formik.values.phone_number;
        const item = {
          phone_number: number,
          action: "pinreset",
        };
        router.navigate(`/otpverification?data=${dataEncoder(item)}`);
      },

      onError: (error: any) => {
        handleAuthApiError(error, formik, toast);
      },
    }
  );
  const formik = useFormik({
    initialValues: { phone_number: "" },
    validationSchema: phoneNumberSchema,
    onSubmit: async (values: { phone_number: string }) => {
      values.phone_number = `233${values.phone_number}`;
      mutate(values);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 2000);
      // console.log(values);
    },
  });
  return (
    <>
      <KeyboardAwareScrollView
        extraHeight={100}
        extraScrollHeight={50}
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
          Forgot Pin?
        </AppText>

        <AppText
          fontSize={14}
          fontFamily="Regular"
          color="textPrimary"
          style={{ marginBottom: 22, lineHeight: 22 }}
        >
          Enter your phone number to retrieve your account
        </AppText>

        <AppTextInput
          error={formik.errors.phone_number}
          label="Phone Number"
          style={{
            backgroundColor: isLoading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          maxLength={10}
          autoCapitalize="none"
          textContentType="telephoneNumber"
          autoCorrect={false}
          // phoneEntry={true}
          leftComponent={
            <AppText
              color="formInputText"
              fontFamily="Regular"
              fontSize={17}
              style={{ marginRight: 10 }}
            >
              +233
            </AppText>
          }
          editable={!isLoading}
          keyboardType="phone-pad"
          onBlur={() => formik.setFieldTouched("phone_number")}
          onChangeText={formik.handleChange("phone_number")}
        />

        <FormErrorMessage error={formik.errors.phone_number as string} />
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

export default ForgotPin;
const styles = StyleSheet.create({});
