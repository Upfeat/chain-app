import { AsyncStorage } from "react-native";

export async function isTracing() {
  const tracing = await AsyncStorage.getItem("isTracing");
  return tracing === "true";
}

export async function setTracing(isTracking: "true" | "false") {
  await AsyncStorage.setItem("isTracing", isTracking);
}
