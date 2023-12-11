import AsyncStorage from "@react-native-async-storage/async-storage";
import { tArtworks } from "../types/artwork.types";

export const getFavorites = async (): Promise<tArtworks[]> => {
  try {
    const favoritesJSON = await AsyncStorage.getItem('favorites');
    if (favoritesJSON)
      return JSON.parse(favoritesJSON)
    else
      return []
  } catch (error) {
    console.error('Error getting favorites:', error);
    return []
  }
};