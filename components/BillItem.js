import * as React from "react";
import { Card } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Avatar from "./Avatar";
import Text from "./Text";
import { formatOrderDate } from "../utils/helper";

const CardItem = ({
  premise,
  till,
  status,
  receipt,
  icon,
  waiter,
  table,
  amountPaid,
  totalAmount,
  date,
  navigate,
}) => (
  <TouchableOpacity onPress={() => navigate(receipt)}>
    <Card style={styles.card}>
      <Card.Title
        title={`${premise || "No Name"}`}
        left={(props) => (
          <Avatar {...props} size={50} bgColor="#002a0c" icon={icon} />
        )}
        titleStyle={{ color: "#002a0c", fontWeight: "bold", fontSize: 18 }}
        subtitleStyle={{ color: "#002a0c", fontWeight: "bold", fontSize: 14 }}
      />
      <Card.Content>
        <View style={styles.row}>
          <View>
            <Text
              value={`Bill No. #${receipt}`}
              variant="important"
              color={"#002a0c"}
            />
            <Text
              value={`Bill Status: ${status}`}
              variant="body"
              color={"#002a0c"}
            />
          </View>
          <Text
            value={`Till No: ${till || "No Till"}`}
            variant="important"
            color={"#002a0c"}
          />
        </View>
        <View style={styles.row}>
          <View>
            <Text
              value={`Waiter Name: ${waiter || "No Waiter"}`}
              variant="important"
              color={"#002a0c"}
            />
            <Text
              value={`Date: ${formatOrderDate(date)}`}
              variant="body"
              color={"#002a0c"}
            />
          </View>
        </View>
        <View style={styles.row}>
          <Text
            value={`Amount Paid: ${amountPaid}`}
            variant="important"
            color={"#002a0c"}
          />
          <Text
            value={`Total Amount: ${totalAmount}`}
            variant="important"
            color={"#002a0c"}
          />
        </View>
      </Card.Content>
    </Card>
  </TouchableOpacity>
);

export default CardItem;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: "#fafafa",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
});
