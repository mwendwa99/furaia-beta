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

export default function AllBills({ navigation, route }) {
  const title = route.params?.title;
  const status = route.params?.status;
  const { loading, allBills } = useSelector((state) => state.bill);
  const { user } = useSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(loading || false);

  const dispatch = useDispatch();

  // console.log("allBills", allBills);
  // console.log("allBills", allBills);
  // console.log("user", user);

  useEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);

  useEffect(() => {
    dispatch(getAllBills({ outletId: user?.outlet_id, status }));
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(getAllBills({ outletId: user?.outlet_id, status }));
    setRefreshing(false);
  };

  const handleNavigate = (orders, receipt, billStatus, total, premise) => {
    navigation.navigate("All Orders", {
      orders,
      receipt,
      billStatus,
      total,
      amountPaid: 0,
      premise,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {allBills && allBills.length === 0 && (
        <Text
          value={`${title} not found`}
          variant="body"
          color="gray"
          textStyle={{ textAlign: "center", marginVertical: 20 }}
        />
      )}
      <FlatList
        data={allBills}
        renderItem={({ item, index }) => (
          <BillItem
            premise={item?.premise_name}
            receipt={item?.bill_number}
            till={item?.till_no}
            status={item?.bill_status}
            icon="silverware-fork-knife"
            waiter={item?.waiter_name}
            amountPaid={item?.amount_paid}
            totalAmount={item?.total_amount}
            date={item?.created_at}
            navigate={() =>
              handleNavigate(
                item?.orders,
                item?.bill_number,
                item?.bill_payment_status,
                item?.total_amount,
                item?.premise_name
              )
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()} // Convert index to string
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 10,
  },
});
