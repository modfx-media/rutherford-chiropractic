import { getCustomPseoContent } from "./city-content";
import { PSEO_CONDITIONS } from "./conditions";
import { getNeighborhood } from "./neighborhoods";
import { PSEO_COMBINATIONS } from "./combinations";

/**
 * Data helper for the `/areas-we-serve/` hub page. Lists indexable
 * condition × neighborhood pages (hand-written city copy only). Audience
 * URLs are noindex, so this hub does not link to them.
 */

export type AreaConditionEntry = {
  conditionSlug: string;
  conditionName: string;
  neighborhoodName: string;
  href: string;
};

export type AreaCityGroup = {
  citySlug: string;
  cityName: string;
  conditions: AreaConditionEntry[];
};

/** Same 10 targeted cities used throughout the pSEO system, in a fixed
 * display order (Rutherford County core first, then the wider region). */
const CITY_ORDER: { citySlug: string; cityName: string }[] = [
  { citySlug: "murfreesboro", cityName: "Murfreesboro" },
  { citySlug: "smyrna", cityName: "Smyrna" },
  { citySlug: "la-vergne", cityName: "La Vergne" },
  { citySlug: "lebanon", cityName: "Lebanon" },
  { citySlug: "franklin", cityName: "Franklin" },
  { citySlug: "brentwood", cityName: "Brentwood" },
  { citySlug: "nashville", cityName: "Nashville" },
  { citySlug: "shelbyville", cityName: "Shelbyville" },
  { citySlug: "woodbury", cityName: "Woodbury" },
  { citySlug: "eagleville", cityName: "Eagleville" },
];

export function buildAreasWeServe(): AreaCityGroup[] {
  return CITY_ORDER.map(({ citySlug, cityName }) => {
    const conditions: AreaConditionEntry[] = [];

    for (const condition of PSEO_CONDITIONS) {
      const cityCombos = PSEO_COMBINATIONS.filter((c) => {
        if (c.conditionSlug !== condition.slug) return false;
        return getNeighborhood(c.neighborhoodSlug)?.citySlug === citySlug;
      });
      const baseCombo = cityCombos.find((c) =>
        getCustomPseoContent(condition.slug, c.neighborhoodSlug),
      );
      if (!baseCombo) continue;

      const neighborhood = getNeighborhood(baseCombo.neighborhoodSlug);
      if (!neighborhood) continue;

      conditions.push({
        conditionSlug: condition.slug,
        conditionName: condition.name,
        neighborhoodName: neighborhood.name,
        href: `/${baseCombo.conditionSlug}/${baseCombo.neighborhoodSlug}/`,
      });
    }

    return { citySlug, cityName, conditions };
  }).filter((city) => city.conditions.length > 0);
}
