<template>
<div class="container">
    <button class="left" @click="toggleItem(-1)">
        <i class="iconfont icon-arrow-lift" :style="titleFontSize"></i>
    </button>
    <div class="kid" :style="titleFontSize">{{title}}</div>
    <button class="right" @click="toggleItem(1)">
        <i class="iconfont icon-arrow-right" :style="titleFontSize"></i>
    </button>

    <div ref="hotRef" class="hot"></div>
</div>
</template>

<script>
import {
    getHot
} from "../axios/api";
export default {
    data() {
        return {
            chart: null,
            dataList: null,
            currentIndex: 0,
            size: 0
        };
    },
    computed: {
        title() {
            if (this.dataList === null) {
                return "";
            }
            return this.dataList[this.currentIndex].name;
        },
        titleFontSize() {
            return {
                fontSize: this.size + 'px'
            }
        }
    },
    mounted() {
        this.initChart();
        this.getData();
        window.addEventListener("resize", this.screenAdapter);
        this.screenAdapter();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.screenAdapter)
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
                legend: {
                    top: 80
                },
                series: [{
                    type: "pie",
                    labelLine: {
                        show: false
                    },
                    label: {
                        show: false
                    },
                    top: 100,
                    bottom: 100,
                    left: 100,
                    right: 100
                }]
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
            let seriesArr = this.dataList[this.currentIndex].children.map(item => {
                // console.log(item);
                item.children.forEach(item => {});
                return {
                    name: item.name,
                    value: item.value,
                    children: item.children
                };
            });
            console.log(seriesArr);
            let updataOption = {
                tooltip: {
                    formatter(arg) {
                        let arr = arg.data.children;
                        let str = ``;
                        let allNum = 0;
                        arr.forEach(item => {
                            allNum += item.value;
                        });
                        // console.log(allNum, "xxxxxxx");
                        arr.forEach(item => {
                            // console.log("xx", item.value, allNum, item.value / allNum);
                            str +=
                                item.name +
                                ":" +
                                ((item.value / allNum) * 100).toFixed(2) +
                                "% <br>";
                        });
                        return str;
                    }
                },

                series: [{
                    data: seriesArr
                }]
            };
            this.chart.setOption(updataOption);
        },
        screenAdapter() {
            let size = (this.$refs.hotRef.offsetWidth / 100) * 3.6;
            this.size = size;
            let adapterOption = {
                title: {
                    textStyle: {
                        fontSize: size
                    }
                },
                legend: {
                    icon: "circle",
                    textStyle: {
                        fontSize: size / 2
                    },
                    itemWidth: size / 2,
                    itemHeight: size / 2,
                    itemGap: size / 2
                }
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
        }
    }
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

    button {
        position: absolute;
        z-index: 100;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.2);
        color: #999;
        cursor: pointer;
        border: none;
        padding: 10px 5px;

        &.left {
            left: 10%;
            top: 50%;
        }

        &.right {
            right: 10%;
            top: 50%;
        }
    }

    .kid {
        position: absolute;
        right: 10%;
        top: 70%;
        z-index: 100;
        color: #fff;
    }

    .title {
        color: #fff;
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
