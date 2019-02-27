<template>
  <div class="ratingselect">
    <div class="type">
        <span class="block positive" @click="select(2)" :class="{'active':type===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
        <span class="block positive" @click="select(0)" :class="{'active':type===0}">{{desc.positive}}<span class="count">{{positives}}</span></span>
        <span class="block negative" @click="select(1)" :class="{'active':type===1}">{{desc.negative}}<span class="count">{{negatives}}</span></span>
    </div>
    <div class="content" @click="cont" :class="{'on': onlyContent===true}">
        <span class="iconfont">&#xe619;</span>
        <span class="font">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ratingselect",
  props: {
    desc: {
      type: Object,
      default() {
        //props传递数据设置默认值的格式
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意" //设置default值，如果父组件没有传递相关数据将显示default值
        };
      }
    },
    ratings: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      type: 2,
      onlyContent: true
    };
  },
  computed: {
    positives() {
      //父组件传递过来的数据只有全部的评论数量可以直接使用，积极和消极一面的评论数量要自行计算出
      let count = 0;
      this.ratings.forEach(rating => {
        if (rating.rateType === 0) {
          count = count + 1;
        }
      });
      return count;
    },
    negatives() {
      let count = 0;
      this.ratings.forEach(rating => {
        if (rating.rateType === 1) {
          count = count + 1;
        }
      });
      return count;
    }
  },
  methods: {
    select(typeN) {
      this.type = typeN;
      this.$emit("selectType", this.type); //将当前选择查看的评论类型提交给父组件
    },
    cont() {
      this.onlyContent = !this.onlyContent;
      this.$emit("content", this.onlyContent); //告诉父组件当前是否只选择查看有文字的评价
    }
  }
};
</script>

<style lang="stylus" scoped>
  .ratingselect
    .type
      padding: .36rem 0
      border-bottom: 1px solid rgba(7,17,27,0.1) 
      .block
        display: inline-block
        padding: .16rem .24rem
        font-size: .28rem
        line-height: .32rem
        margin-right: .16rem
        color: rgb(77, 85, 93)
        &.positive
          background-color: rgba(0, 160, 220, 0.2)
          &.active
            color: rgb(255,255,255)
            background-color: rgb(0, 160, 220)
        &.negative
          background-color: rgba(77, 85, 93, 0.2)
          &.active
            color: rgb(255,255,255)
            background-color: rgb(77, 85, 93)
        .count
          margin-left: .04rem
          font-size: .24rem
    .content
      padding: .24rem 0
      &.on
        .iconfont
          color: #00c850
      .iconfont
        margin-right: .08rem
      .font
        font-size: .24rem
        color: rgb(147,153,159) 
        line-height: .48rem
</style>
