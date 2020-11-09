<template>
  <div class="container">
    <button class="left" @click="toggleItem(-1)">
      <i class="iconfont icon-arrow-lift"></i>
    </button>
    <button class="right" @click="toggleItem(1)">
      <i class="iconfont icon-arrow-right"></i>
    </button>
    <div ref="hotRef" class="hot"></div>
  </div>
</template>

<script>
import { getHot } from "../axios/api";
export default {
  data() {
    return {
      chart: null,
      dataList: null,
      currentIndex: 0,
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$refs.hotRef, "chalk");
      let initOption = {
        title: {
          text: "| 热销商品占比",
          left: 20,
          top: 20,
        },
        legend: {},
      };
      this.chart.setOption(initOption);
    },
    async getData() {
      this.dataList = await getHot();
      // console.log(this.dataList);
      this.updataChart();
    },
    updataChart() {
      let percent = [];
      let seriesArr = this.dataList[this.currentIndex].children.map((item) => {
        // console.log(item);
        item.children.forEach((item) => {});
        return {
          name: item.name,
          value: item.value,
          children: item.children,
        };
      });
      console.log(seriesArr);
      let updataOption = {
        title: {
          subtext: this.dataList[0].name,
        },
        tooltip: {
          formatter(arg) {
            let arr = arg.data.children;
            let str = ``;
            let allNum = 0;
            arr.forEach((item) => {
              allNum += item.value;
            });
            // console.log(allNum, "xxxxxxx");
            arr.forEach((item) => {
              // console.log("xx", item.value, allNum, item.value / allNum);
              str +=
                item.name +
                ":" +
                ((item.value / allNum) * 100).toFixed(2) +
                "% <br>";
            });
            return str;
          },
        },
        series: [
          {
            type: "pie",
            data: seriesArr,
          },
        ],
      };
      this.chart.setOption(updataOption);
    },
    screenAdapter() {
      let size = (this.$refs.hotRef.offsetWidth / 100) * 3.6;

      let adapterOption = {
        title: {
          textStyle: {
            fontSize: size / 2,
          },
        },
      };
      this.chart.setOption(adapterOption);
      this.chart.resize();
    },
    toggleItem(num) {
      this.currentIndex += num;
      if (this.currentIndex == 3) {
        this.currentIndex = 0;
      } else if (this.currentIndex == -1) {
        this.currentIndex = 2;
      }
      this.updataChart();
    },
  },
};
</script>

<style scoped lang='less'>
.container {
  background-color: #000;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    position: absolute;
    z-index: 100;
    transform: translate(-50%, -50%);
    &.left {
      left: 5%;
      top: 50%;
    }
    &.right {
      right: 5%;
      top: 50%;
    }
  }
  .hot {
    width: 95vw;
    height: 95vh;
    overflow: hidden;
    background-color: #222733;
    border-radius: 20px;
  }
}
</style>