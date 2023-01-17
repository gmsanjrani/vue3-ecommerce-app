import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetails from "@/pages/ProductDetails";

const routes = [
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/products",
    component: ProductsPage,
  },
  {
    path: "/products/:id",
    component: ProductDetails,
    name: "product",
    meta: { reuse: false },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  linkActiveClass:"active__links",
  linkExactActiveClass:"active__links",
});

export default router;
