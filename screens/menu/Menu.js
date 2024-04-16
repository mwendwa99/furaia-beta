import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text as RNText,
  useWindowDimensions,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
  View,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { warning } from "../../utils/toast";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";

import { MenuListItem, Text, Searchbar } from "../../components";
// import { ShoppingCartContext } from "../../context/cartContext";

const menuData = {
  data: {
    Drinks: [
      {
        id: 3,
        category_id: "Drinks",
        item_name: "Coke",
        description: "",
        price: "100.00",
        item_pic: "/media/menu/Welcome_Scan.jpg",
        premise_id: 1,
        menu_attributes: [
          {
            id: 19,
            name: "Coke",
            menu_item: 3,
            active: true,
            price: "100.00",
          },
          {
            id: 20,
            name: "Fanta",
            menu_item: 3,
            active: true,
            price: "100.00",
          },
          {
            id: 21,
            name: "Sprite",
            menu_item: 3,
            active: true,
            price: "100.00",
          },
          {
            id: 22,
            name: "Soda",
            menu_item: 3,
            active: true,
            price: "100.00",
          },
          {
            id: 23,
            name: "Water",
            menu_item: 3,
            active: true,
            price: "100.00",
          },
        ],
      },
      {
        id: 4,
        category_id: "Drinks",
        item_name: "Fanta",
        description: "",
        price: "100.00",
        item_pic: "/media/menu/Welcome_Scan.jpg",
        premise_id: 1,
        menu_attributes: [
          {
            id: 19,
            name: "Coke",
            menu_item: 3,
            active: true,
            price: "100.00",
          },
          {
            id: 20,
            name: "Fanta",
            menu_item: 3,
            active: true,
            price: "100.00",
          },
          {
            id: 21,
            name: "Sprite",
            menu_item: 3,
            active: true,
            price: "100.00",
          },
          {
            id: 22,
            name: "Soda",
            menu_item: 3,
            active: true,
            price: "100.00",
          },
          {
            id: 23,
            name: "Water",
            menu_item: 3,
            active: true,
            price: "100.00",
          },
        ],
      },
      {
        id: 5,
        category_id: "Drinks",
        item_name: "Sprite",
        description: "",
        price: "100.00",
        item_pic: "/media/menu/Welcome_Scan.jpg",
        premise_id: 1,
        menu_attributes: [
          {
            id: 19,
            name: "Coke",
            menu_item: 3,
            active: true,
            price: "100.00",
          },
          {
            id: 20,
            name: "Fanta",
            menu_item: 3,
            active: true,
            price: "100.00",
          },
          {
            id: 21,
            name: "Sprite",
            menu_item: 3,
            active: true,
            price: "100.00",
          },
          {
            id: 22,
            name: "Soda",
            menu_item: 3,
            active: true,
            price: "100.00",
          },
          {
            id: 23,
            name: "Water",
            menu_item: 3,
            active: true,
            price: "100.00",
          },
        ],
      },
    ],
    Snacks: [
      {
        id: 1,
        category_id: "Snacks",
        item_name: "Burger",
        description: "",
        price: "1000.00",
        item_pic: "/media/menu/bm0.BMP",
        premise_id: 1,
        menu_attributes: [
          {
            id: 1,
            name: "Extra Cheese",
            menu_item: 1,
            active: true,
            price: "100.00",
          },
          {
            id: 4,
            name: "Chicken piece",
            menu_item: 1,
            active: true,
            price: "1200.00",
          },
          {
            id: 5,
            name: "extra lettuce",
            menu_item: 1,
            active: true,
            price: "50.00",
          },
          {
            id: 6,
            name: "extra tomato",
            menu_item: 1,
            active: true,
            price: "50.00",
          },
          {
            id: 7,
            name: "extra onions",
            menu_item: 1,
            active: true,
            price: "50.00",
          },
          {
            id: 8,
            name: "extra pickles",
            menu_item: 1,
            active: true,
            price: "50.00",
          },
          {
            id: 9,
            name: "extra ketchup",
            menu_item: 1,
            active: true,
            price: "50.00",
          },
          {
            id: 10,
            name: "extra mustard",
            menu_item: 1,
            active: true,
            price: "50.00",
          },
          {
            id: 11,
            name: "extra mayo",
            menu_item: 1,
            active: true,
            price: "50.00",
          },
          {
            id: 12,
            name: "extra BBQ sauce",
            menu_item: 1,
            active: true,
            price: "50.00",
          },
          {
            id: 13,
            name: "extra hot sauce",
            menu_item: 1,
            active: true,
            price: "50.00",
          },
          {
            id: 14,
            name: "extra ranch",
            menu_item: 1,
            active: true,
            price: "50.00",
          },
          {
            id: 15,
            name: "extra honey mustard",
            menu_item: 1,
            active: true,
            price: "50.00",
          },
          {
            id: 16,
            name: "extra blue cheese",
            menu_item: 1,
            active: true,
            price: "50.00",
          },
          {
            id: 17,
            name: "extra buffalo sauce",
            menu_item: 1,
            active: true,
            price: "50.00",
          },
          {
            id: 18,
            name: "extra chipotle sauce",
            menu_item: 1,
            active: true,
            price: "50.00",
          },
        ],
      },
    ],
    Meals: [
      {
        id: 2,
        category_id: "Meals",
        item_name: "Jolof",
        description: "nigeria stuff",
        price: "500.00",
        item_pic: "/media/menu/Welcome_Scan.jpg",
        premise_id: 1,
        menu_attributes: [
          {
            id: 2,
            name: "jolof stew",
            menu_item: 2,
            active: true,
            price: "50.00",
          },
          {
            id: 3,
            name: "Chocolate",
            menu_item: 2,
            active: true,
            price: "120.00",
          },
        ],
      },
    ],
  },
  outlet: "Vanguard",
  outlet_code: "VNGD",
  status: 200,
};

