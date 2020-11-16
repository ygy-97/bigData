<template>
<div class="container">
    <div ref="barRef" class="bar" @mouseenter="enterFun" @mouseleave="leaveFun"></div>
</div>
</template>

<script>
import {
    getSeller
} from "../axios/api";
export default {
    data() {
        return {
            chart: null,
            dataList: [],
            allPage: 0,
            currentPage: 1,
            timer: null,
        };
    },
    mounted() {
        this.initChart();
        this.getData();
        this.setInter();
        // window.onresize = function () {
        //   this.screenAdapate();
        // };
        window.addEventListener("resize", this.screenAdapate);
        this.screenAdapate();
    },
    //组件销毁之前 清除定时器 事件解绑
    beforeDestroy() {
        clearInterval(this.timer);
        window.removeEventListener("resize", this.screenAdapate);
    },
    methods: {
        //初始化echarts实例对象
        initChart() {
            this.chart = this.$echarts.init(this.$refs.barRef);
            let initOption = {
                title: {
                    text: "丨 商家销售统计",
                    textStyle: {
                        color: "#fff",
                    },
                    left: 20,
                    top: 20,
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
                    axisPointer: {
                        type: "line",
                        z: 0,
                        lineStyle: {
                            // width:'50%',
                            width: 14,
                            color: "#2d3443",
                        },
                    },
                },
                xAxis: {
                    type: "value",
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#888",
                        },
                    },
                    splitLine: {
                        show: false,
                    },
                },
                yAxis: {
                    type: "category",
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#888",
                        },
                    },
                },
                itemStyle: {},
                series: [{
                    type: "bar",
                    label: {
                        show: true,
                        position: "right",
                        color: "#fff",
                    },
                    itemStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [{
                                    offset: 0,
                                    color: "#5152ee",
                                },
                                {
                                    offset: 1,
                                    color: "#aa6ee5",
                                },
                            ],
                        },
                    },
                }, ],
            };
            this.chart.setOption(initOption);
        },
        // 获取数据
        async getData() {
            let data = await getSeller();
            data.sort((a, b) => a.value - b.value);
            this.dataList = data;
            this.allPage = Math.ceil(data.length / 5);
            //   this.setInter(data);
            data = this.dataList.slice(
                (this.currentPage - 1) * 5,
                this.currentPage * 5
            );
            this.updataChart(data);
        },

        // 更新数据
        updataChart(data) {
            let yCateData = data.map((item) => {
                return item.name;
            });
            let seriesData = data.map((item) => {
                return item.value;
            });
            let option = {
                yAxis: {
                    data: yCateData,
                },
                series: [{
                    data: seriesData,
                }, ],
            };
            this.chart.setOption(option);
        },

        // 切换内容
        setInter() {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.currentPage++;
                this.currentPage %= this.allPage + 1;
                this.currentPage == 0 && (this.currentPage += 1);
                let data = this.dataList.slice(
                    (this.currentPage - 1) * 5,
                    this.currentPage * 5
                );
                this.updataChart(data);
            }, 2000);
        },
        // 鼠标划入
        enterFun() {
            console.log("1111");
            clearInterval(this.timer);
        },
        // 鼠标移出
        leaveFun() {
            console.log("2222");
            this.setInter();
        },
        //屏幕适配 文字大小
        screenAdapate() {
            //   console.log(this.$refs.barRef.offsetWidth);
            let size = (this.$refs.barRef.offsetWidth / 100) * 3.6;
            console.log(size);
            let adapate = {
                title: {
                    textStyle: {
                        fontSize: size,
                    },
                },
                tooltip: {
                    axisPointer: {
                        lineStyle: {
                            width: size,
                        },
                    },
                },
                series: [{
                    itemStyle: {
                        barBorderRadius: [0, size / 2, size / 2, 0],
                    },
                    barWidth: size,
                }, ],
            };
            this.chart.setOption(adapate);
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

    .bar {
        width: 95vw;
        height: 95vh;
        // border: 1px solid red;
        background-color: #222733;
        border-radius: 20px;
    }
}
</style>
