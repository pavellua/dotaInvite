import zero from "./convertZero.js";
function timer(startDate) {
    const timerDays = document.getElementById('timerDays');
    const timerHours = document.getElementById('timerHours');
    const timerMinutes = document.getElementById('timerMinutes');
    const timerSeconds = document.getElementById('timerSeconds');

    return new Promise((res,rej)=>{
        let activateTimer = setInterval(() => {
        
            const currentTime = new Date().getTime();
            let timeForStart = new Date(new Date(startDate).getTime() - currentTime);
            let days = zero(Math.floor(timeForStart/(1000*60*60*24))) ;
            let hours = zero(Math.floor(timeForStart%(1000*60*60*24)/(1000*60*60)));
            let minutes = zero(Math.floor(timeForStart%(1000*60*60)/(1000*60)));
            let seconds = zero(Math.floor(timeForStart%(1000*60)/(1000)));
            // timerDay.querySelector('.timerCells').innerHTML = `До початку залишилось: ${timeForStart.getMinutes()}   ${timeForStart.getSeconds()}`;
         
            
            timerDays.querySelector('.timerCells').innerHTML = days[0];
            timerDays.querySelectorAll('.timerCells')[1].innerHTML = days[1];
      
            timerHours.querySelector('.timerCells').innerHTML =   hours[0];
            timerHours.querySelectorAll('.timerCells')[1].innerHTML =   hours[1];
            timerMinutes.querySelector('.timerCells').innerHTML = minutes[0];
            timerMinutes.querySelectorAll('.timerCells')[1].innerHTML = minutes[1];
            timerSeconds.querySelector('.timerCells').innerHTML = seconds[0];
            timerSeconds.querySelectorAll('.timerCells')[1].innerHTML = seconds[1];
            
            if (timeForStart<0) {
                res('Start')
                clearInterval(activateTimer);
                
            }
          }, 1000);
    })



    

    

  }
  export default timer;