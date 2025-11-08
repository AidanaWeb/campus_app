// src/utils/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Сохраняет данные в AsyncStorage
 */
export async function saveDataInStorage<T>(
  key: string,
  value: T
): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {}
}

/**
 * Получает данные из AsyncStorage
 */
export async function getDataFromStorage<T>(key: string): Promise<T | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    return null;
  }
}

/**
 * Удаляет данные по ключу
 */
export async function removeDataFromStorage(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {}
}

/**
 * Полностью очищает хранилище
 */
export async function clearStorage(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch (error) {}
}
