import AddListenerInputs from "./addListenerInputs.js";
import CheckInputsData from "./checkInputsData.js";
import dataPlayers from "./dataPlayers.js";
import GetDataFromInput from "./getDataFromInput.js";
import server from "./server.js";
import GetUsersInfo from "./server/getUsersInfo.js";
import timer from "./timer.js";

const errorMassage = document.getElementById('errorMassage')


const accessDate = '2023-12-25T23:12:00';
const btn = document.querySelector('button');
const loadingImg = document.getElementById('loadingImg');

let playersInfo = await GetUsersInfo ();


AddListenerInputs();

window.refreshUsersConsole = function () {
                            //   Оновити дані в фаєрбейс з масиву гравців
    let refreshUsers = new Promise((res,rej)=>{
        server.refreshUsers(res,rej)
      });
      refreshUsers.then(console.log(1))
}
window.changeAnswerUser = function (id) {
  
   
        console.log(1)
        let player = playersInfo.find(gamer => (id == gamer.idPlayer));
     
        player.readyPlay = !player.readyPlay;
        console.log(player)
        let updateUser = new Promise((res,rej) =>{
            server.updateUser(player.id, player)
        })
        updateUser.then(()=>console.log(1))
  
   
}





btn.addEventListener('click',async () => {
   



    let inputData = GetDataFromInput();

    if(await CheckInputsData(inputData)) {
        loading();
    }
    


})





let timerGo = timer(accessDate);
timerGo.then(()=>{
    btn.removeAttribute("disabled");
    btn.style.opacity = 1;
    document.getElementById('timer').remove();
    document.getElementById('timerText').remove();
})





function loading() {
    let opacityNumber = 0;
    setInterval(() => {
        loadingImg.style.opacity = opacityNumber;
        opacityNumber += 0.01;
        if (opacityNumber >= 0.5) {
            window.location = "ready.html";
        }
    
    }, 40);
  
}

export  {playersInfo};