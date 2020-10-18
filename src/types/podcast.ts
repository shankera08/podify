export interface IPodcastApi {
  list_id: string;
  name: string;
  subtitle: string;
  type: string;
  permalink: string;
}

export interface IPodcast {
  id: string;
  authorId?: string;
  title: string;
  imageUrl?: string;
}

export interface ICuratedPodcasts {
  [category: string]: undefined | IPodcast[];
}
