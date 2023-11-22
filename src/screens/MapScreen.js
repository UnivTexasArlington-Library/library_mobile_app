import * as Sentry from "@sentry/react-native";
import * as Location from "expo-location";
import {useEffect, useState} from "react";
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
} from "react-native-maps";
import {createOpenLink} from "react-native-open-maps";
import Carousel from "react-native-reanimated-carousel";
import OutlinedButton from "../components/OutlinedButton";
import TodaysLibraryHours from "../components/TodaysLibraryHours";
import {markers, polygons} from "../constants/mapData";
import {GlobalStyles} from "../constants/styles";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

function MapScreen({navigation}) {
  try {
    const [markersData, setMarkersData] = useState([]);
    const [polygonsData, setPolygonsData] = useState([]);
    const [status] = Location.useForegroundPermissions();

    //if location permissions are not enabled then display a modal
    //giving the user an option to enable location permissions
    //if the user selects cancel close the modal
    //if the user selects OK then take the user to application permission settings and give them the opportunity
    //to enable permissions
    const CheckIfLocationEnabled = async () => {
      if (!status.granted) {
        Alert.alert(
          "Location Service not enabled",
          "Please enable your location services to continue",
          [
            {
              text: "OK",
              onPress: async () => {
                await Location.requestForegroundPermissionsAsync();
                if (!status.granted) {
                  return Alert.alert(
                    "Permission to access location was denied",
                    [{text: "OK"}]
                  );
                }
                await Location.requestBackgroundPermissionsAsync();
              },
            },
            {text: "Cancel"},
          ]
        );
      }
    };
    //set initial location markers and building outlines
    useEffect(() => {
      setMarkersData(markers);
      setPolygonsData(polygons);
    }, []);
    const region = {
      latitude: 32.72944692810092,
      longitude: -97.11446151137352,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    };
    //each item in the carousel slider displays the locations name, a picture of the location,
    //open hours, a description of the location, and a get directions button
    const renderCarouselItem = ({item, index}) => (
      <View style={styles.cardContainer}>
        <ScrollView>
          <Text style={styles.cardText}>{item.title}</Text>
          {item.floor && <Text style={styles.cardText}>{item.floor}</Text>}
          <Pressable
            style={styles.cardImage}
            onPress={() => selectRegion(index)}
          >
            <Image source={item.image} style={styles.cardImage} />
          </Pressable>
          <View
            style={{
              marginVertical: 12,
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <View>
              <Text style={styles.hoursText}>Today's Hours: </Text>
            </View>
            <View>
              <Text style={styles.hoursText}>
                <TodaysLibraryHours department={item.title} />
              </Text>
            </View>
          </View>

          {item.description && (
            <Text style={[{marginTop: 12}, styles.cardText]}>
              {item.description}
            </Text>
          )}
          <View
            style={{
              marginVertical: 12,
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <OutlinedButton
              onPress={createOpenLink({
                provider: Platform.OS === "ios" ? "apple" : "google",
                end: item.address,
                mapType: "hybrid",
              })}
            >
              Get Directions
            </OutlinedButton>
          </View>
        </ScrollView>
      </View>
    );
    //when the user swipes to the left or right change the longitude and latitude coordinates to the
    //coordinates of the new location
    onCarouselItemChange = (index) => {
      this._map.animateToRegion({
        latitude: markersData[index].props.coordinate.latitude,
        longitude: markersData[index].props.coordinate.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      });
      markers[index].showCallout();
    };
    //when the user clicks on a location marker automatically scroll the carousel that location item
    onMarkerPressed = (location, index) => {
      this.carousel.scrollTo({index: index});
    };
    //when the user clicks on the location in the carousel slider automatically navigate the map to that locations marker
    selectRegion = (index) => {
      this._map.animateToRegion({
        latitude: markersData[index].props.coordinate.latitude,
        longitude: markersData[index].props.coordinate.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      });
      markers[index].showCallout();
    };

    return (
      <View style={styles.rootContainer}>
        <TouchableOpacity
          onPress={() => CheckIfLocationEnabled()}
          style={[styles.locateButton]}
        >
          <Text style={styles.locateButtonText}>Enable Location</Text>
        </TouchableOpacity>
        <MapView
          ref={(map) => (this._map = map)}
          style={styles.map}
          initialRegion={region}
          provider={PROVIDER_GOOGLE}
          mapType="hybrid"
          showsTraffic={true}
          showsCompass
          showsIndoors
          showsIndoorLevelPicker={true}
          showsUserLocation={true}
          loadingEnabled={true}
          loadingBackgroundColor={GlobalStyles.colors.primary800}
        >
          {markersData?.map((marker, index) => (
            <Marker
              key={marker.title}
              ref={(ref) => (markers[index] = ref)}
              title={marker.title}
              floor={marker.floor}
              description={marker.description}
              coordinate={{
                latitude: marker.coordinate.latitude,
                longitude: marker.coordinate.longitude,
              }}
              pinColor={marker.pinColor}
              onPress={() => onMarkerPressed(marker, index)}
            >
              <Callout>
                <Text>{marker.title}</Text>
              </Callout>
            </Marker>
          ))}
          {polygonsData?.map((polygon, index) => (
            <Polygon
              key={index}
              coordinates={polygon}
              fillColor="#0038655b"
              strokeColor={GlobalStyles.colors.primary50}
              strokeWidth={1}
              tappable={true}
            />
          ))}
        </MapView>
        <View style={styles.carousel}>
          <Carousel
            ref={(c) => {
              this.carousel = c;
            }}
            width={deviceWidth}
            height={360}
            data={markersData}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => this.onCarouselItemChange(index)}
            renderItem={(item, index) => renderCarouselItem(item, index)}
            mode="parallax"
            pagingEnabled={true}
            snapEnabled={true}
          />
        </View>
      </View>
    );
  } catch (error) {
    Sentry.Native.captureException(error);
  }
}

export default Sentry.wrap(MapScreen);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  map: {
    height: deviceHeight,
    width: deviceWidth,
    zIndex: -10,
  },
  carousel: {
    position: "absolute",
    bottom: 0,
    zIndex: 10,
  },
  cardContainer: {
    backgroundColor: "rgba(0, 56, 101, 0.884)",
    height: 360,
    width: deviceWidth,
    padding: 16,
    borderRadius: 24,
    alignItems: "center",
  },
  cardImageContainer: {
    height: 220,
    width: "100%",
    borderRadius: 24,
  },
  cardImage: {
    height: 220,
    width: "100%",
    borderRadius: 24,
    marginVertical: 12,
  },
  cardText: {
    color: "white",
    fontSize: 22,
    alignSelf: "center",
    textAlign: "center",
  },
  hoursText: {
    color: "white",
    fontSize: 22,
  },
  locateButton: {
    width: 100,
    backgroundColor: GlobalStyles.colors.primary800,
    borderRadius: 4,
    borderColor: "#fff",
    borderWidth: 2,
    position: "absolute",
    padding: 4,
    top: 10,
    left: 10,
  },
  locateButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});
