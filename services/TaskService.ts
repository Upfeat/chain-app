import * as TaskManager from "expo-task-manager";
import locationService from "./LocationService";
import { TASKS } from "../Constants";
import throttle from "lodash.throttle";

TaskManager.defineTask(TASKS.LOCATION_UPDATE, ({ data, error }: any) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }

  throttle(() => locationService.onUpdate(data), 1000);
});
