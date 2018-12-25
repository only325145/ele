<template>
  <div id="app">
    <Header></Header>
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
import Header from "./pages/header/Header.vue";
export default {
  name: "app",
  components: {
    Header
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
