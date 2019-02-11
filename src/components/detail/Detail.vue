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
        <div class="button" v-show="!food.count" @click="add">加入购物车</div>
        <carcontrol class="select" v-show="food.count" :food="food"></carcontrol><!--将选中商品信息传给carcontrol组件-->
      </div>
      <div class="divide"></div>
      <div class="infor">
        <h1>商品介绍</h1>
        <div class="information">{{info}}</div>
      </div>
      <div class="divide"></div>      
    </div>  
  </div>
</template>

<script>
import Carcontrol from "../carcontrol/Carcontrol.vue";
import Vue from "vue";
import BScroll from "better-scroll";
export default {
  name: "Detail",
  props: {
    food: Object
  },
  data() {
    return {
      showFlag: false,
    };
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    goback() {
      this.showFlag = false;
    },
    add() {
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      }
    },
  },
  computed: {
    info() {
      if(this.food.info){
        return this.food.info;
      }
      else{
        return "无";
      }
    }
  },
  components: {
    Carcontrol
  },
  mounted() {
    this.detailScroll = new BScroll(".detail", { click: true });
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
      position: relative
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
      .button
        position: absolute
        right: .36rem
        bottom: .36rem
        width: 1.24rem
        height: .36rem
        padding: .12rem .24rem
        border-radius: .3rem
        text-align: center
        line-height: .36rem
        font-size: .12rem
        color: rgb(255,255,255)
        background-color: rgb(0,160,220)
      .select
        position: absolute
        right: .36rem
        bottom: .36rem
    .divide
      width: 100%
      height: .32rem
      background-color: #f3f5f7
      border-top: 1px solid rgba(7,17,27,0.1)
      border-bottom: 1px solid rgba(7,17,27,0.1)
    .infor
      padding: .36rem
      .information
        padding: .12rem .16rem 0 .16rem
        color: rgb(77,85,93)
        font-weight: 200
        line-height: .48rem
</style>
