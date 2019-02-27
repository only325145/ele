<template>
  <div class="ratingselect">
    <div class="type">
        <span class="block positive" @click="select(2)" :class="{'active':type===2}">{{desc.all}}<span class="count">{{rating.length}}</span></span>
        <span class="block positive" @click="select(0)" :class="{'active':type===0}">{{desc.positive}}<span class="count">47</span></span>
        <span class="block negative" @click="select(1)" :class="{'active':type===1}">{{desc.negative}}<span class="count">10</span></span>
    </div>
    <div class="content">
        <span class="iconfont"></span>
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
        default() {    //props传递数据设置默认值的格式
          return {
            all: "全部",
            positive: "满意",  
            negative: "不满意"   //设置default值，如果父组件没有传递相关数据将显示default值
          }
        }
      },
      rating: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return{
        type: 2
      }
    },
    computed: {
      positives() {
        
      },
    },
    methods: {
      select(typeN) {
        this.type = typeN
      }
    }
}
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
      .iconfont
        margin-right: .08rem
      .font
        font-size: .24rem
        color: rgb(147,153,159) 
        line-height: .48rem
</style>