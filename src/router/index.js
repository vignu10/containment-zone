import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    redirect: "login",
  },
  {
    name: "LogIn",
    path: "/login",
    component: () => import("../components/LoginPage"),
  },
  {
    name: "SignUp",
    path: "/signup",
    component: () => import("../components/SignupPage"),
  },
  {
    name: "ForgotPassword",
    path: "/forgot",
    component: () => import("../components/ForgotPassword.vue"),
  },
  {
    name: 'ZonePage',
    path: '/zones',
    component:() => import('../views/ZonePage.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
