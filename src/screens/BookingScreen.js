import {Feather, Ionicons} from "@expo/vector-icons";
import {useFocusEffect} from "@react-navigation/native";
import {format} from "date-fns";
import {useCallback, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Modal from "react-native-modal";
import FormButton from "../components/FormButton";
import {postBooking} from "../util/http";

function BookingScreen({route, navigation}) {
  const {
    locationName,
    fromDate,
    category,
    categoryName,
    toDate,
    item,
    itemName,
  } = route.params;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });
  const [isBookingFormDisplayed, setIsBookingFormDisplayed] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const onSubmit = async (data) => {
    const post = await postBooking(
      fromDate,
      toDate,
      item,
      data.firstName,
      data.lastName,
      data.email
    );
    setEmail(data.email);
    if ("success" !== post) {
      setError(post);
    }
    setModalVisible(true);
  };

  function openDrawerHandler() {
    navigation.navigate("Reserve");
  }

  useFocusEffect(
    useCallback(() => {
      setEmail(null);
      setError(null);
      setModalVisible(false);
      setIsBookingFormDisplayed(false);
      // Below alert will fire every time when this screen is focused
    }, [])
  );

  return (
    <View style={styles.rootContainer}>
      <View style={styles.detailsContainer}>
        <View style={styles.itemContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Space</Text>
            <Text style={styles.textDescription}>{itemName}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Category</Text>
            <Text style={styles.textDescription}>{categoryName}</Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>From</Text>
            <Text style={styles.textDescription}>
              {format(new Date(fromDate), "h':'mm a cccc',' MMMM d',' yyyy")}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>To</Text>
            <Text style={styles.textDescription}>
              {format(new Date(toDate), "h':'mm a cccc',' MMMM d',' yyyy")}
            </Text>
          </View>
        </View>
      </View>
      {!isBookingFormDisplayed ? (
        <View style={styles.conditionsContainer}>
          <ScrollView>
            <Text style={styles.conditionsTitle}>
              Central Library: Terms & Conditions
            </Text>
            <Text style={styles.conditionsText}>
              Current UTA students, faculty, and staff may reserve group study
              rooms with a valid UTA NetID.{"\n"}
              {"\n"}A person may reserve a study room in 30-minute increments up
              to a maximum of 3 hours per individual per day.{"\n"}
              {"\n"}Reservations can be made up to 14 days in advance.{"\n"}
              {"\n"}
              Please be considerate of your peers and DO NOT book rooms for more
              than the maximum time by using the logins of different group
              members. Staff reserves the right to re-allocate a room to a new
              group to prevent room monopolization. Please be collegial as there
              are a limited number of rooms and equipment needed by the UTA
              Community.
              {"\n"}
              {"\n"}For complete Terms and Conditions, please see{" "}
              <Text
                style={{color: "blue"}}
                onPress={() =>
                  Linking.openURL(
                    "https://libraries.uta.edu/services/study-spaces/group-room-policy"
                  )
                }
              >
                Group Study Room Policy.
              </Text>
            </Text>
          </ScrollView>
        </View>
      ) : (
        <View>
          <View style={styles.firstAndLastContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 100,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  placeholder="First name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.firstAndLastInput}
                />
              )}
              name="firstName"
            />
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 100,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  placeholder="Last name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.firstAndLastInput}
                />
              )}
              name="lastName"
            />
          </View>
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 100,
                validate: (value) =>
                  value.endsWith("@uta.edu") || value.endsWith("@mavs.uta.edu"),
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.emailInput}
                />
              )}
              name="email"
            />
            <Text style={styles.emailRestrictText}>
              Enter @uta.edu, @mavs.uta.edu addresses only
            </Text>
            <Modal
              isVisible={isModalVisible}
              style={{justifyContent: "center", alignItems: "center"}}
            >
              <View
                style={{
                  width: "90%",
                  height: 600,
                  backgroundColor: "#fff",
                  borderRadius: 4,
                  alignItems: "center",
                  padding: 8,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {error === null ? (
                  <>
                    <Text style={styles.modalTitleText}>Booking Confirmed</Text>
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={100}
                      color="green"
                    />
                    <View style={styles.modalTextContainer}>
                      <Text>
                        You will receive an email confirmation at {email}.
                        Please check your spam folder or contact the library
                        with any questions.
                      </Text>
                      <Text style={styles.subtitle}>Space Information</Text>
                      <View style={styles.subTextContainer}>
                        <View>
                          <Text style={{fontFamily: "open-sans-bold"}}>
                            Location:{" "}
                          </Text>
                        </View>
                        <View>
                          <Text>{locationName}</Text>
                        </View>
                      </View>
                      <View style={styles.subTextContainer}>
                        <View>
                          <Text style={{fontFamily: "open-sans-bold"}}>
                            Zone:{" "}
                          </Text>
                        </View>
                        <View>
                          <Text>{categoryName}</Text>
                        </View>
                      </View>
                      <View style={styles.subTextContainer}>
                        <View>
                          <Text style={{fontFamily: "open-sans-bold"}}>
                            Space:{" "}
                          </Text>
                        </View>
                        <View>
                          <Text>{itemName}</Text>
                        </View>
                      </View>
                      <Text style={styles.subtitle}>Booking Time </Text>
                      <View>
                        <View>
                          <Text>From</Text>
                        </View>
                        <View>
                          <Text>
                            {format(
                              new Date(fromDate),
                              "h':'mm a cccc',' MMMM d',' yyyy"
                            )}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <View>
                          <Text>To</Text>
                        </View>
                        <View>
                          <Text>
                            {format(
                              new Date(toDate),
                              "h':'mm a cccc',' MMMM d',' yyyy"
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    <Text style={styles.modalTitleText}>Booking Denied</Text>
                    <Feather name="x-circle" size={100} color="red" />
                    <View style={styles.modalTextContainer}>
                      <Text>{error}</Text>
                    </View>
                  </>
                )}
                <FormButton onPress={openDrawerHandler}>OK</FormButton>
              </View>
            </Modal>
          </View>
          {errors.firstName && (
            <Text style={styles.errorMessage}>First Name is required.</Text>
          )}
          {errors.lastName && (
            <Text style={styles.errorMessage}>Last Name is required.</Text>
          )}
          {errors.email && errors.email.type === "required" && (
            <Text style={styles.errorMessage}>Email address is required.</Text>
          )}
          {errors.email && errors.email.type === "validate" && (
            <Text style={styles.errorMessage}>
              Email address must end in @uta.edu or @mavs.uta.edu
            </Text>
          )}
        </View>
      )}

      <View style={styles.continueButtonContainer}>
        {!isBookingFormDisplayed ? (
          <FormButton
            onPress={() => setIsBookingFormDisplayed(!isBookingFormDisplayed)}
          >
            Continue
          </FormButton>
        ) : (
          <FormButton onPress={handleSubmit(onSubmit)}>
            Submit my Booking
          </FormButton>
        )}
      </View>
    </View>
  );
}

