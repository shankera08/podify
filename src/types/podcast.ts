type IPodcastApiShow = {
    show_id: string,
    title: string,
    site_url: string,
    image_url: string,
    image_original_url: string,
    author_id: string
}

export type IPodcastApiResponse = {
    response: {
        items: IPodcastApiShow[],
        next_url?: string
    }
}

export type IPodcast = {
    podcastId: string,
    authorId: string,
    title: string,
    imageUrl: string
}