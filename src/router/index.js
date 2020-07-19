import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
const Home = ()=>import ('../components/home/Home.vue')
const Users = ()=>import ('../components/users/Users.vue')
const Rights = ()=>import ('@/components/rights/Rights')
const Roles = ()=>import ('@/components/roles/Roles')
const Category = ()=>import ('@/components/categories/Category')
const Goods = ()=>import ('@/components/goods/Goods')
const GoodsAdd = ()=>import ('@/components/goods/GoodsAdd')


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component:Login
     
    },
    {
      path:'/home',
      component:Home,
      children:[{path:'users',component:Users},
                {path:'rights',component:Rights},
                {path:'roles',component:Roles},
                {path:'categories',component:Category},
                {path:'goods',component:Goods},
                {path:'goods-add',component:GoodsAdd}]
    },
 
    
  ]
})
// 导航守卫
router.beforeEach((to,from,next) => {
    if(to.path === '/login'){
      next()
    }else{
      const token = localStorage.getItem('token')
      if(token){
        next()
      }else{
        next('/login')
      }
    }
})

export default router