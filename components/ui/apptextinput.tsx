import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/colors";
import { isIOS, largeScreen } from "@/constants/generalconstants";
import { icons } from "@/constants/icons";
import { Image } from "expo-image";
import AppText from "./apptext";

interface AppTextInputProps {
  color?: string;
  Inputstyle?: any;
  style?: any;
  marginLeft?: number;

  marginRight?: number;
  Required?: boolean;
  Width?: string;
  placeholderTextColor?: string;
  placeholder?: string;
  TextinputHeight?: any;
  secureTextEntry?: boolean;
  [key: string]: any;
  borderRadius?: number;
  textAlignVertical?: string;
  label?: string;
  error?: any;
  phoneEntry?: boolean;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  color,
  Inputstyle,
  style,
  marginLeft,
  marginRight,
  Required,
  Width = "100%",
  placeholderTextColor = colors.formInputText,
  placeholder = "",
  secureTextEntry,
  TextinputHeight = largeScreen ? 54 : 49,

  borderRadius = 10,
  textAlignVertical,
  phoneEntry,
  label,
  error,
  ...otherProps
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const eyeIconColor = error ? colors.error : colors.primary;
  const customColor = error
    ? colors.error
    : isFocused
    ? colors.primary
    : colors.formBorder;
  return (
    <>
      {label ? (
        <AppText
          fontSize={14}
          fontFamily="SemiBold"
          style={{ marginBottom: 8 }}
        >
          {label}
        </AppText>
      ) : null}

      <View
        style={[
          styles.Container,
          style,
          {
            marginLeft,
            marginRight,
            height: TextinputHeight,
            borderColor: customColor,
            borderRadius: borderRadius,

            // boxShadow: isFocused ? "0 0 0 3 #27FE792B" : undefined,
          },
        ]}
      >
        {phoneEntry && (
          <AppText
            color="formInputText"
            fontFamily="Regular"
            fontSize={17}
            style={{ marginRight: 10 }}
          >
            +233
          </AppText>
        )}

        <TextInput
          style={[
            Inputstyle,
            {
              flex: 1,
              height: "100%",
              fontFamily: "Regular",
              color: colors.formInputText,
              fontSize: 17,
              // backgroundColor: "red",
              justifyContent: "center",
              textAlignVertical: textAlignVertical
                ? textAlignVertical
                : "center",
            },
          ]}
          {...(isIOS
            ? {}
            : {
                selectionColor: colors.backgroundSecondary,
                selectionHandleColor: colors.primary,
                cursorColor: colors?.formInputText,
              })}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          autoCapitalize="none"
          {...otherProps}
          onFocus={() => setIsFocused(true)}
          onEndEditing={() => setIsFocused(false)}
        />
        {secureTextEntry ? (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconContainer2}
          >
            <Image
              source={isPasswordVisible ? icons.eye : icons.eyeSlash}
              style={{ height: 25, width: 25, tintColor: eyeIconColor }}
              contentFit="contain"
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 1,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  iconContainer: {
    // backgroundColor: 'blue',
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginRight: 10,
  },

  iconContainer2: {
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export default AppTextInput;
