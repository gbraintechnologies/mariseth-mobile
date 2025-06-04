import AppButton from "@/components/ui/appbutton";
import AppText from "@/components/ui/apptext";
import AppTextInput from "@/components/ui/apptextinput";
import FormErrorMessage from "@/components/ui/formerrormessage";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";
import { authStyles } from "@/styles/auth";
import { phoneNumberSchema } from "@/utils/validationschema";
import { Image } from "expo-image";
import { useFormik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ForgotPin = () => {
  const bottomInset = useSafeAreaInsets().bottom;
  const [loading, setLoading] = React.useState<boolean>(false);
  const formik = useFormik({
    initialValues: { phone_number: "" },
    validationSchema: phoneNumberSchema,
    onSubmit: async (values: any) => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      console.log(values);
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
            backgroundColor: loading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          maxLength={10}
          autoCapitalize="none"
          textContentType="emailAddress"
          autoCorrect={false}
          phoneEntry={true}
          editable={!loading}
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
          loading={loading}
          disabled={!(formik.isValid && formik.dirty)}
        />
      </View>
    </>
  );
};

export default ForgotPin;
const styles = StyleSheet.create({});
