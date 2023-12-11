import { tArtworks } from "../types/artwork.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addToFavorites = async (newFavorite: tArtworks, setIsFavorite: React.Dispatch<React.SetStateAction<boolean | undefined>>) => {
  try {
    const currentFavoritesJSON = await AsyncStorage.getItem('favorites');
    const currentFavorites = currentFavoritesJSON ? JSON.parse(currentFavoritesJSON) : [];
    setIsFavorite(true)
    currentFavorites.push({ ...newFavorite, isFavorite: true });
    await AsyncStorage.setItem('favorites', JSON.stringify(currentFavorites));
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};