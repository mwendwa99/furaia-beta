import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  View,
  Image,
  FlatList,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Text from "./Text";
import Input from "./Input";
import ListItem from "./ListItem";
import { useCart } from "../context/cart";
import { prod } from "../env";

const ItemModal = ({ data, modalVisible, setModalVisible }) => {
  const {
    addToCart,
    removeFromCart,
    cartItems,
    addonItems,
    addAddonToCart,
    removeAddonFromCart,
  } = useCart();
  const [comments, setComments] = useState("");

  const handleAddAddonToCart = (addon) => {
    // console.log(addon.name);
    addAddonToCart({
      addon_name: addon.name,
      addon_id: addon.id,
      addon_price: addon.price,
      addon_quantity: 1,
    });
  };

  console.log(comments);
  const handleAddToCart = () => {
    console.log(comments);
    addToCart({
      item_name: data.item_name,
      item_id: data.id,
      item_price: data.price,
      item_pic: data.item_pic,
      item_quantity: 1,
      item_comments: comments,
    });
    // if (cartItems.length === 0) {
    //   // setModalVisible(false);
    // }
    setModalVisible(false);
  };

  // console.log({ cartItems });
  // console.log(data.menu_attributes);
  // console.log({ data.pri });

  return (
    <View style={{}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `${prod.URL}${data.item_pic}` }}
              style={styles.image}
            />
          </View>
          <View style={styles.item}>
            <Text value={data.item_name} color="#002a0c" variant={"heading"} />
            <Text
              value={`Kes ${data.price}`}
              color="#002a0c"
              variant="subheading"
            />
            <Text
              value={data.description || "some description"}
              variant="body"
              color={"grey"}
            />
            {data.menu_attributes.length > 0 && (
              <View>
                <Text
                  value="Select additional options"
                  variant="subtitle"
                  color={"#002a0c"}
                />
                <FlatList
                  style={{ height: 150 }}
                  data={data.menu_attributes.filter((addon) => addon.active)}
                  keyExtractor={(addon) => addon.id.toString()}
                  renderItem={({ item: addon }) => (
                    <ListItem
                      title={`${addon.name} for ${addon.price} (${
                        addonItems.find((item) => item.addon_id === addon.id)
                          ?.addon_quantity || 0
                      })`}
                      iconLeft={"minus"}
                      iconRight={"plus"}
                      handlePressRightIcon={() => handleAddAddonToCart(addon)}
                      handlePressLeftIcon={() => removeAddonFromCart(addon.id)}
                    />
                  )}
                />
              </View>
            )}
            <Text value="Quantity" variant="subtitle" color={"#002a0c"} />
            <ListItem
              // title={` ${data.item_name}s for  ${parseFloat(data.price)}`}
              title={`${data.item_name} for ${data.price} (${
                cartItems.find((item) => item.item_id === data.id)
                  ?.item_quantity || 0
              } in cart)`}
              iconLeft={"minus"}
              iconRight={"plus"}
              handlePressLeftIcon={() => removeFromCart(data.id)}
              handlePressRightIcon={() =>
                addToCart({
                  item_name: data.item_name,
                  item_id: data.id,
                  item_price: data.price,
                  item_pic: data.item_pic,
                  item_quantity: 1,
                })
              }
            />
            <View style={styles.input}>
              <Text value="Comments" variant={"subheading"} color={"#002a0c"} />
              <Input
                defaultValue={`Extra instructions for ${data.item_name}`}
                onChange={(text) => setComments(text)}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
          <Pressable style={styles.button} onPress={handleAddToCart}>
            <Text value={`Add to cart `} variant={"important"} />
          </Pressable>
        </View>
        <Pressable
          style={[styles.iconContainer]}
          onPress={() => setModalVisible(false)}
        >
          <FontAwesome5 name="times" size={22} style={styles.icon} />
        </Pressable>
      </Modal>
    </View>
  );
};

export default ItemModal;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fafafa",
    height: "100%",
    borderRadius: 20,
    padding: 10,
  },
  imageContainer: {
    width: "100%",
    height: "30%",
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  item: {
    flexGrow: 1,
    padding: 10,
    height: 300,
  },
  button: {
    backgroundColor: "#002a00",
    padding: 10,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  iconContainer: {
    height: 50,
    width: 50,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "lightgray",
    position: "absolute",
    top: 10,
    left: 10,
  },
  icon: {
    color: "#fff",
  },
  input: {
    marginVertical: 10,
  },
});
