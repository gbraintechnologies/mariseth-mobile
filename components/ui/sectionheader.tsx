import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { commonStyles } from "@/styles/common";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import AppText from "./apptext";
interface sectionHeaderProps {
  title: string;
  btnIcon?: keyof typeof icons;
  onPress?: () => void;
  btnTitle?: string;
  marginBottom?: ViewStyle["marginBottom"];
  marginTop?: ViewStyle["marginTop"];
  titleColor?: keyof typeof colors;
  dualEdit?: boolean;
  editVariant?: "primary" | "muted";
}
const SectionHeader: React.FC<sectionHeaderProps> = ({
  title,
  btnIcon,
  btnTitle,
  onPress,
  marginBottom,
  titleColor = "primary",
  marginTop,
  dualEdit = false,
  editVariant = "primary",
}) => {
  const showAction = onPress && btnIcon && btnTitle;

  return (
    <View
      style={[
        commonStyles.farmDetailsHeader,
        { ...(marginBottom != null && { marginBottom }) },
        { ...(marginTop != null && { marginTop }) },
      ]}
    >
      <AppText fontFamily="SemiBold" fontSize={16} color={titleColor}>
        {title}
      </AppText>
      {showAction ? (
        <View style={styles.actionGroup}>
          {dualEdit ? (
            <Pressable style={styles.secondaryEditButton} onPress={onPress}>
              <Image
                source={icons[btnIcon]}
                style={styles.secondaryEditIcon}
                tintColor={colors.formLabelText}
              />
              <AppText fontFamily="Medium" fontSize={12} color="formLabelText">
                {btnTitle}
              </AppText>
            </Pressable>
          ) : null}
          <Pressable
            style={
              editVariant === "muted"
                ? styles.mutedEditButton
                : commonStyles.editButton
            }
            onPress={onPress}
          >
            <Image
              source={icons[btnIcon]}
              style={{ width: 12, height: 12, marginRight: 6 }}
              tintColor={
                editVariant === "muted" ? colors.buttonPrimary : undefined
              }
            />
            <AppText
              fontFamily="Medium"
              fontSize={12}
              color={editVariant === "muted" ? "tabBarInactive" : "primary"}
            >
              {btnTitle}
            </AppText>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  actionGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  secondaryEditButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  secondaryEditIcon: {
    width: 16,
    height: 16,
  },
  mutedEditButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: colors.buttonActionSheet,
  },
});
