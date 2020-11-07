<template>
  <div class="container">
    <div ref="mapRef" class="map" @dblclick="resetProvince"></div>
  </div>
</template>

<script>
import { getMap } from "../axios/api";
import chinaMap from "../../public/static/map/china.json";
import { getProvinceMapInfo } from "../utils/map-utils";
import axios from "axios";
export default {
  data() {
    return {
      chart: null,
      dataList: null,
      province: {},
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
    console.log(this.dataList);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    initChart() {
      this.$echarts.registerMap("china", chinaMap);
      let chart = this.$echarts.init(this.$refs.mapRef, "chalk");
      this.chart = chart;
      let option = {
        geo: {
          map: "china",
          type: "map",
          roam: true,
          itemStyle: {
            areaColor: "#2e72bf",
            // borderColor:'#999'
          },
          emphasis: {
            itemStyle: {
              areaColor: "#ffb248",
            },
          },
        },
        legend: {
          bottom: 100,
          left: 100,
          orient: "vertical",
          textStyle: {
            color: "#999",
          },
        },
        title: {
          text: "| 商家分布",
          left: 100,
          top: 50,
        },
      };
      chart.setOption(option);
      this.chart.on("click", this.provinceClick);
    },
    //地图省份点击
    async provinceClick(params) {
      console.log(params, "--=");
      let pathObj = getProvinceMapInfo(params.name);
      console.log(pathObj);
      if (!pathObj.key) {
        return;
      }
      const instance = axios.create({
        baseURL: "",
      });
      if (!this.province[pathObj.key]) {
        let { data: res } = await instance.get(pathObj.path); //请求数据
        console.log(res);
        this.$echarts.registerMap(pathObj.key, res);
        this.province[pathObj.key] = res; //缓存
      }

      let mapOption = {
        geo: {
          type: "map",
          map: pathObj.key,
        },
      };
      this.chart.setOption(mapOption);
    },

    //双击显示中国地图
    resetProvince() {
      let resetOption = {
        geo: {
          type: "map",
          map: "china",
        },
      };
      this.chart.setOption(resetOption);
    },

    // 获取数据
    async getData() {
      this.dataList = await getMap();
      console.log(this.dataList);
      this.updateChart();
    },
    //跟新图表
    updateChart() {
      let colorArr = ["#0ba82c", "#2c83c5", "#16f2d9"];
      let seriesArr = this.dataList.map((item, i) => {
        return {
          name: item.name,
          type: "effectScatter",
          itemStyle: {
            color: colorArr[i],
          },
          data: item.children,
          rippleEffect: {
            scale: 5,
            brushType: "stroke",
          },
          coordinateSystem: "geo",
        };
      });
      //   console.log(seriesArr, "----");
      let updataOption = {
        series: [
          {
            geoIndex: 0,
            type: "map",
          },
          ...seriesArr,
        ],
      };
      this.chart.setOption(updataOption);
    },
    screenAdapter() {
      let size = (this.$refs.mapRef.offsetWidth / 100) * 3.6;
      let adapateOption = {
        legend: {
          textStyle: {
            fontSize: size / 2,
          },
          itemWidth: size / 2,
          itemHeight: size / 2,
          itemGap: size / 2,
        },
        title: {
          textStyle: {
            fontSize: size / 2,
          },
        },
      };
      this.chart.setOption(adapateOption);
      this.chart.resize();
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
  .map {
    width: 95vw;
    height: 95vh;
    // border: 1px solid red;
    overflow: hidden;
    background-color: #222733;
    border-radius: 20px;
  }
}
</style>