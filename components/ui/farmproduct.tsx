import { colors } from "@/constants/colors";
import { farmProduct } from "@/types/farm";
import { StyleSheet, View } from "react-native";
import AppText from "./apptext";

const FarmProduct = ({
  products,
  type,
}: {
  products: farmProduct[];
  type: "livestock" | "crop";
}) => {
  if (!products) return null;
  const types = {
    livestock: {
      title: "Livestock",
    },
    crop: { title: "Crops" },
  };
  return (
    <>
      <AppText
        fontFamily="SemiBold"
        fontSize={16}
        color="textBold"
        style={{ marginBottom: 12 }}
      >
        {types[type].title}
      </AppText>
      <View style={styles.productsContainer}>
        {products.map((product) => (
          <View style={styles.cropCard} key={product?.id}>
            <AppText fontFamily="Medium" fontSize={13} color="textBold">
              {product?.product?.name}
            </AppText>
          </View>
        ))}
      </View>
    </>
  );
};
export default FarmProduct;
const styles = StyleSheet.create({
  cropCard: {
    backgroundColor: colors.backgroundPrimary,
    marginBottom: 12,
    borderRadius: 12,
    boxShadow: "0px 4px 19px 0px rgba(63, 30, 87, 0.10)",
    width: "48%",
    paddingVertical: 13,
    paddingLeft: 31,
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
