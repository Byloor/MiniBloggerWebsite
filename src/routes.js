import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      default: () => import("../src/components/Home.vue"),
      sidebar: () => import("../src/components/NavigationBar.vue")
    }
  },
  {
    path: "/home",
    name: "Home",
    components: {
      default: () => import("../src/components/Home.vue"),
      sidebar: () => import("../src/components/NavigationBar.vue")
    }
  },
  {
    path: "/create-blog",
    name: "CreateBlog",
    components: {
      default: () => import("../src/components/CreateBlog.vue"),
      sidebar: () => import("../src/components/NavigationBar.vue")
    }
  },
  {
    path: "/my-blogs",
    name: "MyBlogs",
    components: {
      default: () => import("../src/components/MyBlogs.vue"),
      sidebar: () => import("../src/components/NavigationBar.vue")
    }
  },
  {
    path: "/blog/:id",
    name: "SingleBlog",
    components: {
      default: () => import("../src/components/SingleBlog.vue"),
      sidebar: () => import("../src/components/NavigationBar.vue")
    }
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
    }
  }
];

export const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
});