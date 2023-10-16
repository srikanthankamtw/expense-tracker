import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: 1,
    description: "Item 1",
    amount: 47,
    date: new Date("2023-10-1"),
  },
  {
    id: 2,
    description: "Item 2",
    amount: 19,
    date: new Date("2023-10-2"),
  },
  {
    id: 3,
    description: "Item 3",
    amount: 62,
    date: new Date("2023-10-3"),
  },
  {
    id: 4,
    description: "Item 4",
    amount: 7,
    date: new Date("2023-10-4"),
  },
  {
    id: 5,
    description: "Item 5",
    amount: 55,
    date: new Date("2023-10-5"),
  },
  {
    id: 6,
    description: "Item 6",
    amount: 31,
    date: new Date("2023-10-6"),
  },
  {
    id: 7,
    description: "Item 7",
    amount: 87,
    date: new Date("2023-10-7"),
  },
  {
    id: 8,
    description: "Item 8",
    amount: 70,
    date: new Date("2023-10-8"),
  },
  {
    id: 9,
    description: "Item 9",
    amount: 93,
    date: new Date("2023-10-9"),
  },
  {
    id: 10,
    description: "Item 10",
    amount: 25,
    date: new Date("2023-10-10"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = state.length + 1;
      return [{ ...action.payload, id: id }, ...state];
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      const expenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const expenseItem = state[expenseIndex];
      const updatedExpenseItem = { ...expenseItem, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[expenseIndex] = updatedExpenseItem;
      return updatedExpenses;
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
