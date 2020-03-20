import { AsyncStorage } from "react-native";

async function isTracing() {
  const tracing = await AsyncStorage.getItem("isTracing");
  return tracing === "true";
}

async function setTracing(isTracking: "true" | "false") {
  await AsyncStorage.setItem("isTracing", isTracking);
}

export default {
  isTracing,
  setTracing
};
