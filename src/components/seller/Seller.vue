<template>
<div class="seller">
  <div class="sellerContent">
    <div class="sell-infor">
      <h1 class="title">{{seller.name}}</h1>
      <div class="desc">
        <Star :size="36" :score="seller.score" class="star"></Star>
        <span class="text">({{seller.ratingCount}})</span>
        <span class="text">月售{{seller.sellCount}}单</span>
      </div>
      <ul class="delivery">
        <li class="block">
          <h2>起送价</h2>
          <div class="content">
            <span class="num">{{seller.minPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h2>商家配送</h2>
          <div class="content">
            <span class="num">{{seller.deliveryPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h2>平均配送时间</h2>
          <div class="content">
            <span class="num">{{seller.deliveryTime}}</span>分钟
          </div>
        </li>
      </ul>
      <div class="favorite" @click="changefavorite">
        <span class="iconfont" :class="{'active':favorite}">&#xe602;</span>
        <span class="icon-text">{{ifcollect}}</span>
      </div>
    </div>
    <Split></Split>
    <div class="notice">
      <h1>公告与活动</h1>
      <div class="section">{{seller.bulletin}}</div>
    </div>
    <ul class="activity">
      <li class="a-list" v-for="(value,key) in seller.supports" :key="key" v-show="seller.supports">
        <span class="icon" :class="classMap[value.type]"></span>
        <span class="describ">{{value.description}}</span>
      </li>
    </ul>
    <Split></Split>
    <div class="seller-img">
      <h1>商家实景</h1>
      <div class="imgwapper">
        <ul class="img-box" ref="imgbox">
          <li v-for="(value,key) in seller.pics" :key="key" class="img-list">
            <img :src="value" class="seller-pic"/>
          </li>
        </ul>
      </div>
    </div>
    <Split></Split>
    <div class="seller-infor">
      <h1 class="infor-title">商家信息</h1>
      <ul>
        <li class="infor-item" v-for="(infor,key) in seller.infos" :key="key">{{infor}}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import BScroll from "better-scroll";
import Star from "../star/Star.vue";
import Axios from "axios";
import Split from "../split/Split.vue";
export default {
  name: "seller",
  data() {
    return {
      seller: [],
      favorite: false
    }
  },
  components: {
    Star,
    Split
  },
  computed: {
    ifcollect() {
      if(this.favorite===true){
        return "已收藏";
      }else{
        return "收藏"
      }
    }
  },
  methods: {
    getSelllerInfor() {
      Axios.get("/data.json").then(this.getSellerInfoSucc);
    },
    getSellerInfoSucc(res) {
      res = res.data;
      if(res.ret && res.data){
        this.seller = res.data.seller;
      }
    },
    changefavorite() {
      this.favorite = !this.favorite;
    },
    _initImg(){ 
      if(this.seller.pics){
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.imgbox.style.width = width + 'px'; 
        this.$nextTick(()=>{
          if (!this.picScroll) {
            this.imgScroll = new BScroll(".imgwapper", {
              scrollX: true,
              eventPassthrough: "vertical"
            });
          }
          else{
            this.imgScroll.refresh();
          }
        }); 
      }
    },
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    // class名称和每个特定图标编号相对应
  },
  mounted() {
    this.getSelllerInfor();
    let wrapper = document.querySelector(".seller");
    this.sellerScroll = new BScroll(wrapper, {click: true});
  },
  updated() {
    this._initImg();   //写在mounted里不能获取到数据，通过在ajax执行函数和mounted里打印this.seller查看得知，因为ajax为异步执行，mounted时还并没有将获取的元素赋值给this.seller
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/styles/mixins.styl"
.seller
  position: fixed
  top: 3.54rem
  bottom: 0
  left: 0
  right: 0
  overflow: hidden 
  .sellerContent
    .sell-infor
      position: relative
      padding: .36rem
      .title
        font-size: .28rem
        color: rgb(7,17,27)
        line-height: .28rem
      .desc
        display: flex
        padding: .16rem 0 .36rem 0 
        border-bottom: 1px solid rgba(7,17,27,0.1)
        font-size: 0
        .star
          display: inline-block
          vertical-align: top
          margin-right: .16rem
        .text
          display: inline-block
          margin-right: .24rem
          vertical-align: top
          font-size: .24rem
          color: rgb(77,85,93)
          line-height: .36rem
      .delivery
        display: flex
        padding: .36rem 0 0 0
        .block
          flex: 1
          text-align: center    //居中
          font-size: .24rem
          color: rgb(147,153,159)
          line-height: .24rem
          border-right: 1px solid rgba(7,17,29,0.1)
          &:last-child
            border: none
          .content
            margin-top: .08rem
            font-size: .24rem
            line-height: .48rem
            color: rgb(7,17,27)
            .num
              font-size: .48rem
      .favorite
        position: absolute
        right: .36rem
        top: .36rem
        width: 1rem
        text-align: center
        .iconfont
          display: block
          margin-bottom: .08rem
          font-size: .48rem
          color: #d4d6d9
          line-height: .48rem
          &.active
            color: rgb(240,20,20)
        .icon-text
          line-height: 10px
          font-size: 10px
          color: rgb(77, 85, 93)
    .notice
      padding: .36rem .36rem 0 .36rem
      .section
        margin: .16rem .24rem .32rem .24rem
        line-height: .48rem
        color: rgb(240,20,20)
        font-weight: 200
    .activity
      padding: 0 .36rem
      .a-list
        padding: .32rem .24rem
        border-top: 1px solid rgba(7,17,27,0.1)
        .icon
          display: inline-block
          margin-right: .12rem
          width: .32rem
          height: .32rem
          vertical-align: top
          background-size: .32rem .32rem 
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
        .describ
          font-size: .24rem
          font-weight: 200
          color: rgb(7,17,27)
          line-height: .32rem
    .seller-img
      padding: .36rem
      width: 100%
      .imgwapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        margin-top: .24rem
        .img-box
          font-size: 0
          .img-list
            display: inline-block
            margin-right: .12rem
            &:last-child
                margin-right: 0
            .seller-pic
              width: 2.4rem
              height: 1.8rem
    .seller-infor
      padding: .36rem .36rem 0 .36rem
      .infor-title
        margin-bottom: .24rem
      ul
        .infor-item
          padding: .32rem .24rem
          border-top: 1px solid rgba(7,17,27,0.1)
          font-size: .24rem
          line-height: .32rem
          color: rgb(7,17,27)
</style>