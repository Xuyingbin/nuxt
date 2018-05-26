<template>
<div class="chartLeft">
    <label-title :title="stockChart"></label-title>
    <div class="stock">
        <div class="navChart">
            <ul>
                <li @click="changeNav(0)" :class="{active: navStatus === 0}">分时</li>
                <li @click="changeNav(1)" :class="{active: navStatus === 1}">日K</li>
            </ul>
            <div class="today">
                <!-- <span style="margin-right: 15px;color: #ff0000">开盘价  22.05</span> -->
                <!-- <span>2016-09-04</span> -->
            </div>
        </div>
        <div class="chartArea">
            <div class="chart" :style="timeIsShow">
                <time-chart ></time-chart>
                <!-- <h1 v-if="stockBasicInfo.isStoped" class="textRed" style="margin: 0 auto;">停牌</h1> -->
            </div>
            <div class="chart" :style="KLineIsShow">

                <k-line ></k-line>
            </div>
        </div>
    </div>
    
</div>
</template>

<script>
import TimeChart from './TimeChart';
import LabelTitle from '../indexComponents/themeDetails/Label';
import KLine from "../billBoard/KLine";
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            navStatus: 0, // 导航切换
            stockChart: '股票走势图',
            timeIsShow: {opacity: 1, zIndex: 9}, //  分时
            KLineIsShow: {opacity: 0, zIndex: 1}, //  k线图
        }
    },

    components: {
        TimeChart,
        LabelTitle,
        KLine
    },

    computed: {
        ...mapGetters(['stockBasicInfo'])
    },

    methods: {
        changeNav(id){
            this.navStatus = id;
            if(id === 0){
                this.timeIsShow = {opacity: 1, zIndex: 9};
                this.KLineIsShow = {opacity: 0, zIndex: 1};
            }else if(id === 1){
                this.KLineIsShow = {opacity: 1, zIndex: 9};
                this.timeIsShow = {opacity: 0, zIndex: 1};
            }
        }
    }
}
</script>
