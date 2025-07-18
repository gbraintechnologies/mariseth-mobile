import ListEmptyComponent from "@/components/ui/listemptycomponent";
import ProfileForm from "@/components/ui/profileform";
import { colors } from "@/constants/colors";
import { endpoints } from "@/constants/endpoints";
import useAuthMutation from "@/hooks/usemutation";
import { userStore } from "@/stores/userstore";
import { handleAuthApiError } from "@/utils/apierrorhandler";
import { handleToastShow } from "@/utils/commonmethods";
import { profileEditSchema } from "@/utils/validationschema";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useToast } from "react-native-toast-notifications";

const AddFarmer = () => {
  const farms = userStore((state) => state.farms);
  const regions = userStore((state) => state.regions);
  if (farms.length < 1) {
    return (
      <View style={styles.emptyContainer}>
        <ListEmptyComponent type="new_farmer" />
      </View>
    );
  }

  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useAuthMutation(
    endpoints.addNewFarmer,
    "POST",
    "addNewFarmer",
    {
      onSuccess: (data) => {
        // console.log(JSON.stringify(data));
        const toastMessage = "Farmer has been added successfully!";
        handleToastShow(toast, toastMessage);
        queryClient
          .invalidateQueries({ queryKey: ["smallholders"] })
          .then(() => {
            router.back();
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
      name: "",
      gender: "",
      email: "",
      address: "",
      village: "",
      region: "",
      district: "",
      country: "Ghana",
      date_of_birth: "",
      phone_number: "",
      type: "add",
      id_type: "",
      id_number: "",
      first_name: "",
      last_name: "",
      other_names: "",
      // areas_of_needed_assistance: "",
      // has_received_support: false,
      // support_assistance: {},
    },
    validationSchema: profileEditSchema,
    onSubmit: async (values) => {
      const {
        name,
        type,
        // areas_of_needed_assistance,
        // has_received_support,
        ...cleanedValues
      } = values;
      cleanedValues.phone_number = `233${cleanedValues.phone_number}`;
      const fullName = name.trim().split(" ");
      cleanedValues.first_name = fullName.shift() || "";
      cleanedValues.last_name = fullName.shift() || "";
      // cleanedValues.other_names = fullName.join(" ") || "";
      // cleanedValues.support_assistance = {
      //   areas_of_needed_assistance: areas_of_needed_assistance,
      //   has_received_support: has_received_support,
      // };
      console.log(cleanedValues);
      mutate(cleanedValues);
    },
  });

  const districts = React.useMemo(
    () =>
      regions.find((region) => region.id === Number(formik.values.region))
        ?.districts || [],
    [formik.values.region]
  );
  return (
    <ProfileForm
      formik={formik}
      isLoading={isLoading}
      type="farmer"
      districts={districts}
      farms={farms}
    />
  );
};

export default AddFarmer;

const styles = StyleSheet.create({
  emptyContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
});
