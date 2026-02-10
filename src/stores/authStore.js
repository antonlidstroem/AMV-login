import { reactive } from 'vue'
import { loginMock } from '../mock/authService'

export const authStore = reactive({

  user:null,
  token:null,
  isAuthenticated:false,
  loading:false,
  error:null,

  async login(username,password){

    this.loading=true
    this.error=null

    try{

      const result = await loginMock(username,password)

      this.user = result.user
      this.token = result.token
      this.isAuthenticated = true

    }catch(err){

      this.error = err

    }finally{
      this.loading=false
    }
  },

  logout(){
    this.user=null
    this.token=null
    this.isAuthenticated=false
  }
})
