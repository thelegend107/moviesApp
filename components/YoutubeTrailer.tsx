import type { JSX } from "vue/jsx-runtime";

interface Trailer {
    videos?: Video[];
}

export default function YoutubeTrailer(d: Trailer): JSX.Element {
    const config = useRuntimeConfig();
    const url = useRequestURL()
    const params: string[] = [
        'autoplay=1',
        'controls=0',
        'disablekb=0',
        'rel=0',
        'playsinline=1',
        `origin=${url.origin}`,
        'loop=1',
        'mute=0',
        'iv_load_policy'
    ]
    let defaultVideo: Video = {} as Video;
    let publishedAt: Date;

    if (d.videos) {
        d.videos.forEach((v) => {
            const videoPublishDate: Date = new Date(v.published_at)

            if (!publishedAt) {
                publishedAt = videoPublishDate
                defaultVideo = v
            }

            if (publishedAt && publishedAt > videoPublishDate) {
                publishedAt = videoPublishDate
                defaultVideo = v
            }
        });
    }

    if (defaultVideo && d.videos)
        params.push("playlist=" + d.videos.map(x => x.key).reverse().join(','))

    return (
        <div id="yt">
            <iframe
                class="size-full aspect-video"
                src={config.public.youtubeVideoBase + defaultVideo.key + '?' + params.join('&')}
                referrerpolicy="no-referrer-when-downgrade"
                allow="autoplay; encrypted-media"
                allowfullscreen
            />
        </div>
    )
}