<template>
  <div class="home">
    <!-- <div id="read"></div> -->
    <span class="icon-book"></span>
  </div>
</template>

<script>
import Epub from 'epubjs'
global.epub = Epub
export default {
  name: 'home',
  mounted () {
    // this.book = new Epub('61462.epub')
    // console.log(this.book)
    // this.book.renderTo('read', {
    //   width: window.innerWidth,
    //   height: window.innerHeight
    // }).display()
  }
}
</script>
