import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  FlatList,
} from "react-native";
import { Card, Text } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/order/orderActions";

const Orders = ({ route }) => {
  const title = route.params?.title || "Orders";
  const { orders, loading, error } = useSelector((state) => state.order);
  const [refreshing, setRefreshing] = useState(loading || false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (error) {
    console.log(error);
  }

  // console.log(token);

  useEffect(() => {
    dispatch(getOrders(token));
  }, [dispatch, token]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getOrders(token));
    setRefreshing(false);
  };

  const handleReject = () => {
    // dispatch(rejectOrder());
    alert("order cancelled");
    alert("Rejected");
  };
  const handleAccept = () => {
    alert("Accepted");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text
        textStyle={{ padding: 10 }}
        value={`Your recent ${title}`}
        variant="subheading"
        color="#002a0c"
      />
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <Card
            title={item.order_number}
            subtitle={`Total ${item.total}`}
            status={item.order_status}
            icon="check-decagram"
            content={item.comments}
            items={item.order_item}
            onReject={handleReject}
            onAccept={handleAccept}
          />
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 10,
  },
});
