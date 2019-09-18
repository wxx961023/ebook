<template>
  <div id="app">
    <router-view/>
    <span class="text">ACC</span>
  </div>
</template>
<script>
export default {}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
</script>
<style scoped>
.text{
  /* font-family: 'Days One'; */
  font-family: 'Days One';
  font-size: 1rem;
  color: red;
}
</style>
