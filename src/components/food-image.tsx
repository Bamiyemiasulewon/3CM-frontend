import Image from "next/image";
import { Illustration, type IllustrationName } from "@/components/illustrations";

export function FoodImage({
  name,
  image,
  illustration,
  className = "",
}: {
  name: string;
  image?: string;
  illustration: IllustrationName;
  className?: string;
}) {
  return (
    <div className={`food-image ${className}`}>
      {image ? (
        <Image
          alt={name}
          className="food-image-photo"
          fill
          sizes="(max-width: 760px) 25vw, 160px"
          src={image}
        />
      ) : (
        <Illustration kind={illustration} />
      )}
    </div>
  );
}