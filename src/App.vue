<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <div class="tab">
      <router-link to="/goods" tag="div" class="tab-item">商品</router-link>
      <router-link to="/comments" tag="div" class="tab-item">评价</router-link>
      <router-link to="/detail" tag="div" class="tab-item">商家</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import Header from "./components/header/Header.vue";
export default {
  name: "app",
  data() {
    return {
      seller: {}
    };
  },
  methods: {
    getSellerInfo() {
      Axios.get("/data.json").then(this.getSellerInfoSucc);
    },
    getSellerInfoSucc(res) {
      res = res.data;
      if (res.ret && res.data) {
        this.seller = res.data.seller;
      }
    }
  },
  components: {
    Header
  },
  mounted() {
    this.getSellerInfo();
  }
};
</script>
<style lang="stylus" scoped>
  #app
    .tab
      display: flex
      width: 100%
      height: .8rem
      line-height: .8rem
      border-bottom: 1px solid rgba(7,17,27,0.1)
      color: rgb(77,85,93)
      .tab-item
        flex: 1
        text-align: center
        &.router-link-active
          color: red
        
</style>
