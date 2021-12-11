import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import LoanView from "../views/LoanView.vue";

const routes = [
  {
    path: "/",
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
