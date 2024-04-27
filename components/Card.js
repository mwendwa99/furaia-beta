import * as React from "react";
import { Card } from "react-native-paper";
import { StyleSheet, Pressable, View } from "react-native";
import Avatar from "./Avatar";
import Text from "./Text";

const CardItem = ({
  id,
  orderNumber,
  date,
  totalAmount,
  status,
  items,
  premise,
  handleOpenReceipt,
  tableNumber,
}) => {
  return (
    <Pressable onPress={handleOpenReceipt}>
      <Card style={styles.card}>
        <Card.Title
          title={`${tableNumber ? `Table No. ${tableNumber}` : premise}`}
          subtitle={`status: ${status}`}
          right={(props) => (
            <Avatar
              {...props}
              size={50}
              bgColor={
                status === "accepted"
                  ? "#00A36C"
                  : status === "rejected"
                  ? "#ff0000"
                  : "orange"
              }
              icon={
                status === "accepted"
                  ? "check-decagram"
                  : status === "rejected"
                  ? "close"
                  : "clock-time-eight"
              }
            />
          )}
          titleStyle={{ color: "#002a0c", fontWeight: "bold", fontSize: 18 }}
          subtitleStyle={{ color: "#002a0c", fontWeight: "bold", fontSize: 14 }}
        />
        <Card.Content>
          <View style={styles.row}>
            <Text
              value={`Order No: ${orderNumber}`}
              variant="body"
              color={"#002a0c"}
            />
          </View>
          <Text
            value={`Total Items: ${items.length}`}
            variant="body"
            color={"#002a0c"}
            textStyle={{ marginBottom: 10 }}
          />
          <Text value={`Date: ${date} `} variant="body" color={"#002a0c"} />
          <View style={styles.row}>
            <Text
              value={`Total: ${totalAmount} `}
              variant="important"
              color={"#002a0c"}
            />
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: "#fafafa",
    padding: 10,
  },
  deliverButton: {
    backgroundColor: "#fafafa",
    color: "#fafafa",
    borderColor: "#002a0c",
    padding: 10,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    margin: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
