<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin.js'
  import { mapActions } from 'vuex'
  import {
    getFontFamily,
    saveFontFamily,
    getFontSize,
    saveFontSize
  } from '../../utils/localStorage'

  import Epub from 'epubjs'
  global.ePub = Epub
  // History|2017_Book_OneHundredYearsOfChemicalWarfa.epub
  export default {
    mixins: [ebookMixin],
    computed: {

    },
    methods: {
      initEpub() {
        const url = 'http://localhost:8081/epub/' + this.fileName
        this.book = new Epub(url)
        this.setCurrentBook(this.book)
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
          method: 'default'
        })
        this.rendition.display().then(() => {
          this.initFontSize()
          this.initFontFamily()
        })
        this.handleTouch()
      },
      initFontSize(){
        let fontSize = getFontSize(this.fileName)
        if(!fontSize) {
          saveFontSize(this.fileName,this.defaultFontSize)
        }else{
          this.rendition.themes.fontSize(fontSize)
          this.setDefaultFontSize(fontSize)
        }
      },
      initFontFamily(){
        let font = getFontFamily(this.fileName)
        if(!font){
          setFontFamily(this.fileName,this.defaultFontFamily)
        }else{
          this.rendition.themes.font(font)
          this.setDefaultFontFamily(font)
        }
      },
      handleTouch(){
        this.rendition.on('touchstart', event => {
          this.touchstartX = event.changedTouches[0].clientX
          this.touchstartTime = event.timeStamp
        })
        this.rendition.on('touchend', event => {
          const offsetX = event.changedTouches[0].clientX - this.touchstartX
          const time = event.timeStamp - this.touchstartTime
          if( time < 500 && offsetX > 40 ){
            this.prevPage()
          }else if( time < 500 && offsetX < -40){
            this.nextPage()
          }else{
            this.showTitleAndMenu()
          }
          event.preventDefault()
          event.stopPropagation()
        })
      },
      prevPage(){
        if(this.rendition){
          this.rendition.prev()
          this.hideTitleAndMenu()
        }
      },
      nextPage(){
        if(this.rendition){
          this.rendition.next()
          this.hideTitleAndMenu()
        }
      },
      showTitleAndMenu(){
        if(this.menuVisible){
          this.setSettingVisible(-1)
        }
        this.setMenuVisible(!this.menuVisible)
        this.setFontFamilyVisible(false)
      },
      hideTitleAndMenu(){
        this.setMenuVisible(false)
        this.setSettingVisible(-1)
      }
    },
    mounted () {
      const fileName = this.$route.params.fileName.split('|').join('/')
      this.setFileName(fileName).then(() => {
        this.initEpub()
      })
    }
  }
</script>

<style scoped>

</style>
