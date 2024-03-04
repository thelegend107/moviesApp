export const queryList: QueryList = {
    trending: [
        { title: 'Trending Movies', interval: 'day', path: 'trending/movie/' },
        { title: 'Trending TV Shows', interval: 'day', path: 'trending/tv/' },
    ],
    movies: [
        { title: 'Now Playing', path: 'movie/now_playing' },
        { title: 'Upcoming', path: 'movie/upcoming' },
        { title: 'Trending', interval: 'day', path: 'trending/movie/' },
        { title: 'Popular', path: 'movie/popular' }
    ],
    tv: [
        { title: 'Airing Today', path: 'tv/airing_today' },
        { title: 'On The Air', path: 'tv/on_the_air' },
        { title: 'Trending', interval: 'day', path: 'trending/tv/' },
        { title: 'Popular', path: 'tv/popular' }
    ]
}

export type Interval = 'day' | 'week';

export interface QueryList {
    trending: QueryItem[],
    movies: QueryItem[],
    tv: QueryItem[]
}

export interface QueryItem {
    title: string,
    interval?: Interval,
    path: string
}