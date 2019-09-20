import Vue from 'vue'
import Router from 'vue-router'
import Ebook from './views/ebook/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/ebook'
    },
    {
      path: '/ebook',
      component: () => import('./views/ebook/index.vue'),
      children:[
        {
          path: ':fileName',
          component: () => import('./components/ebook/EbookReader.vue')
          
        }
      ]
    }
  ]
})
