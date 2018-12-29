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
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>  
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="supportCount">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="iconfont">&#xe615;</span>
      </div>
    </div>
    <div class="bwrapper">
      <span class="noticeImg"></span>
      <div class="notice">{{seller.bulletin}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    seller: Object
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    // class名称和每个特定图标编号相对应
  }
};
</script>

<style lang="stylus" scoped>
@import "../../assets/styles/mixins.styl"
  .header
    color: white
    background-color: rgba(7,17,27,0.5)
    // filter: blur(1px)
    .wrapper
      position: relative
      padding: .48rem .24rem .36rem .48rem
      .avatar
        display: inline-block
        vertical-align: top
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
            bg-image("img/brand")
            background-size: .6rem .36rem
            background-repeat: no-repeat
            vertical-align: bottom 
          .name
            margin-left: .12rem
            font-size: .32rem
            color: rgb(255,255,255)
            font-weight: bold
            line-height: .36rem
        .descript
          margin-top: .16rem
          font-size: .24rem
          line-height: .24rem
        .support
          margin: .2rem 0 .04rem 0
          .icon
            display: inline-block
            vertical-align: bottom
            width: .24rem
            height: .24rem
            margin-right: .08rem
            bg-image("img/decrease_1")
            background-size: .24rem .24rem
            background-repeat: no-repeat
            &.decrease
              bg-image("img/decrease_1")
            &.discount
              bg-image("img/discount_1")
            &.guarantee
              bg-image("img/guarantee_1")
            &.invoice
              bg-image("img/invoice_1")
            &.special
              bg-image("img/special_1")
          .text
            font-size: .2rem
            line-height: .24rem
            font-weight: 200
            vertical-align: bottom 
      .supportCount
        position: absolute
        right: .24rem
        bottom: .28rem
        height: .48rem
        line-height: .48rem
        padding: 0 .16rem 
        border-radius: .28rem
        background-color: rgba(0,0,0,0.2)
        text-align: center
        .count
          vertical-align: top
          font-size: .12rem
    .bwrapper
      height: .56rem
      padding: 0 .24rem
      background-color: rgba(7,17,27,0.2)
      .noticeImg
        display: inline-block
        float: left
        margin-top: .14rem
        width: .42rem
        height: .26rem
        background-image: url("img/bulletin@2x.png")
        background-size: .42rem .26rem
        background-repeat: no-repeat
      .notice
        line-height: .56rem
        padding: 0 .08rem
        font-size: .2rem
        color: rgb(255,255,255)
        font-weight: 200
        ellipsis()
</style>
