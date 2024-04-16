// import * as React from "react";
// import { Searchbar } from "react-native-paper";

// const MyComponent = () => {
//   const [searchQuery, setSearchQuery] = React.useState("");

//   return (
//     <Searchbar
//       placeholder="Search"
//       onChangeText={setSearchQuery}
//       value={searchQuery}
//     />
//   );
// };

// export default MyComponent;

import { SearchBar } from "react-native-elements";
import { Platform } from "react-native";
import { useState } from "react";

export default function Search({ setSearchQuery }) {
  updateSearch = (search) => {
    setSearch({ search });
  };
  const [search, setSearch] = useState("");

  return (
    <SearchBar
      round
      platform={
        Platform.OS === "ios"
          ? "ios"
          : Platform.OS === "android"
          ? "android"
          : "default"
      }
      placeholder="Search Here..."
      onChangeText={updateSearch}
      // showLoading

      value={search}
      containerStyle={{ backgroundColor: "#fff" }}
      searchIcon={
        Platform.OS === "ios" ? { size: 24, color: "black" } : { size: 24 }
      }
      // inputContainerStyle={{ backgroundColor: "#f3f3f3" }}
    />
  );
}
