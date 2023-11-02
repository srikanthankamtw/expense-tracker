import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../../components/Expense/ExpensesOutput";
import { GlobalStyles } from "../../constants/styles";
import useFetchExpense from "../../hooks/useFetchExpense";
import Loader from "../../components/UI/Loader";

const RecentExpense = () => {
  const [expenses, isLoading] = useFetchExpense();

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const dateSevenDaysAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    return expense.date >= dateSevenDaysAgo && expense.date <= today;
  });

  return isLoading ? (
    <Loader />
  ) : (
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
