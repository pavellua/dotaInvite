import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { addDoc, collection, doc, deleteDoc, getDocs, getFirestore, setDoc} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import dataPlayers from "./dataPlayers.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTWTd5WfnUs25cgXa5hfuobghgoc2QvnE",
  authDomain: "dotaparty-93617.firebaseapp.com",
  projectId: "dotaparty-93617",
  storageBucket: "dotaparty-93617.appspot.com",
  messagingSenderId: "705858157887",
  appId: "1:705858157887:web:e49a6c086eacd29433678a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()
const usersRef = collection(db, 'users')
let usersMas;
const playerData =JSON.parse(localStorage.getItem('playerData')) ;


function addUser(data) {
  
  addDoc(usersRef, data)
    .then(() => console.log('success'))
    .catch((err) => console.log(err.message))
}

async function updateUsers() {
  return new Promise((res,rej)=>{
    console.log('Робимо запит на сервер для отримання юзерів')
    getDocs(usersRef)
  .then((snapshot) => {
    
    let users = []
    snapshot.docs.forEach((doc) => {
      users.push({...doc.data(), id: doc.id})
    })
    usersMas = users;
    console.log(usersMas)
    res(usersMas) ;
    // for (let i in usersMas) {
          
    //   deleteUser(usersMas[i].id)
    // }

    // for (let i in dataPlayers) {
        
    //     addUser(dataPlayers[i])   
    
    // }
  })
  
    
  })
  .catch((err) => {
    console.log(err.message)
  })
}

 function refreshUsers(res,rej) {
  console.log(usersRef)
  getDocs(usersRef)
  .then((snapshot) => {
    
    let users = []
    snapshot.docs.forEach((doc) => {
      users.push({...doc.data(), id: doc.id})
    })
    usersMas = users;
    res(usersMas);
    console.log(usersMas)
    for (let i in usersMas) {
          
      deleteUser(usersMas[i].id)
    }

    for (let i in dataPlayers) {
        
        addUser(dataPlayers[i])   
    
    }
    
  })
  .catch((err) => {
    console.log(err.message)
  })
}


async function deleteUser(id) {
  return new Promise((res,rej)=>{
    const docRef = doc(db, "users", id);
    deleteDoc(docRef)
      .then(() => console.log(`${id} видалено`))
      .catch((err) => console.log(err.message))
  })
    
  }
  async function updateUser(id, data) {
    return new Promise((res,rej)=>{
      const docRef = doc(db, "users", id);
    setDoc(docRef, data)
      .then(() => res())
      .catch((err) => console.log(err.message))
    })
    
  }
  const server = {
    addUser,
    deleteUser,
    updateUsers,
    updateUser,
    refreshUsers
  }

  export default server;