<template>
  <div class="carcontrol">
    <transition name="fade">
      <div class="decrease iconfont" @click="decrease" v-show="food.count">&#xe68f;</div>
    </transition>
    <div class="count" v-show="food.count">{{food.count}}</div>
    <div class="add iconfont" @click="add">&#xe636;</div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "carcontrol",
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    add() {
      if(!this.food.count){
        Vue.set(this.food,'count',1);
      }
      else{
        this.food.count ++;
      }
    },
    decrease() {
      if(this.food.count > 0){
        this.food.count --;
      }
      else{
        Vue.set(this.food,"count",0);
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
.carcontrol
  font-size: 0
  .decrease
    display: inline-block
    font-size: .36rem
    line-height: .24rem
    padding: .12rem
    color: rgb(0,160,220)
    transition: all 0.3s linear
    &.fade-enter-active,&.fade-leave-active
      transform: translate3d(0,0,0)
    &.fade-enter,&.fade-leave-to
      opacity: 0
      transform: translate3d(.48rem,0,0)
  .add
    display: inline-block
    font-size: .36rem
    line-height: .24rem
    padding: .12rem
    color: rgb(0,160,220)
  .count
    display: inline-block
    font-size: .24rem
    color: rgb(147,152,159)
    line-height: .48rem
    vertical-align: bottom
</style>
