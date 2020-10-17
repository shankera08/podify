/* interface IShowApi {
    author?: {
        description: string,
        fullname: string,
        image_original_url: string,
        image_url: string,
        kind: string,
        plan: string,
        site_url: string,
        user_id: string,
        username: string
      },
      author_id: string,
      description: string,
      email: string,
      facebook_url: string,
      image_original_url: string,
      image_url: string,
      show_id: string,
      site_url: string,
      skype_name: string,
      sms_number: string,
      tel_number: string,
      title: string,
      twitter_name: string,
      website_url: string
} */

export interface IShowApi {
    show_id: string,
    title: string,
    image_url:string,
    image_original_url: string,
    explicit: string,
    author_id: string,
    last_episode_at: string,
    site_url: string
}

