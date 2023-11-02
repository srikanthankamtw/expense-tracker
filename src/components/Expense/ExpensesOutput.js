import { StyleSheet, View, Text } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/styles";

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  let content = <Text style={styles.textContent}>{fallbackText}</Text>;

  return (
    <View style={styles.outputContainer}>
      <ExpensesSummary expenses={expenses} period={expensesPeriod} />
      {expenses.length === 0 ? content : <ExpensesList expenses={expenses} />}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  outputContainer: {
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  textContent: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
  },
});
