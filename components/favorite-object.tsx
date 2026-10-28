import Image from "next/image";

export type FavoriteKind = "tea" | "music" | "art" | "gaming";

const images: Record<FavoriteKind, string> = {
  tea: "clover-cat",
  music: "headphone-cats",
  art: "pink-cat",
  gaming: "apple-cat",
};

export default function FavoriteObject({ kind }: { kind: FavoriteKind }) {
  return (
    <Image
      src={`/favorites/${images[kind]}.webp`}
      alt=""
      width={512}
      height={512}
      sizes="96px"
      draggable={false}
      className="h-full w-full object-contain"
    />
  );
}
