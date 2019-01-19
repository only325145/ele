<template>
  <div class="shopcar">
    <div class="content">
      <div class="contentLeft"  @click="toggleList">
        <div class="logoBox">
          <div class="logo" :class="{highlight: totalCount > 0}">
            <span class="iconfont caricon" :class="{highlight: totalCount > 0}">&#xe6b8;</span>
          </div>
          <div class="count" v-show="totalCount">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highlight: totalCount > 0}">￥{{totalPrice}}</div>
        <div class="des">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="contentRight">
        <div class="pay" :class="pay">{{des}}</div>
      </div>
      <div class="shopcarList" v-show="listShow">
        <div class="listHeader">
          <span class="title">购物车</span>
          <span class="clear">清空</span>
        </div>
        <div class="listContent">
          <ul class="listBox">
            <li class="listItem" v-for="(value,key) in selectFoods" :key="key">
              <span class="name">{{value.name}}</span>
              <div class="price">￥{{value.price*value.count}}</div>
              <div class="carControl">
                <Carcontrol></Carcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carcontrol from "../carcontrol/Carcontrol.vue"
export default {
  name: "shopcar",
  props: {
    minPrice: Number,
    deliveryPrice: Number,
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    }
  }, 
  data() {
    return{
      display: false
    }
  },
  methods: {
    toggleList() {
      if(this.totalCount){
        this.display = !this.display;   //购物车是能够显示出来，但到底是显示还是隐藏是通过点击确认的，通过改变display的值。如果是隐藏的，点击后将显示出来，如果是显示的，点击后将隐藏
      }
      else{
        return;   //没有商品被选择的话，购物车详情页的控制显示属性将保持初始值false
      } 
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    des() {
      if(this.totalPrice === 0){
        return `￥${this.minPrice}元起送`;
      }else if(this.totalPrice < this.minPrice){ 
        let number = this.minPrice - this.totalPrice;
        return "还差￥" + number + "起送";
      }else{
        return "去结算";
      }
    },
    pay() {
      if(this.totalPrice>=this.minPrice){
        return "enough";
      }
    },
    listShow() {
      if(this.totalCount) {
        return this.display;   //有商品被选择的情况下购物车才会有展示的可能
      }
      else{
        return false;
      }
    }
  },
  components: {
    Carcontrol
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/styles/mixins.styl"
.shopcar
  position: fixed
  left: 0       //使得定位元素的宽度和父级一样
  bottom: 0
  right: 0
  z-index: 50
  height: 1.04rem
  width: 100%
  .content
    display: flex
    background-color: #141d27
    font-size: 0
    .contentLeft
      height: 1.04rem
      flex: 1
      .logoBox
        display: inline-block
        position: relative
        top: -.2rem
        margin: 0 .24rem
        padding: .12rem
        width: 1.12rem
        height: 1.12rem
        box-sizing: border-box
        vertical-align: bottom
        border-radius: 50%
        background-color: #141d27
        .logo
          position: relative
          width: 100%
          height: 100%
          border-radius: 50%
          background-color: #2b343c
          text-align: center
          &.highlight 
            background-color: rgb(0,160,220)
          .caricon
            color: rgba(255,255,255,0.4)
            font-size: .58rem
            line-height: .88rem
            &.highlight
              color: #fff
        .count
          position: absolute
          top: 0
          right: 0
          width: .48rem
          height: .32rem
          text-align: center
          border-radius: 40%
          background-color: red
          box-shadow: 0 4px 8px 0px rgba(0,0,0,0.4) 
          line-height: .32rem 
          font-size: .24rem
          color: #fff
      .price
        display: inline-block
        box-sizing: border-box
        vertical-align: top
        padding: 0 .24rem 0 0
        margin-top: .24rem 
        line-height: .48rem
        font-size: .32rem
        font-weight: 700
        color: rgba(255,255,255,0.4)
        border-right: 1px solid rgba(255,255,255,0.1)
        &.highlight
          color: #fff
      .des
        display: inline-block
        vertical-align: top
        margin: .24rem .24rem 0 .24rem
        line-height: .48rem
        font-size: .24rem
        color: rgba(255,255,255,0.4)
    .contentRight
      flex: 0 0 2.1rem
      width: 2.1rem
      .pay
        box-sizing: border-box
        padding: .24rem .16rem 0 .16rem
        color: rgba(255,255,255,0.4)
        font-size: .24rem
        line-height: .48rem
        height: 1.04rem
        font-weight: 700
        text-align: center
        background-color: rgba(255,255,255,0.1)
        &.enough
          background-color: rgb(0,160,220)
          color: rgb(255,255,255)
    .shopcarList
      position: absolute
      z-index: -1
      left: 0
      bottom: 1.04rem
      right: 0
      .listHeader
        position: relative
        height: .8rem
        padding: 0 .36rem
        background-color: #f3f5f7
        .title
          font-size: .28rem
          color: rgb(7,17,27)
          font-weight: 200
          line-height: .8rem
        .clear
          float: right
          right: 0
          font-size: .24rem
          color: rgb(0,160,220)
          line-height: .8rem
      .listContent
        max-height: 4.27rem
        overflow: scroll   //超出范围产生滚动条
        padding: 0 .36rem
        background-color: white
        .listBox
          .listItem
            position: relative
            padding: .24rem 0
            border-bottom: 1px solid rgba(7,17,27,0.1)
            .name
              line-height: .48rem
              font-size: .28rem
              color: rgb(7,17,27)
              font-weight: 500
            .price
              position: absolute
              right: 1.8rem
              bottom: .24rem
              line-height: .48rem
              color: rgb(240,20,20)
              font-weight: 700
              font-size: .28rem
            .carControl
              position: absolute
              right: 0
              bottom: .24rem
              font-size: .24rem
              width: 1rem
</style>
