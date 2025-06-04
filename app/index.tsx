import { colors } from "@/constants/colors";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Welcome from "./welcome";
export default function Index() {
  const bottomInset = useSafeAreaInsets().bottom;
  return (
    <View style={styles.container}>
      <Welcome />
      {/* <Image source={images.logo} style={{ width: 167, height: 218 }} />
      <View style={{ position: "absolute", bottom: bottomInset + 40 }}>
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
