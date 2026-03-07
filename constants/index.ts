import type { VoiceCategory } from "@/lib/generated/prisma/enums";

export const TEXT_MAX_LENGTH = 5000;
export const COST_PER_UNIT = 0.0003;

export const CANONICAL_SYSTEM_VOICE_NAMES = [
  "Aaron",
  "Abigail",
  "Anaya",
  "Andy",
  "Archer",
  "Brian",
  "Chloe",
  "Dylan",
  "Emmanuel",
  "Ethan",
  "Evelyn",
  "Gavin",
  "Gordon",
  "Ivan",
  "Laura",
  "Lucy",
  "Madison",
  "Marisol",
  "Meera",
  "Walter",
] as const;

export const VOICE_CATEGORY_LABELS: Record<VoiceCategory, string> = {
  AUDIOBOOK: "Audiobook",
  CONVERSATIONAL: "Conversational",
  CUSTOMER_SERVICE: "Customer Service",
  GENERAL: "General",
  NARRATIVE: "Narrative",
  CHARACTERS: "Characters",
  MEDITATION: "Meditation",
  MOTIVATIONAL: "Motivational",
  PODCAST: "Podcast",
  ADVERTISING: "Advertising",
  VOICEOVER: "Voiceover",
  CORPORATE: "Corporate",
};
export const VOICE_CATEGORIES = Object.keys(
  VOICE_CATEGORY_LABELS,
) as VoiceCategory[];
