import { reactive } from 'vue'

export const bankIdStore = reactive({
  status:'idle',
  orderRef:null,
  qrCode:null,
  message:null,
  interval:null,

  start(orderRef){
    this.orderRef = orderRef
    this.status='pending'

    this.interval = setInterval(()=>{
      console.log('poll backend...')
    },2000)
  },

  complete(){
    clearInterval(this.interval)
    this.status='complete'
  },

  fail(){
    clearInterval(this.interval)
    this.status='failed'
  }
})
