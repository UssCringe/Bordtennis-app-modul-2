function addMatchPlayer(name) {
  let matchPlayer = model.inputs.newMatch.invitedPlayer;
  if (matchPlayer.length === 0) {
    matchPlayer.push(name);
  } else {
    matchPlayer.splice(0, 1, name);
  }
  matchView();
}

function deleteMatchPlayer(name) {
  model.inputs.newMatch.invitedPlayer = [];
  matchView();
}

function completeMatch() {
  let score = model.inputs.newMatch.score;
  let my = score[0];
  let other = score[1];
  if (my < 0 || other < 0 || my > 10 || other > 10 || (my == 10 && other == 10) || (my != 10 && other != 10)) {
    alert("Du må sette riktig score!");
  } else {
    finalizeMatchData();
  }
}

function finalizeMatchData() {
  let users = model.data.users;
  let opponent = model.inputs.newMatch.invitedPlayer;
  let finalScore = model.inputs.newMatch.score;
  let matches = model.data.matches;
  let myID;
  let opponentID;

  // finding my own ID - for now.
  for (let i = 0; i < users.length; i++) {
    if (users[i].userName == model.app.user) {
      myID = users[i].id;
      break;
    }
  }

  // finding opponent's ID.
  for (let i = 0; i < users.length; i++) {
    if (users[i].userName == opponent) {
      opponentID = users[i].id;
      break;
    }
    // passing guestname as ID.
    if (i == users.length - 1) {
      opponentID = opponent[0] + "(gjest)";
      console.log("Guest-user: " + opponentID);
    }
  }

  let today = new Date();
  let timeOfCompletion = today.toISOString();
  let makeMatchID = matches.length + 1;

  let newMatchData = {
    matchId: makeMatchID,
    datePlayed: timeOfCompletion,
    participants: [
      { playerId: myID, matchScore: finalScore[0] },
      { playerId: opponentID, matchScore: finalScore[1] },
    ],
  };

  matches.push(newMatchData);
  model.inputs.newMatch.invitedPlayer = [];
  model.inputs.newMatch.score = [0, 0];
  finalScore = [];
  historyView();
}
