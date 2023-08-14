export type PRS = "paper" | "rock" | "scissors";

export const choices = [
  "rock",
  "paper",
  "scissors",
] as const satisfies readonly [PRS, PRS, PRS]; // tuple ---- Array = string[] / Array<string>

export function isValidChoice(input: string): input is PRS {
  return choices.includes(input as PRS);
}

function getRandomElement<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)]!;
}

export const getComputerChoice = (): PRS => getRandomElement(choices);

// user is input/button string of "paper, rock, or scissors" --> 0, 1, 2

type ValidIndex = 0 | 1 | 2;

// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
function isValidIndex(num: number): num is ValidIndex {
  return num === 0 || num === 1 || num === 2;
}

export const getUserChoice = (num: number): PRS => {
  // if (num !== 0 && num !== 1 && num !== 2) {
  // if (!(num === 0 || num === 1 || num === 2)) {
  if (!isValidIndex(num)) throw new Error("Expected int 0, 1, 2");
  return choices[num];
};

export const Verdict = {
  Computer: "Computer",
  Tie: "Tie",
  User: "User",
} as const;

export type Verdict = typeof Verdict[keyof typeof Verdict];

export function evaluateGame(uc: PRS, cc: PRS): Verdict {
  if (uc === cc) return "Tie";
  if (uc === "rock") return cc === "paper" ? Verdict.Computer : Verdict.User;
  if (uc === "paper") {
    return cc === "scissors" ? Verdict.Computer : Verdict.User;
  }
  // Ok, then `uc` has to be `"scissors"`:
  return cc === "rock" ? Verdict.Computer : Verdict.User;
}

export const emojiMapping: Record<PRS | Verdict, string> = {
  paper: "📜",
  rock: "🪨",
  scissors: "⚔️",
  [Verdict.User]: "🇼",
  [Verdict.Computer]: "🇱",
  [Verdict.Tie]: "🤷",
};

// I did this because retrun was giving error "Type 'string' is not assignable to type 'EmojiOptions'"
export type EmojiOptions = "📜" | "🪨" | "⚔️" | "🇼" | "🇱" | "🤷";

// type EmojiType = Record<
//   | "paper"
//   | "rock"
//   | "scissors"
//   | "win"
//   | "lose"
//   | "tie",
//   EmojiOptions
// >;

// type EmojiType = {
//   paper: EmojiOptions,
//   rock: EmojiOptions,
//   scissors: EmojiOptions,
//   win: EmojiOptions,
//   lose: EmojiOptions,
//   tie: EmojiOptions,
// };

// const stringToEmoji: EmojiType = {
//   paper: "📜",
//   rock: "🪨",
//   scissors: "⚔️",
//   win: "🇼",
//   lose: "🇱",
//   tie: "🤷",
// };

const stringToEmoji = {
  paper: "📜",
  rock: "🪨",
  scissors: "⚔️",
  win: "🇼",
  lose: "🇱",
  tie: "🤷",
} satisfies Record<string, EmojiOptions>;