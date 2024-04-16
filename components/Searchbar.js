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
import { useState } from "react";

export default function MyComponent() {
  updateSearch = (search) => {
    setSearch({ search });
  };
  const [search, setSearch] = useState("");

  return (
    <SearchBar
      placeholder="Search Here..."
      onChangeText={updateSearch}
      value={search}
      containerStyle={{ backgroundColor: "#002a0c" }}
      inputContainerStyle={{ backgroundColor: "#f3f3f3" }}
    />
  );
}
