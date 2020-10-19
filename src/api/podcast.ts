// external import
import axios from "axios";

// Types
import { IPodcast, ICuratedPodcasts } from "../types/podcast";
import { IApiResponse } from "../types/api";

const curatedAPIUrl = (country: string, limit: number) =>
  `https://api.spreaker.com/v2/explore/lists?country=${country}&limit=${limit}`;
const showAPIUrl = (listId: string, limit: number) =>
  `https://api.spreaker.com/v2/explore/lists/${listId}/items?limit=${limit}`;
const episodesAPIUrl = (showId: string, limit: number) =>
  `https://api.spreaker.com/v2/shows/${showId}/episodes?limit=${limit}&sorting=oldest`;

/**
 *
 * @param country string
 * @param limit number of categories to fetch
 * @returns list of podcast categories
 */
export const getCuratedList = async (
  country: string = "US",
  limit: number = 3
): Promise<IPodcast[] | null> => {
  try {
    // get the curated list from Spreaker API
    const apiCallResp = await axios.get<IApiResponse>(
      curatedAPIUrl(country, limit)
    );

    if (
      !apiCallResp.data.response ||
      !apiCallResp.data.response.items ||
      apiCallResp.data.response.items.length < 1
    ) {
      return null;
    }

    const curatedList: IPodcast[] = apiCallResp.data.response.items.map(
      (podcast) => {
        return {
          id: podcast.list_id,
          title: podcast.name
        };
      }
    );

    return curatedList;
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param listId category Id from curated list
 * @param listTitle category title
 * @param limit number of shows to fetch for the given category
 * @returns list of shows mapped to the given category
 */
export const getShows = async (
  listId: string,
  listTitle: string,
  limit: number = 10
): Promise<ICuratedPodcasts | null> => {
  try {
    // get podcast shows form Spreaker API
    const apiCallResp = await axios.get<IApiResponse>(
      showAPIUrl(listId, limit)
    );

    if (
      !apiCallResp.data.response ||
      !apiCallResp.data.response.items ||
      apiCallResp.data.response.items.length < 1
    ) {
      return null;
    }

    const showList: IPodcast[] = apiCallResp.data.response.items.map((show) => {
      return {
        id: show.show_id,
        title: show.title,
        imageUrl: show.image_url
      };
    });

    return { [listTitle]: showList };
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param showId the podcast show Id from the podcast shows list
 * @param limit number of episodes to fetch for the given show
 * @returns list of episodes for the given show id
 */
export const getEpisodes = async (
  showId: string,
  limit: number = 10
): Promise<IPodcast[] | null> => {
  try {
    // get the episodes for the given show id from Spreaker API
    const apiCallResp = await axios.get<IApiResponse>(
      episodesAPIUrl(showId, limit)
    );

    if (
      !apiCallResp.data.response ||
      !apiCallResp.data.response.items ||
      apiCallResp.data.response.items.length < 1
    ) {
      return null;
    }

    const episodesList: IPodcast[] = apiCallResp.data.response.items.map(
      (episode) => {
        return {
          id: episode.episode_id,
          authorId: episode.author_id,
          title: episode.title,
          imageUrl: episode.image_url
        };
      }
    );

    return episodesList;
  } catch (error) {
    throw error;
  }
};
