type Props = {
  src: string;
};

/*
 * The back cover: the same board as the front — ink ground, double gold
 * keyline — carrying the growth plate and no lettering.
 *
 * It was previously set on the diary's aged paper, which made the closed book
 * read as two different objects front and back. Matching the front's ground
 * is what makes it one binding.
 *
 * The plate is sized by width with `height: auto`, so it keeps the file's own
 * 1378×1142 proportions — contained, never cropped.
 */
export default function BackCover({ src }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-band-ink">
      <div className="flex h-full w-full items-center justify-center border-[6px] border-double border-signal/35 p-[var(--space-6)]">
        <img
          src={src}
          alt=""
          className="archive-photo block h-auto w-full"
          draggable={false}
        />
      </div>
    </div>
  );
}