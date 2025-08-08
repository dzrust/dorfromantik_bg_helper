function completeTask(session: PlaySession, tileId: string) {
  const idx = session.tilesInPlay.findIndex(t => t.id === tileId);
  if (idx === -1) return;
  const tile = session.tilesInPlay.splice(idx, 1)[0];
  tile.state = "completed";
  session.tilesCompleted.push(tile);
  // After completion, try to refill up to 3 using user flow:
  // Prompt user to choose a type revealed next (and 7 confirmation if relevant),
  // repeat until 3 in play or deck empty across all types.
}