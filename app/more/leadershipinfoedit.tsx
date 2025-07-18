import AppButton from "@/components/ui/appbutton";
import AppTextInput from "@/components/ui/apptextinput";
import FormErrorMessage from "@/components/ui/formerrormessage";
import Select from "@/components/ui/select";
import { colors } from "@/constants/colors";
import { endpoints } from "@/constants/endpoints";
import { yesNoOptions } from "@/constants/generalconstants";
import useAuthMutation from "@/hooks/usemutation";
import { userStore } from "@/stores/userstore";
import { handleAuthApiError } from "@/utils/apierrorhandler";
import { handleToastShow } from "@/utils/commonmethods";
import { leadershipExperienceEditSchema } from "@/utils/validationschema";
import { router } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

const LeadershipInfoEdit = () => {
  const user = userStore((state) => state.user);
  const farmerLeadership = user?.farmer?.leadership_experience;
  const bottomInset = useSafeAreaInsets().bottom;
  const toast = useToast();

  const { mutate, isLoading } = useAuthMutation(
    endpoints.updateMyFarmer,
    "PUT",
    "updatemyfarmer",
    {
      onSuccess: (data) => {
        console.log(JSON.stringify(data));
        userStore.setState({ user: data });
        const toastMessage = "Updated successful!";
        handleToastShow(toast, toastMessage);
        setTimeout(() => {
          router.back();
        }, 2000);
      },

      onError: (error: any) => {
        console.log(error);
        handleAuthApiError(error, formik, toast);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      is_mentoring_other_farmers:
        farmerLeadership?.is_mentoring_other_farmers || false,
      number_of_farmers_mentoring:
        farmerLeadership?.number_of_farmers_mentoring || "",
      has_farming_membership: farmerLeadership?.has_farming_membership || false,
      has_received_farming_leadership_training:
        farmerLeadership?.has_received_farming_leadership_training || false,
    },
    validationSchema: leadershipExperienceEditSchema,
    onSubmit: async (values) => {
      const payload = {
        leadership_experience: {
          is_mentoring_other_farmers: values.is_mentoring_other_farmers,
          number_of_farmers_mentoring: values.number_of_farmers_mentoring,
          has_farming_membership: values.has_farming_membership,
          has_received_farming_leadership_training:
            values.has_received_farming_leadership_training,
        },
      };
      console.log(payload);

      mutate(payload);
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
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 150,
        }}
      >
        <Select
          label="Are you currently mentoring other farmers?"
          data={yesNoOptions}
          formik={formik}
          field="is_mentoring_other_farmers"
        />

        <FormErrorMessage
          error={
            (formik.touched.is_mentoring_other_farmers &&
              formik.errors.is_mentoring_other_farmers) as string
          }
        />

        {formik.values.is_mentoring_other_farmers ? (
          <>
            <AppTextInput
              error={
                formik.touched.number_of_farmers_mentoring &&
                formik.errors.number_of_farmers_mentoring
              }
              label="If Yes, how many farmers are you mentoring"
              // placeholder="0"
              style={{
                backgroundColor: isLoading
                  ? colors.backgroundTertiary
                  : colors.backgroundPrimary,
              }}
              value={formik.values.number_of_farmers_mentoring}
              required
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
              keyboardType="numeric"
              onBlur={() =>
                formik.setFieldTouched("number_of_farmers_mentoring")
              }
              onChangeText={formik.handleChange("number_of_farmers_mentoring")}
            />
            <FormErrorMessage
              error={
                (formik.touched.number_of_farmers_mentoring &&
                  formik.errors.number_of_farmers_mentoring) as string
              }
            />
          </>
        ) : null}

        <Select
          label="Membership in Farming Cooperatives/Associations"
          data={yesNoOptions}
          formik={formik}
          field="has_farming_membership"
        />

        <FormErrorMessage
          error={
            (formik.touched.has_farming_membership &&
              formik.errors.has_farming_membership) as string
          }
        />

        <Select
          label="Have you received any leadership or agricultural training?"
          data={yesNoOptions}
          formik={formik}
          field="has_received_farming_leadership_training"
        />

        <FormErrorMessage
          error={
            (formik.touched.has_received_farming_leadership_training &&
              formik.errors.has_received_farming_leadership_training) as string
          }
        />
      </KeyboardAwareScrollView>
      <View
        style={[
          {
            position: "absolute",

            width: "100%",
            paddingHorizontal: 18,
          },
          { bottom: bottomInset + 20 },
        ]}
      >
        <AppButton
          title="Save Changes"
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

export default LeadershipInfoEdit;

const styles = StyleSheet.create({});
