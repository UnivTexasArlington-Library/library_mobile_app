import {Pressable, StyleSheet, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {GlobalStyles} from "../constants/styles";
import {useContext} from "react";
import {LibCalContext} from "../store/context/libCal-context";

function TodaysLibraryHours({department}) {
  const libCalContext = useContext(LibCalContext);
  const todaysLibHours = libCalContext.todaysLibHours;
  const departmentLocations = todaysLibHours.filter(
    (location) => location.name === department
  );
  const departmentNameAndHours = departmentLocations[0];
  let departmentHours;
  if (departmentNameAndHours !== undefined) {
    departmentHours = Object.values(departmentNameAndHours)[1];
  } else {
    const dataCave = todaysLibHours.filter(
      (location) => location.name === "DataCave (Staffed Hours)"
    );
    const dataCaveNameAndHours = dataCave[0];
    departmentHours = Object.values(dataCaveNameAndHours)[1];
  }
  if (!departmentHours.from) {
    return <Text>{departmentHours}</Text>;
  } else {
    return (
      <Text>
        {departmentHours.from} to {departmentHours.to}
      </Text>
    );
  }
}

export default TodaysLibraryHours;

const styles = StyleSheet.create({});
