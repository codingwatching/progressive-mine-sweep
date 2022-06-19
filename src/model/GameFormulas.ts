import { Context } from "./Context";

export function boardProgressFormula({ board }: Context): number {
  return (
    (100 * (board.cellCounts.revealed + board.cellCounts.flagged)) /
    (board.rows * board.cols)
  );
}

export function numMinesFormula({
  resourceManager: {
    resources: { rows, cols, difficulty, resets },
  },
  board: { state },
}: Context): number {
  if (
    state === "inactive" &&
    resets.count === 0 &&
    resets.extra.manual === 0 &&
    resets.extra.auto === 0
  ) {
    return 1;
  }

  return rows.value() * cols.value() * (difficulty.value() / 100);
}

export function hintFormula({
  resourceManager: {
    resources: { hintQuality },
  },
}: Context): number {
  return hintQuality.value() / 100;
}

export function remainingHintsFormula({ board }: Context): number {
  return board.rows * board.cols - board.numMines - board.cellCounts.revealed;
}

export function resetTimeFormula({
  resourceManager: {
    resources: { rows, cols, difficulty, resetSpeed },
  },
}: Context): number {
  return (
    (1 - resetSpeed.value() / 100) *
    Math.sqrt(rows.value() * cols.value() * (difficulty.value() / 100) * 10)
  );
}

export function getBuyAmount(buyAmount?: string) {
  return _buyAmounts[buyAmount ?? ""] ?? _buyAmounts[""];
}

export function scoreMultiplier({
  resourceManager: {
    resources: { difficulty },
  },
}: Context): number {
  return (difficulty.value() + 10) / 25;
}

export function stateChanged(
  context: Context,
  target: "board" | "cell",
  state: string,
  automatic: boolean,
) {
  const factor = 1;
  const multiplier = scoreMultiplier(context);
  const resName = _targetStates[target + ":" + state];
  let res = context.resourceManager.resources[resName ?? ""];

  if (resName && res) {
    res.count += factor * multiplier;

    if (automatic) {
      if (res.extra.auto != null) {
        res.extra.auto += factor;
      }
    } else {
      if (res.extra.manual != null) {
        res.extra.manual += factor;
      }
    }

    if (res.extra.streak != null) {
      res.extra.streak++;
      if (
        res.extra.longestStreak != null &&
        res.extra.streak > res.extra.longestStreak
      ) {
        res.extra.longestStreak = res.extra.streak;
      }
    }
  }

  switch (target + ":" + state) {
    case "cell:unflagged":
      res = context.resourceManager.resources.flags;
      res.count -= factor * multiplier;
      res.extra.unflags += factor;
      break;
    case "cell:unrevealed":
      res = context.resourceManager.resources.cells;
      res.count -= factor * multiplier;
      res.extra.hidden += factor;
      break;
    case "board:won":
      context.resourceManager.resources.losses.extra.streak = 0;
      break;
    case "board:lost":
      context.resourceManager.resources.wins.extra.streak = 0;
      break;
  }
}

const _targetStates: Record<string, string> = {
  "board:active": "resets",
  "board:lost": "losses",
  "board:won": "wins",
  "cell:blown": "explosions",
  "cell:hinted": "hints",
  "cell:flagged": "flags",
  "cell:revealed": "cells",
};

const _buyAmounts: Record<string, { min: number; max: number; inc: number }> = {
  "": { min: 1, max: 1, inc: 1 },
  x1: { min: 1, max: 1, inc: 1 },
  x5: { min: 1, max: 5, inc: 5 },
  x10: { min: 1, max: 10, inc: 10 },
  "+5": { min: 5, max: 5, inc: 1 },
  "+10": { min: 10, max: 10, inc: 1 },
  max: { min: 1, max: 100, inc: 1 },
};
