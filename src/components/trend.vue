<template>
<div class="container">
    <div class="nav" :style="{left:size*1.5+'px'}">
        <template v-if="dataList">
            <div class="flex-default title" :style="{fontSize:size/3+'px'}" @click="toggleNav">
                <div>{{"丨 "+ titleName }}</div>
                <i class="iconfont icon-arrow-right" :style="{left:size*1.5+'px'}"></i>
            </div>
            <transition-group>
                <p :style="{fontSize:size/3+'px',marginLeft:size/5+'px'}" v-show="flag" v-for="item in filterNavList" @click="toggleItem(item)" :key="item.text">
                    {{ item.text }}
                </p>
            </transition-group>
        </template>
    </div>
    <div ref="lineRef" class="line"></div>
</div>
</template>

<script>
import {
    getTrend
} from "../axios/api";
const colorArr = [
    "rgba(101, 59, 35,1)",
    "rgba(108, 37, 44,1)",
    "rgba(30, 106, 106,1)",
    "rgba(37, 61, 116,1)",
    "rgba(27, 77, 49,1)",
].reverse();
const colorArr1 = [
    "rgba(101, 59, 35,0)",
    "rgba(108, 37, 44,0)",
    "rgba(30, 106, 106,0)",
    "rgba(37, 61, 116,0)",
    "rgba(27, 77, 49,0)",
].reverse();
export default {
    data() {
        return {
            chart: null,
            dataList: null, //所有数据
            navList: null,
            key: "map", //导航栏类型
            flag: false,
            size: 0, //字体大小
        };
    },
    computed: {
        filterNavList() {
            return this.navList.filter((item) => {
                return item.key !== this.key;
            });
        },
        titleName() {
            let title = this.navList.filter((item) => {
                return item.key == this.key;
            });
            return title[0].text;
        },
    },
    created() {},
    mounted() {
        this.initChart();
        this.getData();
        console.log(this.dataList);

        window.addEventListener("resize", this.screenAdapate);
        this.screenAdapate();
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.screenAdapate);
    },
    methods: {
        initChart() {
            console.log(this.dataList, "xxxx");
            let chart = this.$echarts.init(this.$refs.lineRef, "chalk");
            this.chart = chart;
            let initOption = {
                legend: {
                    left: 10,
                    top: 80,
                    icon: "circle",
                    textStyle: {
                        color: "#999",
                    },
                },
                grid: {
                    top: "20%",
                    left: "3%",
                    right: "6%",
                    bottom: "3%",
                    containLabel: true,
                },
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category",
                    axisLine: {
                        lineStyle: {
                            color: "#999",
                        },
                    },
                    boundaryGap: false,
                    //   splitLine: {
                    //     show: false,
                    //   },
                },
                yAxis: {
                    type: "value",
                    splitLine: {
                        show: false,
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#999",
                        },
                    },
                    //   splitLine: {
                    //     show: false,
                    //   },
                },
            };
            this.chart.setOption(initOption);
        },
        async getData() {
            this.dataList = await getTrend();
            this.navList = this.dataList.type;
            console.log(this.dataList);
            this.updataChart();
        },
        updataChart() {
            let seriesArr = this.dataList[this.key].data.map((item, index) => {
                console.log(index, colorArr[index]);
                return {
                    name: item.name,
                    data: item.data,
                    type: "line",
                    stack: "data",
                    smooth: true,
                    areaStyle: {
                        color: {
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                    offset: 0,
                                    color: colorArr[index],
                                },
                                {
                                    offset: 1,
                                    color: colorArr1[index],
                                },
                            ],
                        },
                    },
                };
            });
            console.log(seriesArr);
            let dataOption = {
                yAxis: {
                    name: this.dataList[this.key].unit,
                    nameLocation: "end",
                    nameTextStyle: {
                        color: "#fff",
                        padding: [0, 0, 0, -10],
                    },
                },
                xAxis: {
                    data: this.dataList.common.month,
                },
                series: seriesArr,
            };
            this.chart.setOption(dataOption);
        },
        // 是否显示菜单栏
        toggleNav() {
            this.flag = !this.flag;
            console.log("xx");
        },
        // 切换菜单
        toggleItem(obj) {
            this.key = obj.key;
            this.flag = false;
            this.updataChart();
            console.log(this.key, obj.key);
        },
        screenAdapate() {
            let size = (this.$refs.lineRef.offsetWidth / 100) * 3;
            this.size = size;
            console.log(size);
            let adapateOption = {
                title: {
                    textStyle: {
                        fontSize: size,
                    },
                },
                legend: {
                    itemWidth: size / 2,
                    itemHeight: size / 2,
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

<style lang="less" scoped>
.container {
    background-color: #000;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .nav {
        position: absolute;
        color: #fff;
        // width: 100px;
        z-index: 10;
        // border: 1px solid red;
        box-shadow: 0 0 5px 2px #eee;
        border-radius: 10px;
        padding: 10px;
        background-color: #222733;
        top: 50px;
        left: 50px;

        .title {
            cursor: pointer;
        }

        p {
            cursor: pointer;
            // border: 1px solid #000;
        }
    }

    .line {
        width: 95vw;
        height: 95vh;
        // border: 1px solid red;
        background-color: #222733;
        border-radius: 20px;
    }

    // .v-enter,.v-leave-to{
    //   opacity: 0;
    // }

    // .v-enter-to,.v-leave{
    //   opacity: 1;
    // }
    // .v-enter-active,.v-leave-active{
    //   transition: opacity .3s;
    // }
}
</style>
