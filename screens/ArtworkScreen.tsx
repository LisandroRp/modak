import React, { useEffect, useState } from 'react';
import { ArtworkList } from '../features/_index';
import { useIsFocused } from '@react-navigation/native';
import { LoadingState } from '../components/LoadingState';
import { getFavorites } from '../app/helpers/getFavorites';
import ArtController from '../app/controllers/ArtController';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { tArtworkPagination, tArtworks } from '../app/types/artwork.types';

type ArtworkProps = NativeStackScreenProps<{}>;

const artController = new ArtController();

const fields =
  'id,title,alt_title,thumbnail,date_start,date_end,date_display,artist_display,place_of_origin,dimensions,provenance_text,colorfulness,color,is_on_view,image_id,gallery_title,material_titles';

export default function ArtworkScreen({ navigation }: ArtworkProps) {

  const [art, setArt] = useState<tArtworks[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [url, setUrl] = useState("")

  const isFocused = useIsFocused();

  useEffect(() => {
    artController.index(`https://api.artic.edu/api/v1/artworks?fields=${fields}`, onSuccess, onError);
  }, [isFocused]);

  const onSuccess = async (response: tArtworks[], pagination: tArtworkPagination, isNextPage: boolean) => {
    if (pagination.next_url)
      setUrl(pagination.next_url)
    const favoritesJSON = await getFavorites()
    if (favoritesJSON.length)
      areFavorites(favoritesJSON, response, isNextPage)
    else {
      setArtworks(response, isNextPage)
    }
  };

  const onError = (error: Error) => {
    console.log('errorr', error);
    setIsLoading(false)
  };

  const areFavorites = (favorites: tArtworks[], artwork: tArtworks[], isNextPage: boolean) => {
    const updatedElements = artwork.map((element) => ({
      ...element,
      isFavorite: favorites.some((fav) => fav.id === element.id),
    }));
    setArtworks(updatedElements, isNextPage)
  }

  const setArtworks = (artwork: tArtworks[], isNextPage: boolean) => {
    const updatedArt = isNextPage ? [...art.slice(1, -1), ...artwork] : artwork
    setArt([{ id: 'empty-left' }, ...updatedArt, { id: 'empty-right' }]);
    setIsLoading(false)
  }

  const nextPage = () => {
    artController.nextPage(url, onSuccess, onError);
  }

  if (isLoading) {
    return <LoadingState />;
  }
  return <ArtworkList {...{ art, navigation, nextPage }} />;
}