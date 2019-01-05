<template>
  <div class="goods">
    <div class="menu">
      <ul>
        <li class="menuItem" v-for="(value,key) in goods" :key="key">
          <span class="text">
            <span v-show="value.type>-1" class="icon" :class="classMap[value.type]"></span>{{value.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods">
      <ul>
        <li v-for="(value,key) in goods" :key="key">
          <h1 class="title">{{value.name}}</h1>
          <ul class="allFood">
            <li v-for="(food,key) in value.foods" :key="key" class="foodItem">
              <div class="icon">
                <img :src="food.icon" />
              </div>
              <div class="content">
                <h2 class="foodName">{{food.name}}</h2>
                <div class="description" v-show="food.description">{{food.description}}</div>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>  
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                  </div>
                </div>     
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
  export default {
    name: "goods",
    data() {
      return {
        goods: []
      }
    },
    methods: {
    getGoodsInfo() {
      Axios.get("/data.json").then(this.getGoodsInfoSucc);
    },
    getGoodsInfoSucc(res) {
      res = res.data;
      if (res.ret && res.data) {
        this.goods = res.data.goods;
      }
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    // class名称和每个特定图标编号相对应
  },
    mounted() {
    this.getGoodsInfo();
    }
  }
</script>

<style lang="stylus" scoped>
@import "../../assets/styles/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 3.54rem
    bottom: 1.16rem
    width: 100%
    overflow: hidden
    .menu
      flex: 0 0 1.6rem
      width: 1.6rem
      background-color: #f3f5f7
      .menuItem
        display: table   //设置为table使得span里的文字可以垂直居中
        height: 1.08rem
        padding: 0 .24rem
        line-height: .28rem
        .icon
          display: inline-block
          vertical-align: top
          width: .24rem
          height: .24rem
          margin-right: .08rem
          background-size: .24rem .24rem
          background-repeat: no-repeat
          &.decrease
            bg-image("imgs/decrease_3")
          &.discount
            bg-image("imgs/discount_3")
          &.guarantee
            bg-image("imgs/guarantee_3")
          &.invoice
            bg-image("imgs/invoice_3")
          &.special
            bg-image("imgs/special_3")
        .text
          display: table-cell
          width: 1.12rem
          font-size: .24rem
          text-align: center
          vertical-align: middle    //table属性搭配此设置可以达到垂直居中的效果
          border-bottom: 1px solid rgba(7,17,27,0.1)
    .foods
      flex: 1
      .title
        padding-left: .28rem 
        height: .52rem
        line-height: .52rem
        border-left: .04rem solid #d9dde1
        font-size: .24rem
        color: rgb(147,153,159)
        background-color: #f3f5f7
      .allFood
        .foodItem
          display: flex
          margin: .36rem 
          padding-bottom: .36rem
          border-bottom: 1px solid rgba(7,17,27,0.1)
          &:last-child
            border-bottom: none
            margin-bottom: none
          .icon
            flex: 0 0 1.14rem
            margin-right: .2rem
            img 
              width: 1.14rem
              height: 1.14rem
          .content
            flex: 1
            .foodName
              margin: .04rem 0 .16rem 0
              height: .28rem
              font-weight: 700
              line-height: .28rem
              font-size: .28rem
              color: rgb(7,17,27)
            .description,.extra
              line-height: .2rem
              font-size: .2rem
              color: rgb(147,153,159)
            .description
              margin-bottom: .16rem
            .extra 
              .count
                margin-right: .24rem
              .price
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