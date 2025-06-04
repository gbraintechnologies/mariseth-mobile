import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    paddingHorizontal: 18,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  container: {
    paddingHorizontal: 18,
    paddingTop: "15%",
  },
  logo: {
    width: 80,
    height: 105,
    alignSelf: "center",
    marginBottom: 22,
  },
  buttonContainer: {
    position: "absolute",

    width: "100%",
    paddingHorizontal: 18,
  },

  blur: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    overflow: "hidden",
    borderRadius: 20,
    marginBottom: 35,
  },
});
