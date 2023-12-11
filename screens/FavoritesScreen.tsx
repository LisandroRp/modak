import { useEffect, useState } from 'react';
import { EmptyState } from '../components/EmptyState';
import { tArtworks } from '../app/types/artwork.types';
import { FavoriteList } from '../features/FavoriteList';
import { LoadingState } from '../components/LoadingState';
import { getFavorites } from '../app/helpers/getFavorites';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type FavoritesScreenProps = NativeStackScreenProps<{}>;

export default function FavoritesScreen({ navigation }: FavoritesScreenProps) {

  const [art, setArt] = useState<tArtworks[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    retrieveFavorites()
  }, [])

  const retrieveFavorites = async () => {
    try {
      const favoritesJSON = await getFavorites()
      if (favoritesJSON.length)
        setArt(favoritesJSON ? [{ id: 'empty-left' }, ...favoritesJSON, { id: 'empty-right' }] : []);
      else
        setArt([])
      setIsLoading(false)
    } catch (error) {
      console.error('Error getting favorites:', error);
      setArt([]);
      setIsLoading(false)
    }
  };
  if (isLoading) {
    return <LoadingState />;
  }
  else if (!art.length)
    return <EmptyState />

  return <FavoriteList {...{ art }} />;
}