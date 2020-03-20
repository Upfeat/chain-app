import React, { Component } from "react";
import { Text, View, Button } from "react-native";

import stitchService from "../services/StitchService";
import pushService from "../services/PushService";

export default class TestStitch extends Component {
  testStitch() {
    pushService.registerForPushNotificationsAsync();
    stitchService.pushCoarseLocation({
      endTime: 32423424,
      startTime: 2131331,
      zone: "909-213"
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Test" onPress={this.testStitch}>
          Test
        </Button>
      </View>
    );
  }
}
