import React, { useState, useEffect } from "react";
import { StyleSheet, View, Pressable, ScrollView, Image } from "react-native";
import {
  DropdownIOS,
  ListItem,
  Text,
  Input,
  Animation,
} from "../../components";
// import { ShoppingCartContext } from "../../context/cartContext";
import { useCart } from "../../context/cart";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../redux/order/orderActions";

const orderComplete = require("../../assets/animations/complete.json");
const cart = require("../../assets/animations/cart.json");

export default function Checkout({ navigation }) {
  const dispatch = useDispatch();
  const [comments, setComments] = useState("");
  const { order, orderSuccess, loading, error } = useSelector(
    (state) => state.order
  );
  const { token } = useSelector((state) => state.auth);
  const {
    cartItems,
    addonItems,
    removeFromCart,
    removeAddonFromCart,
    addAddonToCart,
    addToCart,
    clearCart,
    calculateTotal,
  } = useCart();

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (orderSuccess) {
      setShowAnimation(true);
    }
  }, [orderSuccess]);

  useEffect(() => {
    if (showAnimation) {
      const animationTimeout = setTimeout(() => {
        clearCart();

        setShowAnimation(false);
        navigation.navigate("All Bills");
      }, 3000); // Adjust the duration as needed

      return () => clearTimeout(animationTimeout);
    }
  }, [showAnimation, navigation]);

  const handleConfirmOrder = () => {
    // get all item_id from cartItems and save them in an array e.g. [1, 2, 3]
    const itemIds = cartItems.map((item) => item.item_id);
    // get all addon_id from addonItems and save them in an array e.g. [1, 2, 3]
    const addonIds = addonItems.map((addon) => addon.addon_id);
    // get all item_id, and item_quantity, item_comments from cartItems and save them in an object
    // e.g. {item_id: 1, item_quantity: 2, item_comments: "no salt"}
    const itemData = cartItems.map((item) => ({
      item_id: item.item_id,
      item_quantity: item.item_quantity,
      comments: item.item_comments,
    }));
    const addonData = addonItems.map((addon) => ({
      addon_id: addon.addon_id,
      addon_quantity: addon.addon_quantity,
    }));
    // create an order object
    const orderData = {
      // order_item: itemIds,
      // order_attribute: addonIds,
      item_data: itemData,
      addon_data: addonData,
      comments: comments,
      premise_id: 1,
      table_number: 1,
    };

    // const res = JSON.stringify(orderData);

    // console.log(orderData);

    dispatch(createOrder({ data: orderData, token }));
  };

  // console.log(order);

  return (
    <ScrollView style={styles.container}>
      {showAnimation ? (
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animation animation={orderComplete} message="Order Complete" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {cartItems.length > 0 ? (
            <View>
              <View style={styles.input}>
                <Text
                  value="Your Order"
                  variant={"subheading"}
                  color={"#002a0c"}
                />
                <View>
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <ListItem
                        key={item.item_id}
                        title={`${item.item_quantity}x ${item.item_name} @ ${item.item_price}`}
                        description={`notes: ${item.item_comments}`}
                        iconLeft={"minus"}
                        iconRight={"plus"}
                        handlePressRightIcon={() => addToCart(item)}
                        handlePressLeftIcon={() => removeFromCart(item.item_id)}
                      />
                    ))
                  ) : (
                    <ListItem
                      title={`oops nothing in cart`}
                      iconRight={"alert"}
                    />
                  )}
                </View>
              </View>
              <View style={styles.input}>
                <Text value="Extras" variant={"subheading"} color={"#002a0c"} />
                <View>
                  {addonItems.length > 0 ? (
                    addonItems.map((addon) => (
                      <ListItem
                        key={addon.addon_id}
                        title={`${addon.addon_quantity}x ${addon.addon_name} @ Ksh ${addon.addon_price}`}
                        iconLeft={"minus"}
                        iconRight={"plus"}
                        handlePressRightIcon={() => addAddonToCart(addon)}
                        handlePressLeftIcon={() =>
                          removeAddonFromCart(addon.addon_id)
                        }
                      />
                    ))
                  ) : (
                    <ListItem
                      title={`oops you dont have any extras`}
                      iconRight={"alert"}
                    />
                  )}
                </View>
              </View>
              <View style={styles.input}>
                <Text
                  value="Comments"
                  variant={"subheading"}
                  color={"#002a0c"}
                />
                <Input
                  defaultValue="Write a comment for your order"
                  onChange={(text) => setComments(text)}
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.row}>
                <Text value="Total" variant={"subheading"} color={"#002a0c"} />
                <Text
                  value={`Ksh ${calculateTotal()}`}
                  variant={"subheading"}
                  color={"#002a0c"}
                />
              </View>
              <View style={styles.input}>
                <Pressable
                  style={styles.cartButton}
                  onPress={handleConfirmOrder}
                >
                  <Text value={`Place order`} variant={"important"} />
                </Pressable>
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Animation animation={cart} message="No items in cart" />
            </View>
          )}
        </View>
      )}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fafafa",
  },
  logoContainer: {
    alignItems: "center",
    backgroundColor: "#002a0c",
    borderRadius: 10,
  },
  logo: {
    height: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  input: {
    marginVertical: 10,
  },
  cartButton: {
    backgroundColor: "#002a0c",
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
    width: "50%",
    alignSelf: "center",
  },
});
