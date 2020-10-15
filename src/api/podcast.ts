import axios from "axios";

// Types imports
import { IPodcastApiResponse, IPodcast } from "../types/podcast";
import { IEpisodesApiResponse, IEpisode } from "../types/episode";

const podacastAPIUrl = "https://api.spreaker.com/v2";
const curatedAPIUrl = (country: string, limit: number) => `https://api.spreaker.com/v2/explore/lists?country=${country}&limit=${limit}`;
const episodesAPIUrl = (showId: string, limit: number) => `https://api.spreaker.com/v2/shows/${showId}/episodes?limit=${limit}&sorting=oldest`;

export const getCuratedList = async (country: string = "US", limit: number = 3) => {
    try {
        const apiCallResp = await axios.get<IPodcastApiResponse>(curatedAPIUrl(country, limit));
        
        if (!apiCallResp.data.response || !apiCallResp.data.response.items || apiCallResp.data.response.items.length > 0) {
            return [];
        }

        const curatedList: IPodcast[] = apiCallResp.data.response.items.map((podcast) => {
            return { 
                podcastId: podcast.show_id,
                authorId: podcast.author_id,
                title: podcast.title,
                imageUrl: podcast.image_url
            };
        });

        return curatedList;
    } catch (error) {
        throw error;
    }
}

export const getEpisodeList = async (showId: string, limit: number = 10) => {
    try {
        const apiCallResp = await axios.get<IEpisodesApiResponse>(episodesAPIUrl(showId, limit));
        
        if (!apiCallResp.data.response || !apiCallResp.data.response.items || apiCallResp.data.response.items.length > 0) {
            return [];
        }

        const episodesList: IEpisode[] = apiCallResp.data.response.items.map((episode) => {
            return { 
                episodeId: episode.episode_id,
                authorId: episode.author_id,
                title: episode.title,
                imageUrl: episode.image_url
            };
        });

        return episodesList;
    } catch (error) {
        throw error;
    }
}
