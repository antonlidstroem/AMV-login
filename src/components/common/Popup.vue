<template>
<div class="popup-overlay">
 <div class="popup-box">
  <h5>{{title}}</h5>
  <p>{{text}}</p>
  <button v-if="button" @click="$emit('close')">{{button}}</button>
 </div>
</div>
</template>

<script>
export default{
 props:['title','text','button']
}
</script>
