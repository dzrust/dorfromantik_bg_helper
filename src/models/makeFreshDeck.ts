import { AchievementKey, SessionDeckCounts } from "./temp";

function makeFreshDeck(unlocked: AchievementKey[]): SessionDeckCounts {
  const base = { "4": 2, "5": 2, "6": 2, "7": 0 };
  const byType = {
    grain: { ...base },
    city: { ...base },
    railroad: { ...base },
    river: { ...base },
    forest: { ...base },
  };
  // Enable the 7 only for types with unlocked achievement (still only 1 copy total)
  if (unlocked.includes("task7_grain")) byType.grain["7"] = 1;
  if (unlocked.includes("task7_city")) byType.city["7"] = 1;
  if (unlocked.includes("task7_forest")) byType.forest["7"] = 1;
  return { byType };
}
