import server from "./server.js";
import zero from "./convertZero.js";
import timer from "./timer.js";
import slowOpacity from "./slowOpacity.js";
import addPlayers from "./addPlayers.js";
import GetUsersInfo from "./server/getUsersInfo.js";
import { startDate } from "./constData.js";
import changePositionPlayer from "./changePositionPlayer.js";
window.addEventListener('load',async function () {

  // const observer = new MutationObserver(() => {
  //   // Функція, яка буде викликана при змінах на сторінці
  //   const element = document.documentElement;
  //   element.scrollTop = element.scrollHeight; // Прокручування до низу сторінки
  // });
  // // Налаштовуємо спостереження за змінами в документі
  // observer.observe(document, {
  //   childList: true,
  //   subtree: true
  // });



  const dotaSong = document.getElementById('dotaAudio');
  const mainInfo = document.getElementById('mainInfo');
  const memory = document.getElementById('acceptMenu');
  const main = document.getElementById('main');
  const memoryBtn = document.getElementById('memory');
  const massage = document.getElementById('massage');
  const video = document.getElementById('video');
  
  let playerData = JSON.parse(localStorage.getItem('playerData'));



  // dotaSong.play();
  dotaSong.volume = 0.3;



  function renderpage(dataPlayers) {
    console.log('render')
    video.querySelector('video').src = `media/${playerData.videoUrl}`;
    const bootCampImg = document.getElementById('bootCampImg');
    massage.innerHTML = `
  <h2 class ="hidden informText">Привіт, ${playerData.name}! </h2>

  
  
  <p class ="hidden informText">На зв'язку Чернобай Павло. Радий бачити тебе на цій сторінці! Сподіваюся, що тобі цікаво що це. Можливо, ти навіть здогадуєшся. Можу сказати, що такий id отримав не тільки ти.</p>
  <p class ="hidden informText">Натисни на кнопку щоб піти далі</p>
   
  `;


    memoryBtn.addEventListener('click', () => {
      dotaSong.volume = 0.08;
      video.style.opacity = 1;
      video.style.zIndex = 1;

      video.style.position = "relative";


      video.querySelector('video').play();
    },{ once: true });

    video.querySelector('video').addEventListener('ended', () => {
      main.style.height = 'initial';
      dotaSong.volume = 0.3;

      mainInfo.style.opacity = 1;
      mainInfo.style.zIndex = 1;
      setTimeout(()=>{
        mainInfo.scrollIntoView({
          behavior: 'smooth',
          duration: 5000
        });
      },500)
      
      slowOpacity(document.getElementById('mainText'), document.getElementById('analiticMenu'))
    })

    let intervalTime = 0;




    slowOpacity(massage, memory);



    addPlayers();

  }


 
  let dataPlayers;

  function promiseFunc(activeFunc, par1, par2) {
    let getDataPlayers = new Promise((res, rej) => {


      activeFunc(res, rej, par1, par2)
    });
    return getDataPlayers;
  }



 

    dataPlayers = await GetUsersInfo();
    if (playerData) {
      renderpage(playerData)
    } else {
      this.document.getElementById('whatNeedDo').style.display = 'none';
      memory.style.display = 'none';
      mainInfo.style.opacity = 1;
      mainInfo.style.zIndex = 1;
      mainInfo.scrollIntoView({
        behavior: 'smooth',
        duration: 5000
      });
      slowOpacity(document.getElementById('mainText'), document.getElementById('analiticMenu'))
      addPlayers();
    }
  







  const determinedPlayers = document.getElementById('determinedPlayers');

  determinedPlayers.addEventListener('click', async (e) => {
    if (e.target.classList.contains('readyBtns') && playerData.readyPlay == 'undecided') {
      let answer;

      if (e.target.id == 'readyPlay') {
        answer = true;
      } else if (e.target.id == 'notReadyPlay') {
        answer = false;
      }
      playerData.readyPlay = answer;
      let currentTime = new Date();
      playerData.responseTime = currentTime.getTime();
      localStorage.setItem('playerData', JSON.stringify(playerData))
      if (playerData.readyPlay != 'undecided') {
        document.querySelectorAll('.readyBtns').forEach(btn => {
          btn.style.pointerEvents = 'none';
          btn.style.opacity = 0;
        })
      }
     await server.updateUser(playerData.id, playerData)
     changePositionPlayer(answer, playerData)
      
    }

  })

  

  
  timer (startDate) ;
});