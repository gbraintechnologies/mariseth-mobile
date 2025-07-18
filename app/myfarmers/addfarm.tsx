import FarmForm from "@/components/ui/farmform";
import { endpoints } from "@/constants/endpoints";
import useAuthMutation from "@/hooks/usemutation";
import { userStore } from "@/stores/userstore";
import { handleAuthApiError } from "@/utils/apierrorhandler";
import { handleToastShow } from "@/utils/commonmethods";
import { adddFarmerSchema } from "@/utils/validationschema";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import { StyleSheet } from "react-native";
import { useToast } from "react-native-toast-notifications";

const AddFarm = () => {
  const toast = useToast();

  const metrics = userStore.getState().metrics;
  const sizeMetrics = metrics.filter(
    (metric) => metric.category_name === "size_metric"
  );
  const regions = userStore((state) => state.regions);

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useAuthMutation(
    `${endpoints.addNewFarm}`,
    "POST",
    "addfarm",
    {
      onSuccess: (data) => {
        console.log(JSON.stringify(data));
        const toastMessage = "Farm has been added successfully!";
        handleToastShow(toast, toastMessage);
        queryClient
          .invalidateQueries({ queryKey: ["leadfarmersfarms"] })
          .then(() => {
            // userStore.setState({ user: { ...user  } });
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
      farm_type: "external",
      name: "",
      location: "",
      region: "",
      district: "",
      size: "",
      size_metric: sizeMetrics[0]?.id || "",
      land_ownership: "",
      crops: [],
      livestock: [],
      use_of_fertilizers: [],
      farming_methods: [],
      irrigation: false,
      has_access_to_market: false,
    },
    validationSchema: adddFarmerSchema,
    onSubmit: async (values) => {
      // console.log(values);

      mutate(values);
    },
  });

  const districts = React.useMemo(
    () =>
      regions.find((region) => region.id === Number(formik.values.region))
        ?.districts || [],
    [formik.values.region]
  );
  return (
    <FarmForm
      formik={formik}
      isLoading={isLoading}
      type="add"
      districts={districts}
    />
  );
};

export default AddFarm;

const styles = StyleSheet.create({});
