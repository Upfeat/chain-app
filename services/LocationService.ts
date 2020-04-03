import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Alert, Platform } from "react-native";
import { TASKS } from "../Constants";
import { GeoZones, Zone } from "@upfeat/geozone";
import AppService from "./AppService";
import StorageService from "./StorageService";
import apiService from "./ApiService";

class LocationService {
  public static ZONE_SIZE: number = 1000;
  public static CURRENT_ZONE_KEY: string = "CURRENT_ZONE";

  private zoneService: GeoZones;

  constructor() {
    this.zoneService = new GeoZones(LocationService.ZONE_SIZE);
  }

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

  async onUpdate(locations: Location.LocationData[]) {
    const location = locations[0];
    await this.storeLocation(location);

    let currentZone = await this.getCurrentZone();

    const zone = this.zoneService.getZone(
      location.coords.latitude,
      location.coords.longitude
    );

    if (currentZone) {
      if (
        !this.zoneService.isInZone(
          currentZone,
          location.coords.latitude,
          location.coords.longitude
        )
      ) {
        this.setCurrentZone(zone);
      }
    } else {
      this.setCurrentZone(zone);
    }
  }

  private async storeLocation(location: Location.LocationData) {
    await StorageService.set(
      `location-${location.timestamp}`,
      JSON.stringify(Location)
    );
  }

  private async getCurrentZone(): Promise<Zone> {
    return await StorageService.get(LocationService.CURRENT_ZONE_KEY);
  }

  private async setCurrentZone(zone: Zone): Promise<void> {
    await StorageService.set(LocationService.CURRENT_ZONE_KEY, zone);
    await apiService.updateZone(zone);
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
