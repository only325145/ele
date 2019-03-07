<template>
  <div>
    <div class="star" :class="starType">
      <span v-for="(value,key) in itemClass" :key="key" :class="value" class="star-item"></span>
    </div>
  </div>
</template>
<script>
  const LENGTH = 5;
  const CLS_ON = "on";
  const CLS_HALF = "half";
  const CLS_OFF = "off";
export default {
    props: {
      size: {   //星星的大小
        type: Number   
      },
      score: {   //分数
        type: Number
      }
    },
    computed: {
      starType() {
        return "star-" + this.size
      },
      itemClass() {
        let result = [];
        let score = Math.floor(this.score*2)/2;
        let decimal = score % 1;
        let length = Math.floor(score);
        for(let i= 0; i < length; i++){
          result.push(CLS_ON);
        }
        if(decimal){
          result.push(CLS_HALF);
        }
        while(result.length < 5){
          result.push(CLS_OFF);
        }
        return result;
      }
    }
}
</script>
<style lang="stylus" scoped>
@import "../../assets/styles/mixins.styl"
  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: .4rem
        height: .4rem
        margin-right: .44rem
        background-size: .4rem .4rem
        &:last-child
          margin-right: 0
        &.on
          bg-image("imgs/star48_on")
        &.half
          bg-image("imgs/star48_half")
        &.off
          bg-image("imgs/star48_off")
    &.star-36
      .star-item
        width: .3rem
        height: .3rem
        margin-right: .12rem
        background-size: .3rem .3rem
        &:last-child
          margin-right: 0
        &.on
          bg-image("imgs/star36_on")
        &.half
          bg-image("imgs/star36_half")
        &.off
          bg-image("imgs/star36_off")
    &.star-24
      .star-item
        width: .2rem
        height: .2rem
        margin-right: .03rem
        background-size: .2rem .2rem
        &:last-child
          margin-right: 0
        &.on
          bg-image("imgs/star24_on")
        &.half
          bg-image("imgs/star24_half")
        &.off
          bg-image("imgs/star24_off")
</style>