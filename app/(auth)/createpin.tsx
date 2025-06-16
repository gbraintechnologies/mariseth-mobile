import AppButton from "@/components/ui/appbutton";
import AppText from "@/components/ui/apptext";
import FormErrorMessage from "@/components/ui/formerrormessage";
import OtpInput from "@/components/ui/otpinput";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";
import { authStyles } from "@/styles/auth";
import { dataDecoder, dataEncoder } from "@/utils/commonmethods";
import { createPinSchema } from "@/utils/validationschema";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CreatePin = () => {
  const params = useLocalSearchParams<{ data: string }>();
  const paramData: { phone_number: string; code: number | null } = dataDecoder(
    params?.data
  );
  const phoneNumber = paramData?.phone_number;
  const bottomInset = useSafeAreaInsets().bottom;
  const [clearValue, setClearValue] = React.useState<boolean>(false);
  const formik = useFormik({
    initialValues: { pin: "" },
    validationSchema: createPinSchema,
    onSubmit: async (values: { pin: string }) => {
      const data = {
        phone_number: phoneNumber,
        pin: values.pin,
        code: paramData?.code,
      };
      router.navigate(`/confirmpin?data=${dataEncoder(data)}`);
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
          Create a Pin
        </AppText>

        <OtpInput
          onOtpEntered={(otp: string) => {
            formik.setFieldValue("pin", otp);
          }}
          borderColor={formik.errors.pin ? colors.error : colors.formBorder}
          clearValue={clearValue}
        />

        <View style={{ paddingTop: 10 }}>
          <FormErrorMessage error={formik.errors.pin} />
        </View>
      </KeyboardAwareScrollView>
      <View style={[authStyles.buttonContainer, { bottom: bottomInset + 20 }]}>
        <AppButton
          title="Continue"
          textColor="white"
          btnColor="buttonPrimary"
          style={{}}
          onPress={formik.handleSubmit}
          // loading={loading}
          disabled={!(formik.isValid && formik.dirty)}
        />
      </View>
    </>
  );
};

export default CreatePin;

const styles = StyleSheet.create({});
