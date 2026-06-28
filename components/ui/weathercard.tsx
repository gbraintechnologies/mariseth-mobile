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
import { Pressable, StyleSheet, View } from "react-native";
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
interface WeatherCardProps {
  variant?: "default" | "hero" | "farm";
  location?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  variant = "default",
  location: locationOverride,
}) => {
  const weatherIconSize = largeScreen ? 133 : 113;
  const { user } = userStore.getState();
  const weatherLocation =
    locationOverride ?? user?.farmer?.village ?? "Accra";

  const { data, isLoading, error } = useCurrentWeather(weatherLocation);

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
  const chanceOfRain =
    data?.forecast?.forecastday?.[0]?.day?.daily_chance_of_rain ?? 0;

  return (
    <LinearGradient
      colors={gradient?.colors as any}
      start={gradient.start}
      end={gradient.end}
      style={[
        styles.weatherContainer,
        variant === "hero" && styles.weatherContainerHero,
        variant === "farm" && styles.weatherContainerFarm,
      ]}
    >
      <View style={styles.weatherToolbar}>
        <Pressable style={styles.weatherToolbarButton}>
          <AppText fontFamily="SemiBold" fontSize={22} color="white">
            +
          </AppText>
        </Pressable>

        <View style={styles.weatherLocationContainer}>
          <AppText
            fontFamily="SemiBold"
            fontSize={16}
            color="white"
            style={{ textAlign: "center" }}
          >
            {data?.location?.name}
          </AppText>
          <View style={styles.weatherDots}>
            <View style={[styles.weatherDot, styles.weatherDotActive]} />
            <View style={styles.weatherDot} />
            <View style={styles.weatherDot} />
          </View>
        </View>

        <Pressable style={styles.weatherToolbarButton}>
          <View style={styles.overflowMenu}>
            <View style={styles.overflowDot} />
            <View style={styles.overflowDot} />
            <View style={styles.overflowDot} />
          </View>
        </Pressable>
      </View>

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
            icon={icons.rainn}
            description={"Chance of rain"}
            metric={`${chanceOfRain}%`}
            marginBottom={20}
          />

          <WeatherCondition
            icon={icons.humidity}
            description={"Humidity"}
            metric={`${data?.current?.humidity}%`}
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
  },
  weatherContainerHero: {
    borderRadius: 30,
  },
  weatherContainerFarm: {
    borderRadius: 16,
  },
  weatherToolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  weatherToolbarButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  weatherLocationContainer: {
    alignItems: "center",
    flex: 1,
  },
  weatherDots: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  weatherDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.white,
  },
  weatherDotActive: {
    backgroundColor: colors.white,
  },
  overflowMenu: {
    gap: 4,
    alignItems: "center",
  },
  overflowDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.white,
  },
  weatherHeaderContainer: {
    flexDirection: "row",
    width: "100%",
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
  },
});
