import { colors } from "@/constants/colors";
import { largeScreen } from "@/constants/generalconstants";
import { icons } from "@/constants/icons";
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
  return (
    <LinearGradient
      colors={["#919191", "#4C5156"]}
      start={{ x: 0.17, y: 0.24 }}
      end={{ x: 0.83, y: 0.76 }}
      style={styles.weatherContainer}
    >
      <AppText
        fontFamily="SemiBold"
        fontSize={20}
        color="white"
        style={{ textAlign: "center" }}
      >
        Bolgatanga
      </AppText>
      <View style={styles.weatherHeaderContainer}>
        <View style={styles.headerIconContainer}>
          <Image
            source={icons.cloudy}
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
            Sunday | Nov 14
          </AppText>
          <View style={styles.weatherTempContainer}>
            <AppText
              fontFamily="SemiBold"
              fontSize={73}
              color="white"
              style={{ textAlign: "center", verticalAlign: "middle" }}
            >
              24
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
            Cloudy
          </AppText>
        </View>
      </View>
      <View style={styles.weatherMetricsContainer}>
        <View style={{ flexDirection: "column" }}>
          <WeatherCondition
            icon={icons.wind}
            description={"Wind"}
            metric={"3.7 km/h"}
            marginBottom={20}
          />
          <WeatherCondition
            icon={icons.pressure}
            description={"Pressure"}
            metric={"1010 mbar"}
          />
        </View>

        <View style={{ flexDirection: "column" }}>
          <WeatherCondition
            icon={icons.rainn}
            description={"Chance of rain"}
            metric={"74%"}
            marginBottom={20}
          />

          <WeatherCondition
            icon={icons.humidity}
            description={"Humidity"}
            metric={"83%"}
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
});
