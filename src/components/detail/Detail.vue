<template>
  <div class="detail" v-show="showFlag">
    <div class="detailPart" >
      <div class="foodContent">
        <div class="img">
          <img class="pic" :src="food.icon" />
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
        <Split></Split>
        <div class="infor">
          <h1>商品介绍</h1>
          <div class="information">{{info}}</div>
        </div>
        <Split></Split>
        <div class="rating">
          <h1>商品评价</h1>
        </div>
        <Ratingselect :desc="desc" :ratings="food.ratings" @selectType="typeChange" @content="ifContent"></Ratingselect> 
        <div class="ratingList">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-for="(rating,key) in getrate" :key="key" v-show="ifShow(rating.text)" class="list">
              <div class="time">20190228</div>
              <div class="user">
                <span>{{rating.username}}</span>
                <img class="avatar" :src="rating.avatar"/>
              </div>
              <div class="rateContent">
                <span class="iconfont" :class="{'icon-dianzan':rating.rateType===0,'icon-ai46':rating.rateType===1}"></span>{{rating.text}}
              </div>
            </li>
          </ul>
          <div v-show="!food.rating || !food.ratings.length">暂无评论</div>  <!-- 如果没有评价就显示该区域 -->
        </div>  
      </div>  
    </div>
    <div class="back" @click="goback">
      <span class="iconfont">&#xe749;</span>
    </div>
  </div>
</template>

<script>
import Carcontrol from "../carcontrol/Carcontrol.vue";
import Split from "../split/Split.vue";
import Ratingselect from "../ratingselect/Ratingselect.vue";
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
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      },
      type: 2,
      onlyContent: false,
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
    typeChange(type) {
      this.type = type;
    },
    ifContent(value) {
      this.onlyContent = value;
    },
    ifShow(text) {
      if(this.onlyContent && !text){
        return false;
      }
      else{
        return true;  //没有选择“只看有内容的评价” ，全部评论都显示
      }
    }
  },
  computed: {
    info() {
      if (this.food.info) {
        return this.food.info;
      } else {
        return "无";
      }
    },
    getrate() { //采用计算属性实现list显示内容的改变，因为只需要type属性进行改变就可以动态改变getrate内容。可以实现在一开始只获取props数据中一部分内容的情况。
      if(this.type === 2){    
        return this.food.ratings;
      }
      else{
        let ratings = [];
        this.food.ratings.forEach(rate => {
          if(rate.rateType === this.type){
            ratings.push(rate);
          }
        });
        return ratings;
      }
    }
  },
  components: {
    Carcontrol,
    Split,
    Ratingselect
  },
  mounted() {
    let wrapper = document.querySelector(".detailPart");
    this.detailScroll = new BScroll(wrapper, { click: true }); //此处将wrapper直接写成".detailPart"不能实现滚动，为什么？必须写成这种两行的格式
  },
};
</script>

<style lang="stylus" scoped>
.detail
  width: 100%
  position: fixed
  z-index: 30
  top: 0
  bottom: 1.04rem
  background-color: white
  .detailPart
    width: 100%
    height: 100%
    overflow: hidden
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
      .rating
        margin: .36rem 0 0 .36rem
      .ratingList
        margin: 0 .36rem
        .list
          position: relative
          margin-top: .32rem     //因为定位会以padding为起点，为了后面的user部分和time一样高，list上面的距离用margin
          padding-bottom: .32rem
          border-bottom: 1px solid rgba(7,17,27,0.1) 
          .time 
            font-size: .24rem
            color: rgb(147,153,159)
            line-height: .28rem
          .user
            position: absolute
            right: 0
            top: 0
            .avatar
              width: .24rem
              height: .24rem
              margin-left: .12rem
          .rateContent
            margin-top: .12rem
            font-size: .24rem
            color: rgb(7,17,27)
            line-height: .32rem
            .iconfont
              font-size: .24rem
              margin-right: .08rem
              line-height: .48rem
              &.icon-dianzan    //iconfont 通过class名进行使用 
                color: rgb(0,160,220)
              &.icon-ai46
                color: rgb(147,153,159)
  .back
    position: fixed 
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
</style>
