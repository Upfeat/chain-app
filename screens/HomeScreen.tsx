import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Layouts } from "../styles";
import TraceButton from "../components/buttons/TraceButton";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TraceButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Layouts.flex()
  }
});
