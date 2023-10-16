import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../components/Expense/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";
import { GlobalStyles } from "../constants/styles";

const RecentExpense = () => {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const dateSevenDaysAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    return expense.date >= dateSevenDaysAgo && expense.date <= today;
  });

  return (
    <View style={styles.expenseConatiner}>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Last 7 Days"
        fallbackText="No expenses found for the last 7 days"
      />
    </View>
  );
};

export default RecentExpense;

const styles = StyleSheet.create({
  expenseConatiner: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
