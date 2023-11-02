import { useLayoutEffect, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { ExpensesContext } from "../../store/expenses-context";
import ExpenseForm from "../../components/ManageExpense/ExpenseForm";
import IconButton from "../../components/UI/IconButton";
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "../../services/expense";
import Loader from "../../components/UI/Loader";

const ManageExpense = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
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

  const handleExpenseDelete = async () => {
    setIsLoading(true);
    expensesCtx.deleteExpense(expenseId);
    await deleteExpense(expenseId);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = async (expenseData) => {
    setIsLoading(true);
    if (isEditing) {
      expensesCtx.updateExpense(expenseId, expenseData);
      await updateExpense(expenseId, expenseData);
    } else {
      const id = await addExpense(expenseData);
      expensesCtx.addExpense({ ...expenseData, id: id });
    }
    handleCancel();
  };

  return isLoading ? (
    <Loader />
  ) : (
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
