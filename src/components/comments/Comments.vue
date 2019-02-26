<template>
  <div class="comment">
    <div class="grade">
      <div class="left">
        <div class="point">3.9</div>
        <div>综合评分</div>
        <div class="compare">高于周边商家69.2%</div>
      </div>
      <div class="right">
        <div class="star">
          <span>商品评价</span>
          <div class="starComp">
            <Star :size="36" :score="4"></Star>
          </div>
        </div>
        <div class="star">
          <span>服务态度</span> 
          <div class="starComp">
            <Star :size="36" :score="4"></Star>
          </div> 
        </div>
        <div class="time">
          <span>送达时间</span>
          <span class="timer">44分钟</span>
        </div>
      </div>
    </div>
    <Split></Split>
    
  </div>
</template>

<script>
import Axios from "axios";
import Star from "../star/Star.vue";
import Split from "../split/Split.vue";
import Shopcar from "../shopcar/Shopcar.vue";
export default {
  name: "comments",
  data() {
    return {
      goods: [],
      seller: Object
    };
  },
  computed: {
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  components: {
    Star,
    Shopcar,
    Split
  },
  
};
</script>

<style lang="stylus" scoped>
.comment
  position: absolute
  top: 3.54rem
  bottom: 1.16rem
  left: 0
  right: 0
  overflow: hidden
  .grade
    padding: .36rem 0
    width: 100%
    .left
      display: inline-block
      box-sizing: border-box
      width: 40%
      text-align: center
      border-right: 1px solid rgba(147,153,159,0.2)
      .point
        font-size: .48rem
        color: rgb(255,153,0)
        line-height: .56rem
        margin-bottom: .12rem
      .compare
        font-size: .24rem
        color: rgb(147,153,159)
        line-height: .24rem
        margin-top: .16rem
    .right
      display: inline-block
      box-sizing: border-box
      width: 60%
      padding: 0 .48rem
      .star
        font-size: .24rem
        color: rgb(7,17,27)
        line-height: .36rem
        margin: 0 .24rem .16rem 0
        .starComp
          display: inline-block
          margin-left: .24rem
          width: 2rem
      .time
        font-size: .24rem
        .timer
          margin-left: .24rem
          color: rgb(147,153,159)
          line-height: .36rem
</style>
