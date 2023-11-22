import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";
import {Calendar, CalendarUtils} from "react-native-calendars";
import {GlobalStyles} from "../constants/styles";
import {getAllLocationHoursForSpecificDate} from "../util/http";
//set INITIAL_DATE to today's date
const INITIAL_DATE = new Date().toDateString();

function HoursScreen({navigation}) {
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [locationHours, setLocationHours] = useState([]);

  const getDate = (count) => {
    const date = new Date(INITIAL_DATE);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };

  //Get the location hours for the selected calendar date and
  //set the selected day to the new calendar date chosen by the user
  const onDayPress = useCallback(async (day) => {
    const locationHours = await getAllLocationHoursForSpecificDate(
      day.dateString
    );
    setLocationHours(locationHours);
    console.log(locationHours);
    setSelected(day.dateString);
  }, []);
  //Retrieve the inital location hours
  useEffect(() => {
    async function getInitialLocationHours() {
      const locationHours = await getAllLocationHoursForSpecificDate(
        INITIAL_DATE
      );
      setLocationHours(locationHours);
    }
    getInitialLocationHours();
  }, []);
  //Set the initial marked calendar day dot color to orange
  //and the selected dot color to dark blue
  const marked = useMemo(() => {
    return {
      [getDate(0)]: {
        dotColor: GlobalStyles.colors.primary50,
        marked: true,
      },
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: GlobalStyles.colors.primary800,
        selectedTextColor: "#FFFFFF",
      },
    };
  }, [selected]);

  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <Fragment>
          <Calendar
            enableSwipeMonths
            current={INITIAL_DATE}
            style={styles.calendar}
            onDayPress={onDayPress}
            markedDates={marked}
            theme={{
              arrowColor: GlobalStyles.colors.primary50,
              todayTextColor: GlobalStyles.colors.primary50,
              selectedDotColor: GlobalStyles.colors.primary50,
              backgroundColor: GlobalStyles.colors.primary800,
            }}
          />
        </Fragment>

        <View style={styles.locationsContainer}>
          {locationHours?.map((location) => {
            return (
              // If the location is closed show a red box-shadow around the containter
              // otherwise show a green box-shadow
              <View
                key={location.name}
                style={[
                  styles.locationCard,
                  Object.values(location)[1] === "Closed" && {
                    shadowColor: "red",
                  },
                ]}
              >
                {/* If the specific location is current closed display the text Closed in the color red 
                otherwise display the text Open in green text */}
                <View style={styles.locationCardHeader}>
                  <Text style={styles.locationTitleText}>{location.name}</Text>
                  {Object.values(location)[1] === "Closed" ? (
                    <Text style={[styles.locationTitleText, {color: "red"}]}>
                      Closed
                    </Text>
                  ) : (
                    <Text style={[styles.locationTitleText, {color: "green"}]}>
                      Open
                    </Text>
                  )}
                </View>
                {/* Display the open hours */}
                {!Object.values(location)[1].from ? (
                  <View style={styles.locationHoursTextContainer}>
                    <Text>Open Hours</Text>
                    <Text
                      style={{
                        fontSize: 8,
                        marginHorizontal: 8,
                      }}
                    >
                      {"\u2B24"}
                    </Text>
                    <Text> {Object.values(location)[1]}</Text>
                  </View>
                ) : (
                  <View style={styles.locationHoursTextContainer}>
                    <Text>Open Hours </Text>
                    <Text
                      style={{
                        fontSize: 8,
                        marginHorizontal: 8,
                      }}
                    >
                      {"\u2B24"}
                    </Text>
                    <Text>
                      {Object.values(location)[1].from} to{" "}
                      {Object.values(location)[1].to}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

export default HoursScreen;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
  locationsContainer: {
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  locationCard: {
    width: deviceWidth * 0.95,
    height: 60,
    margin: 4,
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "green",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  locationTitleText: {
    fontFamily: "open-sans-bold",
    fontSize: 17,
  },
  locationHoursTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calendar: {
    borderRadius: 8,
    marginTop: 8,
    width: deviceWidth * 0.95,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
