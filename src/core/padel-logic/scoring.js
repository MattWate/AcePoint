export const PADEL_POINTS = ["0", "15", "30", "40", "Ad"];

export const getInitialState = () => ({
  scoreA: 0, // Index of PADEL_POINTS
  scoreB: 0,
  gamesA: 0,
  gamesB: 0,
  setsA: 0,
  setsB: 0,
  isGoldenPoint: false,
});

export const updateScore = (state, winner, options = { goldenPoint: true }) => {
  let { scoreA, scoreB, gamesA, gamesB, setsA, setsB } = { ...state };

  if (winner === 'A') {
    if (scoreA === 3 && scoreB < 3) return winGame(state, 'A'); // 40-0, 40-15, 40-30
    if (scoreA === 3 && scoreB === 3) {
      if (options.goldenPoint) return winGame(state, 'A');
      if (scoreA === 4) return winGame(state, 'A'); // Ad-out
      scoreA++; // Move to Ad
    } else if (scoreA === 3 && scoreB === 4) {
      scoreB--; // Back to Deuce from Ad-B
    } else {
      scoreA++;
    }
  } else {
    // Mirror logic for Winner B...
    if (scoreB === 3 && scoreA < 3) return winGame(state, 'B');
    if (scoreB === 3 && scoreA === 3) {
      if (options.goldenPoint) return winGame(state, 'B');
      if (scoreB === 4) return winGame(state, 'B');
      scoreB++;
    } else if (scoreB === 3 && scoreA === 4) {
      scoreA--;
    } else {
      scoreB++;
    }
  }

  return { ...state, scoreA, scoreB };
};

const winGame = (state, winner) => {
  let { gamesA, gamesB, setsA, setsB } = { ...state };
  if (winner === 'A') gamesA++; else gamesB++;

  // Logic for Set (6 games, lead by 2, or Tie-break at 6-6)
  if (gamesA >= 6 && (gamesA - gamesB >= 2)) {
    setsA++;
    gamesA = 0; gamesB = 0;
  } else if (gamesB >= 6 && (gamesB - gamesA >= 2)) {
    setsB++;
    gamesA = 0; gamesB = 0;
  }

  return { ...state, scoreA: 0, scoreB: 0, gamesA, gamesB, setsA, setsB };
};
