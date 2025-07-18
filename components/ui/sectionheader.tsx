import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { commonStyles } from "@/styles/common";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import AppText from "./apptext";
interface sectionHeaderProps {
  title: string;
  btnIcon: keyof typeof icons;
  onPress?: () => void;
  btnTitle: string;
  marginBottom?: ViewStyle["marginBottom"];
  marginTop?: ViewStyle["marginTop"];
  titleColor?: keyof typeof colors;
}
const SectionHeader: React.FC<sectionHeaderProps> = ({
  title,
  btnIcon,
  btnTitle,
  onPress,
  marginBottom,
  titleColor = "primary",
  marginTop,
}) => {
  return (
    <View
      style={[
        commonStyles.farmDetailsHeader,
        { ...(marginBottom && { marginBottom: marginBottom }) },
        { ...(marginTop && { marginTop: marginTop }) },
      ]}
    >
      <AppText fontFamily="SemiBold" fontSize={16} color={titleColor}>
        {title}
      </AppText>
      {onPress && (
        <Pressable style={commonStyles.editButton} onPress={onPress}>
          <Image
            source={icons[btnIcon]}
            style={{ width: 13, height: 13, marginRight: 9 }}
          />
          <AppText fontFamily="Medium" fontSize={12} color="primary">
            {btnTitle}
          </AppText>
        </Pressable>
      )}
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({});
