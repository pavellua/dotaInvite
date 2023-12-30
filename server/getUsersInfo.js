import server from "../server.js";
let users = null;
async function GetUsersInfo () {
    if(users == null) {
        users = await server.updateUsers();
    }
    
  return users;
}
export default GetUsersInfo
