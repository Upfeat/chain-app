import * as TaskManager from 'expo-task-manager';

TaskManager.defineTask('locationUpdates', ({ data: { locations }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
});