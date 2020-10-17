import axios from "axios";

// Types imports
import { IPodcast } from "../types/podcast";
import { IApiResponse } from "../types/api";

const curatedAPIUrl = (country: string, limit: number) => `https://api.spreaker.com/v2/explore/lists?country=${country}&limit=${limit}`;
const showAPIUrl = (listId: string, limit: number) => `https://api.spreaker.com/v2/explore/lists/${listId}/items?limit=${limit}`
const episodesAPIUrl = (showId: string, limit: number) => `https://api.spreaker.com/v2/shows/${showId}/episodes?limit=${limit}&sorting=oldest`;

export const getCuratedList = async (country: string = "US", limit: number = 3): Promise<IPodcast[] | null> => {
    try {
        const apiCallResp = await axios.get<IApiResponse>(curatedAPIUrl(country, limit));
        
        if (!apiCallResp.data.response || !apiCallResp.data.response.items || apiCallResp.data.response.items.length < 1) {
            console.log("heere");
            console.log(apiCallResp.data.response.items.length);
            return null;
        }

        const curatedList: IPodcast[] = apiCallResp.data.response.items.map((podcast) => {
            return { 
                id: podcast.list_id,
                title: podcast.name
            };
        });

        return curatedList;
    } catch (error) {
        throw error;
    }
}

export const getShows = async (listId: string, limit: number = 10): Promise<IPodcast[] | null> => {
    try {
        const apiCallResp = await axios.get<IApiResponse>(showAPIUrl(listId, limit));
        
        if (!apiCallResp.data.response ||!apiCallResp.data.response.items || apiCallResp.data.response.items.length < 1) {
            return null;
        }

        const showList: IPodcast[] = apiCallResp.data.response.items.map((show) => {
            return { 
                id: show.show_id,
                title: show.title,
                imageUrl: show.image_url
            };
        });

        return showList;
    } catch (error) {
        throw error;
    }
}


export const getEpisodes = async (showId: string, limit: number = 10): Promise<IPodcast[] | null> => {
    try {
        const apiCallResp = await axios.get<IApiResponse>(episodesAPIUrl(showId, limit));
        
        if (!apiCallResp.data.response || !apiCallResp.data.response.items || apiCallResp.data.response.items.length < 1) {
            return null;
        }

        const episodesList: IPodcast[] = apiCallResp.data.response.items.map((episode) => {
            return { 
                id: episode.episode_id,
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
