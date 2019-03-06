<template>
  <div class="comment">
    <div class="rate">
      <div class="grade">
        <div class="left">
          <div class="point">{{seller.score}}</div>
          <div>综合评分</div>
          <div class="compare">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="right">
          <div class="star">
            <span class="title">商品评价</span>
            <Star :size="36" :score="seller.foodScore" class="c-star"></Star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="star">
            <span class="title">服务态度</span> 
            <Star :size="36" :score="seller.serviceScore" class="c-star"></Star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="time">
            <span>送达时间</span>
            <span class="timer">{{seller.deliveryTime}}</span>
          </div>
        </div>
      </div>
      <Split></Split>
      <Ratingselect :ratings="ratings" @selectType="typeChange" @content="ifContent"></Ratingselect>
      <div class="content">
        <ul>
          <li  class="list" v-for="(rate, key) in ratings" :key="key" v-show="selectContent(rate.rateType,rate.text)">
            <img :src="rate.avatar" class="pic"/>
            <div class="infor">
              <div class="user">{{rate.username}}</div>
              <div class="showStar">
                <Star :size="24" :score="rate.score" class="star"></Star>
                <span v-show="rate.deliveryTime" class="time">{{rate.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rate.text}}</p>
              <div class="recommend">
                <span class="iconfont" :class="{'icon-dianzan':rate.rateType === 0,'icon-ai46':rate.rateType === 1}"></span>
                <span class="lable" v-for="(lable, key) in rate.recommend" :key="key">{{lable}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import Star from "../star/Star.vue";
import Split from "../split/Split.vue";
import Shopcar from "../shopcar/Shopcar.vue";
import Ratingselect from "../ratingselect/Ratingselect.vue";
import BScroll from "better-scroll";
export default {
  name: "comments",
  data() {
    return {
      seller: Object,
      ratings: [],
      type: 2,
      onlyContent: false,
    };
  },
  methods: {
    getGoodsInfo() {
      Axios.get("/data.json").then(this.getGoodsInfoSucc);
    },
    getGoodsInfoSucc(res) {
      res = res.data;
      if (res.ret && res.data) {
        this.seller = res.data.seller;
        this.ratings = res.data.ratings;
      }
    },
    typeChange(type) {
      this.type = type;
    },
    ifContent(value) {
      this.onlyContent = value;
    },
    selectContent(type,text){   //选择显示的内容，和Detail里用的方法不一样，这种更简洁。
      if(this.onlyContent && !text){   //控制是否只显示有内容的评论，如果选择了onlyContent,评论有内容，不执行该语句，将执行下面的函数（由type确定是否显示）
        return false;
      }
      if(this.type === 2){
        return true;
      }else{
        if(type === this.type){
          return true;
        }else{
          return false;
        }
      }
    }
  },
  components: {
    Star,
    Shopcar,
    Split,
    Ratingselect
  },
  mounted() {
    this.getGoodsInfo();
    let wrapper = document.querySelector(".comment");
    this.commentScroll = new BScroll(wrapper, { click: true });
  },
};
</script>

<style lang="stylus" scoped>
.comment
  position: absolute
  top: 3.54rem
  bottom: 0
  left: 0
  right: 0
  overflow: hidden
  .grade
    padding: .36rem 0
    display: flex
    .left
      flex: 0 0 2.75rem
      padding: .12rem 0
      width: 2.75rem
      border-right: 1px solid rgba(7, 17, 27, 0.1)
      text-align: center
      @media only screen and (max-width: 3.2rem)
        flex: 0 0 2.4rem
        width: 2.4rem
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
      padding: .12rem 0 .12rem .48rem
      flex: 1
      @media only screen and (max-width: 3.2rem)
        padding-left: .12rem
      .star
        margin-bottom: .16rem
        font-size: 0
        .title
          display: inline-block
          line-height: .36rem
          vertical-align: top
          font-size: .24rem
          color: rgb(7, 17, 27)
        .c-star
          display: inline-block
          margin: 0 12px
          vertical-align: bottom 
        .score
          display: inline-block
          line-height: .36rem
          vertical-align: top
          font-size: .24rem
          color: rgb(255, 153, 0)
      .time
        font-size: .24rem
        .timer
          margin-left: .24rem
          color: rgb(147,153,159)
          line-height: .36rem
  .content
    padding: 0 .36rem
    .list
      display: flex
      padding: .36rem 0
      border-bottom: 1px solid rgba(7,17,27,0.1)
      .pic
        width: .56rem
        height: .56rem
        margin-right: .24rem
      .infor
        flex: 1
        .user
          margin-bottom: .08rem
        .showStar
          margin-bottom: .12rem
          .star
            display: inline-block
            margin-right: .12rem
            vertical-align: middle
          .time
            line-height: .24rem
            font-size: .24rem
            font-weight: 200
            color: rgb(147,153,159)
        .text
          font-size: .24rem
          line-height: .36rem
          color: rgb(7,17,27)
          margin-bottom: .16rem
        .recommend
          line-height: 16px
          font-size: 0
          .iconfont
            &.icon-dianzan    //iconfont 通过class名进行使用 
              color: rgb(0,160,220)
            &.icon-ai46
              color: rgb(147,153,159)
          .lable
            display: inline-block
            margin: .08rem 0 0 .16rem
            padding: 0 .12rem
            border: 1px solid rgba(7,17,27,0.1)
            border-radius: .04rem
            font-size: .18rem
            line-height: .36rem
            color: rgb(147,153,159)
</style>
