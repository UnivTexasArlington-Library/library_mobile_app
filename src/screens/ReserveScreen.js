import {useFocusEffect} from "@react-navigation/native";
import format from "date-fns/format";
import LottieView from "lottie-react-native";
import React, {Fragment, useCallback, useEffect, useRef, useState} from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {CalendarProvider, ExpandableCalendar} from "react-native-calendars";
import DropDownPicker from "react-native-dropdown-picker";
import Modal from "react-native-modal";
import {Col, Table, TableWrapper} from "react-native-table-component";
import FormButton from "../components/FormButton";
import {categoryData, locationData, spaceData} from "../constants/locationIDs";
import {GlobalStyles} from "../constants/styles";
import {getTableData} from "../util/getTableData";
import {retrieveAvailabilty, retrieveBookings} from "../util/http";
import {filterSpacesDropdown} from "../util/reserveHoursDropdownFilter";

const INITIAL_DATE = new Date();

marked = {
  [`${Date(-1)}`]: {marked: true},
  [`${Date()}`]: {marked: true},
  [`${Date(1)}`]: {marked: true},
  [`${Date(2)}`]: {marked: true},
  [`${Date(4)}`]: {marked: true},
};

function ReserveScreen({navigation}) {
  const [availabiltyOptions, setAvailableOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [indexValue, setIndexValue] = useState();
  const [availabiltyAndBookingsList, setAvailabiltyAndBookingsList] = useState(
    []
  );
  const [locationName, setLocationName] = useState();
  const [spaceName, setSpaceName] = useState();
  const [categoryName, setCategoryName] = useState();
  const [fromDate, setFromDate] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSpace, setOpenSpace] = useState(false);
  const [openAvailabiltyOptions, setOpenAvailabilityOptions] = useState(false);
  const [locationValue, setLocationValue] = useState(null);
  const [categoriesValue, setCategoriesValue] = useState(null);
  const [spacesValue, setSpacesValue] = useState(null);
  const [availabilityValue, setAvailabilityValue] = useState(null);
  const [locations, setLocations] = useState(locationData);
  const [categories, setCategories] = useState(categoryData);
  const [spaces, setSpaces] = useState(spaceData);
  const [currentDate, setCurrentDate] = useState(INITIAL_DATE);
  const [tableData, setTableData] = useState([]);
  const [tableDataTwo, setTableDataTwo] = useState([]);
  const locationRef = useRef(null);
  const categoryRef = useRef(null);
  //change date to the selected calendar date
  const onDateChanged = (date, source) => {
    console.log("TimelineCalendarScreen onDateChanged: ", date, source);
    setCurrentDate(date);
  };
  //change month to the selected calendar month
  const onMonthChange = (month, updateSource) => {
    console.log("TimelineCalendarScreen onMonthChange: ", month, updateSource);
  };
  //toggles the reserve study room time submission modal
  const toggleModal = (value, index) => {
    console.log("index", index);
    //sets the index value used to set the filtered options provided on the
    //reserve study room time submission modal
    setIndexValue(index);
    //if the modal is not displayed set the values needed to reserve a study space.
    if (isModalVisible === false) {
      const name = spaces.filter((item) => spacesValue === item.value);
      const category = categories.filter(
        (item) => categoriesValue === item.value
      );
      const location = locations.filter((item) => locationValue === item.value);
      setFromDate(value);
      setSpaceName(name[0].label);
      setCategoryName(category[0].label);
      setLocationName(location[0].label);
    }
    //if the modal is displayed set the availability value to false
    if (isModalVisible === true) {
      setAvailabilityValue(null);
    }
    setModalVisible(!isModalVisible);
  };
  //close the dropdown picker
  const onOpen = useCallback((value) => {
    if (value === "location") {
      setOpenCategory(false);
      setOpenSpace(false);
    } else if (value === "category") {
      setOpenLocation(false);
      setOpenSpace(false);
    } else {
      setOpenLocation(false);
      setOpenCategory(false);
    }
  });
  //when the screen is no longer in displayed reset the following values to null
  useFocusEffect(
    useCallback(() => {
      setLocationValue(null);
      setCategoriesValue(null);
      setSpacesValue(null);
      setTableData([]);
      setTableDataTwo([]);
    }, [])
  );
  //when the from date changes update the availability options
  useEffect(() => {
    const filteredAvailabiltyOptions = availabiltyAndBookingsList.slice(
      indexValue + 1
    );
    setFilteredOptions(filteredAvailabiltyOptions);
  }, [fromDate]);
  //when the filtered options changes update the availability options
  useEffect(() => {
    const availabiltyOptionsList = [];
    //if the filtered option is not booked update the available options list with that option
    //and add the label and value properties
    for (let x = 0; x < filteredOptions.length; x++) {
      if (filteredOptions[x][0] !== "Booked") {
        availabiltyOptionsList.push({
          label: format(
            new Date(filteredOptions[x][0]),
            "h':'mm a cccc',' MMMM d',' yyyy"
          ),
          value: filteredOptions[x][0],
        });
      } else {
        break;
      }
    }
    function add_minutes(date, minutes) {
      date.setMinutes(date.getMinutes() + minutes);

      return date;
    }
    const specificDate = new Date(fromDate);
    //add 30 minutes to the date time
    const result = add_minutes(specificDate, 30);
    //if the available options list is empty then push the first option with
    //the label and value property
    if (availabiltyOptionsList.length < 1) {
      availabiltyOptionsList.push({
        //reformat the date
        label: format(new Date(result), "h':'mm a cccc',' MMMM d',' yyyy"),
        value: result,
      });
    }
    //update the options list
    setAvailableOptions(availabiltyOptionsList);
  }, [filteredOptions]);
  //recieve the space items for the dropdown menu
  function getSpacesItems() {
    setSpaces(filterSpacesDropdown(categoriesValue, spaces));
  }
  //button to reserve the time slot
  function elementButton(value, index) {
    return (
      <TouchableOpacity onPress={() => toggleModal(value, index)}>
        <View
          style={{backgroundColor: "green", width: "100%", height: "100%"}}
        />
      </TouchableOpacity>
    );
  }
  //navigate to the booking screen after clicking the submit button
  function openDrawerHandler() {
    setLocationValue(null);
    setCategoriesValue(null);
    setSpacesValue(null);
    setModalVisible(false);
    navigation.navigate("Booking", {
      fromDate: fromDate,
      category: categoriesValue,
      categoryName: categoryName,
      toDate: availabilityValue
        ? availabilityValue
        : availabiltyOptions[0].value,
      item: spacesValue,
      itemName: spaceName,
      locationName: locationName,
    });
  }

  async function getAvailabiltyAndBookings() {
    const availabilityHours = await retrieveAvailabilty(
      locationValue,
      categoriesValue,
      spacesValue,
      currentDate
    );
    const bookedHours = await retrieveBookings(
      categoriesValue,
      currentDate,
      spacesValue
    );
    const tableData = getTableData(
      availabilityHours,
      bookedHours,
      elementButton
    );
    setIsLoading(true);
    setAvailabiltyAndBookingsList(tableData[2]);
    setTableDataTwo(tableData[1]);
    setTableData(tableData[0]);
    setIsLoading(false);
  }

  useEffect(() => {
    if (locationRef.current !== locationValue) {
      console.log("location value changed");
      locationRef.current = locationValue;
      setCategoriesValue(null);
      setSpacesValue(null);
    }
    if (categoryRef.current !== categoriesValue) {
      console.log("category value changed");
      categoryRef.current = categoriesValue;
      setSpacesValue(null);
    }
    for (let i = 0; i < categories.length; i++) {
      categories[i].disabled = true;
      categories[i].containerStyle = {
        height: 0,
        margin: 0,
      };
    }
    for (let i = 0; i < spaces.length; i++) {
      spaces[i].disabled = true;
      spaces[i].containerStyle = {
        height: 0,
        margin: 0,
      };
    }
    if (locationValue !== null && locationValue === 10450) {
      for (let i = 0; i < 6; i++) {
        categories[i].disabled = false;
        categories[i].containerStyle = {
          height: 60,
          margin: 2,
        };
      }
    }
    if (locationValue === 10450 && categoriesValue) {
      getSpacesItems();
    }
    if (locationValue && categoriesValue && spacesValue) {
      getAvailabiltyAndBookings();
    }
  }, [locationValue, categoriesValue, spacesValue, currentDate]);

  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <Fragment>
          <CalendarProvider
            date={currentDate}
            onDateChanged={onDateChanged}
            onMonthChange={onMonthChange}
            showTodayButton
            disabledOpacity={0.6}
            // numberOfDays={3}
          >
            <ExpandableCalendar
              firstDay={1}
              markedDates={this.marked}
              theme={{
                arrowColor: GlobalStyles.colors.primary50,
                todayTextColor: GlobalStyles.colors.primary50,
                selectedDotColor: GlobalStyles.colors.primary50,
                backgroundColor: GlobalStyles.colors.primary800,
                selectedDayBackgroundColor: GlobalStyles.colors.primary800,
              }}
            />
          </CalendarProvider>
        </Fragment>
        <View
          style={{
            flexDirection: "row",
            width: deviceWidth,
            justifyContent: "center",
            paddingTop: 8,
          }}
        >
          <View
            style={{
              width: deviceWidth / 3.3,
              margin: 4,
            }}
          >
            <DropDownPicker
              listMode="SCROLLVIEW"
              open={openLocation}
              onOpen={() => onOpen("location")}
              value={locationValue}
              items={locations}
              placeholder="Location"
              setOpen={setOpenLocation}
              setValue={setLocationValue}
              setItems={setLocations}
              listItemContainerStyle={{
                height: 60,
                margin: 2,
              }}
              selectedItemLabelStyle={{
                fontFamily: "open-sans-bold",
              }}
              closeOnBackPressed={true}
              closeAfterSelecting={true}
            />
          </View>
          <View style={{width: deviceWidth / 3.3, margin: 4}}>
            <DropDownPicker
              loading={loading}
              listMode="SCROLLVIEW"
              open={openCategory}
              onOpen={() => onOpen("category")}
              value={categoriesValue}
              items={categories}
              placeholder="Category"
              setOpen={setOpenCategory}
              setValue={setCategoriesValue}
              setItems={setCategories}
              listItemContainerStyle={{
                height: 60,
                margin: 2,
              }}
              selectedItemLabelStyle={{
                fontFamily: "open-sans-bold",
              }}
              closeOnBackPressed={true}
              closeAfterSelecting={true}
            />
          </View>
          <View style={{width: deviceWidth / 3.3, margin: 4}}>
            <DropDownPicker
              listMode="SCROLLVIEW"
              open={openSpace}
              onOpen={() => onOpen("spaces")}
              value={spacesValue}
              items={spaces}
              placeholder="Space"
              setOpen={setOpenSpace}
              setValue={setSpacesValue}
              setItems={setSpaces}
              listItemContainerStyle={{
                height: 60,
                margin: 2,
              }}
              selectedItemLabelStyle={{
                fontFamily: "open-sans-bold",
              }}
              closeOnBackPressed={true}
              closeAfterSelecting={true}
            />
          </View>
        </View>

        {isLoading ? (
          <View style={styles.loaderContainer}>
            <LottieView
              source={require("../../assets/loader.json")}
              style={styles.loader}
              autoPlay
            />
          </View>
        ) : (
          <View style={styles.container}>
            <Table
              borderStyle={{
                borderWidth: 2,
                borderColor: "#c8e1ff",
              }}
            >
              {tableData.map((rowData, index) => (
                <TableWrapper style={{flexDirection: "row"}}>
                  <Col
                    key={index}
                    data={tableData[index]}
                    style={[
                      styles.row,
                      index % 2 && {backgroundColor: "#F7F6E7"},
                    ]}
                    textStyle={styles.text}
                  />
                  <Col
                    key={index + 50}
                    data={tableDataTwo[index]}
                    style={
                      tableDataTwo[index][0] == "Available"
                        ? {
                            backgroundColor: "green",
                          }
                        : tableDataTwo[index][0] == "Booked" && {
                            backgroundColor: "red",
                          }
                    }
                    textStyle={{display: "none"}}
                  />
                </TableWrapper>
              ))}
            </Table>
          </View>
        )}
        <Modal
          isVisible={isModalVisible}
          style={{justifyContent: "center", alignItems: "center"}}
        >
          <View
            style={{
              width: "90%",
              height: 300,
              backgroundColor: "#fff",
              borderRadius: 4,
              alignItems: "center",
              padding: 8,
            }}
          >
            <Text style={styles.modalTitleText}>{spaceName}</Text>
            <View style={styles.modalTextContainer}>
              <Text>From</Text>
              <Text>
                {format(new Date(fromDate), "h':'mm a cccc',' MMMM d',' yyyy")}
              </Text>
            </View>
            <View style={styles.modalTextContainer}>
              <Text>To</Text>
              {availabiltyOptions.length > 0 && (
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  open={openAvailabiltyOptions}
                  value={availabilityValue}
                  items={availabiltyOptions}
                  placeholder={`${availabiltyOptions[0].label}`}
                  setOpen={setOpenAvailabilityOptions}
                  setValue={setAvailabilityValue}
                  setItems={setAvailableOptions}
                  listItemContainerStyle={{
                    height: 60,
                    margin: 2,
                  }}
                  selectedItemLabelStyle={{
                    fontFamily: "open-sans-bold",
                  }}
                  closeOnBackPressed={true}
                  closeAfterSelecting={true}
                />
              )}
            </View>
            <View>
              <FormButton onPress={() => openDrawerHandler()}>
                Submit Times
              </FormButton>
              <FormButton onPress={toggleModal}>Cancel</FormButton>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

export default ReserveScreen;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    width: "100%",
    minHeight: 300,
  },
  head: {height: 40, backgroundColor: "#f1f8ff"},
  text: {margin: 6},
  rootContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
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
  modalTitleText: {
    fontFamily: "open-sans-bold",
    fontSize: 17,
  },
  modalTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
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
  loaderContainer: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    height: deviceHeight,
  },
  loader: {
    width: deviceWidth,
    height: 200,
  },
});
