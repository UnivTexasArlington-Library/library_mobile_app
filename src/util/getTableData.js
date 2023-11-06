import {reserveHours} from "../constants/reserveHours";
import format from "date-fns/format";
import {View, TouchableOpacity, Alert} from "react-native";
import {Converttimeformat} from "./Converttimeformat";

export function getTableData(availabilityHours, bookedHours, elementButton) {
  const columnOne = [];
  const columnTwo = [];
  const columnThree = [];
  let extendedHours = false;
  let timeExtendedPastMidnight = false;
  for (let i = 0; i < reserveHours.length; i++) {
    const rowData = [];
    for (let j = 0; j < 1; j += 1) {
      rowData.push(`${reserveHours[i]}`);
    }
    columnOne.push(rowData);
  }
  for (let i = 0; i < reserveHours.length; i++) {
    const rowData = [];
    const availabilityAndBookings = [];
    for (let j = 0; j < 1; j += 1) {
      let timeAvailable = availabilityHours.filter(
        (time) => format(new Date(time.from), "p") == reserveHours[i]
      );
      let timeBooked = bookedHours.filter(
        (time) => format(new Date(time.from), "p") == reserveHours[i]
      );
      if (timeAvailable.length > 0) {
        extendedHours = false;
      }
      if (timeBooked.length > 0) {
        extendedHours = false;
      }
      if (timeBooked.length > 0) {
        let timeTo = format(new Date(timeBooked[0].to), "p");
        let nextTime = reserveHours[i + 1];

        let timeTo24 = Converttimeformat(timeTo);
        let nextTime24 = Converttimeformat(nextTime);

        let timeOneDate = Number(
          new Date(2050, 1, 1, timeTo24.hours, timeTo24.minutes)
        );
        let timeTwoDate = Number(
          new Date(2050, 1, 1, nextTime24.hours, nextTime24.minutes)
        );

        timeOneDate > timeTwoDate
          ? (extendedHours = true)
          : (extendedHours = false);

        if (timeOneDate > 2527308000000) {
          console.log("TRUE");
          timeExtendedPastMidnight = true;
        }
      }
      if (timeAvailable.length > 0) {
        rowData.push(elementButton(timeAvailable[0].from, i));
        availabilityAndBookings.push(timeAvailable[0].from);
      } else if (
        timeBooked.length > 0 ||
        extendedHours ||
        timeExtendedPastMidnight
      ) {
        rowData.push(`Booked`);
        availabilityAndBookings.push(`Booked`);
      } else {
        rowData.push("");
        availabilityAndBookings.push("");
      }
    }
    columnTwo.push(rowData);
    columnThree.push(availabilityAndBookings);
  }

  return [columnOne, columnTwo, columnThree];
}
