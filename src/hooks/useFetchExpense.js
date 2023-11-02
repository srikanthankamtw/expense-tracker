import { useContext, useCallback, useState } from "react";
import { getExpense } from "../services/expense";
import { ExpensesContext } from "../store/expenses-context";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../store/auth-context";

const useFetchExpense = () => {
  const [isLoading, setIsLoading] = useState(true);
  const expensesCtx = useContext(ExpensesContext);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const fetchExpenses = useCallback(async () => {
    const expenses = await getExpense(token);
    expensesCtx.setExpense(expenses);
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, [])
  );

  return [expensesCtx.expenses, isLoading];
};

export default useFetchExpense;
