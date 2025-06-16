import { moreLink } from "@/types/more";
import { Dimensions, Platform } from "react-native";
import { icons } from "./icons";
export const isIOS = Platform.OS === "ios";

export const { height, width } = Dimensions.get("window");
export const largeScreen = height > 700;
export const universalBlurhash = "U8PQNp9GIU~W00WBRjoLRj?H%L9G-;s:%2WB";
export const permissionContent = {
  title: "Permission Denied",
  notification:
    "Notification permission is required to use this feature. Kindly enable it in settings to stay updated.",
};

// export function hasHomeButton(): boolean {
//   if (!isIOS) return false;
//   const homeButtonModels: string[] = [
//     "iPhone 5",
//     "iPhone 5s",
//     "iPhone SE (1st generation)",
//     "iPhone SE (2nd generation)",
//     "iPhone SE (3rd generation)",
//     "iPhone 6",
//     "iPhone 6 Plus",
//     "iPhone 6s",
//     "iPhone 6s Plus",
//     "iPhone 7",
//     "iPhone 7 Plus",
//     "iPhone 8",
//     "iPhone 8 Plus",
//   ];
//   const model: string | null = Device.modelName;
//   return model ? homeButtonModels.includes(model) : false;
// }

export const moreLinks: Array<moreLink> = [
  {
    name: "My Information",
    icon: icons.user,
    route: "/more/profileinformation",
  },
  {
    name: "Change Pin",
    icon: icons.password,
    route: "/more/changepin",
  },
  {
    name: "Help & Support",
    icon: icons.dialog,
    route: "/(tabs)/more",
  },
  {
    name: "Log out",
    icon: icons.logout,
    route: "/(tabs)/more",
  },
];

export const weatherBackgrounds = {
  heavyRain: {
    colors: ["#62B8F6", "#2C79C1"],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  cloudy: {
    colors: ["#919191", "#4C5156"],
    start: { x: 0.25, y: 0 },
    end: { x: 0.75, y: 1 },
  },
  thunderStorm: {
    colors: ["#235A82", "#123556"],
    start: { x: 0.2, y: 0 },
    end: { x: 0.8, y: 1 },
  },
  windy: {
    colors: ["#97D3FF", "#4F99DE"],
    start: { x: 0.3, y: 0 },
    end: { x: 0.8, y: 1 }, // ~120deg
  },
  rainy: {
    colors: ["#57B9FF", "#014788"],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 }, // 180deg
  },
  sunny: {
    colors: ["#FFED9E", "#F4BE0B"],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 }, // 180deg
  },
};
