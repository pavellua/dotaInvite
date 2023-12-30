import { startDate } from "./constData.js";
import zero from "./convertZero.js";
import GetUsersInfo from "./server/getUsersInfo.js";

let playerData = JSON.parse(localStorage.getItem('playerData'));
async function addPlayers() {
    let dataPlayers = await GetUsersInfo();
    
    const playerList = document.getElementById('playerList');
    const notReadyPlayers = document.getElementById('notReadyPlayers');
    const readyPlayers = document.getElementById('readyPlayers');
    playerList.innerHTML = '';
    notReadyPlayers.innerHTML = '';
    readyPlayers.innerHTML = '';
    let ulReady = document.createElement('ul');
    let ulNotReady = document.createElement('ul');
    let ulPlayerList = document.createElement('ul');

    if (playerData == null || playerData.readyPlay != 'undecided') {
      document.querySelectorAll('.readyBtns').forEach(btn => {
        btn.style.display = 'none';
      })
    }
    let inviteData = new Date(startDate);
    document.getElementById('startInviteDay').innerHTML = `${zero(inviteData.getDate())}.${zero(inviteData.getMonth()+1)}.${zero(inviteData.getFullYear())}`;
    document.getElementById('startInviteTime').innerHTML = `о ${zero(inviteData.getHours())}:${zero(inviteData.getMinutes())}`;
    readyPlayers.append(ulReady);
    notReadyPlayers.append(ulNotReady);
    playerList.append(ulPlayerList);





    dataPlayers = dataPlayers.sort((a, b) => {
      if (b.responseTime == undefined) {
        return -1;
      }
      if (a.responseTime < b.responseTime) {
        return -1;
      } else if (a.responseTime > b.responseTime) {
        return 1;
      } else {
        return 0;
      }
    });
    dataPlayers.forEach(player => {

      let playerName = document.createElement('li');
      switch (player.readyPlay) {
        case true:


          playerName.dataset.id = player.id;
          playerName.innerHTML = `${player.name} ${player.lastname}`;
          ulReady.append(playerName);
          break;
        case false:


          playerName.dataset.id = player.id;
          playerName.innerHTML = `${player.name} ${player.lastname}`;
          ulNotReady.append(playerName);
          break;
        case "undecided":


          playerName.dataset.id = player.id;
          playerName.innerHTML = `${player.name} ${player.lastname}`;
          ulPlayerList.append(playerName);
          break;

        default:
          break;
      }

    })
  }
  export default addPlayers;