import * as TaskManager from "expo-task-manager";
import { locationService } from "./LocationService";

export const TASKS = {
  LOCATION_UPDATE: "LOCATION_UPDATE"
};

TaskManager.defineTask(TASKS.LOCATION_UPDATE, ({ data, error }: any) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }

  locationService.onUpdate(data);
});
