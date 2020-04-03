import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { Alert } from "react-native";
import apiService from "./ApiService";

export class PushService {
  async askPermission() {
    let isGranted = true;
    let resp = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    let shouldAskAgain = false;

    if (resp.status !== "granted") {
      Alert.alert(
        "Error",
        "Chain need Notification permission to send you information about infection zone."
      );
      shouldAskAgain = true;
      isGranted = false;
    }

    if (resp.canAskAgain) {
      await this.askPermission();
    }

    if (isGranted) {
      // Get the token that identifies this device
      let token = await Notifications.getExpoPushTokenAsync();

      // POST the token to your backend server from where you can retrieve it to send push notifications.
      apiService.registerUser(token);
    }
  }
}

const pushService = new PushService();

export default pushService;
