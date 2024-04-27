import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { Text, ListItem } from "../../components";
import { StatusBar } from "expo-status-bar";
import { getOrderById } from "../../redux/order/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { formatOrderDate } from "../../utils/helper";
import { Divider } from "react-native-paper";

const paymentMethods = [
  {
    label: "M-PESA",
    id: 1,
  },
  {
    label: "Visa",
    id: 2,
  },
  {
    label: "PDQ",
    id: 3,
  },
];

export default function OrderSlip({ route, navigation }) {
  const item = route.params?.item;
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

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

  // console.log(item);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        {item ? (
          <View>
            <View style={styles.header}>
              <Text
                value={getPremiseName(item?.premise_id)}
                color="#000"
                variant="heading"
              />
              <Text
                value={`Status ${item?.order_status || "N/A"}`}
                color="#000"
                variant="important"
              />
              <Text
                value={`#${item?.order_number || "N/A"}`}
                color="#000"
                variant="important"
              />
            </View>
            <View>
              <Text
                value={`Table No. ${item?.table_number || "N/A"}`}
                color="#000"
                variant="body"
              />
              <Text
                value={`Waiter Name: ${item?.waiter_name || "N/A"}`}
                color="#000"
                variant="body"
              />
              <Text
                value={`${formatOrderDate(item?.order_date) || "N/A"}`}
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
            <View style={styles.row}>
              <Text
                value={`Total Amount`}
                color="green"
                variant={"important"}
              />
              <Text
                value={`Kes. ${item?.total || "N/A"}`}
                color="green"
                variant={"important"}
              />
            </View>
          </View>
        ) : (
          <Text value="Loading..." color="#000" variant="important" />
        )}
      </View>
      <StatusBar style="auto" />
    </View>
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
    marginBottom: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  item: {
    flex: 1,
    padding: 10,
  },
});
