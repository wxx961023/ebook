<template>
  <div class="xxx">
    我是
    <a href="#" class="hvr-grow">Add to Basket</a>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
.xxx:hover{
  border: 1px solid red;
}
.hvr-grow {
    display: inline-block;
    vertical-align: middle;
    transform: translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    transition-duration: 0.3s;
    transition-property: transform;
}

.hvr-grow:hover
{
  border: 1px solid red;
    transform: scale(1.1);
}
</style>
