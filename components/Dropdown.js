import React from "react";
import { Platform, View } from "react-native";
import { Picker, PickerIOS } from "@react-native-picker/picker";

export default function Dropdown({ onChange, items, selectedValue }) {
  return (
    <View style={{ borderWidth: 1, borderColor: "#002a0c", borderRadius: 4 }}>
      {Platform.OS === "android" && (
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => {
            onChange(itemValue);
          }}
        >
          {items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      )}
      {Platform.OS === "ios" && (
        <PickerIOS
          selectedValue={selectedValue}
          onValueChange={(itemValue) => {
            onChange(itemValue);
          }}
          style={{
            borderColor: "#000",
            borderWidth: 1,
            borderRadius: 5,
          }}
        >
          {items.map((item, index) => (
            <PickerIOS.Item key={index} label={item.label} value={item.value} />
          ))}
        </PickerIOS>
      )}
    </View>
  );
}
