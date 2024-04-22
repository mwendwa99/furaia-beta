import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  FlatList,
} from "react-native";
import { BillItem, Text } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllBills } from "../../redux/bills/billActions";
import { resetSuccess } from "../../redux/order/orderReducer";

const AllBills = ({ navigation }) => {
  const { allBills, error, loading } = useSelector((state) => state.bill);
  const { token } = useSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(loading || false);
  const dispatch = useDispatch();

  // console.log(allBills);

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    dispatch(resetSuccess());
  }, [dispatch]);

  //   console.log(allBills);

  useEffect(() => {
    dispatch(getAllBills(token));
  }, [dispatch, token]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getAllBills(token));
    setRefreshing(false);
  };

  const handleNavigate = (receipt) => {
    // console.log(receipt);
    navigation.navigate("All Orders", { receipt });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allBills}
        renderItem={({ item }) => (
          <BillItem
            premise={item.premise_name}
            receipt={item.bill_number}
            till={item.till_no}
            status={item.bill_status}
            icon="silverware-fork-knife"
            waiter={item.waiter_name}
            table={item.table_no}
            amountPaid={item.amount_paid}
            totalAmount={item.total_amount}
            date={item.created_at}
            navigate={handleNavigate}
          />
        )}
        keyExtractor={(item) => item.bill_number.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default AllBills;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 10,
  },
});
