import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Alert, Platform } from "react-native";
import { TASKS } from "../Constants";
import { GeoZones } from "@upfeat/geozone";
import AppService from "./AppService";

const zones = new GeoZones(1000);

class LocationService {
  async askPermission() {
    let isGranted = true;

    let resp = await Permissions.askAsync(Permissions.LOCATION);
    let shouldAskAgain = false;

    if (resp.status !== "granted") {
      Alert.alert(
        "Error",
        "Location service need to be enabled, Please go to your setting to enable it."
      );
      AppService.setTracing("false");
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

    if (isGranted) {
      this.startTracing();
    }
  }

  onUpdate(locations: Location.LocationData[]) {
    // call geozone lib get zone
    // save cords
    console.log(locations);
    const zone = zones.getZone(
      locations[0].coords.latitude,
      locations[0].coords.longitude
    );
  }

  private async startTracing() {
    if (!Location.hasStartedLocationUpdatesAsync(TASKS.LOCATION_UPDATE)) {
      Location.startLocationUpdatesAsync(TASKS.LOCATION_UPDATE, {
        accuracy: Location.Accuracy.High,
        pausesUpdatesAutomatically: true,
      });
    }

    if (!(await AppService.isTracing())) {
      AppService.setTracing("true");
    }
  }
}

const locationService = new LocationService();

export default locationService;
