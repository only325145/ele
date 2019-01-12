<template>
  <div class="shopcar">
    <div class="content">
      <div class="contentLeft">
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
    </div>
  </div>
</template>

<script>
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.shopcar
  position: fixed
  left: 0
  bottom: 0
  left: 0
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
</style>
