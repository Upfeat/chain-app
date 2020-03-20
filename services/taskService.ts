import * as TaskManager from "expo-task-manager";
import locationService from "./LocationService";
import { TASKS } from "../Constants";

TaskManager.defineTask(TASKS.LOCATION_UPDATE, ({ data, error }: any) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }

  locationService.onUpdate(data);
});
