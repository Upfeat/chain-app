import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Alert, Platform } from "react-native";
import { TASKS } from "../Constants";

class LocationService {
  async askPermission() {
    let isGranted = true;

    try {
      let resp = await Permissions.askAsync(Permissions.LOCATION);
      let shouldAskAgain = false;

      if (resp.status !== "granted") {
        Alert.alert(
          "Error",
          "Location service need to be enabled, Please go to your setting to enable it."
        );
        shouldAskAgain = true;
        isGranted = false;
        // @ts-ignore
      } else if (
        Platform.OS === "ios" &&
        resp.permissions.location.ios.scope !== "always"
      ) {
        Alert.alert("Error", "Location service need to be always enabled");
        isGranted = false;
        shouldAskAgain = true;
      }

      if (resp.canAskAgain) {
        this.askPermission();
      }
    } catch (e) {
      console.log(e);
    }

    if (isGranted) {
      this.startTracing();
    }
  }

  onUpdate(locations: Location.LocationData[]) {
    // call geozone lib get zone
    // save cords
    console.log(locations);
  }

  private startTracing() {
    if (!Location.hasStartedLocationUpdatesAsync(TASKS.LOCATION_UPDATE)) {
      Location.startLocationUpdatesAsync(TASKS.LOCATION_UPDATE, {
        accuracy: Location.Accuracy.High,
        pausesUpdatesAutomatically: true
      });
    }
  }
}

const locationService = new LocationService();

export default locationService;
