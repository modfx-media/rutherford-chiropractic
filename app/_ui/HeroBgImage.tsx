/**
 * <HeroBgImage> — shared full-bleed background image + dark scrim used by
 * every non-homepage hero (`ServiceHero`, `ConditionHero`, `PseoHero`,
 * `LocationHero`, `UtilityHero`, blog hero). Layers under the existing
 * radial-glow gradient so the brand look is preserved, but with enough
 * darkening (navy overlay + slight blur) that white H1 / body copy stays
 * fully readable regardless of the underlying photo.
 */

import Image from "next/image";
import { imageUnoptimized } from "@/lib/cms/media";

export function HeroBgImage({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        unoptimized={imageUnoptimized(src)}
        className="object-cover object-center"
      />
      {/* Directional navy gradient scrim — dark enough on the left where
          the H1 + CTAs sit that white text stays legible, but light on the
          right so the underlying photo remains clearly visible. */}
      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-brand-navy)]/90 via-[color:var(--color-brand-navy)]/65 to-[color:var(--color-brand-navy)]/35" />
      {/* Global tint so the photo reads as a background even in areas the
          horizontal gradient barely covers. */}
      <div className="absolute inset-0 bg-[color:var(--color-brand-navy)]/25" />
    </div>
  );
}
