import { colors } from "@/constants/colors";
import { genderOptions } from "@/constants/generalconstants";
import { userStore } from "@/stores/userstore";
import { myFarm1 } from "@/types/farm";
import { subYears } from "date-fns";
import { FormikProps } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppButton from "./appbutton";
import AppDatePicker from "./appdatepicker";
import AppText from "./apptext";
import AppTextInput from "./apptextinput";
import FormErrorMessage from "./formerrormessage";
import IDSelector from "./idselector";
import RegionSelector from "./regionselector";
import Select from "./select";
interface profileFormProps {
  formik: FormikProps<any>;
  isLoading: boolean;
  type?: "profile" | "farmer";
  districts?: { id: number; name: string }[];
  farms?: myFarm1[];
}
const ProfileForm: React.FC<profileFormProps> = ({
  formik,
  isLoading,
  type = "profile",
  districts = [],
  farms = [],
}) => {
  const regions = userStore((state) => state.regions);
  //  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const bottomInset = useSafeAreaInsets().bottom;
  return (
    <>
      <KeyboardAwareScrollView
        extraHeight={150}
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
        <AppTextInput
          error={formik.errors.name}
          label="Name"
          style={{
            backgroundColor: isLoading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          required
          value={formik.values.name}
          autoCapitalize="none"
          textContentType="name"
          autoCorrect={false}
          editable={!isLoading}
          keyboardType="default"
          onBlur={() => formik.setFieldTouched("name")}
          onChangeText={formik.handleChange("name")}
        />

        <FormErrorMessage error={formik.errors.name as string} />

        <Select
          label="Gender"
          data={genderOptions}
          formik={formik}
          field="gender"
        />

        <FormErrorMessage
          error={(formik.touched.gender && formik.errors.gender) as string}
        />

        <AppDatePicker
          formik={formik}
          field="date_of_birth"
          value={formik.values.date_of_birth}
          initialDate={
            formik?.values?.date_of_birth
              ? new Date(formik.values.date_of_birth)
              : subYears(new Date(), 7)
          }
        />

        <FormErrorMessage
          error={
            (formik.touched.date_of_birth &&
              formik.errors.date_of_birth) as string
          }
        />

        <IDSelector
          label={"ID Type"}
          placeholder={"Select ID Type"}
          data={[
            { name: "Ghana Card", value: "ghana_card" },
            { name: "Passport", value: "passport" },
          ]}
          field={"id_type"}
          formik={formik}
          // value={formik.values.id_type}
        />
        <FormErrorMessage
          error={(formik.touched.id_type && formik.errors.id_type) as string}
        />
        <AppTextInput
          error={formik.touched.id_number && formik.errors.id_number}
          label="ID Number"
          placeholder="type here"
          style={{
            backgroundColor: isLoading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          required
          autoCapitalize="none"
          value={formik.values.id_number}
          autoCorrect={false}
          editable={!isLoading}
          keyboardType="default"
          onBlur={() => formik.setFieldTouched("id_number")}
          onChangeText={formik.handleChange("id_number")}
        />

        <FormErrorMessage
          error={
            (formik.touched.id_number && formik.errors.id_number) as string
          }
        />

        {type === "farmer" && (
          <>
            <AppTextInput
              error={formik.touched.phone_number && formik.errors.phone_number}
              label="Contact Number"
              placeholder="type here"
              style={{
                backgroundColor: isLoading
                  ? colors.backgroundTertiary
                  : colors.backgroundPrimary,
              }}
              required
              autoCapitalize="none"
              value={formik.values.phone_number}
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
              maxLength={10}
              editable={!isLoading}
              keyboardType="phone-pad"
              onBlur={() => formik.setFieldTouched("phone_number")}
              onChangeText={formik.handleChange("phone_number")}
            />
            <FormErrorMessage
              error={
                (formik.touched.phone_number &&
                  formik.errors.phone_number) as string
              }
            />
          </>
        )}

        <AppTextInput
          error={formik.touched.email && formik.errors.email}
          label="Email"
          placeholder="type here"
          style={{
            backgroundColor: isLoading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          required
          textContentType="emailAddress"
          autoCapitalize="none"
          value={formik.values.email}
          autoCorrect={false}
          editable={!isLoading}
          keyboardType="email-address"
          onBlur={() => formik.setFieldTouched("email")}
          onChangeText={formik.handleChange("email")}
        />

        <FormErrorMessage
          error={(formik.touched.email && formik.errors.email) as string}
        />

        <AppTextInput
          error={formik.touched.address && formik.errors.address}
          label="Address"
          placeholder="type here"
          style={{
            backgroundColor: isLoading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          required
          autoCapitalize="none"
          value={formik.values.address}
          autoCorrect={false}
          editable={!isLoading}
          keyboardType="default"
          onBlur={() => formik.setFieldTouched("address")}
          onChangeText={formik.handleChange("address")}
        />

        <FormErrorMessage
          error={(formik.touched.address && formik.errors.address) as string}
        />
        <AppTextInput
          error={formik.touched.village && formik.errors.village}
          label="Village/Community"
          placeholder="type here"
          style={{
            backgroundColor: isLoading
              ? colors.backgroundTertiary
              : colors.backgroundPrimary,
          }}
          required
          autoCapitalize="none"
          value={formik.values.village}
          autoCorrect={false}
          editable={!isLoading}
          keyboardType="default"
          onBlur={() => formik.setFieldTouched("village")}
          onChangeText={formik.handleChange("village")}
        />

        <FormErrorMessage
          error={(formik.touched.village && formik.errors.village) as string}
        />

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
          field={"district"}
          formik={formik}
          value={formik.values.district}
        />

        <FormErrorMessage
          error={(formik.touched.district && formik.errors.district) as string}
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

        {type === "farmer" ? (
          <>
            {/* <SelectModal
              label={"Select Farm Here"}
              placeholder={"Select Farm"}
              data={["Gaharwa", "Gaharw", "Gaha", "Gah"]}
              field={"farm"}
              formik={formik}
              value={formik.values.farm}
            />
            <FormErrorMessage
              error={(formik.touched.farm && formik.errors.farm) as string}
            /> */}

            <RegionSelector
              label="Select Farm Here"
              placeholder="Select a farm"
              data={farms}
              field="farm"
              formik={formik}
              value={formik.values.farm}
            />

            <FormErrorMessage
              error={(formik.touched.farm && formik.errors.farm) as string}
            />
          </>
        ) : null}
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
          title={type === "profile" ? "Save Changes" : "Create Farmer"}
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

export default ProfileForm;

const styles = StyleSheet.create({});
