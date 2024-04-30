import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  FlatList,
  Pressable,
  View,
} from "react-native";
import { Card, Text } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/order/orderActions";
import { findAcceptedOrder, formatOrderDate } from "../../utils/helper";
import { IconButton } from "react-native-paper";

const Orders = ({ route, navigation }) => {
  const { orders, receipt, billStatus, total, customerPhone, premise } =
    route.params;
  const { menu } = useSelector((state) => state.menu);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // console.log(orders);

  useEffect(() => {
    dispatch(getOrders(token));
  }, [dispatch, token]);

  const handlePress = () => {
    alert("Order details");
  };

  const premiseNameMapping = {
    1: "Vanguard",
    2: "Java",
    3: "Kukito",
  };

  // Function to get the premise name based on premise ID
  const getPremiseName = (premiseId) => {
    return premiseNameMapping[premiseId] || "Unknown Premise";
  };

  const handleOpenReceipt = (item) => {
    navigation.navigate("Order Slip", { item });
    // console.log(item);
  };

  const handleAddOrder = () => {
    if (menu === null || menu === undefined) {
      alert("Please scan again");
      navigation.navigate("Scanner", { screen: "Scan" });
    } else {
      navigation.navigate("Scanner", { screen: "Menu" });
    }
  };

  const handleTotalBill = () => {
    if (orders === null || orders === undefined) {
      alert("No orders found");
      return;
    }
    //  if findAcceptedOrders returns null alert
    const acceptedOrder = findAcceptedOrder(orders);
    if (acceptedOrder === null) {
      alert("No accepted order found");
    } else {
      navigation.navigate("Total Bill", {
        // item: acceptedOrder,
        premise,
        item: orders,
        receipt,
        billStatus,
        total,
        customerPhone,
      });
    }
  };

  const handleCallWaiter = () => {
    alert("The waiter will be with you shortly");
  };

  // console.log(orders);

  return (
    <View style={styles.container}>
      <Text
        textStyle={{ padding: 10, alignSelf: "center" }}
        value={`Bill No. #${receipt}`}
        variant="subheading"
        color="#002a0c"
      />
      <View style={styles.row}>
        <Pressable style={styles.billButton} onPress={handleTotalBill}>
          <Text
            value="Get Total Bill"
            variant="important"
            color="darkgreen"
            textStyle={{ alignSelf: "center" }}
          />
        </Pressable>
        <Pressable style={styles.waiterButton} onPress={handleCallWaiter}>
          <Text
            value="Call My Waiter"
            variant="important"
            color="brown"
            textStyle={{ alignSelf: "center" }}
          />
        </Pressable>
      </View>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <Card
            id={item.id}
            order={item}
            action={handlePress}
            orderNumber={item.order_number}
            date={formatOrderDate(item.order_date)}
            totalAmount={item.total}
            status={item.order_status}
            icon={"silverware-fork-knife"}
            premise={getPremiseName(item.premise_id)}
            items={item.order_items}
            handleOpenReceipt={() => handleOpenReceipt(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.floatingButton}>
        <IconButton
          mode="contained"
          icon="plus"
          iconColor={"#002a0c"}
          size={50}
          onPress={handleAddOrder}
        />
        <Text
          value="Add order"
          variant="important"
          color="#000"
          textStyle={{ alignSelf: "center" }}
        />
      </View>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  billButton: {
    backgroundColor: "#7FFFD4",
    color: "#fafafa",
    borderColor: "#00A36C",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    width: "48%",
    alignContent: "center",
  },
  waiterButton: {
    backgroundColor: "#FFE5B4",
    color: "#fafafa",
    borderColor: "#FFA500",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    width: "48%",
    alignContent: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
