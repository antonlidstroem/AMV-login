import { users } from './users'

export function loginMock(username,password){

  return new Promise((resolve,reject)=>{

    setTimeout(()=>{

      const user = users.find(
        u => u.username === username &&
             u.password === password
      )

      if(user){

        resolve({
          token:'fake-jwt-token',
          user:{
            id:user.id,
            name:user.name,
            role:user.role
          }
        })

      }else{
        reject('Fel användarnamn eller lösenord')
      }

    },1000) // simulerar nätverk
  })
}
