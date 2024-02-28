export interface PageResult<T> {
    dates?: {
        maximum: string,
        minimum: string,
    }
    page: number
    results: T[]
    total_pages: number
    total_results: number
    fetchDate: Date
}

export interface Media {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date?: string
    first_air_date?: string
    last_air_date?: string
    title: string
    name?: string
    video: boolean
    vote_average: number
    vote_count: number
    media_type: MediaType
    // details
    created_by?: Person[]
    number_of_seasons?: number
    number_of_episodes?: number
    seasons?: Season[]
    content_ratings?: {
        results: ContentRating[]
    }
    homepage?: string
    runtime?: number
    budget?: number
    revenue?: number
    status?: string
    genres?: Genre[]
    production_companies?: any[]
    trailerVideos?: Video[]
    videos?: {
        results: Video[]
    }
    credits?: {
        cast: Person[]
        crew: Person[]
    }
    images?: {
        backdrops: Image[]
        posters: Image[]
    }
    external_ids?: ExternalIds
    release_dates?: {
        results?: ReleaseDates[]
    }
    // collections
    belongs_to_collection?: Media
    parts?: Media[]
    // cast
    character?: string
    job?: string
    fetchDate: Date
}

export interface Collection {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    parts: Media[];
}

export interface Season {
    air_date: string
    episodes: Media[]
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
    vote_average: number
}

export interface ContentRating {
    descriptors: any[]
    iso_3166_1: string
    rating: string
}

export interface ReleaseDates {
    iso_3166_1: string
    release_dates: ReleaseDate[]
}

export interface ReleaseDate {
    certification: string
    descriptors: any[]
    iso_639_1: string
    note: string
    release_date: string
    type: number
}

export type MediaType = 'movie' | 'tv'

export enum Interval {
    Day = 'day',
    Week = 'week'
}

export interface Person {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    profile_path: string
    popularity: number
    cast_id?: number
    job?: string
    character?: string
    credit_id: string
    order: number
    // details
    also_known_as?: string[]
    birthday?: string
    place_of_birth?: string
    homepage?: string
    biography?: string
    external_ids?: ExternalIds
    combined_credits?: {
        cast?: Media[]
        crew?: Media[]
    }
    images?: {
        profiles: Image[]
    }
}

export interface Genre {
    id: number
    name: string
}

export interface Video {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
}

export interface Image {
    aspect_ratio: number
    height: number
    iso_639_1: string
    file_path: string
    vote_average: number
    vote_count: number
    width: number
}

export interface ExternalIds {
    imdb_id?: string
    facebook_id?: string
    instagram_id?: string
    twitter_id?: string
    linkedin_id?: string
    github_id?: string
    email?: string
    homepage?: string
}