interface Player {
    name: string;
    skillLevel: number;
}

interface Teams {
    [key: string]: Player[];
}

export const generateTeams = (teamsNumber: number, players: Player[]) => {
    if (players.length > 0) {
        let tempPlayers = [...players];
        const sortedList = tempPlayers.sort((a, b) => b.skillLevel - a.skillLevel);

        const reducedPlayers = sortedList.reduce((groupedPlayers, player) => {
            const skillLevel = player.skillLevel;
            if (groupedPlayers[skillLevel] == null) groupedPlayers[skillLevel] = [];
            groupedPlayers[skillLevel].push(player);
            return groupedPlayers;
        }, {});

        let sortedPlayers = [];

        // console.log(sortedList);

        for (const skillLevel in reducedPlayers) {
            for (let i = reducedPlayers[skillLevel].length; i > 0; i--) {
                sortedPlayers.push(reducedPlayers[skillLevel].splice(Math.floor(Math.random() * reducedPlayers[skillLevel].length), 1)[0]);
            }
        }

        for (let i = 0; i < Math.ceil(players.length / teamsNumber); i++) {
            let team = sortedPlayers.slice(i * teamsNumber, Math.min(i * teamsNumber + teamsNumber, players.length));

            for (let j = 0; j < teamsNumber; j++) {
                let pickedPlayerName = team[Math.round(Math.random() * (team.length - 1))].name;
                // console.log(pickedPlayerName);

                tempPlayers = tempPlayers.map((player) => (player.name === pickedPlayerName ? { ...player, team: `Team_${j + 1}` } : player));
                // tempPlayers = tempPlayers.forEach((player) => (player.name === pickedPlayerName ? { ...player, team: `Team_${j + 1}` } : player));
                team = team.filter((player) => player.name !== pickedPlayerName);

                if (team.length === 0) {
                    break;
                }
            }
        }
        return tempPlayers;
    }
};
