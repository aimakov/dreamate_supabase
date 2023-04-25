interface Player {
    name: string;
    skill: number;
}

interface Teams {
    [key: string]: Player[];
}

export const generateTeams = (teamsNumber: number, players: Player[]) => {
    if (players.length > 0) {
        let tempPlayers = [...players];
        // const sortedList = tempPlayers.sort((a, b) => b.skill - a.skill);

        const reducedPlayers = players.reduce((groupedPlayers, player) => {
            const skill = player.skill;
            if (groupedPlayers[skill] == null) groupedPlayers[skill] = [];
            groupedPlayers[skill].push(player);
            return groupedPlayers;
        }, {});

        let sortedPlayers = [];
        const temp = JSON.parse(JSON.stringify(reducedPlayers));
        // console.log(temp);

        let sortedRandomPlayers = [];

        for (let key of Object.keys(temp).reverse()) {
            sortedRandomPlayers = [...sortedRandomPlayers, temp[key].sort(() => Math.random() - 0.5)];
        }

        sortedRandomPlayers = sortedRandomPlayers.flat(2);

        // for (const skill in reducedPlayers) {
        //     for (let i = reducedPlayers[skill].length; i > 0; i--) {
        //         sortedPlayers.push(reducedPlayers[skill].splice(Math.floor(Math.random() * reducedPlayers[skill].length), 1)[0]);
        //     }
        // }

        // console.log(sortedRandomPlayers);

        for (let i = 0; i < Math.ceil(sortedRandomPlayers.length / teamsNumber); i++) {
            let subDivision = sortedRandomPlayers.slice(teamsNumber * i, teamsNumber * (i + 1));

            subDivision = subDivision.sort(() => Math.random() - 0.5);

            for (let j = 0; j < teamsNumber; j++) {
                if (subDivision[j] === undefined) break;
                sortedRandomPlayers.filter((player) => player.name === subDivision[j].name)[0].team = j + 1;
            }
        }

        // for (let i = 0; i < sortedRandomPlayers.length; i++) {
        //     const team = Math.floor(i % teamsNumber) + 1;
        //     sortedRandomPlayers[i].team = team;
        // }

        // for (let i = 0; i < Math.ceil(players.length / teamsNumber); i++) {
        //     let team = sortedPlayers.slice(i * teamsNumber, Math.min(i * teamsNumber + teamsNumber, players.length));

        //     for (let j = 0; j < teamsNumber; j++) {
        //         let pickedPlayerName = team[Math.round(Math.random() * (team.length - 1))].name;
        //         // console.log(pickedPlayerName);

        //         tempPlayers = tempPlayers.map((player) => (player.name === pickedPlayerName ? { ...player, team: j + 1 } : player));
        //         // tempPlayers = tempPlayers.forEach((player) => (player.name === pickedPlayerName ? { ...player, team: `Team_${j + 1}` } : player));
        //         team = team.filter((player) => player.name !== pickedPlayerName);

        //         if (team.length === 0) {
        //             break;
        //         }
        //     }
        // }
        // return tempPlayers;

        return sortedRandomPlayers;
    }
};
