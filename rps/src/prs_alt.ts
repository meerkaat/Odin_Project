export type PRS = 0 | 1 | 2;

export const PRS = Object.defineProperty(
  { Paper: 0, Rock: 1, Scissors: 2 } satisfies Readonly<{
    Paper: 0;
    Rock: 1;
    Scissors: 2;
  }>,
  "Random",
  { get: () => Math.floor(Math.random() * 3) as PRS },
) as Readonly<{
  Paper: 0;
  Rock: 1;
  Scissors: 2;
  get Random(): PRS;
}>;

export function determineWinner<T extends PRS>(a: T, b: T): T | null {
  if (a === b) return null;
  return (a + 1) % 3 === b ? a : b;
}

// Example usage:

const displayMap = Object.fromEntries(
  Object.entries(PRS).map(([str, prs]) => [prs, str]),
) as Record<PRS, string>;

const getName = (prs: PRS): string => displayMap[prs];

for (let i = 0; i < 20; i += 1) {
  const a = PRS.Random;
  const b = PRS.Random;
  const winner = determineWinner(a, b);
  const matchup = `${getName(a)} vs ${getName(b)}`;
  const verdict = winner ? `${getName(winner)} won` : "It was a tie";
  console.log(`${matchup}: ${verdict}`);
}
