interface Player {
  name: string;
  skill: number;
  teamNumber?: number;
}

export function balanceTeams(teamsNumber: number, players: Player[]): Player[] {
  // Sort players by skill level in descending order
  const sortedPlayers = players.sort((a, b) => b.skill - a.skill);
  console.log("Sorted");
  console.log(sortedPlayers);
  const numPlayers = sortedPlayers.length;
  const numPlayersPerTeam = Math.floor(numPlayers / teamsNumber);

  // Assign players to teams based on skill level
  for (let i = 0; i < numPlayers; i++) {
    const player = sortedPlayers[i];
    const teamIndex = i % teamsNumber;
    player.teamNumber = teamIndex + 1;
  }

  // Distribute remaining players evenly among teams
  let remainingPlayers = numPlayers % teamsNumber;
  let currentPlayerIndex = 0;
  while (remainingPlayers > 0) {
    const currentPlayer = sortedPlayers[currentPlayerIndex];
    currentPlayer.teamNumber = currentPlayer.teamNumber || 1;
    currentPlayerIndex++;
    remainingPlayers--;
  }

  // Shuffle players to ensure randomness
  sortedPlayers.sort(() => Math.random() - 0.5);

  return sortedPlayers;
}
