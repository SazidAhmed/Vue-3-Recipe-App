import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/components/Index'
import AddRecipe from '@/components/AddRecipe'
import EditRecipe from '@/components/EditRecipe'


const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/add-recipe',
    name: 'AddRecipe',
    component: AddRecipe
  },
  {
    path: '/edit-recipe/:recipe_slug',
    name: 'EditRecipe',
    component: EditRecipe
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
