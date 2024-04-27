import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { Text, DropdownIOS, Input } from "../../components";
import { StatusBar } from "expo-status-bar";
import { getOrderById } from "../../redux/order/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { formatOrderDate, mpesaFormat } from "../../utils/helper";
import { Divider } from "react-native-paper";
import { triggerPayment } from "../../redux/bills/billActions";

const dropDownItems = [
  {
    label: "M-PESA",
    value: "1",
  },
  {
    label: "PDQ",
    value: "2",
  },
  {
    label: "Cash",
    value: "3",
  },
];

export default function BillReceipt({ route, navigation }) {
  const [method, setMethod] = useState(null);
  const { total, item, amountPaid, receipt } = route.params;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [tipAmount, setTipAmount] = useState("");

  let parsedTotal = parseFloat(total || 0);
  let parsedAmountPaid = parseFloat(amountPaid || 0);
  let difference = parsedTotal - parsedAmountPaid;

  useEffect(() => {
    dispatch(getOrderById({ id: 1 }));
  }, []);

  const handleTipAmount = (value) => {
    setTipAmount(value);
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

  const handleTriggerPayment = () => {
    if (!user.mobile) {
      alert("Customer phone number is required");
      return;
    }

    const formattedPhone = mpesaFormat(user.mobile);

    if (!receipt) {
      alert("Bill number is required");
      return;
    }

    if (!total) {
      alert("Total amount is required");
      return;
    }

    let totalAmount = parseInt(total);
    if (isNaN(totalAmount)) {
      alert("Invalid total amount");
      return;
    }

    if (isNaN(total)) {
      total = parseInt(total) || 0;
      return total;
    }

    if (!method) {
      alert("Payment method is required");
      return;
    }

    if (method !== "1") {
      alert("Payment method not yet available");
      return;
    }

    console.log({
      bill_number: receipt,
      total_amount: totalAmount,
      customer_number: formattedPhone,
      description: "Waiter triggered payment",
    });

    // dispatch(
    //   triggerPayment({
    //     bill_number: receipt,
    //     total_amount: totalAmount,
    //     // customer_number: formattedPhone,
    //     customer_number: "254768952248",
    //     description: "Waiter triggered payment",
    //   })
    // );
  };

  // console.log(tipAmount);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.item}>
        {item ? (
          <View>
            <View style={styles.header}>
              <Text
                value={getPremiseName(item.premise_id)}
                color="#000"
                variant="heading"
              />
              <Text
                value={`Till No. ${item.till_number || "N/A"}`}
                color="#000"
                variant="important"
              />
              <Text
                value={`Bill No. #${item.order_number || "N/A"}`}
                color="#000"
                variant="important"
              />
            </View>
            <View>
              <Text
                value={`Table No. ${item.table_number || "N/A"}`}
                color="#000"
                variant="body"
              />
              <Text
                value={`Waiter Name: ${item.waiter_name || "N/A"}`}
                color="#000"
                variant="body"
              />
              <Text
                value={`${formatOrderDate(item.order_date) || "N/A"}`}
                color="#000"
                variant="body"
              />
            </View>
            <Divider bold style={{ marginVertical: 10 }} />
            <FlatList
              data={item?.order_items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View>
                  <View style={styles.row}>
                    <Text
                      value={item?.item_name}
                      color="#000"
                      variant="important"
                    />
                    <Text
                      value={`${item?.item_quantity || 1} @ ${
                        item?.item_price
                      }`}
                      color="#000"
                      variant="body"
                    />
                    <Text
                      value={[item].length * item?.item_price}
                      color="#000"
                      variant="body"
                    />
                  </View>
                </View>
              )}
            />

            <Divider bold style={{ marginVertical: 10 }} />
            <View style={{ ...styles.row }}>
              <Text value={`Extras`} color="#000" variant="important" />
            </View>
            <View style={{ ...styles.row, padding: 10 }}>
              <FlatList
                data={item.order_addons}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.row}>
                    <Text
                      value={`${index + 1}. ${item?.addon_name}`}
                      color="#000"
                      variant="body"
                    />
                    <Text
                      value={`${item?.addon_quantity || 1}@ ${
                        item?.addon_price
                      }`}
                      color="#000"
                      variant="body"
                    />
                    <Text
                      value={item?.addon_price}
                      color="#000"
                      variant="body"
                    />
                  </View>
                )}
              />
            </View>

            <Divider bold style={{ marginVertical: 10 }} />
            <View style={{ ...styles.row, marginVertical: 10 }}>
              <Text
                value={`Total Amount`}
                color="green"
                variant={"important"}
              />
              <Text
                value={`Kes. ${total || "N/A"}`}
                color="green"
                variant={"important"}
              />
            </View>
            <View style={{ ...styles.row, marginVertical: 10 }}>
              <Text
                value={`Amount Paid`}
                color="#b3b3b3"
                variant={"important"}
              />
              <Text
                value={`- Kes. ${item.amount_paid || "0"}`}
                color="#b3b3b3"
                variant={"important"}
              />
            </View>
            <View style={{ ...styles.row, marginVertical: 10 }}>
              <Text
                value={`Net Amount to Pay`}
                color="green"
                variant={"important"}
              />
              <Text
                value={`Kes. ${
                  isNaN(difference) ? "Invalid" : difference.toFixed(2)
                }`}
                color="green"
                variant={"important"}
              />
            </View>
            <View style={{ width: "100%" }}>
              <Text
                value={`Select Payment method`}
                color="#002a0c"
                variant={"important"}
                textStyle={{ alignSelf: "center", margin: 10 }}
              />
              <DropdownIOS
                iconLeft="credit-card"
                items={dropDownItems}
                onChange={setMethod}
                selectedValue={method}
                placeholder={"Select Payment Method"}
              />
            </View>
            <View style={{ ...styles.column, marginVertical: 10 }}>
              <View style={styles.row}>
                <Text
                  value={`Tip amount`}
                  color="green"
                  variant={"important"}
                  textStyle={{ marginRight: 10 }}
                />
                <Input
                  type={"numeric"}
                  theme={true}
                  onChange={handleTipAmount}
                  inputStyle={{ marginLeft: 10, height: 30, width: "70%" }}
                />
              </View>
              <Pressable
                style={styles.payButton}
                onPress={handleTriggerPayment}
              >
                <Text
                  value={`Pay Order`}
                  color="darkgreen"
                  variant={"important"}
                  textStyle={{ alignSelf: "center" }}
                />
              </Pressable>
              <Text
                value={`Thank you and welcome again!`}
                color="#000"
                variant={"body"}
              />
            </View>
          </View>
        ) : (
          <Text value="Loading..." color="#000" variant="important" />
        )}
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingHorizontal: 10,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  item: {
    flex: 1,
    padding: 10,
  },
  tipButton: {
    backgroundColor: "#7FFFD4",
    backgroundColor: "#FFE5B4",
    color: "#fafafa",
    borderColor: "#FFA500",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    width: "100%",
    alignContent: "center",
    marginVertical: 10,
  },
  payButton: {
    backgroundColor: "#7FFFD4",
    color: "#fafafa",
    borderColor: "#00A36C",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    width: "100%",
    alignContent: "center",
    marginVertical: 10,
  },
  logoContainer: {
    marginVertical: 10,
    alignItems: "center",
    backgroundColor: "#002a0c",
    // width: "100%",
    borderRadius: 10,
  },
  logo: {
    height: 50,
    objectFit: "contain",
  },
});
