import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/home/HomeContainer.vue'),
      meta: {
        title: 'Las Toninas | Home'
      }
    },
    {
      path: '/:category/:productSlug(.*)-:productId(\\d+)',
      component: () => import('@/product/ProductContainer.vue'),
      props: true,
      meta: {
        title: 'Las Toninas | Product'
      }
    },
    {
      path: '/checkout',
      component: () => import('@/checkout/CheckoutContainer.vue'),
      meta: {
        title: 'Las Toninas | Checkout'
      }
    },
    {
      path: '/payment/:paymentId',
      component: () => import('@/payment/PaymentContainer.vue'),
      meta: {
        title: 'Las Toninas | Payment'
      }
    }
  ]
})

export default router
