function changePositionPlayer(answer, playerData) {
    console.log(playerData.id)
    const playerList = document.getElementById('playerListDiv');
    const liPlayer = document.querySelector(`[data-id = "${playerData.id}"]`);
    const readyUl = document.querySelector('#readyPlayers ul');
    const notReadyUl = document.querySelector('#notReadyPlayers ul');
    let newLi = document.createElement('li');
    newLi.style.opacity = '0';

    let playerListParametrs = playerList.getBoundingClientRect();

    playerList.style.height = playerListParametrs.height + "px";
    liPlayer.classList.add('slowMove');
    liPlayer.addEventListener('transitionend', () => {
      newLi.remove();
      if (answer) {
        readyUl.append(liPlayer)
      } else {
        notReadyUl.append(liPlayer)
      }

      liPlayer.style.position = 'static';
      liPlayer.style.transform = 'none';
    });
    newLi.innerHTML = liPlayer.innerHTML;
    if (answer) {

      readyUl.append(newLi);


    } else if (!answer) {

      notReadyUl.append(newLi);
    }



    let newLiCoordinate = newLi.getBoundingClientRect();
    let liPlayerCoordinate = liPlayer.getBoundingClientRect();
    liPlayer.style.transform = `translate(${newLiCoordinate.x - liPlayerCoordinate.x}px, ${newLiCoordinate.y - liPlayerCoordinate.y}px) rotate(360deg)`;
  }
  export default changePositionPlayer;