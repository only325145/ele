<template>
  <div class="detail">
    <div class="detailWrapper clearfix">
      <div class="detailMain">
          <h1 class="name">{{seller.name}}</h1>
          <div class="starWrapper">
            <Star :score="seller.score" :size="48"></Star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="supportItem" v-for="(value,key) in seller.supports" :key="key" >
              <span class="icon" :class="classMap[value.type]"></span>
              <span class="supportsText">{{value.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="content">
            <p>{{seller.bulletin}}{{seller.bulletin}}{{seller.bulletin}}{{seller.bulletin}}</p>
          </div>
      </div>
    </div>
    <div class="detailClose iconfont" @click="close">&#xe630;</div>
  </div>
</template>

<script>
import Star from "../star/Star.vue"
export default {
  name: "detail",
  methods: {
    close() {
      this.$emit("close")
    }
  },
  props: {
    seller: Object,
    classMap: Array
  },
  components: {
    Star
  },
}
</script>

<style lang="stylus" scoped>
@import "../../assets/styles/mixins.styl"
.detail
  position: fixed
  top: 0
  left: 0
  z-index: 100
  width: 100%
  height: 100%
  overflow: auto
  background-color: rgba(7,17,27,0.8)
  .detailWrapper
    box-sizing: border-box
    min-height: 100%
    padding: 1.28rem .72rem
    .detailMain
      .name
        font-size: .32rem
        font-weight: 700
        text-align: center
      .starWrapper
        margin-top: .36rem
        text-align: center
        padding: .04rem 0
      .title
        display: flex
        width: 100%
        margin: .56rem 0 .48rem 0 
        .line
          flex: 1
          position: relative
          top: -.12rem
          border-bottom: 1px solid rgba(255,255,255,0.2) 
        .text
          padding: 0 .24rem
          font-size: .28rem
          font-weight: 600
      .supports
        padding-left: .24rem
        .supportItem
          margin-bottom: .24rem
          font-size: 0
          .icon
            display: inline-block
            margin-right: .12rem
            width: .32rem
            height: .32rem
            background-size: .32rem .32rem
            background-repeat: no-repeat
            vertical-align: bottom
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
          .supportsText
            font-size: .24rem
            font-weight: 200
            color: rgb(255,255,255)
            line-height: .32rem
      .content
        padding: 0 .24rem
        font-size: .24rem
        font-weight: 200
        color: rgb(255,255,255)
        line-height: .48rem
        height: 5.5rem
        overflow: auto
  .detailClose
    position: absolute
    bottom: .64rem
    left: 0
    right: 0
    font-size: .50rem
    color: rgba(255,255,255,0.5)
    line-height: .64rem
    text-align: center
</style>