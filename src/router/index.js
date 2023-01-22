import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    redirect: "/home/login",
  },
  {
    name: "header",
    path: "/home",
    component: () => import("../pages/HeaderVue.vue"),
    children: [
      {
        name: "Login",
        path: "login",
        component: () => import("../pages/LoginPage.vue"),
      },
      {
        name: "Signup",
        path: "signup",
        component: () => import("../pages/SignUpPage.vue"),
      },

      {
        name: "ZonePage",
        path: "zones",
        component: () => import("../pages/ZonePage.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
