<template>
  <div class="container">
    <button>&gt;</button>
    <button>&lt;</button>
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
      console.log(this.dataList);
      this.updataChart();
    },
    updataChart() {
      let percent = [];
      let seriesArr = this.dataList[0].children.map((item) => {
        console.log(item);
        item.children.forEach((item) => {});
        return {
          name: item.name,
          value: item.value,
        };
      });
      console.log(seriesArr);
      let updataOption = {
        title: {
          subtext: this.dataList[0].name,
        },
        tooltip: {
          formatter(arg) {
            console.log(arg);
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
    screenAdapter() {},
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
  .hot {
    width: 95vw;
    height: 95vh;
    overflow: hidden;
    background-color: #222733;
    border-radius: 20px;
  }
}
</style>