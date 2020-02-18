import Vue from 'vue'
import Router from 'vue-router'
import NewsList from './views/news/list.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {path: '/', redirect: '/news_list'},
      {
          path: '/',
          name: 'Home',
          component: () => import('./views/Home'),
          children: [
              {
                  path: 'news_list',
                  name: 'News_list',
                  component: NewsList,
                  meta: {
                      title: '新闻',
                      etitle: 'News'
                  }
              },
              {
                  path: 'gallery_list',
                  name: 'Gallery_list',
                  component: () => import('./views/gallery/list.vue'),
                  meta: {
                      title: '相册',
                      etitle: 'Gallery',
                      index: 2
                  }
              },
              {
                  path: 'me',
                  name: 'Me',
                  component: () => import('./views/me/Me.vue'),
                  meta: {
                      title: '我的',
                      etitle: 'Me'
                  }
              },
              {
                  path: 'about',
                  name: 'About',
                  component: () => import('./views/me/About.vue'),
                  meta: {
                      title: 'Information Technology'
                  }
              },
              {
                  path: 'invoice',
                  name: 'Invoice',
                  component: () => import('./views/me/Invoice.vue'),
                  meta: {
                      title: 'My Invoice'
                  }
              },
              {
                  path: 'news_page/:id',
                  name: 'News_page',
                  props: true,
                  component: () => import('./views/news/detail.vue'),
                  meta: {
                      title: '新闻',
                      etitle: 'News'
                  }
              },
              {
                  path: 'news_search',
                  name: 'News_search',
                  component: () => import('./views/news/searchList.vue'),
                  meta: {
                      title: '搜索新闻',
                      etitle: 'Search news'
                  }
              },
              {
                  path: 'gallery_search',
                  name: 'Gallery_search',
                  props: true,
                  component: () => import('./views/gallery/searchList.vue'),
                  meta: {
                      title: '搜索相册',
                      etitle: 'Search gallery'
                  }
              },
              {
                  path: 'gallery_page/:id',
                  name: 'Gallery_page',
                  props: true,
                  component: () => import('./views/gallery/detail.vue'),
                  meta: {
                      title: '相册',
                      etitle: 'Gallery',
                      index: 3
                  }
              }
          ]
      },
    {
      path: '/error',
      name: 'Error',
        component: () => import('./views/error/NotJoinError')
    },
    {
      path: '/not_found_error',
      name: 'NotFoundError',
        component: () => import('./views/error/NotFoundError')
    }
  ]
})
