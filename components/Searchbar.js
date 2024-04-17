import React, { Component } from "react";
import { SearchBar } from "react-native-elements";
import { Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

class Search extends Component {
  constructor(props) {
    super(props);
    this.searchBarRef = React.createRef();
  }

  updateSearch = (search) => {
    this.props.setSearchQuery(search);
  };

  handleBlur = () => {
    if (Platform.OS === "android" && this.searchBarRef.current) {
      this.searchBarRef.current.blur();
    }
  };

  render() {
    const { searchQuery } = this.props;

    return (
      <SearchBar
        ref={this.searchBarRef}
        round
        style={{ width: "100%", backgroundColor: "#fff" }}
        containerStyle={{
          backgroundColor: "#fff",
          borderBottomColor: "#fff",
          borderTopColor: "#fff",
        }}
        inputContainerStyle={{ backgroundColor: "#fff" }}
        placeholder="Search Here..."
        onChangeText={this.updateSearch}
        blurOnSubmit={true}
        onBlur={this.handleBlur}
        value={searchQuery} // If you want to pass the current search query value
      />
    );
  }
}

export default Search;
