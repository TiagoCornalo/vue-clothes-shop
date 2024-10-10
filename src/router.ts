import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/home/HomeContainer.vue')
    },
    {
      path: '/:category/:productSlug(.*)-:productId(\\d+)',
      component: () => import('@/product/ProductContainer.vue'),
      props: true
    }
  ]
})

export default router
