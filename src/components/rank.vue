<template>
<div class="container">
    <div ref="rankRef" class="rank" @mouseenter="stopInter" @mouseleave="startInter">
        xxx
    </div>
</div>
</template>

<script>
import {
    getRank
} from "../axios/api";
let colorArr = [
    ["#0ba82c", "#4ff778"],
    ["#2e72bf", "#23e5e5"],
    ["#5052ee", "#ab6ee5"],
];
export default {
    data() {
        return {
            chart: null,
            dataList: null,
            startIndex: 0,
            endIndex: 9,
            timer: null,
        };
    },
    mounted() {
        this.initChart();
        this.getData();
        window.addEventListener("resize", this.screenAdapter);
        this.screenAdapter();
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.screenAdapter);
        clearInterval(this.timer);
    },
    methods: {
        initChart() {
            let chart = this.$echarts.init(this.$refs.rankRef, "chalk");
            this.chart = chart;
            let initOption = {
                title: {
                    text: "丨 地区销售排行",
                    left: 50,
                    top: 10,
                },
                xAxis: {
                    type: "category",
                },
                grid: {
                    top: "10%",
                },
                yAxis: {
                    type: "value",
                    name: "销售金额（万）",
                },
                tooltip: {},
            };
            chart.setOption(initOption);
        },
        async getData() {
            this.dataList = await getRank();
            this.dataList.sort((a, b) => b.value - a.value);
            this.updataChart();
            this.setInter();
        },
        updataChart() {
            let xArr = this.dataList.map((item) => item.name);
            let yArr = this.dataList.map((item) => item.value);
            let updataOption = {
                xAxis: {
                    data: xArr,
                },
                dataZoom: {
                    show: false,
                    startValue: this.startIndex,
                    endValue: this.endIndex,
                },
                series: [{
                    type: "bar",
                    data: yArr,
                    itemStyle: {
                        color(arg) {
                            // console.log(arg);
                            let arr;
                            if (arg.data > 300) {
                                arr = colorArr[0];
                            } else if (arg.data > 200) {
                                arr = colorArr[1];
                            } else {
                                arr = colorArr[2];
                            }
                            return {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                        offset: 0,
                                        color: arr[0],
                                    },
                                    {
                                        offset: 1,
                                        color: arr[1],
                                    },
                                ],
                            };
                        },
                    },
                }, ],
            };
            this.chart.setOption(updataOption);
        },
        screenAdapter() {
            let size = (this.$refs.rankRef.offsetWidth / 100) * 3.6;
            this.size = size;
            let adapterOption = {
                title: {
                    textStyle: {
                        fontSize: size / 2,
                    },
                },
                series: [{
                    type: "bar",
                    itemStyle: {
                        barBorderRadius: [size / 2, size / 2, 0, 0],
                    },
                    barWidth: size / 1.5,
                }, ],
            };
            this.chart.setOption(adapterOption);
            this.chart.resize();
        },
        setInter() {
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.timer = setInterval(() => {
                this.startIndex++;
                this.endIndex++;
                if (this.endIndex > this.dataList.length - 1) {
                    this.startIndex = 0;
                    this.endIndex = 9;
                }
                this.updataChart();
            }, 2000);
        },
        stopInter() {
            clearInterval(this.timer);
        },
        startInter() {
            this.setInter();
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

    .rank {
        width: 95vw;
        height: 95vh;
        // border: 1px solid red;
        overflow: hidden;
        background-color: #222733;
        border-radius: 20px;
    }
}
</style>
