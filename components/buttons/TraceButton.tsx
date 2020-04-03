import * as React from "react";
import { Image, StyleSheet, Text, View, Platform, Alert } from "react-native";
import { Layouts } from "../../styles";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { TouchableOpacity } from "react-native-gesture-handler";
import locationService from "../../services/LocationService";
import AppService from "../../services/AppService";
import pushService from "../../services/PushService";

export default function TraceButton() {
  const isTracing = AppService.isTracing();
  function _startTrace() {
    locationService.askPermission();
    pushService.askPermission();
  }

  return (
    <TouchableOpacity onPress={_startTrace}>
      <Text>Start Tracing</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Layouts.flex(),
  },
});
