import AppButton from "@/components/ui/appbutton";
import AppTextInput from "@/components/ui/apptextinput";
import FormErrorMessage from "@/components/ui/formerrormessage";
import { colors } from "@/constants/colors";
import { endpoints } from "@/constants/endpoints";
import useAuthMutation from "@/hooks/usemutation";
import { authStyles } from "@/styles/auth";
import { handleAuthApiError, handleToastShow } from "@/utils/commonmethods";
import { pinUpdateSchema } from "@/utils/validationschema";
import { router } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

const ChangePassword = () => {
  const bottomInset = useSafeAreaInsets().bottom;
  const toast = useToast();
  const { mutate, isLoading } = useAuthMutation(
    endpoints.updatePin,
    "PATCH",
    "pinupdate",
    {
      onSuccess: (data) => {
        console.log(data);
        handleToastShow(toast, "Pin updated successfully");
        formik.resetForm();
        setTimeout(() => {
          router.back();
        }, 500);
      },

      onError: (error: any) => {
        handleAuthApiError(error, formik, toast);
      },
    }
  );
  const formik = useFormik({
    initialValues: { old_pin: "", new_pin: "" },
    validationSchema: pinUpdateSchema,
    onSubmit: async (values: { old_pin: string; new_pin: string | null }) => {
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
        contentContainerStyle={{ padding: 18 }}
      >
        <AppTextInput
          error={formik.touched.old_pin && formik.errors.old_pin}
          label="Old Pin"
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
          onBlur={() => formik.setFieldTouched("old_pin")}
          onChangeText={formik.handleChange("old_pin")}
        />

        <FormErrorMessage
          error={(formik.touched.old_pin && formik.errors.old_pin) as string}
        />

        <AppTextInput
          error={formik.touched.new_pin && formik.errors.new_pin}
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
          onBlur={() => formik.setFieldTouched("new_pin")}
          onChangeText={formik.handleChange("new_pin")}
        />

        <FormErrorMessage
          error={(formik.touched.new_pin && formik.errors.new_pin) as string}
        />
      </KeyboardAwareScrollView>

      <View style={[authStyles.buttonContainer, { bottom: bottomInset + 20 }]}>
        <AppButton
          title="Update"
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

export default ChangePassword;

const styles = StyleSheet.create({});
