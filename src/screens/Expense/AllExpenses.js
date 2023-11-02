import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../../components/Expense/ExpensesOutput";
import { GlobalStyles } from "../../constants/styles";
import useFetchExpense from "../../hooks/useFetchExpense";
import Loader from "../../components/UI/Loader";

const AllExpenses = () => {
  const [expenses, isLoading] = useFetchExpense();

  return isLoading ? (
    <Loader />
  ) : (
    <View style={styles.expenseConatiner}>
      <ExpensesOutput
        expenses={expenses}
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
