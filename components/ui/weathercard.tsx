import { colors } from "@/constants/colors";
import { largeScreen } from "@/constants/generalconstants";
import { icons } from "@/constants/icons";
import { useCurrentWeather } from "@/hooks/usefetchquery";
import { userStore } from "@/stores/userstore";
import { getWeatherAssets } from "@/utils/commonmethods";
import { format } from "date-fns";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./apptext";

interface weatherCondition {
  icon: string;
  description: string;
  metric: string;
  marginBottom?: number;
}
const WeatherCondition: React.FC<weatherCondition> = ({
  icon,
  description,
  metric,
  marginBottom,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: marginBottom,
      }}
    >
      <Image
        source={icon}
        style={{ height: 32, width: 32, marginRight: 5 }}
        contentFit="contain"
      />
      <View style={{ flexDirection: "column" }}>
        <AppText fontFamily="Bold" fontSize={13} color="white">
          {metric}
        </AppText>

        <AppText fontFamily="SemiBold" fontSize={13} color="white">
          {description}
        </AppText>
      </View>
    </View>
  );
};
const WeatherCard = () => {
  const weatherIconSize = largeScreen ? 133 : 113;
  const { user } = userStore.getState();

  const { data, isLoading, error } = useCurrentWeather(
    user?.farmer?.village ?? "Accra"
  );

  if (isLoading) {
    return (
      <View
        style={[
          styles.weatherSkeletonPlaceholder,
          { backgroundColor: colors.skeletonPlaceholder },
        ]}
      />
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.weatherSkeletonPlaceholder,
          {
            backgroundColor: colors.skeletonPlaceholder,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <AppText fontFamily="SemiBold" fontSize={16} color="textPrimary">
          {error?.message}
        </AppText>
      </View>
    );
  }
  const { icon, gradient } = getWeatherAssets(
    data?.current?.condition?.text as string
  );

  return (
    <LinearGradient
      colors={gradient?.colors as any}
      start={gradient.start}
      end={gradient.end}
      style={styles.weatherContainer}
    >
      <AppText
        fontFamily="SemiBold"
        fontSize={20}
        color="white"
        style={{ textAlign: "center" }}
      >
        {data?.location?.name}
      </AppText>
      <View style={styles.weatherHeaderContainer}>
        <View style={styles.headerIconContainer}>
          <Image
            source={icon}
            style={{ height: weatherIconSize, width: weatherIconSize }}
          />
        </View>
        <View style={styles.weatherDateContainer}>
          <AppText
            fontFamily="SemiBold"
            fontSize={16}
            color="white"
            style={{ textAlign: "center" }}
          >
            {format(new Date(), "EEEE | MMM d")}
          </AppText>
          <View style={styles.weatherTempContainer}>
            <AppText
              fontFamily="SemiBold"
              fontSize={largeScreen ? 70 : 60}
              color="white"
              style={{ textAlign: "center", verticalAlign: "middle" }}
            >
              {data?.current?.temp_c}
            </AppText>
            <AppText
              fontFamily="SemiBold"
              fontSize={30}
              color="white"
              style={{
                verticalAlign: "middle",
                marginBottom: "15%",
              }}
            >
              °
            </AppText>
          </View>
          <AppText
            fontFamily="SemiBold"
            fontSize={16}
            color="white"
            style={{ textAlign: "center" }}
          >
            {data?.current?.condition?.text}
          </AppText>
        </View>
      </View>
      <View style={styles.weatherMetricsContainer}>
        <View style={{ flexDirection: "column" }}>
          <WeatherCondition
            icon={icons.wind}
            description={"Wind"}
            metric={`${data?.current?.wind_kph} km/h`}
            marginBottom={20}
          />
          <WeatherCondition
            icon={icons.pressure}
            description={"Pressure"}
            metric={`${data?.current?.pressure_mb} mbar`}
          />
        </View>

        <View style={{ flexDirection: "column" }}>
          <WeatherCondition
            icon={icons.visibility}
            description={"Visibility"}
            metric={`${data?.current?.vis_km} kmph`}
            marginBottom={20}
          />

          <WeatherCondition
            icon={icons.humidity}
            description={"Humidity"}
            metric={`${data?.current?.humidity} %`}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  weatherContainer: {
    width: "100%",
    flexDirection: "column",
    padding: 16,
    borderRadius: 16,
    marginVertical: 32,
  },
  weatherHeaderContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 24,
    justifyContent: "space-between",
    paddingBottom: 21,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
  },
  headerIconContainer: {
    flexDirection: "column",
    width: "48%",
    alignItems: "center",
    // backgroundColor: "red",
  },
  weatherDateContainer: {
    flexDirection: "column",
    width: "50%",
    // backgroundColor: "blue",
  },
  weatherTempContainer: {
    flexDirection: "row",
    //   marginVertical: 6,
    justifyContent: "center",
    //   backgroundColor: "blue",
  },
  weatherMetricsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 21,
    gap: 40,
  },
  weatherSkeletonPlaceholder: {
    width: "100%",
    height: 344,
    borderRadius: 16,
    marginVertical: 32,
  },
});
