<template>
  <div class="header">
    <div class="wrapper">
      <div class="avatar">
        <img class="img" :src="seller.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="descript">{{seller.description}}/{{seller.deliveryTime}}</div>
        <div class="support" v-if="seller.supports">{{seller.supports[0].description}}</div>
      </div>
    </div>
    <div class="bwrapper"></div>
  </div>
</template>

<script>
export default {
  name: "Header",

  props: {
    seller: Object
  }
};
</script>

<style lang="stylus" scoped>
@import "../../assets/styles/mixins.styl"
  .header
    color: white
    background-color: #000
    .wrapper
      padding: .48rem .24rem .36rem .48rem
      .avatar
        display: inline-block
        .img
          width: 1.28rem
          height: 1.28rem
      .content
        display: inline-block
        margin-left: .28rem
        .title
          margin: .04rem 0 .16rem 0
          .brand
            display: inline-block
            width: .6rem
            height: .36rem
            bg-image("brand")
            background-size: .6rem .36rem
            background-repeat: no-repeat
</style>
