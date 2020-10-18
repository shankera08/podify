import { IPodcastApi } from "./podcast";
import { IEpisodeApi } from "./episode";
import { IShowApi } from "./show";

interface IApiItems extends IPodcastApi {}
interface IApiItems extends IEpisodeApi {}
interface IApiItems extends IShowApi {}

export interface IApiResponse {
  response: {
    items: IApiItems[];
    next_url?: string | null;
  };
}
