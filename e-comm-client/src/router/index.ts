import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ProductsView from '@/views/products-page/ProductsView.vue'
import CpuView from '@/views/cpu-page/CpuView.vue'
import PaymentView from '@/views/payment-form/PaymentView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: ProductsView
  },
  {
    path: '/cpu-product/:id',
    name: 'cpu-view',
    component: CpuView,
    props: true
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: PaymentView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
