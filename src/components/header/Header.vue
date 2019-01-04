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
      <div v-if="seller.supports" class="supportCount" @click="showdetail">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="iconfont">&#xe74e;</span>
      </div>
    </div>
    <div class="bwrapper" @click="showdetail">
      <span class="noticeImg"></span>
      <span class="notice">{{seller.bulletin}}</span>
      <span class="iconfont more" >&#xe74e;</span>
    </div>
    <div class="back">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <Detail v-show="detailshow" :seller="seller" :classMap="classMap"  @close="closeDetail"></Detail>
  </div>
</template>

<script>
import Detail from "./Detail.vue"
export default {
  name: "Header",
  props: {
    seller: Object
  },
  data() {
    return {
      detailshow: false
    }
  },
  methods: {
    showdetail() {
      this.detailshow = true
    },
    closeDetail() {
      this.detailshow = false
    }
  },
  components: {
    Detail
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
    position: relative
    color: white
    background-color: rgba(7,17,27,0.5)
    overflow: hidden
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
      position: relative
      height: .56rem
      line-height: .56rem
      padding: 0 .24rem
      background-color: rgba(7,17,27,0.2)
      ellipsis()
      .noticeImg
        display: inline-block
        vertical-align: top
        margin-top: .14rem
        width: .42rem
        height: .26rem
        bg-image("img/bulletin")
        background-size: .42rem .26rem
        background-repeat: no-repeat
      .notice
        vertical-align: top
        line-height: .56rem
        margin: 0 .08rem
        font-size: .2rem
        color: rgb(255,255,255)
        font-weight: 200
      .more
        position: absolute
        font-size: .12rem
        right: .1rem
        top: 0
    .back
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(.1rem)

</style>
