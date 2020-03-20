import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { Stitch, AnonymousCredential } from "mongodb-stitch-react-native-sdk";

import stitchService from "../services/stitchService";

export default class TestStitch extends Component {
  testStitch() {
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
