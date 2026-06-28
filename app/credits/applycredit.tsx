import AppButton from "@/components/ui/appbutton";
import AppText from "@/components/ui/apptext";
import AppTextInput from "@/components/ui/apptextinput";
import ApplyForSelector, {
  ApplyForOption,
} from "@/components/ui/applyforselector";
import FormErrorMessage from "@/components/ui/formerrormessage";
import InputCreditSelector from "@/components/ui/inputcreditselector";
import MetricSelector from "@/components/ui/metricselector";
import SmallFarmerCard from "@/components/ui/smallfarmercard";
import { colors } from "@/constants/colors";
import { endpoints } from "@/constants/endpoints";
import { usePaginatedInfiniteQuery } from "@/hooks/usefetchquery";
import useAuthMutation from "@/hooks/usemutation";
import { userStore } from "@/stores/userstore";
import { inputCredit, inputCreditCategory } from "@/types/credit";
import { handleAuthApiError } from "@/utils/apierrorhandler";
import { handleToastShow } from "@/utils/commonmethods";
import { applyCreditSchema } from "@/utils/validationschema";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { useStore } from "zustand";

const ApplyCredit = () => {
  const user = useStore(userStore, (state) => state.user);
  const isLeaderFarmer = user?.farmer?.type === "lead";
  const metrics = userStore.getState().metrics;
  const quantityMetrics = metrics.filter(
    (metric) => metric.category_name === "quantity_metric"
  );
  const inputCredits = useStore(userStore, (state) => state.inputCredits);

  const creditCategories = (metrics.filter(
    (category) => category.category_name === "input_credits_category"
  ) || []) as inputCreditCategory[];

  const { items: farmers } = usePaginatedInfiniteQuery<any>(
    endpoints.myFarmers,
    "smallholders",
    {
      page_size: 10,
      query: "",
    }
  );

  const recentlyAddedFarmers = farmers?.slice(0, 7) ?? [];

  const bottomInset = useSafeAreaInsets().bottom;
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useAuthMutation(
    endpoints.applyCredit,
    "POST",
    "applycredit",
    {
      onSuccess: () => {
        handleToastShow(toast, "Credit applied successfully!");
        queryClient
          .invalidateQueries({ queryKey: ["credit-history"] })
          .then(() => {
            router.navigate("/credits");
          });
      },
      onError: (error: any) => {
        handleAuthApiError(error, formik, toast);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      apply_for: "myself" as ApplyForOption,
      farmer_ids: [] as number[],
      input_credit_category: "",
      input_credit: "",
      quantity: "",
      notes: "",
      quantity_metric: quantityMetrics[0]?.id,
    },
    validationSchema: applyCreditSchema,
    onSubmit: async (values) => {
      mutate(values);
    },
  });

  const inputCreditsArray = React.useMemo(
    () =>
      inputCredits.filter(
        (credit) =>
          Number(credit?.category.id) ===
          Number(formik.values.input_credit_category)
      ) || [],
    [formik.values.input_credit_category, inputCredits]
  ) as inputCredit[];

  const isMyFarmer = formik.values.apply_for === "my_farmer";

  const toggleFarmerSelection = (farmerId: number) => {
    const currentIds = formik.values.farmer_ids;
    const nextIds = currentIds.includes(farmerId)
      ? currentIds.filter((id) => id !== farmerId)
      : [...currentIds, farmerId];

    formik.setFieldValue("farmer_ids", nextIds);
    formik.setFieldTouched("farmer_ids", true, false);
  };

  return (
    <View style={styles.screen}>
      <KeyboardAwareScrollView
        extraHeight={100}
        extraScrollHeight={100}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        bounces={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.formSection}>
          {isLeaderFarmer ? (
            <>
              <ApplyForSelector
                value={formik.values.apply_for}
                onChange={(value) => {
                  formik.setFieldValue("apply_for", value);
                  formik.setFieldValue("farmer_ids", []);
                }}
              />
              <FormErrorMessage
                error={
                  (formik.touched.apply_for &&
                    formik.errors.apply_for) as string
                }
              />
            </>
          ) : null}

          <InputCreditSelector
            label="Input Credit Category"
            placeholder="Select category"
            data={creditCategories}
            field="input_credit_category"
            formik={formik}
            value={formik.values.input_credit_category}
          />
          <FormErrorMessage
            error={
              (formik.touched.input_credit_category &&
                formik.errors.input_credit_category) as string
            }
          />

          <InputCreditSelector
            label="Input Credit"
            placeholder="Select input credit"
            data={inputCreditsArray}
            field="input_credit"
            formik={formik}
            value={formik.values.input_credit}
          />
          <FormErrorMessage
            error={
              (formik.touched.input_credit &&
                formik.errors.input_credit) as string
            }
          />

          <AppTextInput
            error={formik.touched.quantity && formik.errors.quantity}
            label="Quantity"
            placeholder="Enter quantity"
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
            error={
              (formik.touched.quantity && formik.errors.quantity) as string
            }
          />

          <AppTextInput
            error={formik.touched.notes && formik.errors.notes}
            label="Extra Information / Notes"
            placeholder="Add any extra information"
            style={{
              backgroundColor: isLoading
                ? colors.backgroundTertiary
                : colors.backgroundPrimary,
            }}
            multiline={true}
            textAlignVertical="top"
            TextinputHeight={102}
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
        </View>

        {isLeaderFarmer && recentlyAddedFarmers.length > 0 ? (
          <View style={styles.recentlyAddedSection}>
            <AppText fontFamily="SemiBold" fontSize={16} color="black">
              Recently Added
            </AppText>

            <View style={styles.recentlyAddedList}>
              {recentlyAddedFarmers.map((item, index) => (
                <SmallFarmerCard
                  key={item.id}
                  item={item}
                  showNewBadge={!isMyFarmer && index < 5}
                  showCheckbox={isMyFarmer}
                  checked={formik.values.farmer_ids.includes(item.id)}
                  onCheckToggle={() => toggleFarmerSelection(item.id)}
                />
              ))}
            </View>

            <FormErrorMessage
              error={
                (formik.touched.farmer_ids &&
                  formik.errors.farmer_ids) as string
              }
            />
          </View>
        ) : null}
      </KeyboardAwareScrollView>

      <View style={[styles.footer, { paddingBottom: bottomInset + 23 }]}>
        <AppButton
          title="Apply Now"
          textColor="white"
          btnColor="buttonPrimary"
          borderRadius={8}
          onPress={formik.submitForm}
          loading={isLoading}
          disabled={!(formik.isValid && formik.dirty)}
        />
      </View>
    </View>
  );
};

export default ApplyCredit;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
    gap: 32,
  },
  formSection: {
    gap: 24,
  },
  recentlyAddedSection: {
    gap: 12,
  },
  recentlyAddedList: {
    width: "100%",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingTop: 23,
    paddingHorizontal: 18,
  },
});
