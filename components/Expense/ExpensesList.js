import { FlatList, StyleSheet, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

const renderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />;
};

const ExpensesList = ({ expenses }) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ExpensesList;

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: 10,
  },
});
