import React, { useRef } from "react";
import { SearchBar } from "react-native-elements";
import { Platform } from "react-native";

export default function Search({ setSearchQuery }) {
  const searchBarRef = useRef(null);

  const updateSearch = (search) => {
    setSearchQuery(search);
  };

  return (
    <SearchBar
      ref={searchBarRef}
      round
      // platform={
      //   Platform.OS === "ios"
      //     ? "ios"
      //     : Platform.OS === "android"
      //     ? "android"
      //     : "default"
      // }
      placeholder="Search Here..."
      onChangeText={updateSearch}
      containerStyle={{ backgroundColor: "#fff" }}
      searchIcon={
        Platform.OS === "ios" ? { size: 24, color: "black" } : { size: 24 }
      }
    />
  );
}
