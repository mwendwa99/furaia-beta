import * as React from "react";
import { Card } from "react-native-paper";
import { StyleSheet, Pressable, View } from "react-native";
import Avatar from "./Avatar";
import Text from "./Text";

const CardItem = ({
  orderNumber,
  date,
  totalAmount,
  action,
  status,
  items,
  premise,
  handleOpenReceipt,
  deliveryNumber,
}) => {
  // console.log(items);
  return (
    <Pressable onPress={handleOpenReceipt}>
      <Card style={styles.card}>
        <Card.Title
          title={`${premise}`}
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
            <View>
              <Text
                value={`Order No: ${orderNumber}`}
                variant="important"
                color={"#002a0c"}
              />
              <Text
                value={`Status: ${status}`}
                variant="important"
                color={"#002a0c"}
                textStyle={{ marginBottom: 10 }}
              />
            </View>
          </View>
          <Text
            value={`Total Items: ${items.length}`}
            variant="important"
            color={"#002a0c"}
            textStyle={{ marginBottom: 10 }}
          />
          <View style={styles.row}>
            <Text value={`Date: ${date} `} variant="body" color={"#002a0c"} />
            <Text
              value={`Total: ${totalAmount} `}
              variant="important"
              color={"#002a0c"}
            />
          </View>
        </Card.Content>
        {status === "accepted" && (
          <Pressable style={styles.confirm} onPress={action}>
            <Text
              value="Confirm Delivered"
              variant="important"
              color="#fafafa"
            />
          </Pressable>
        )}
        {status === "delivered" && (
          <View style={styles.deliverButton}>
            <Text
              value={`Delivery No. ${deliveryNumber || "N/A"}`}
              variant="important"
              color="#002a0c"
            />
          </View>
        )}
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
  confirm: {
    backgroundColor: "#00A36C",
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
    marginBottom: 10,
  },
});
