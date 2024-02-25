export function tmdbImage(imgPath: string = '', width: TmdbBackdropSizes | TmdbPosterSizes | TmdbProfileSizes, blurred: boolean = false): string {
    const config = useRuntimeConfig();

    let url = config.public.tmdbImgBase + width;
    if (blurred)
        url += '_filter(blur)';

    return url + imgPath;
}

export enum TmdbBackdropSizes {
    sm = 'w300',
    md = 'w780',
    lg = 'w1280',
    og = 'original'
}

export enum TmdbPosterSizes {
    sm2x = 'w92',
    smx = 'w154',
    sm = 'w185',
    md = 'w342',
    lg = 'w500',
    lgx = 'w780',
    og = 'original'
}

export enum TmdbProfileSizes {
    sm = "w45",
    md = "w185",
    og = "original"
}

export const noImage: string = '/noImage.png'