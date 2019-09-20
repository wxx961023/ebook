<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Epub from 'epubjs'
  global.ePub = Epub
  // History|2017_Book_OneHundredYearsOfChemicalWarfa.epub
  export default {
    computed: {
      ...mapGetters(['fileName'])
    },
    methods: {
      initEpub() {
        const url = 'http://localhost:8081/epub/' + this.fileName
        this.book = new Epub(url)
        console.log('bool', this.book)
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
          method: 'default'
        })
        this.rendition.display()
        this.rendition.on('touchstart', event => {
          this.touchstartX = event.changedTouches[0].clientX
          this.touchstartTime = event.timeStamp
        })
        this.rendition.on('touchend', event => {
          const offsetX = event.changedTouches[0].clientX - this.touchstartX
          const time = event.timeStamp - this.touchstartTime
          if( time > 500 && offsetX > 40 ){
            this.prevPage()
          }else if( time >)

        })
      }
    },
    mounted () {
      console.log(this.$route)
      const fileName = this.$route.params.fileName.split('|').join('/')
      this.$store.dispatch('setFileName', fileName).then(() => {
        this.initEpub()
      })
    }
  }
</script>

<style scoped>

</style>
