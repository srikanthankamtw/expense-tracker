import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../components/Expense/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { GlobalStyles } from "../constants/styles";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <View style={styles.expenseConatiner}>
      <ExpensesOutput
        expenses={expensesCtx.expenses}
        expensesPeriod="Total"
        fallbackText="No expenses found!"
      />
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  expenseConatiner: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
