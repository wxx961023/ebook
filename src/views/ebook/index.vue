<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
  import EbookReader from '../../components/ebook/EbookReader.vue'
  import EbookTitle from '../../components/ebook/EbookTitle.vue'
  import EbookMenu from '../../components/ebook/EbookMenu.vue'
  import { ebookMixin } from '../../utils/mixin'
  import { getReadTime, saveReadTime } from '../../utils/localStorage'

  export default {
    mixins: [ebookMixin],
    components: {
      EbookReader,
      EbookTitle,
      EbookMenu
    },
    methods: {
      startLoopReadTime() {
        let readTime = getReadTime(this.fileName)
        // console.log('readTime1', readTime)
        if(!readTime) {
          readTime = 0
        }
        this.task = setInterval(() => {
          readTime++
          if(readTime % 30 === 0) {
            saveReadTime(this.fileName, readTime)
          }
        },1000)
      }
    },
    created () {

    },
    mounted() {
      this.startLoopReadTime()
    },
    beforeDestroy() {
      // console.log('这里执行')
      if(this.task) {
        clearInterval(this.task)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet" scoped>
  @import "../../assets/style/global.scss";


</style>
