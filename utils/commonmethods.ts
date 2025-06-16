import { weatherBackgrounds } from "@/constants/generalconstants";
import { icons } from "@/constants/icons";
import { useUniversalStore } from "@/stores/useuniversalstore";

export function getInitials(name: string): string {
  if (typeof name !== "string" || !name.trim()) return "";

  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  return initials;
}

export function updateSegmentedOption(key: string, option: string) {
  useUniversalStore.setState((state) => ({
    selectedSegmentedOption: {
      ...state.selectedSegmentedOption,
      key: option,
    },
  }));
}

export function handleToastShow(
  toast: any,
  message: string,
  async: boolean = false
) {
  toast.show(`${message}`, {
    type: "custom_type",
    placement: "bottom",
    duration: async ? 10000 : 3500,
    animationType: "slide-in",
  });
}

export function handleAuthApiError(error: any, formik: any, toast: any) {
  const { problem, message } = error;

  console.log(JSON.stringify(error));

  if ((formik && problem === "CLIENT_ERROR") || problem === "SERVER_ERROR") {
    if (Array.isArray(message)) {
      formik.setErrors({
        phone_number: message[0],
        pin: message[0],
      });
    }
    if (message?.phone_number) {
      formik.setErrors({ phone_number: message?.phone_number[0] });
    }
    if (message?.non_field_errors) {
      formik.setErrors({
        phone_number: message?.non_field_errors[0],
        pin: message?.non_field_errors[0],
        code: message?.non_field_errors[0],
        old_pin: message?.non_field_errors[0],
      });
    }
    if (message?.pin) {
      formik.setErrors({
        pin: message?.pin[0],
      });
    }
  } else {
    const errorMessages: Record<string, string> = {
      CONNECTION_ERROR:
        "Oops! You're offline. Check your internet and try again.",
      NETWORK_ERROR: "Oops! You're offline. Check your internet and try again.",
      TIMEOUT_ERROR: "Request timed out. Check your connection and try again",
    };

    const toastMessage =
      errorMessages[problem] ||
      "Oops! Something went wrong. Please try again in a moment.";
    handleToastShow(toast, toastMessage);
  }
}

export function dataEncoder<T>(data: T) {
  return encodeURIComponent(JSON.stringify(data));
}

export function dataDecoder(data: string) {
  return JSON.parse(decodeURIComponent(data));
}

export function getWeatherAssets(description: string) {
  const lowerDesc = description.toLowerCase();

  if (lowerDesc.includes("thunder"))
    return {
      icon: icons.thunderStorm,
      gradient: weatherBackgrounds.thunderStorm,
    };

  if (lowerDesc.includes("heavy rain"))
    return {
      icon: icons.heavyRain,
      gradient: weatherBackgrounds.heavyRain,
    };

  if (
    lowerDesc.includes("rain") ||
    lowerDesc.includes("drizzle") ||
    lowerDesc.includes("sleet")
  )
    return {
      icon: icons.rainy,
      gradient: weatherBackgrounds.rainy,
    };

  if (
    lowerDesc.includes("snow") ||
    lowerDesc.includes("blizzard") ||
    lowerDesc.includes("ice")
  )
    return {
      icon: icons.cloudy,
      gradient: weatherBackgrounds.cloudy,
    };

  if (
    lowerDesc.includes("cloud") ||
    lowerDesc.includes("overcast") ||
    lowerDesc.includes("fog") ||
    lowerDesc.includes("mist")
  )
    return {
      icon: icons.cloudy,
      gradient: weatherBackgrounds.cloudy,
    };

  if (lowerDesc.includes("sun") || lowerDesc.includes("clear"))
    return {
      icon: icons.sunny,
      gradient: weatherBackgrounds.sunny,
    };

  if (lowerDesc.includes("wind") || lowerDesc.includes("blowing"))
    return {
      icon: icons.windy,
      gradient: weatherBackgrounds.windy,
    };

  return {
    icon: icons.cloudy,
    gradient: weatherBackgrounds.cloudy,
  };
}
