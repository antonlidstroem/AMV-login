import { reactive } from 'vue'

export const sessionStore = reactive({
  lastActivity:Date.now(),
  expiresAt:null,

  touch(){
    this.lastActivity = Date.now()
  },

  setExpiry(time){
    this.expiresAt = time
  }
})
