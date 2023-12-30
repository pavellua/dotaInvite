import { playersInfo } from "./index.js";


async function CheckInputsData(inputData) {
   

      let player = playersInfo.find(elem => inputData.id == elem.idPlayer);
  
  if (player && player.password == inputData.password) {
   
      localStorage.setItem('playerData',JSON.stringify(player) );
return true;
     
  }
  else {
    
      errorMassage.style.opacity= 1;
      setTimeout(()=>{
          errorMassage.style.opacity= 0;
      },2000)
      return false;
  }
    
    



  
}
export default CheckInputsData;
