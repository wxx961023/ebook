
<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-show="menuVisible ">
      <div class="left">
        <span class="icon-back" @click="back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-shelf"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-cart"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin.js'
  export default {
    mixins: [ebookMixin],
    computed: {
    },
    methods: {
      back() {
        console.log('back')
      }
    }
  }
</script>

<style lang="scss" ref="reference" scoped>
  @import '../../assets/style/global.scss';

    .title-wrapper {
    position: absolute;
    background: white;
    top: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: px2rem(48);
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(22);
    .left {
      flex: 0 0 px2rem(37);
      @include right;
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .icon-wrapper {
        flex: 0 0 px2rem(37);
        @include left;
      }
    }
  }
</style>
