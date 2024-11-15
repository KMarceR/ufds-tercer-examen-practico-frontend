import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import ClienteView from '../views/ClienteView.vue'
import LoginView from '../views/LoginView.vue'
import CategoriaView from '../views/CategoriaView.vue'
import ProductoView from '@/views/ProductoView.vue'
import MarcaView from '@/views/MarcaView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: WelcomeView
  },
  {
    path: '/cliente',
    name: 'cliente',
    component: ClienteView
  },{
    path: '/categoria',
    name: 'categoria',
    component: CategoriaView
  },
  {
    path: '/producto',
    name: 'producto',
    component: ProductoView
  },
  {
    path: '/marca',
    name: 'marca',
    component: MarcaView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
