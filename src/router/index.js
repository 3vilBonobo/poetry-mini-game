import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../components/Welcome.vue";
import PoemPage from "../components/PoemPage.vue";

const routes = [
  { path: "/", component: Welcome },
  { path: "/poem/:id", component: PoemPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
