import Vue from "vue";
import Router from "vue-router";
import Goods from "./components/goods/Goods.vue"
import Comments from "./components/comments/Comments.vue"
import Detail from "./components/detail/Detail.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Goods
    },
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
