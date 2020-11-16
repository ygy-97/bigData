<template>
  <div class="container">
    <header>
      <div class="logo">
        <img src="../../public/static/img/logo_dark.png" alt="" />
      </div>
      <div class="title">电商平台实时监控系统</div>
      <div class="right">
        <img src="../../public/static/img/qiehuan_dark.png" alt="" />
        <div class="time">{{ time }}</div>
      </div>
    </header>
    <main>
      <div class="main-left">
        <div class="item">
          <my-trend></my-trend>
        </div>
        <div class="item">
          <my-seller></my-seller>
        </div>
      </div>
      <div class="main-center">
        <div class="item">
          <my-map></my-map>
        </div>
        <div class="item">
          <my-rank></my-rank>
        </div>
      </div>
      <div class="main-right">
        <div class="item">
          <hot-product></hot-product>
        </div>
        <div class="item">
        <my-pie></my-pie>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import getFormatTime from "../utils/getFormatTime";
import hotProduct from "../components/hotproduct";
import myMap from "../components/map";
import myPie from "../components/mypie";
import myRank from "../components/rank";
import mySeller from "../components/seller";
import myTrend from "../components/trend";
export default {
  components: {
    hotProduct,
    myMap,
    myPie,
    myRank,
    mySeller,
    myTrend,
  },
  data() {
    return {
      time: "",
      timer: null,
    };
  },
  created() {
    this.getTime();
  },
  methods: {
    getTime() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      let time;
      this.timer = setInterval(() => {
        time = new Date();
        this.time = getFormatTime(time);
      }, 1000);
    },
  },
};
</script>
<style scoped lang='less'>
.container {
  width: 100vw;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  background-color: #161522;
  header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // border: 1px solid red;
    background-color: #161522;
    background-image: url(../../public/static/img/header_border_dark.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .logo {
      flex: 1;
      height: 40px;
      // border: 1px solid red;
      margin-bottom: 10px;
      img {
        // width: 100%;
        height: 100%;
      }
    }
    .title {
      flex: 1;
      text-align: center;
      height: 40px;
      color: #fff;
      margin-top: 10px;
      font-size: 28px;
    }
    .right {
      flex: 1;

      display: flex;
      justify-content: flex-end;
      // justify-content: space-between;
      align-items: center;
      img {
        margin-right: 10px;
      }
      .time {
        color: #fff;
      }
    }
  }
  main {
    display: flex;
    margin-top: 10px;
    height: calc(100% - 100px);
    // border: 1px solid red;
    & > div {
      margin-left: 20px;
    }
    .main-left {
      flex: 3;
      display: flex;
      flex-direction: column;
      .item {
        background: #222733;
        flex: 4;
        border-radius: 15px;
      }
      .item:nth-child(2) {
        margin-top: 20px;
        flex: 3;
      }
    }
    .main-center {
      flex: 4;
      display: flex;
      flex-direction: column;
      .item {
        background: #222733;
        flex: 3;
        border-radius: 15px;
      }
      .item:nth-child(2) {
        margin-top: 20px;
        flex: 2;
      }
    }
    .main-right {
      flex: 4;
      display: flex;
      flex-direction: column;
      .item {
        background: #222733;
        flex: 5;
        border-radius: 15px;
      }
      .item:nth-child(2) {
        margin-top: 20px;
        flex: 4;
      }
    }
  }
}
</style>