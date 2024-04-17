import { View, StyleSheet, Pressable, SafeAreaView, Image } from "react-native";
import { useState } from "react";
import ModalItem from "./Modal";
import Text from "./Text";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { prod } from "../env";

const MenuListItem = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  // console.log("item", item);

  return (
    <Pressable style={styles.container} onPress={() => setModalVisible(true)}>
      {item && (
        <View style={styles.item}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  `${prod.URL}${item.item_pic}` ||
                  "https://via.placeholder.com/150",
              }}
              style={styles.image}
              onError={(error) => console.error("Image loading error:", error)}
            />
          </View>
          <View style={styles.description}>
            <Text
              value={(item.item_name || "Not found").slice(0, 20)}
              variant="subheading"
              color={"#002a0c"}
            />
            <Text
              value={(
                item.description ||
                "some descriptive text, some descriptive text,some descriptive text,some descriptive text,some descriptive text,some descriptive text"
              ).slice(0, 50)}
              variant="body"
              color={"grey"}
            />
            <Text
              value={item.price || "0.00"}
              variant="important"
              color={"#002a0c"}
            />
          </View>
          <View style={styles.iconContainer}>
            <Pressable
              style={styles.icon}
              onPress={() => setModalVisible(true)}
            >
              <FontAwesome5 name="plus" size={22} style={styles.PlusIcon} />
            </Pressable>
            <ModalItem
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              data={item}
            />
          </View>
        </View>
      )}
    </Pressable>
  );
};
export default MenuListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    // flex: 1,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    alignItems: "flex-start",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 20,
  },
  description: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  iconContainer: {
    alignSelf: "center",
  },
  icon: {
    alignContent: "center",
  },
});
