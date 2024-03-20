export const queryList: QueryList = {
    trending: [
        { id: Math.ceil(Math.random() * 10001), title: 'Trending Movies', interval: 'day', path: 'trending/movie/' },
        { id: Math.ceil(Math.random() * 10002), title: 'Trending TV Shows', interval: 'day', path: 'trending/tv/' },
    ],
    movies: [
        { id: Math.ceil(Math.random() * 10003), title: 'Now Playing', path: 'movie/now_playing' },
        { id: Math.ceil(Math.random() * 10004), title: 'Upcoming', path: 'movie/upcoming' },
        { id: Math.ceil(Math.random() * 10005), title: 'Trending', interval: 'day', path: 'trending/movie/' },
        { id: Math.ceil(Math.random() * 10006), title: 'Popular', path: 'movie/popular' }
    ],
    tv: [
        { id: Math.ceil(Math.random() * 10007), title: 'Airing Today', path: 'tv/airing_today' },
        { id: Math.ceil(Math.random() * 10008), title: 'On The Air', path: 'tv/on_the_air' },
        { id: Math.ceil(Math.random() * 10009), title: 'Trending', interval: 'day', path: 'trending/tv/' },
        { id: Math.ceil(Math.random() * 10010), title: 'Popular', path: 'tv/popular' }
    ]
}

export type Interval = 'day' | 'week';

export interface QueryList {
    trending: QueryItem[],
    movies: QueryItem[],
    tv: QueryItem[]
}

export interface QueryItem {
    id: number,
    title: string,
    interval?: Interval,
    path: string
}