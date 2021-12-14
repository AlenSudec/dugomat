
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import LoanView from "../views/LoanView.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
const routes = [
  {
    path:"/",
    name: "Login",
    component: Login,
    meta: {
      title: "Login"
    }
  },
  {
    path:"/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register"
    }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "Dugomat"
    },
  },
  {
    path: "/loan/:loanId",
    name: "Loan",
    component: LoanView,
    meta: {
      title: "Dugomat"
    }
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
