import StorageService from "./StorageService";

async function isTracing() {
  const tracing = await StorageService.get("isTracing");
  return tracing === "true";
}

async function setTracing(isTracking: "true" | "false") {
  await StorageService.set("isTracing", isTracking);
}

export default {
  isTracing,
  setTracing,
};
