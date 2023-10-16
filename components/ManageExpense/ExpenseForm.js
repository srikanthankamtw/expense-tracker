import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "../UI/Input";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";
import Button from "../UI/Button";

const ExpenseForm = ({
  isEditing,
  handleCancel,
  handleConfirm,
  defaultValue,
}) => {
  const [inputValues, setInputValues] = useState({
    amount: defaultValue ? defaultValue.amount.toString() : "",
    date: defaultValue ? defaultValue.date.toISOString().slice(0, 10) : "",
    description: defaultValue ? defaultValue.description : "",
  });

  const handleSubmitInput = () => {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;
    amountIsValid && dateIsValid && descriptionIsValid
      ? handleConfirm(expenseData)
      : Alert.alert("Invalid Input", "Please check your input values");
  };

  const handleInputChange = (inputIdentifier, enteredAmount) => {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredAmount,
      };
    });
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.text}>
        {isEditing ? "Update Your Expense" : "Add Your Expense"}
      </Text>
      <View style={styles.rowContainer}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: handleInputChange.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            onChangeText: handleInputChange.bind(this, "date"),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCapitalize: "none",
          autoCorrect: false,
          onChangeText: handleInputChange.bind(this, "description"),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={handleCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleSubmitInput}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 80,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: GlobalStyles.colors.accent500,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
