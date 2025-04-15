import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ProductsView from '@/views/products-page/ProductsView.vue'
import CpuView from '@/views/cpu-page/CpuView.vue'
import PaymentForm from '@/views/payment-form/pay-form/PaymentForm.vue'
import BillingForm from '@/views/payment-form/billing-form/BillingForm.vue'

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
    component: PaymentForm
  },
  {
    path: '/checkout/billing',
    name: 'billing',
    component: BillingForm
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
