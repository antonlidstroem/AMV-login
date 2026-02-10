import { reactive } from 'vue'

export const modalStore = reactive({
  active:null,

  open(name){
    this.active=name
  },

  close(){
    this.active=null
  }
})
