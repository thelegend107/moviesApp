import { Card } from "#components";
import type { JSX } from "vue/jsx-runtime";

interface SectionCard {
  info: Media & Person;
  path: string;
}

export default function sectionCard(c: SectionCard): JSX.Element {
  let card: JSX.Element;
  if (c.path.includes("person"))
    card = (
      <Card name={c.info.name} image-path={c.info.profile_path} type="person" />
    );
  else if (c.info.media_type == "tv")
    card = (
      <Card name={c.info.name} image-path={c.info.poster_path} type="media" />
    );
  else
    card = (
      <Card name={c.info.title} image-path={c.info.poster_path} type="media" />
    );

  return card;
}
