import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from "element-plus";
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'
import Home from '../views/Home.vue';
import GuestHome from '../views/GuestHome.vue';
// import FileUpAndDown from '../views/FileUpload.vue';
// import Editor from "../views/Editor.vue";
// import FileUpload from "@/views/FileUpload.vue";
// import FileDownload from "@/views/FileDownload.vue";
import Account from "../views/Account.vue";
import Notice from "../views/Notice.vue";

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'GuestHome',
    component: GuestHome
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/welcome-home',
    name: 'Home',
    component: GuestHome
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  // {
  //   path: '/file-upload',
  //   name: 'FileUpload',
  //   component: FileUpload
  // },
  {
    path: '/notice',
    name: 'Notice',
    component: Notice
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
})
let whiteList = [
  '/signup',
  '/login',
  '/home'
]
router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.path)) {
    if (sessionStorage.getItem('token') && to.path != '/home') {
      next('/home')
    } else {
      next()
    }
  } else {
    if (sessionStorage.getItem('token') || to.path === '/') {
      next()
    } else if (to.path !== '/') {
      ElMessage({
        showClose: true,
        message: 'please to login first',
        type: 'warning',
      });
      next('/')
    }
  }
})

export default router
