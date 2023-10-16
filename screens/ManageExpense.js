import { useLayoutEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";

const ManageExpense = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const expenseItem = expensesCtx.expenses.find(
    (expense) => expense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  const handleExpenseDelete = () => {
    expensesCtx.deleteExpense(expenseId);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = (expenseData) => {
    isEditing
      ? expensesCtx.updateExpense(expenseId, expenseData)
      : expensesCtx.addExpense(expenseData);
    handleCancel();
  };

  return (
    <View style={styles.expenseContainer}>
      <ExpenseForm
        isEditing={isEditing}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        defaultValue={expenseItem}
      />
      <View style={[styles.deleteContainer, isEditing && styles.line]}>
        {isEditing && (
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={handleExpenseDelete}
          />
        )}
      </View>
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  expenseContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  line: {
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 16,
    alignItems: "center",
  },
});
