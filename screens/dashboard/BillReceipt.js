import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { Text, DropdownIOS } from "../../components";
import { StatusBar } from "expo-status-bar";
import { getOrderById } from "../../redux/order/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { formatOrderDate } from "../../utils/helper";
import { Divider } from "react-native-paper";

const dropDownItems = [
  {
    label: "M-PESA",
    value: "1",
  },
  {
    label: "Visa",
    value: "2",
  },
  {
    label: "PDQ",
    value: "3",
  },
  {
    label: "Cash",
    value: "4",
  },
];

export default function BillReceipt({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [method, setMethod] = useState(null);
  const item = route.params?.item;
  const title = route.params?.title;
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderById({ id: 1, token }));
  }, []);

  const premiseNameMapping = {
    1: "Vanguard",
    2: "Java",
    3: "Kukito",
  };

  // Function to get the premise name based on premise ID
  const getPremiseName = (premiseId) => {
    return premiseNameMapping[premiseId] || "Unknown Premise";
  };

  //   console.log(typeof item);

  const getPaymentMethodLabel = (paymentId) => {
    const method = paymentMethods.find((method) => method.id === paymentId);
    return method ? method.label : "Unknown";
  };

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
                value={`Order#${item.order_number || "N/A"}`}
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
              nestedScrollEnabled={true}
              //   style={{ height: 300 }}
              data={item.order_item}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View>
                  <View style={styles.row}>
                    <Text
                      value={item.item_name}
                      color="#000"
                      variant="important"
                    />
                    <Text
                      value={`${item.item_quantity || 1} @ ${item.price}`}
                      color="#000"
                      variant="body"
                    />
                    <Text
                      value={[item].length * item.price}
                      color="#000"
                      variant="body"
                    />
                  </View>
                  <View style={{ ...styles.row, padding: 10 }}>
                    <FlatList
                      nestedScrollEnabled={true}
                      data={item.attributes}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item, index }) => (
                        <View style={styles.row}>
                          <Text
                            value={`${index + 1}. ${item.name}`}
                            color="#000"
                            variant="body"
                          />
                          <Text
                            value={`x${item.addon_quantity || 1}`}
                            color="#000"
                            variant="body"
                          />
                          <Text
                            value={item.price}
                            color="#000"
                            variant="body"
                          />
                        </View>
                      )}
                    />
                  </View>
                </View>
              )}
            />
            <Divider bold style={{ marginVertical: 10 }} />
            <View style={{ ...styles.row, marginVertical: 10 }}>
              <Text
                value={`Total Amount`}
                color="green"
                variant={"important"}
              />
              <Text
                value={`Kes. ${item.total || "N/A"}`}
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
                value={`Kes. ${item.balance || item.total}`}
                color="green"
                variant={"important"}
              />
            </View>
            <View style={{ width: "100%" }}>
              <Text
                value={`Select Payment method`}
                color="#000"
                variant={"body"}
                textStyle={{ alignSelf: "center", marginBottom: 10 }}
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
              <Pressable style={styles.tipButton}>
                <Text
                  value={`Tip`}
                  color="brown"
                  variant={"important"}
                  textStyle={{ alignSelf: "center" }}
                />
              </Pressable>
              <Pressable style={styles.payButton}>
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
