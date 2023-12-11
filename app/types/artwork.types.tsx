export type tArtworks = {
  id: number | string,
  title: string,
  alt_title: string,
  thumbnail: { lqip: string },
  date_start: string,
  date_end: string,
  date_display: string,
  artist_display: string,
  place_of_origin: string,
  dimensions: string,
  provenance_text: string,
  colorfulness: string,
  color: string,
  exhibition_history: string,
  is_on_view: string,
  image_id: string,
  gallery_title: string,
  material_titles: string,
  isFavorite?: boolean
}

export type tArtworkPagination = {
  next_url: string,
  currentPage: number,
}