function MenuScreen({ navigation }) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const { menu } = useSelector((state) => state.menu);

  const categories = Object.keys(menu?.data).filter(
    (category) => menu?.data[category].length > 0
  );

  const categoryList = [
    { title: "one" },
    { title: "two" },
    { title: "three" },
    { title: "four" },
    { title: "five" },
    { title: "six" },
    { title: "seven" },
    { title: "eight" },
    { title: "nine" },
    { title: "ten" },
  ];
  // console.log("categories", categories);
  // console.log("categoryList", categoryList);

  const handleCheckout = () => {
    navigation.navigate("Checkout");
  };

  // Render flatlist for each category
  const renderScene = SceneMap(
    Object.fromEntries(
      categories.map((category) => [
        category,
        () => (
          <FlatList
            // data={menuData.data[category]}
            data={menu.data[category]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MenuListItem item={item} />}
          />
        ),
      ])
    )
  );

  // Render tab bar
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={tabStyles.indicator}
      style={tabStyles.tabBar}
      renderLabel={({ route, focused }) => (
        <View
          style={{
            borderWidth: 2,
            borderColor: "#c3c3c3",
            borderRadius: 10,
            paddingHorizontal: 30,
            paddingVertical: 10,
            width: "100%",
            backgroundColor: focused ? "#002a0c" : "#fafafa",
          }}
        >
          <RNText style={[tabStyles.label, focused && tabStyles.labelFocused]}>
            {route.title}
          </RNText>
        </View>
      )}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <Searchbar />
      <TabView
        navigationState={{
          index,
          routes: categories.map((category) => ({
            key: category,
            title: category,
          })),
        }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      <Pressable style={styles.cartButton} onPress={handleCheckout}>
        <Text value={`Checkout`} variant={"important"} />
      </Pressable>
      <StatusBar style="dark" />
    </View>
  );
}

const tabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#002a0c",
  },
  indicator: {
    backgroundColor: "#002a0c",
  },
  label: {
    color: "#002a0c",
  },
  labelFocused: {
    color: "white",
  },
});

const styles = StyleSheet.create({
  cartButton: {
    backgroundColor: "#002a0c",
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
    width: "50%",
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default MenuScreen;
