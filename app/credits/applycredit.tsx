import AppButton from "@/components/ui/appbutton";
import AppDatePicker from "@/components/ui/appdatepicker";
import AppText from "@/components/ui/apptext";
import AppTextInput from "@/components/ui/apptextinput";
import FormErrorMessage from "@/components/ui/formerrormessage";
import MetricSelector from "@/components/ui/metricselector";
import SelectModal from "@/components/ui/selectmodal";
import { colors } from "@/constants/colors";
import { endpoints } from "@/constants/endpoints";
import useAuthMutation from "@/hooks/usemutation";
import { userStore } from "@/stores/userstore";
import { handleAuthApiError } from "@/utils/apierrorhandler";
import { handleToastShow } from "@/utils/commonmethods";
import { applyCreditSchema } from "@/utils/validationschema";
import { useQueryClient } from "@tanstack/react-query";
import { addDays, startOfDay } from "date-fns";
import { router } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

const ApplyCredit = () => {
  const metrics = userStore.getState().metrics;
  const quantityMetrics = metrics.filter(
    (metric) => metric.category_name === "quantity_metric"
  );
  const bottomInset = useSafeAreaInsets().bottom;
  // const isLoading = false;
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useAuthMutation(
    endpoints.applyCredit,
    "POST",
    "applycredit",
    {
      onSuccess: (data) => {
        // console.log(data);
        const toastMessage = "Credit applied successfully!";
        handleToastShow(toast, toastMessage);
        queryClient
          .invalidateQueries({ queryKey: ["credit-history"] })
          .then(() => {
            router.navigate("/credits");
          });
      },

      onError: (error: any) => {
        console.log(error);
        handleAuthApiError(error, formik, toast);
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      input_credits: "",
      type: "",
      quantity: "",
      due_date: "",
      credit_amount: "",
      interest_rate: "",
      notes: "",
      quantity_metric: quantityMetrics[0]?.id,
    },
    validationSchema: applyCreditSchema,
    onSubmit: async (values) => {
      console.log(values);
      values.type = values.type.toLowerCase();
      mutate(values);
    },
  });
  const today = startOfDay(new Date());
  const tomorrow = addDays(today, 1);
  return (
    <>
      <KeyboardAwareScrollView
        extraHeight={100}
        extraScrollHeight={100}
        enableOnAndroid={true}
        bounces={false}
        style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 150,
        }}
      >
        <AppTextInput
          error={formik.touched.input_credits && formik.errors.input_credits}
          label="Input Credits"
          style={{
            backgroundColor: isLoading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          required
          value={formik.values.input_credits}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
          keyboardType="default"
          onBlur={() => formik.setFieldTouched("input_credits")}
          onChangeText={formik.handleChange("input_credits")}
        />

        <FormErrorMessage
          error={
            (formik.touched.input_credits &&
              formik.errors.input_credits) as string
          }
        />
        {/* <SelectModal
          label={"Input Credits"}
          placeholder={"Select"}
          data={[
            "Agro Chemicals",
            "Fertilizer",
            "Hybrid Seed",
            "Mechanisation(Ploughing",
          ]}
          field={"input_credits"}
          formik={formik}
          value={formik.values.input_credits}
        />
        <FormErrorMessage
          error={
            (formik.touched.input_credits &&
              formik.errors.input_credits) as string
          }
        /> */}
        {/* <AppTextInput
          error={formik.touched.type && formik.errors.type}
          label="Type"
          style={{
            backgroundColor: isLoading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          required
          value={formik.values.type}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
          keyboardType="default"
          onBlur={() => formik.setFieldTouched("type")}
          onChangeText={formik.handleChange("type")}
        />

        <FormErrorMessage
          error={(formik.touched.type && formik.errors.type) as string}
        /> */}

        <SelectModal
          label={"Type"}
          placeholder={"Select"}
          data={[
            "Agro Chemicals",
            "Fertilizer",
            "Hybrid Seed",
            "Mechanisation(Ploughing",
          ]}
          field={"type"}
          formik={formik}
          value={formik.values.type}
        />
        <FormErrorMessage
          error={(formik.touched.type && formik.errors.type) as string}
        />
        <AppTextInput
          error={formik.touched.quantity && formik.errors.quantity}
          label="Quantity"
          placeholder="0"
          style={{
            backgroundColor: isLoading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          required
          value={formik.values.quantity}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
          keyboardType="numeric"
          onBlur={() => formik.setFieldTouched("quantity")}
          onChangeText={formik.handleChange("quantity")}
          leftComponent={
            <MetricSelector
              label="Quantity Metric"
              formik={formik}
              data={quantityMetrics}
              field="quantity_metric"
            />
          }
        />

        <FormErrorMessage
          error={(formik.touched.quantity && formik.errors.quantity) as string}
        />

        <AppDatePicker
          formik={formik}
          label="Due Date"
          field="due_date"
          value={formik.values.due_date}
          minDate={tomorrow}
          maxDate={null}
          initialDate={new Date()}
        />

        <FormErrorMessage
          error={(formik.touched.due_date && formik.errors.due_date) as string}
        />

        <AppTextInput
          error={formik.touched.credit_amount && formik.errors.credit_amount}
          label="Credit Amount"
          placeholder=""
          style={{
            backgroundColor: isLoading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          required
          value={formik.values.credit_amount}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
          leftComponent={
            <AppText
              color="formInputText"
              fontFamily="Regular"
              fontSize={17}
              style={{ marginRight: 10 }}
            >
              GH₵
            </AppText>
          }
          keyboardType="numeric"
          onBlur={() => formik.setFieldTouched("credit_amount")}
          onChangeText={formik.handleChange("credit_amount")}
        />

        <FormErrorMessage
          error={
            (formik.touched.credit_amount &&
              formik.errors.credit_amount) as string
          }
        />

        <AppTextInput
          error={formik.touched.interest_rate && formik.errors.interest_rate}
          label="Interest Rate"
          // placeholder="8%"
          style={{
            backgroundColor: isLoading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          required
          value={formik.values.interest_rate}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
          leftComponent={
            <AppText
              color="formInputText"
              fontFamily="Regular"
              fontSize={17}
              style={{ marginRight: 10 }}
            >
              %
            </AppText>
          }
          keyboardType="numeric"
          onBlur={() => formik.setFieldTouched("interest_rate")}
          onChangeText={formik.handleChange("interest_rate")}
        />

        <FormErrorMessage
          error={
            (formik.touched.interest_rate &&
              formik.errors.interest_rate) as string
          }
        />

        <AppTextInput
          error={formik.touched.notes && formik.errors.notes}
          label="Extra Information / Notes"
          // placeholder="8%"
          style={{
            backgroundColor: isLoading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          multiline={true}
          textAlignVertical="top"
          TextinputHeight={105}
          value={formik.values.notes}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
          keyboardType="default"
          onBlur={() => formik.setFieldTouched("notes")}
          onChangeText={formik.handleChange("notes")}
        />

        <FormErrorMessage
          error={(formik.touched.notes && formik.errors.notes) as string}
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
          title={"Submit Credit Application"}
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

export default ApplyCredit;

const styles = StyleSheet.create({});
