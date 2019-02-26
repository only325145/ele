<template>
  <div class="ratingselect">
    <div class="type">
        <span class="block positive">全部<span class="count">57</span></span>
        <span class="block positive">推荐<span class="count">47</span></span>
        <span class="block negative">吐槽<span class="count">10</span></span>
    </div>
    <div class="content">
        <span class="iconfont"></span>
        <span class="font">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
export default {
    name: "ratingselect"
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
          background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
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