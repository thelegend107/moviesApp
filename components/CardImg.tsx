import { NuxtImg } from "#components";
import type { JSX } from "vue/jsx-runtime";

interface CardImg {
    prop: Card;
}

export default function CardImg(c: CardImg): JSX.Element {
    let imgUrl: string;

    if (c.prop.imagePath && (c.prop.type == 'movie' || c.prop.type == 'tv'))
        imgUrl = tmdbImage(c.prop.imagePath, TmdbPosterSizes.md)
    else if (c.prop.imagePath && c.prop.type == "person")
        imgUrl = tmdbImage(c.prop.imagePath, c.prop.personPhotos ? TmdbProfileSizes.og : TmdbPosterSizes.md)
    else imgUrl = noImage

    return <NuxtImg format="webp" alt={c.prop.id ? c.prop.id.toString() : c.prop.type} src={imgUrl} placeholder />
}
