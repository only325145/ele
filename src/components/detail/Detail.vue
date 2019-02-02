<template>
  <div class="detail" v-show="showFlag">
    <div class="foodContent">
      <div class="img">
        <img class="pic" :src="food.icon" />
      </div>
      <div class="back" @click="goback">
        <span class="iconfont">&#xe749;</span>
      </div>
      <div class="content">
        <h1 class="foodName">{{food.name}}</h1>
        <div class="extra">
          <span class="count">月售{{food.sellCount}}</span>
          <span>好评率{{food.rating}}%</span>  
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: {
    food: Object
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    goback() {
      this.showFlag = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.detail
  position: fixed
  z-index: 30
  top: 0
  bottom: 1.04rem
  width: 100%
  background-color: white
  .foodContent
    .img
      position: relative  //防止图片后加载形成抖动，先固定图片容器的大小
      width: 100%
      height: 0
      padding-bottom: 100%
      .pic
        position: absolute   //将图片大小固定，和容器大小一样
        top: 0
        bottom: 0
        width: 100%
    .back
      position: absolute
      top: .2rem
      left: .2rem
      width: .7rem
      height: .7rem
      padding: .1rem
      border-radius: 100%
      background-color: rgba(0,0,0,0.3)
      text-align: center
      .iconfont
        font-size: .5rem
        color: #fff
        line-height: .7rem
    .content
      padding: .36rem
      .foodName
        font-size: .28rem
        font-weight: 700
        color: rgb(7,17,27)
        line-height: .28rem
        margin-bottom: .16rem
      .extra 
        position: relative
        line-height: .24rem
        font-size: .24rem
        color: rgb(147,153,159)
        .count
          margin-right: .24rem
        .price
          margin-top: .36rem
          .now
            font-size: .28rem
            color: rgb(240,20,20)
            font-weight: 700
            line-height: .48rem
            margin-right: .16rem
          .old
            text-decoration: line-through
            font-weight: 700
</style>
