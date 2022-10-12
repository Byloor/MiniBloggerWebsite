import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

import { store } from './store'

const ifUserNotAuthenticated = (to, from, next) => {
  if (!store.getters.isUserAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifUserAuthenticated = (to, from, next) => {
  if (store.getters.isUserAuthenticated) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: "/",
    name: "LoginForm",
    components: {
      default: () => import("../src/components/Login/LoginForm.vue"),
      sidebar: () => import("../src/components/NavigationBar.vue")
    },
    beforeEnter: ifUserNotAuthenticated
  },
  {
    path: "/home",
    name: "Home",
    components: {
      default: () => import("../src/components/Home.vue"),
      sidebar: () => import("../src/components/NavigationBar.vue")
    },
    beforeEnter: ifUserAuthenticated
  },
  // {
  //   path: "/account",
  //   name: "Account",
  //   components: {
  //     default: () => import("../src/components/Account.vue"),
  //     sidebar: () => import("../src/components/NavigationBar.vue")
  //   },
  //   beforeEnter: ifUserAuthenticated
  // },
  {
    path: "/create-blog",
    name: "CreateBlog",
    components: {
      default: () => import("../src/components/CreateBlog.vue"),
      sidebar: () => import("../src/components/NavigationBar.vue")
    },
    beforeEnter: ifUserAuthenticated
  },
  {
    path: "/update-blog/:id",
    name: "CreateBlog",
    components: {
      default: () => import("../src/components/CreateBlog.vue"),
      sidebar: () => import("../src/components/NavigationBar.vue")
    },
    props: true,
    beforeEnter: ifUserAuthenticated
  },
  {
    path: "/my-blogs",
    name: "MyBlogs",
    components: {
      default: () => import("../src/components/MyBlogs.vue"),
      sidebar: () => import("../src/components/NavigationBar.vue")
    },
    beforeEnter: ifUserAuthenticated
  },
  {
    path: "/blog/:id",
    name: "SingleBlog",
    components: {
      default: () => import("../src/components/SingleBlog.vue"),
      sidebar: () => import("../src/components/NavigationBar.vue")
    },
    beforeEnter: ifUserAuthenticated
  },
  {
    path: "/register",
    name: "RegisterForm",
    components: {
      default: () => import("../src/components/Login/Register.vue"),
    }
  },
  {
    path: "/login",
    name: "LoginForm",
    components: {
      default: () => import("../src/components/Login/LoginForm.vue"),
    },
    beforeEnter: ifUserNotAuthenticated
  }
];

export const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
});