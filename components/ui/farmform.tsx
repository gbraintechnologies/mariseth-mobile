import { colors } from "@/constants/colors";
import { booleanOptions } from "@/constants/generalconstants";
import { userStore } from "@/stores/userstore";
import { FormikProps } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppButton from "./appbutton";
import AppTextInput from "./apptextinput";
import FarmProductsSelector from "./farmproductsselector";
import FormErrorMessage from "./formerrormessage";
import MetricSelector from "./metricselector";
import RegionSelector from "./regionselector";
import Select from "./select";
import SelectModal from "./selectmodal";
interface farmFormProps {
  formik: FormikProps<any>;
  isLoading: boolean;
  type?: "add" | "edit";
  districts: { id: number; name: string }[];
}
const FarmForm: React.FC<farmFormProps> = ({
  formik,
  isLoading,
  type = "edit",
  districts,
}) => {
  const bottomInset = useSafeAreaInsets().bottom;

  const regions = userStore((state) => state.regions);
  const metrics = userStore.getState().metrics;
  const farmProducts = userStore.getState().farmProducts;
  const sizeMetrics = metrics.filter(
    (metric) => metric.category_name === "size_metric"
  );
  const cropProducts = farmProducts.filter(
    (product) => product.type === "crop"
  );
  const livestockProducts = farmProducts.filter(
    (product) => product.type === "livestock"
  );

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
          error={formik.errors.name}
          label="Farm Name"
          style={{
            backgroundColor: isLoading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          required
          value={formik.values.name}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
          keyboardType="default"
          onBlur={() => formik.setFieldTouched("name")}
          onChangeText={formik.handleChange("name")}
        />

        <FormErrorMessage error={formik.errors.name as string} />

        <AppTextInput
          error={formik.touched.location && formik.errors.location}
          label="Location (GPS Coordinates if available)"
          style={{
            backgroundColor: isLoading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          required={true}
          value={formik.values.location}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
          keyboardType="default"
          onBlur={() => formik.setFieldTouched("location")}
          onChangeText={formik.handleChange("location")}
        />

        <FormErrorMessage
          error={(formik.touched.location && formik.errors.location) as string}
        />

        {/* <SelectModal
          label={"Region"}
          placeholder={"Select Region"}
          data={districts}
          field={"region"}
          formik={formik}
          value={formik.values.region}
        /> */}
        <RegionSelector
          label="Region"
          placeholder="Select a region"
          data={regions}
          field="region"
          formik={formik}
          value={formik.values.region}
        />

        <FormErrorMessage
          error={(formik.touched.region && formik.errors.region) as string}
        />

        {/* <SelectModal
          label={"District"}
          placeholder={"Select District"}
          data={districts}
          field={"region"}
          formik={formik}
          value={formik.values.region}
        />

        <FormErrorMessage
          error={(formik.touched.region && formik.errors.region) as string}
        /> */}

        <RegionSelector
          label="District"
          placeholder="Select District"
          data={districts}
          field="district"
          formik={formik}
          value={formik.values.district}
        />

        <FormErrorMessage error={formik.errors.district} />

        <AppTextInput
          error={formik.touched.size && formik.errors.size}
          label="Total Land Size"
          style={{
            backgroundColor: isLoading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          required={true}
          value={formik.values.size}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
          keyboardType="numeric"
          onBlur={() => formik.setFieldTouched("size")}
          onChangeText={formik.handleChange("size")}
          leftComponent={
            <MetricSelector
              label="Size Metric"
              formik={formik}
              data={sizeMetrics}
              field="size_metric"
            />
          }
        />

        <FormErrorMessage
          error={(formik.touched.size && formik.errors.size) as string}
        />

        <SelectModal
          label={"Land Ownership"}
          placeholder={"Select"}
          data={["Owned", "Leased", "Communal", "Rented"]}
          field={"land_ownership"}
          formik={formik}
          value={formik.values.land_ownership}
        />

        <FormErrorMessage
          error={
            (formik.touched.land_ownership &&
              formik.errors.land_ownership) as string
          }
        />
        {/* 
        <MultiSelectModal
          label="Main Crops"
          placeholder="Select"
          data={cropsData}
          field="main_crops"
          formik={formik}
          value={formik.values.crops}
        /> */}

        <FarmProductsSelector
          label="Main Crops"
          placeholder="Select"
          data={cropProducts}
          field="crops"
          formik={formik}
          value={formik.values.crops}
        />

        <FormErrorMessage
          error={(formik.touched.crops && formik.errors.crops) as string}
        />

        {/* <MultiSelectModal
          label="Livestock Kept"
          placeholder="Select"
          data={livestockData}
          field="livestock"
          formik={formik}
          value={formik.values.livestock}
        /> */}
        <FarmProductsSelector
          label="Livestock Kept"
          placeholder="Select"
          data={livestockProducts}
          field="livestock"
          formik={formik}
          value={formik.values.livestock}
        />

        <FormErrorMessage
          error={
            (formik.touched.livestock && formik.errors.livestock) as string
          }
        />

        <SelectModal
          label={"Use of Fertilizers"}
          placeholder={"Select"}
          data={["Chemical", "Organic", "None"]}
          field={"use_of_fertilizers"}
          formik={formik}
          value={formik.values.use_of_fertilizers}
        />

        <FormErrorMessage
          error={
            (formik.touched.use_of_fertilizers &&
              formik.errors.use_of_fertilizers) as string
          }
        />

        <SelectModal
          label={"Farming Methods"}
          placeholder={"Select"}
          data={["Organic", "Conventional", "Mixed"]}
          field={"farming_methods"}
          formik={formik}
          value={formik.values.farming_methods}
        />

        <FormErrorMessage
          error={
            (formik.touched.farming_methods &&
              formik.errors.farming_methods) as string
          }
        />

        <Select
          label="Irrigation"
          data={booleanOptions}
          formik={formik}
          field="irrigation"
        />

        <FormErrorMessage
          error={
            (formik.touched.irrigation && formik.errors.irrigation) as string
          }
        />

        <Select
          label="Access to Market"
          data={booleanOptions}
          formik={formik}
          field="has_access_to_market"
        />

        <FormErrorMessage
          error={
            (formik.touched.has_access_to_market &&
              formik.errors.has_access_to_market) as string
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
          title={"Save Changes"}
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

export default FarmForm;

const styles = StyleSheet.create({});
