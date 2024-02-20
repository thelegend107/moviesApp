export const queryList: QueryList = {
    trending: [
        { title: 'Trending Movies', interval: 'day', path: '/api/trending/movie/' },
        { title: 'Trending TV Shows', interval: 'day', path: '/api/trending/tv/' },
    ],
    movies: [
        { title: 'Now Playing', path: 'movie/now_playing' },
        { title: 'Upcoming', path: 'movie/upcoming' },
        { title: 'Trending', path: 'trending/movie/day' },
        { title: 'Populer', path: 'movie/populer' }
    ],
    tv: [
        { title: 'Airing Today', path: 'tv/airing_today' },
        { title: 'On The Air', path: 'tv/on_the_air' },
        { title: 'Trending', path: 'trending/tv/day' },
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