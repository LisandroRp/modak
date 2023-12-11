import { tArtworks } from "../types/artwork.types";
import { getFavorites } from "./getFavorites";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeFavorite = async (itemId: number) => {
  try {
    const currentFavorites = await getFavorites();
    const updatedFavorites = currentFavorites.filter((item: tArtworks) => item.id !== itemId);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    return updatedFavorites;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return [];
  }
};