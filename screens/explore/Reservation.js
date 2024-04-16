import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Calendar, DropdownIOS, Text, Input } from "../../components";
import { formatOrderDate } from "../../utils/helper";
import { Button } from "react-native-paper";

const premises = [
  {
    label: "Vanguard",
    value: 1,
  },
  {
    label: "Java",
    value: 2,
  },
  {
    label: "Kukito",
    value: 3,
  },
];

const Reservation = ({ navigation }) => {
  const [premise, setPremise] = useState(null);
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState("");
  const [accepted, setAccepted] = useState(false);

  // console.log(description);

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleReservation = () => {
    if (!premise || !date || !description) {
      alert("Please fill all fields");
      return;
    }
    const formattedDate = date ? formatOrderDate(date) : "";
    const data = {
      premise: premise,
      check_in_date: formattedDate,
      description,
      is_accepted: accepted,
    };
    console.log(data);
    // setAccepted(true);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.column}>
          <Text
            value="I would like to make a reservation for:"
            variant="important"
            color="#002a0c"
          />
          <DropdownIOS
            items={premises}
            onChange={setPremise}
            selectedValue={premise}
            placeholder={"Select Premise"}
            iconLeft={"restaurant"}
          />
        </View>
        <View style={styles.column}>
          <Text value="Select a date" variant="important" color="#002a0c" />
          <Calendar selectDate={setDate} />
        </View>
        <View style={styles.column}>
          <Text value="Description" variant="important" color="#002a0c" />
          <Input
            placeholder="Description"
            iconLeft="text"
            multiline
            numberOfLines={4}
            onChange={handleDescriptionChange}
          />
          <Button
            mode="contained-tonal"
            onPress={handleReservation}
            style={styles.button}
          >
            Reserve
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
export default Reservation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 10,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    margin: 10,
  },
  button: {
    margin: 10,
    backgroundColor: "#aef1af",
    color: "#fafafa",
  },
});