export default BookingScreen;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    width: deviceWidth * 0.95,
    height: 230,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  itemContainer: {
    width: "50%",
    height: "100%",
  },
  textContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
  },
  textTitle: {
    height: 30,
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  textDescription: {
    height: 70,
    fontSize: 16,
    textAlign: "center",
  },
  conditionsContainer: {
    width: deviceWidth * 0.95,
    height: 350,
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.23,
    shadowRadius: 4,

    elevation: 2,
    // justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  conditionsTitle: {
    textDecorationLine: "underline",
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginBottom: 4,
  },
  conditionsText: {
    fontSize: 16,
  },
  continueButtonContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    width: "100%",
  },
  firstAndLastContainer: {
    flexDirection: "row",
    width: deviceWidth * 0.95,
    justifyContent: "center",
  },
  firstAndLastInput: {
    width: "48%",
    backgroundColor: "#fff",
    height: 50,
    margin: 4,
    borderRadius: 4,
    fontSize: 16,
    paddingHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 2,
  },
  emailInput: {
    width: "98%",
    backgroundColor: "#fff",
    height: 50,
    margin: 4,
    borderRadius: 4,
    fontSize: 16,
    paddingHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 2,
  },
  emailRestrictText: {
    width: "100%",
    marginHorizontal: 4,
  },
  errorMessage: {
    width: "100%",
    marginHorizontal: 4,
    color: "red",
  },
  modalTitleText: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
  },
  modalTextContainer: {
    marginVertical: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "open-sans-bold",
    marginVertical: 6,
  },
  subTextContainer: {
    flexDirection: "row",
    fontSize: 16,
    fontFamily: "open-sans-bold",
    marginVertical: 6,
  },
});
