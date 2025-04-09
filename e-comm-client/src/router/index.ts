import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ProductsView from '@/views/products-page/ProductsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: ProductsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
