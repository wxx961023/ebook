<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin.js'
  import {
    getFontFamily,
    saveFontFamily,
    getFontSize,
    saveFontSize,
    getTheme,
    saveTheme,
    getLocation
  } from '../../utils/localStorage'

  import Epub from 'epubjs'
  global.ePub = Epub
  // History|2017_Book_OneHundredYearsOfChemicalWarfa.epub
  export default {
    mixins: [ebookMixin],
    methods: {
      initEpub() {
        const url = 'http://localhost:8081/epub/' + this.fileName
        this.book = new Epub(url)
        this.setCurrentBook(this.book)
        this.initRendition()
        this.initGesture()
        this.book.ready.then(() => {
          return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
        })
        .then((locations) => {
          // console.log(locations)
          this.setBookAvailable(true)
          this.refreshLocation()
        })
      },
      initTheme() {
        let defaultTheme = getTheme(this.fileName)
        if(!defaultTheme){
          defaultTheme = this.themeList[0].name
          saveTheme(this.fileName, defaultTheme)
        }
        this.setDefaultTheme(defaultTheme)
        this.themeList.forEach(theme => {
          this.rendition.themes.register(theme.name, theme.style)
        })
        this.rendition.themes.select(defaultTheme)
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
          // this.setFontFamily(this.fileName,this.defaultFontFamily)
          saveFontFamily(this.defaultFontFamily)
        }else{
          this.rendition.themes.font(font)
          this.setDefaultFontFamily(font)
        }
      },
      initRendition() {
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
          method: 'default'
        })
        const location = getLocation(this.fileName)
        this.display(location, ()=>{
          this.initTheme()
          this.initFontSize()
          this.initFontFamily()
          this.initGlobalStyle()
        })
        this.rendition.hooks.content.register(contents => {
          Promise.all([
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
            ]).then(() => {
          })
        })
      },
      initGesture(){
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
          this.rendition.prev().then(()=> {
            this.refreshLocation()
          })
          this.hideTitleAndMenu()
        }
      },
      nextPage(){
        if(this.rendition){
          this.rendition.next().then(()=> {
            this.refreshLocation()
          })
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
