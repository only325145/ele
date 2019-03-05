<template>
  <div class="goods">
    <div class="menu">
      <ul>
        <li class="menuItem" v-for="(value,key) in goods" :key="key" @click="rightMach(key,$event)" :class="{'selected': currentIndex===key}">
          <span class="text">
            <span v-show="value.type>-1" class="icon" :class="classMap[value.type]"></span>{{value.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods">
      <ul ref="foods" >
        <li v-for="(value,key) in goods" :key="key" class="hook">
          <h1 class="title" :ref="value.name">{{value.name}}</h1>
          <ul class="allFood">
            <li v-for="(food,key) in value.foods" :key="key" class="foodItem" @click="detail(food)">
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
                  <div class="numwrapper">
                    <Carcontrol :food="food"></Carcontrol>  
                    <!-- 此处赋值的food是li循环里面的food，即遍历出的所有food -->
                  </div>
                </div>     
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Shopcar :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" @clear="emptycar" @back="showBack"  ref="change"></Shopcar>
    <div class="bg" v-show="showBg" @click="cgShowState"></div>
    <Detail :food="selectedFood" ref="detail"></Detail>
  </div>
</template>

<script>
import Axios from "axios";
import BScroll from "better-scroll";
import Shopcar from "../shopcar/Shopcar.vue";
import Carcontrol from "../carcontrol/Carcontrol.vue";
import Detail from "../detail/Detail.vue";
export default {
  name: "goods",
  data() {
    return {
      goods: [],
      seller: Object,
      touchStatus: false,
      startY: 0,
      listHeight: [],
      scrollPosition: 0,
      showBg: "",
      selectedFood: {}
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let top = this.listHeight[i];
        let bottom = this.listHeight[i + 1];
        if (
          !bottom ||
          (this.scrollPosition >= top && this.scrollPosition < bottom)
        ) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  components: {
    Shopcar,
    Carcontrol,
    Detail
  },
  methods: {
    emptycar() {
      //子集Shopcar点击事件传递上来的自定义事件，对selectFoods数据进行操作。购物车详细列表的存在依赖于count，所以将count全部设置为0。
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    showBack(value) {
      this.showBg = value;
    },
    detail(food) {
      this.selectedFood = food;
      this.$refs.detail.show(); //父组件调用子组件的方法
    },
    cgShowState() {
      this.$refs.change.toggleList();  //在点击灰色背景时调用子组件shopcar的方法改变现实状态，使得详情页面消失
    },
    getGoodsInfo() {
      Axios.get("/data.json").then(this.getGoodsInfoSucc);
    },
    getGoodsInfoSucc(res) {
      res = res.data;
      if (res.ret && res.data) {
        this.goods = res.data.goods;
        this.seller = res.data.seller;
        this.$nextTick(() => {
          this.calculateHeight(); //要对原生DOM进行操作的时候应该将函数写在$nextTick回调函数中，直接写在mounted中也会可能获取不到
          this.initScroll();
        });
      }
    },
    initScroll() {
      this.menuScroll = new BScroll(".menu", { click: true });
      this.foodScroll = new BScroll(".foods", { probeType: 3, click: true });
      this.foodScroll.on("scroll", pos => {
        //better-scroll区域滚动时获取滚动的高度
        this.scrollPosition = Math.abs(Math.round(pos.y));
      });
    },
    rightMach(index, e) {
      //函数调用时e的实参写成$event
      const itemText = e.target.innerText;
      const element = this.$refs[itemText][0]; //this.$refs是一个对象，因为ref绑定的是循环的数据，所以this.$refs对象里面有全部的数据
      //热销榜:"[xxx]",单人精彩套餐:"[xxx]",冰爽饮品限时特惠:"[xxx]"...    this.$refs[itemText][0]获取的是数组里面的DOM元素
      //因为itemText是变量，所以用[]
      this.foodScroll.scrollToElement(element);
      this.scrollPosition = this.listHeight[index]; //因为点击事件发生时获取的右侧scrollPosition为0
      //改变computed属性currentIndex依赖的数据scrollPosition,这样computed属性将重新计算，
      //所以currentIndex将会动态改变
    },
    calculateHeight() {
      var foodList = this.$refs.foods.getElementsByClassName("hook");
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
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
};
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
      overflow: hidden
      .menuItem
        display: table   //设置为table使得span里的文字可以垂直居中
        height: 1.08rem
        padding: 0 .24rem
        line-height: .28rem
        &.selected
          margin-top: -.02rem
          background-color: white
          font-weight: 700
          .text
            border-bottom: none
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
            margin-bottom: 0
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
              line-height: .24rem
              font-size: .24rem
              color: rgb(147,153,159)
            .description
              margin-bottom: .16rem
            .extra 
              position: relative
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
              .numwrapper
                position: absolute
                right: 0
                bottom: 0
                z-index: 20
    .bg
      position: fixed
      z-index: 40
      top: 0
      bottom: 0
      left: 0
      right: 0
      background-color: rgba(7,17,27,.8)
      filter: blur(.1rem)
</style>
