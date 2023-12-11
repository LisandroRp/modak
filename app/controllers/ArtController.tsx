import HttpProvider from '../api/HttpProvider';
import { tArtworkPagination, tArtworks } from '../types/artwork.types';

const api = new HttpProvider();

export default class ArtController {
  constructor() { }

  index(url: string, onSuccess: (res: tArtworks[], pagination: tArtworkPagination, isNextPage: boolean) => void, onError: (err: any) => void) {
    api
      .request('get', url)
      .then(res => {
        onSuccess(res?.data.data, res?.data.pagination, false);
      })
      .catch(async err => {
        err && onError(err);
      });
  }
  nextPage(url: string, onSuccess: (res: tArtworks[], pagination: tArtworkPagination, isNextPage: boolean) => void, onError: (err: any) => void) {
    api
      .request('get', url)
      .then(res => {
        onSuccess(res?.data.data, res?.data.pagination, true);
      })
      .catch(async err => {
        err && onError(err);
      });
  }
}

