export interface IEpisodeApi {
  episode_id: string;
  type: string;
  title: string;
  duration: number;
  show_id: string;
  author_id: string;
  site_url: string;
  image_url: string;
  image_original_url: string;
  published_at: Date;
  download_enabled: boolean;
}
