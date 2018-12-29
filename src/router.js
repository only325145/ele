import Vue from "vue";
import Router from "vue-router";
import Goods from "./pages/components/Goods.vue"
import Comments from "./pages/components/Comments.vue"
import Detail from "./pages/components/Detail.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/goods",
      component: Goods
    },
    {
      path: "/comments",
      component: Comments
    },
    {
      path: "/detail",
      component: Detail
    }
  ]
});
