import { users } from './users'

export function loginMock(username,password){
 return new Promise((resolve,reject)=>{
  setTimeout(()=>{
   const user=users.find(u=>u.username===username && u.password===password)
   if(user) resolve(user)
   else reject("Fel användarnamn och lösenord")
  },1000)
 })
}
