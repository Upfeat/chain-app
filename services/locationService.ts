import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export async function registerLocationUpdates() {
  let result = await Permissions.askAsync(Permissions.LOCATION);
  if (result.status !== "granted") {
    return;
  }

  Location.startLocationUpdatesAsync("locationUpdates", {
    accuracy: Location.Accuracy.High,
    pausesUpdatesAutomatically: true
  });
}
