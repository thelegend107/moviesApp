export const queryList: QueryList = {
    trending: [
        { title: 'Trending Movies', interval: 'day', path: '/api/trending/movie/' },
        { title: 'Trending TV Shows', interval: 'day', path: '/api/trending/tv/' },
    ],
    movies: [
        { title: 'Now Playing', path: '/api/movie/now_playing' },
        { title: 'Upcoming', path: '/api/movie/upcoming' },
        { title: 'Trending', interval: 'day', path: '/api/trending/movie/' },
        { title: 'Popular', path: '/api/movie/popular' }
    ],
    tv: [
        { title: 'Airing Today', path: '/api/tv/airing_today' },
        { title: 'On The Air', path: '/api/tv/on_the_air' },
        { title: 'Trending', interval: 'day', path: '/api/trending/tv/' },
        { title: 'Popular', path: '/api/tv/popular' }
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