import AsyncStorage from "@react-native-async-storage/async-storage";
import { SavedComparison } from "./data";

const SAVED_KEY = "@comparador_saved";

export async function getSavedComparisons(): Promise<SavedComparison[]> {
  try {
    const raw = await AsyncStorage.getItem(SAVED_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveComparison(comparison: SavedComparison): Promise<void> {
  const existing = await getSavedComparisons();
  const alreadyExists = existing.some(
    (c) =>
      (c.productAId === comparison.productAId && c.productBId === comparison.productBId) ||
      (c.productAId === comparison.productBId && c.productBId === comparison.productAId)
  );
  if (alreadyExists) return;
  existing.unshift(comparison);
  await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(existing));
}

export async function removeComparison(id: string): Promise<void> {
  const existing = await getSavedComparisons();
  const filtered = existing.filter((c) => c.id !== id);
  await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(filtered));
}
