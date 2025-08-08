import { PlaySession } from "./temp";

function computeSection1(session: PlaySession): number {
  return session.tilesCompleted.reduce((s, t) => s + t.value, 0);
}

function computeTotal(session: PlaySession): number {
  const s1 = (session.section1_taskSum = computeSection1(session));
  const s2 =
    session.section2_features.flags.grain +
    session.section2_features.flags.city +
    session.section2_features.flags.forest +
    session.section2_features.longestRailroad +
    session.section2_features.longestRiver;

  const s3 = Object.values(session.section3_achievements || {}).reduce((a,b)=>a+(b||0),0);

  session.totalScore = s1 + s2 + s3;
  return session.totalScore;
}