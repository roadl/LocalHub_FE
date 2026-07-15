// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import Map from '@/pages/Map.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/map',
    name: 'Map',
    component: Map,
  },
  {
    path: '/community',
    component: () => import('@/pages/community/Community.vue'),
  },
  {
    path: '/community/write',
    component: () => import('@/pages/community/CommunityWrite.vue'),
  },
  {
    path: '/community/:post_id',
    component: () => import('@/pages/community/CommunityDetail.vue'),
  },
  {
    path: '/community/edit/:post_id',
    component: () => import('@/pages/community/CommunityEdit.vue'),
  },
  {
    path: '/category/:category',
    component: () => import('@/pages/category/Category.vue'),
  },
  {
    path: '/category/:category/:content_id',
    component: () => import('@/pages/category/CategoryDetail.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
