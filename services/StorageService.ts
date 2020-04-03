import { AsyncStorage } from "react-native";

export default class StorageService {
  static async get(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ?? JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  static async set(key: string, value: any) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }
}
