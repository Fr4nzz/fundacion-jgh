export type GalleryMediaKind = "image" | "video";

export interface GalleryMediaItem {
  id: "gathering" | "songs" | "flowers" | "preparation" | "prayer";
  kind: GalleryMediaKind;
  src: string;
  poster?: string;
  duration?: string;
}

const MEDIA_ORIGIN = "https://media.josegregoriohernandez3m.org/gallery/";

function mediaUrl(filename: string) {
  return `${MEDIA_ORIGIN}${filename}`;
}

export const GALLERY_PREVIEW_IMAGE = mediaUrl("thursday-prayer-gathering.webp");

export const GALLERY_MEDIA: GalleryMediaItem[] = [
  {
    id: "gathering",
    kind: "image",
    src: GALLERY_PREVIEW_IMAGE,
  },
  {
    id: "songs",
    kind: "video",
    src: mediaUrl("thursday-prayer-songs.mp4"),
    poster: mediaUrl("thursday-prayer-songs-poster.webp"),
    duration: "1:23",
  },
  {
    id: "flowers",
    kind: "video",
    src: mediaUrl("puerto-napo-floral-offering.mp4"),
    poster: mediaUrl("puerto-napo-floral-offering-poster.webp"),
    duration: "1:34",
  },
  {
    id: "preparation",
    kind: "video",
    src: mediaUrl("cotton-gauze-preparation.mp4"),
    poster: mediaUrl("cotton-gauze-preparation-poster.webp"),
    duration: "0:35",
  },
  {
    id: "prayer",
    kind: "video",
    src: mediaUrl("thursday-community-prayer.mp4"),
    poster: mediaUrl("thursday-community-prayer-poster.webp"),
    duration: "1:33",
  },
];
