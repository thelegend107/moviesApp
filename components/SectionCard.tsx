import { Card } from "#components";
import type { JSX } from "vue/jsx-runtime";

interface SectionCard {
    info: Media & Person
    path: string
}

export default function sectionCard(c: SectionCard): JSX.Element {
    let card: JSX.Element;
    if (c.path.includes("person"))
        card = <Card id={c.info.id} name={c.info.name} image-path={c.info.profile_path} type={c.info.media_type} />
    else if (c.info.media_type == "tv")
        card = <Card id={c.info.id} name={c.info.name} image-path={c.info.poster_path} type={c.info.media_type} />
    else
        card = <Card id={c.info.id} name={c.info.title} image-path={c.info.poster_path} type={c.info.media_type} />

    return card;
}
