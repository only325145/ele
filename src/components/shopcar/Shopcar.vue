<template>
  <div class="shopcar">
    <div class="content">
      <div class="contentLeft">
        <div class="logoBox">
          <div class="logo">
            <span class="iconfont">&#xe6b8;</span>
          </div>
          <div class="price"></div>
          <div class="des"></div>
        </div>
      </div>
      <div class="contentRight"></div>
    </div>
  </div>
</template>

<script>
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
          width: 100%
          height: 100%
          border-radius: 50%
          background-color: #2b343c
          text-align: center
          .iconfont
            color: #80858a 
            font-size: .58rem
            line-height: .88rem
      .price
        display: inline-block
      .des
        display: inline-block
    .contentRight
      flex: 0 0 2.1rem
      width: 2.1rem
</style>
