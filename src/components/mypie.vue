<template>
<div class="container">
    <div class="pie" ref="pieRef" @mouseenter="stop" @mouseleave="run"></div>
</div>
</template>

<script>
import {
    getStock
} from "../axios/api";
export default {
    data() {
        return {
            chart: "",
            dataList: null,
            allpage: 0,
            currentPage: 0,
            currentArr: null,
            size: "",
            timer: "",
        };
    },
    mounted() {
        this.initChart();
        this.getData();
        window.addEventListener("resize", this.screepAdapter);
        this.screepAdapter();
        this.setInter();
    },
    beforeDestroy() {
        clearInterval(this.timer);
        window.removeEventListener("resize", this.screepAdapter);
    },
    methods: {
        initChart() {
            let chart = this.$echarts.init(this.$refs.pieRef, "chalk");
            this.chart = chart;
            let initOption = {
                title: {
                    text: "丨 库存和销量分析",
                    textStyle: {
                        color: "#fff",
                    },
                    top: 20,
                },
                tooltip: {},
                label: {
                    position: "inside",
                },
            };
            chart.setOption(initOption);
        },
        async getData() {
            try {
                this.dataList = await getStock();
                this.updataChart();
            } catch (err) {
                console.log("pie-error", err);
            }
        },
        updataChart() {
            this.allpage = Math.ceil(this.dataList.length / 5);
            this.currentArr = this.dataList.slice(
                this.currentPage * 5,
                (this.currentPage + 1) * 5
            );
            let centerArr = [
                ["40%", "30%"],
                ["100%", "30%"],
                ["160%", "30%"],
                ["70%", "50%"],
                ["140%", "50%"],
            ];
            const colorArr = [
                ["#4FF778", "#0BA82C"],
                ["#E5DD45", "#E8B11C"],
                ["#E8821C", "#E55445"],
                ["#5052EE", "#AB6EE5"],
                ["#23E5E5", "#2E72BF"],
            ];
            let seriesArr = this.currentArr.map((item, index) => {
                console.log(item, "----");
                let data = [{
                        name: "stock",
                        value: item.stock,
                    },
                    {
                        name: "sales",
                        value: item.sales,
                    },
                ];
                return {
                    // color: [{
                    //     x: 0,
                    //     y: 0,
                    //     x2: 0,
                    //     y2: 1,
                    //     colorStops: [{
                    //         offset: 0,
                    //         color: colorArr[index][0]
                    //     }, {
                    //         offset: 1,
                    //         color: colorArr[index][1]
                    //     }]
                    // }, '#333843'],
                    type: "pie",
                    data: data,
                    center: centerArr[index],
                    radius: ["45%", "50%"],
                    width: "40%",
                    name: item.name + "\n\n" + item.sales,
                    labelLine: {
                        show: false,
                    },
                    animation: false,
                    label: {
                        show: true,
                        position: "center",
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: "20",
                            fontWeight: "bold",
                        },
                    },
                };
            });
            console.log(seriesArr, "xxx");
            let updataOption = {
                series: seriesArr,
            };
            this.chart.setOption(updataOption);
            console.log(this.currentArr);
        },
        screepAdapter() {
            let size = (Math.ceil(this.$refs.pieRef.offsetWidth) / 100) * 3.6;
            this.size = size;
            let outRadius = size;
            let innerRadius = size * 0.9;
            let seriesArr = [];
            for (let i = 0; i < 5; i++) {
                let obj = {
                    type: "pie",
                    radius: [outRadius, innerRadius],
                };
                seriesArr.push(obj);
            }
            let adapterOption = {
                title: {
                    textStyle: {
                        fontSize: size,
                    },
                },
                series: seriesArr,
            };
            this.chart.setOption(adapterOption);
        },
        setInter() {
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.timer = setInterval(() => {
                this.currentPage++;
                if (this.currentPage > this.allpage) {
                    this.currentPage = 0;
                }
                this.updataChart();
            }, 3000);
        },
        stop() {
            clearInterval(this.timer);
        },
        run() {
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

    .pie {
        width: 95vw;
        height: 95vh;
        // border: 1px solid red;
        overflow: hidden;
        background-color: #222733;
        border-radius: 20px;
    }
}
</style>
