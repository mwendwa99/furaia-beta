// import { Camera, CameraType } from "expo-camera";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import { useState } from "react";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "./Text";
export default function ExpoScanner() {
  //   const [type, setType] = useState(CameraType.back);
  //   const [permission, requestPermission] = Camera.useCameraPermissions();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <CameraView
        // autoFocus={Camera.Constants.AutoFocus.on}
        barCodeScannerSettings={{
          barCodeTypes: ["qr"],
        }}
        onBarCodeScanned={handleBarCodeScanned}
        // onModernBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.camera}
        // type={type}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Menu")}
          >
            <View style={styles.text}>
              <Text value="MENU" variant={"title"} />
            </View>
          </TouchableOpacity>
          {scanned && (
            <Button
              title="Tap to Scan Again"
              onPress={() => setScanned(false)}
            />
          )}
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
