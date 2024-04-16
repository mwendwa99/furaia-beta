import { useEffect } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  RefreshControl,
  ScrollView,
  Pressable,
} from "react-native";
import { Card, Text } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/order/orderActions";

const Transactions = ({ route, navigation }) => {
  const { orders, loading, error } = useSelector((state) => state.order);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (error) {
    console.log(error);
  }
  const premiseNameMapping = {
    1: "Vanguard",
    2: "Java",
    3: "Kukito",
  };

  // Function to get the premise name based on premise ID
  const getPremiseName = (premiseId) => {
    return premiseNameMapping[premiseId] || "Unknown Premise";
  };

  // Function to handle refresh action
  const onRefresh = () => {
    dispatch(getOrders(token));
  };

  useEffect(() => {
    dispatch(getOrders(token));
  }, [dispatch, token]);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      {orders ? (
        orders.map((item, index) => (
          <Pressable
            style={styles.Transactions}
            key={index}
            onPress={() => navigation.navigate("Order Slip", { item })}
          >
            <Text
              style={styles.transcDeetText}
              value={`${index + 1}. ${item.order_number}`}
              variant="important"
              color="#002a0c"
            />

            <Text
              value={getPremiseName(item.premise_id)}
              variant="important"
              color="#002a0c"
            />
            <Text value={item.total} variant="important" color="#002a0c" />
          </Pressable>
        ))
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </ScrollView>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    position: "relative",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Transactions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#fff",
    margin: 4,
    padding: 10,
    borderRadius: 7,
  },
});
