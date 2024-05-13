import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // Route for displaying list of products
  {
    path: "/",
    name: "productsList",
    component: () => import("@/components/views/showProducts.vue"),
  },

  // Route for adding a new product
  {
    path: "/add",
    name: "addProduct",
    component: () => import("@/components/views/addProduct.vue"),
  },

  // Route for displaying server error (500)
  {
    path: "/servererror",
    name: "serverError",
    component: () => import("@/components/error/500.vue"),
  },

  // Catch all route for handling 404 Not Found errors
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: () => import("@/components/error/404.vue"),
  },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Export the router instance
export default router;
