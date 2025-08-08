import { PlaySession, TaskTile, TileType, TileValue } from "./temp";

// Called when user reveals a task tile of a given type.
function revealTaskTile(
  session: PlaySession,
  type: TileType,
  isSevenChosen: boolean, // ask only if type supports 7 via unlock + still available
): TaskTile | null {
  const pool = session.deck.byType[type];

  // Must keep 3 tiles in play if possible
  if (session.tilesInPlay.length >= 3) return null;

  // If 7 is allowed and the user says it *is* the 7 tile, pick 7 (if available)
  if (isSevenChosen && pool["7"] > 0) {
    pool["7"]--;
    const tile: TaskTile = { id: crypto.randomUUID(), type, value: 7, state: "in_play" };
    session.tilesInPlay.push(tile);
    return tile;
  }

  // Otherwise draw from the multiset [4,4,5,5,6,6] with remaining counts
  const bag: TileValue[] = [];
  (["4", "5", "6"] as const).forEach((n) => {
    for (let i = 0; i < pool[n]; i++) bag.push(Number(n) as TileValue);
  });
  if (bag.length === 0) return null; // no values left for that type

  const pick = bag[Math.floor(Math.random() * bag.length)];
  pool[String(pick) as "4" | "5" | "6"]--;
  const tile: TaskTile = { id: crypto.randomUUID(), type, value: pick, state: "in_play" };
  session.tilesInPlay.push(tile);
  return tile;
}
