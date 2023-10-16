import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

const ExpenseItem = ({ id, description, amount, date }) => {
  const navigation = useNavigation();

  const handleExpenseItem = () => {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  };

  return (
    <Pressable
      onPress={handleExpenseItem}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.itemContainer}>
        <View>
          <Text style={[styles.textBase, styles.desc]}>{description}</Text>
          <Text style={styles.textBase}>{date.toLocaleDateString()}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountBase}>${amount}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 1 },
  },
  pressed: {
    opacity: 0.75,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  desc: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  amountBase: {
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
