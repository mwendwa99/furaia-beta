import React, { useState, useContext, useEffect } from "react";

import {
  Text as RNText,
  useWindowDimensions,
  StyleSheet,
  FlatList,
  Pressable,
  View,
  Platform,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { warning } from "../../utils/toast";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import { MenuListItem, Text, Searchbar } from "../../components";
// import { ShoppingCartContext } from "../../context/cartContext";

function MenuScreen({ navigation }) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const { menu } = useSelector((state) => state.menu);
  const [searchQuery, setSearchQuery] = useState("");

  // if no Menu data, navigate to scan screen
  useEffect(() => {
    if (!menu || Object.keys(menu).length === 0) {
      navigation.navigate("Scan");
    }
  }, [menu]);

  const categories = Object.keys(menu).filter(
    (category) => menu[category].length > 0
  );

  const handleCheckout = () => {
    navigation.navigate("Checkout");
  };

  // Filter menu items based on search query
  const filteredMenu = Object.fromEntries(
    categories.map((category) => [
      category,
      menu[category].filter((item) =>
        item?.item_name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    ])
  );

  // If there's no search query, show all items
  const renderedMenu = searchQuery ? filteredMenu : menu;

  // Render flatlist for each category
  const renderScene = SceneMap(
    Object.fromEntries(
      categories.map((category) => [
        category,
        () => (
          <FlatList
            data={renderedMenu[category]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MenuListItem item={item} />}
          />
        ),
      ])
    )
  );

  // Get the index of the category containing the search query
  const matchingIndex = categories.findIndex(
    (category) => filteredMenu[category]?.length > 0
  );

  // Set the index to the matching category index
  useEffect(() => {
    if (searchQuery && matchingIndex !== -1) {
      setIndex(matchingIndex);
    }
  }, [searchQuery, matchingIndex]);

  // // Render tab bar
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={tabStyles.indicator}
      style={tabStyles.tabBar}
      renderLabel={({ route, focused }) => (
        <View
          style={{
            ...styles.tabBar,
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
      <StatusBar style="dark" translucent={true} animated={true} />
    </SafeAreaView>
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
  tabBar: {
    borderWidth: 2,
    borderColor: "#c3c3c3",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 100,
  },
});

export default MenuScreen;
