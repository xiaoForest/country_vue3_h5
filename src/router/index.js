import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'

import Index from '@/views/index'
import Page from '@/views/page'
import TopicList from '@/views/topicList'
import Details from '@/views/details'

const Router = createRouter({
  history: createWebHistory(),
  routes: [{
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/page',
      name: 'page',
      component: Page
    },
    {
      path: '/details',
      name: 'details',
      component: Details
    },
    {
      path: '/topicList',
      name: 'topicList',
      component: TopicList
    },
  ]
})

export default Router