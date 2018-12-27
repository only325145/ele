<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <div class="tab">
      <div class="tab-item">商品</div>
      <div class="tab-item">评价</div>
      <div class="tab-item">详情</div>
    </div>
    <div class="content">
      I am content
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import Header from "./pages/header/Header.vue";
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
      .tab-item
        flex: 1
        text-align: center
</style>
