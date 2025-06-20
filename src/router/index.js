import { createRouter, createWebHistory } from 'vue-router'
import AbsenMasuk from '../views/AbsenMasuk.vue'
import AbsenPulang from '../views/AbsenPulang.vue'

const routes = [
  { path: '/', name: 'AbsenMasuk', component: AbsenMasuk },
  { path: '/pulang', name: 'AbsenPulang', component: AbsenPulang },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

