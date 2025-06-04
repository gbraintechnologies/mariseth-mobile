import { moreLink } from "@/types/more";
import * as Device from "expo-device";
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

export function hasHomeButton(): boolean {
  if (!isIOS) return false;
  const homeButtonModels: string[] = [
    "iPhone 5",
    "iPhone 5s",
    "iPhone SE (1st generation)",
    "iPhone SE (2nd generation)",
    "iPhone SE (3rd generation)",
    "iPhone 6",
    "iPhone 6 Plus",
    "iPhone 6s",
    "iPhone 6s Plus",
    "iPhone 7",
    "iPhone 7 Plus",
    "iPhone 8",
    "iPhone 8 Plus",
  ];
  const model: string | null = Device.modelName;
  return model ? homeButtonModels.includes(model) : false;
}

export const moreLinks: Array<moreLink> = [
  {
    name: "My Information",
    icon: icons.user,
    route: "/more/profileinformation",
  },
  {
    name: "Change Password",
    icon: icons.password,
    route: "/more/changepassword",
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
