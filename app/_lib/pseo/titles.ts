/**
 * Title and meta templates for condition × neighborhood pages and the
 * noindexed audience variants.
 *
 * The root layout appends " | Rutherford Spine & Wellness Center" unless
 * the title is absolute. These strings already include the brand once
 * (" | Rutherford") and are returned as absolute titles by `pseoMetadata`.
 */

const BRAND = " | Rutherford";
const TITLE_MAX = 60;
const META_MAX = 160;

/** Neighborhood display names that do not fit beside the longest condition. */
const TITLE_PLACE: Record<string, string> = {
  "lake-forest-estates-la-vergne": "Lake Forest",
  "downtown-lebanon": "Lebanon",
  "cumberland-university-lebanon": "Cumberland",
  "downtown-franklin": "Franklin",
  "downtown-shelbyville": "Shelbyville",
  "north-shelbyville": "N. Shelbyville",
  "downtown-woodbury": "Woodbury",
  "outer-cannon-county-woodbury": "Cannon County",
  "downtown-eagleville": "Eagleville",
  "rural-rutherford-eagleville": "Rural Eagleville",
};

const AUDIENCE_SHORT: Record<string, string> = {
  "truck-drivers": "Drivers",
  nurses: "Nurses",
  "office-workers": "Desk Work",
  athletes: "Athletes",
  seniors: "Seniors",
};

/** Shorter condition labels used only when the full name cannot fit. */
const SHORT_CONDITION: Record<string, string> = {
  "Degenerative Disc Disease": "Disc Disease",
  "Migraines & Headaches": "Migraines",
  "Carpal Tunnel Syndrome": "Carpal Tunnel",
  "Rotator Cuff Pain": "Rotator Cuff",
  "Numbness in Hands or Feet": "Numb Hands & Feet",
  "Slip-and-Fall Injury": "Slip-and-Fall",
  "Pregnancy-Related Back Pain": "Pregnancy Back Pain",
};

export function titlePlace(slug: string, name: string): string {
  return TITLE_PLACE[slug] ?? name;
}

function shortCondition(name: string): string {
  return SHORT_CONDITION[name] ?? name;
}

function audienceWord(slug: string | undefined, label: string | undefined): string | undefined {
  if (!slug && !label) return undefined;
  if (slug && AUDIENCE_SHORT[slug]) return AUDIENCE_SHORT[slug];
  return label;
}

export function pseoTitle(input: {
  conditionName: string;
  placeSlug: string;
  placeName: string;
  audienceSlug?: string;
  audienceLabel?: string;
}): string {
  const place = titlePlace(input.placeSlug, input.placeName);
  const audience = audienceWord(input.audienceSlug, input.audienceLabel);
  const candidates = audience
    ? [
        `${input.conditionName} for ${audience} in ${place}${BRAND}`,
        `${shortCondition(input.conditionName)} for ${audience}, ${place}${BRAND}`,
        `${shortCondition(input.conditionName)}, ${audience}, ${place}${BRAND}`,
      ]
    : [`${input.conditionName} in ${place}${BRAND}`];

  const title = candidates.find((candidate) => candidate.length <= TITLE_MAX);
  if (!title) {
    throw new Error(`pSEO title exceeds ${TITLE_MAX} characters: ${candidates[candidates.length - 1]}`);
  }
  return title;
}

export function pseoDescription(input: {
  conditionName: string;
  mention: string;
  placeSlug: string;
  placeName: string;
  cityName: string;
  audienceLabel?: string;
}): string {
  const place = titlePlace(input.placeSlug, input.placeName);
  const where = `${place}, ${input.cityName}, TN`;
  const lead = input.audienceLabel
    ? `${input.audienceLabel} in ${where} can read about ${input.mention} here.`
    : `${input.conditionName} care in ${where}.`;
  const withPhone = `${lead} Rutherford Spine & Wellness offers non-invasive chiropractic care. Call 615-217-0097.`;
  const shorter = `${lead} Non-invasive chiropractic care in Murfreesboro. Call 615-217-0097.`;
  const text = withPhone.length <= META_MAX ? withPhone : shorter;
  if (text.length <= META_MAX) return text;
  const clipped = text.slice(0, META_MAX);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 80 ? lastSpace : META_MAX).replace(/[,\s]+$/, "")}.`;
}
