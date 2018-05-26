<template>

<div class="TimeChart">
    <div id="TimeCahrt" style="height: 220px"></div>
    <div id="volumeChart" style="height: 170px;width:92%;"></div>

    <!-- <canvas id="lineChart"></canvas> -->
</div>

</div>

</template>

<script>
import { mapGetters } from 'vuex';
import '~/utils/format';

// import '../../stock-line';
export default {
    data(){
        return {
            // 时间组
            timeArr: [],
            // 每个时间段的 最新价格 组
            lastPriceArr: [],
            // 最新价
            newPrice: 0,
            // 均价组
            avgPriceArr: [],
            // 涨跌幅组
            chgArr: [],

            // 成交量
            volumeArr: [],
            // 记录上一次的成交量
            prevVolume: 0,
            // 记录下一次的成交量
            nextVolume: 0,

            ymd: '',

            valueChgArr: [],
            value_volume: []
        }
    },
    computed: {
        ...mapGetters(['stockBasicInfo', 'stockMinTime'])
    },
    watch:{
        // 'stockBasicInfo'(newVal, oldVal){
        //     console.log(newVal);
            
        // },
        'stockMinTime'(newVal, oldVal){
            // console.log(newVal);
            this.handleData(newVal);
            // console.log(this.newPrice);
            // console.log(this.timeArr);
            // console.log(this.chgArr)
            this.chartInit(this.stockBasicInfo.preclosePrice);
            // console.log(this.$stockChart);
            // this.$stockChart.drawTrendLine({
            //     id: 'lineChart',
            //     width: 600,
            //     height: 284,
            //     prices: this.lastPriceArr,
            //     volumes: this.volumeArr,
            //     avgPrices: this.avgPriceArr,
            //     preClosePrice: this.stockBasicInfo.preclosePrice
            // });
            // console.log(this.chgArr);
        }
    },

    mounted(){
        // this.handleXAxis();
    },

    methods: {
        chartInit(newPrice){
            // var yData = [15.01, 15.70, 16.71, 14.61, 15.85, 15.67, 16.76];
            // var newData = [];
            // for(var i=0; i<yData.length; i++){
            //     var upDown = ((yData[i] - 15.8)/15.8).toFixed(4);
            //     newData.push((upDown * 100).toFixed(2));
            // }
            // console.log(this.ymd);

            // 最大涨幅
            let maxChg = this.valueChgArr.sort((a,b) => {return b - a})[0];
            // 最大跌幅
            let minChg = this.valueChgArr.sort((a,b) => {return a - b})[0];
            // 最小价格
            let minPrice = this.lastPriceArr.sort((a,b) => {return a - b})[0];
            // 最大价格
            let maxPrice = this.lastPriceArr.sort((a,b) => {return b - a})[0];

            // console.log(`min:${minPrice} max:${maxPrice}`);
            // console.log(this.lastPriceArr);

            // 最大成交数
            let maxVolume = this.value_volume.sort((a,b) => {return b - a})[0];
            // console.log(maxChg);
            // console.log(minChg);
            let price_min_interval = ((maxChg - minChg) * newPrice / 500).toFixed(2);
            let chg_min_interval = ((price_min_interval / newPrice) * 100).toFixed(2);
            // console.log(Math.abs(minChg));

            let option = {
                
                tooltip: {
                    trigger: 'axis',
                                //  C23531 2F4554  61A0A8
                    formatter: function (params) {
                        // console.log(params);
                        
                        // params = params[0];
                        // var date = new Date(params.name);
                        return `${params[0].axisValueLabel} <br /> 
                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#c23531;"></span>
                                价格  ${params[0].value}
                                <br />
                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#2F4554;"></span>
                                涨跌幅  ${(params[2].value).toFixed(2)}%
                                <br />
                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#61A0A8;"></span>
                                均价  ${params[3].value}
                                <br />
                                `;
                    },
                    axisPointer: {
                        type: 'cross',
            
                    }
                },
                
                // calculable : true,
                grid: [
                    {
                        left: '3%',
                        right: '4%',
                        bottom: '2%',
                        height: '180',
                        width: '92%',
                        // width: '47%',
                        containLabel: true
                    },
                    
                ],
                
                xAxis:
                [
                    {
                        gridIndex: 0,
                        type: 'category', //category
                        boundaryGap: false,
                        data: this.handleXAxis(),
                        
                        axisTick:{
                            show: false
                        },
                        axisLine:{
                            show: false,
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                        axisLabel: {
                            color: '#333',
                            interval: function (index, name) { 
                                // console.log(index);
                               if(name === '09:30' || name === '11:30/13:00' || name === '15:00'){
                                    // console.log('进来了');
                                    return true;
                                }else{
                                    return false;
                                } 
                                return true;
                            }
                            
                            
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#eee',
                                type: 'dashed'
                            }
                        }
                    },
                    
                    
                ],
                
                yAxis: [
                    // 图一
                    {
                        
                        type: 'value',
                        // splitNumber: 3,
                        // minInterval: price_min_interval,
                        axisLabel : {
                            show: true,
                            formatter: function (value, index) {
                                // console.log(index);
                                if(value <= newPrice * (1 + 0.1) && value >= newPrice * (1 - 0.1)){

                                    return value.toFixed(2);
                                }else{
                                    return '';
                                }
                            },
                            interval: '2',
                            color: function (value, index) {
                                return value < newPrice ? 'green' : 'red';
                            }
                        },
                        
                        min: function(params){
                            return (newPrice + newPrice * ( minChg / 100)).toFixed(2)
                            // if(maxChg >= 0){
                            //     // 如果最大涨幅大于0  取最大涨幅的相反数 为 最小涨幅
                            //     return (newPrice + newPrice * ( -maxChg / 100)).toFixed(2);
                            // }else{
                            //     // 反之 取最小涨幅
                            //     return (newPrice + newPrice * (minChg / 100)).toFixed(2);

                            // }
                        },
                        // min: minPrice,
                        
                        max: function(params){
                            // if(maxChg < 0){
                            //     // 如果最大涨幅小于0  取最小涨幅的相反数 为 最大涨幅
                            //     return (newPrice + newPrice * ( Math.abs(minChg) / 100)).toFixed(2);
                            // }else{
                            //     // 反之 取最大涨幅
                            //     return (newPrice + newPrice * ( maxChg / 100)).toFixed(2);

                            // }
                            return (newPrice + newPrice * ( maxChg / 100)).toFixed(2)
                        }, 
                        // max: maxPrice,


                        axisLine:{
                            show: true,
                            lineStyle: {
                                color: '#eee',
                                type: 'dashed'
                                // color: '#ccc'
                            }
                        },
                        axisTick:{
                            show: false
                        },
                        splitLine: {
                            show: true,
                            
                            lineStyle: {
                                color: '#eee',
                                type: 'dashed'
                            }
                        }
                    },
                    {
                        
                        type: 'value',
                        splitNumber: 5,
                        
                        // minInterval: ((maxChg - Math.abs(minChg)) / 5).toFixed(2),
                        // maxInterval: chg_min_interval,
                        axisLabel : {
                            
                            color: function (value, index) {
                                // console.log(value);
                                // console.log(((maxChg - Math.abs(minChg)) / 5).toFixed(2));
                                
                                return value < newPrice ? 'green' : 'red';
                            },
                            formatter: function (value, index) {
                                // console.log(index);
                                if(value <= newPrice * (1 + 0.1) && value >= newPrice * (1 - 0.1) ){
                                    // 转为涨跌幅
                                    let chg = (((value - newPrice) / newPrice)  * 100).toFixed(2);
                                    // console.log('涨跌幅：' + chg);
                                    return chg + '%';
                                }else{
                                    return '';
                                }
                            },
                            // interval: '2',
                        },
                        
                        min: function(params){
                            return (newPrice + newPrice * ( minChg / 100)).toFixed(2)
                            // if(maxChg >= 0){
                            //     // console.log(maxChg);
                            //     // 如果最大涨幅大于0  取最大涨幅的相反数 为 最小涨幅
                            //     return (newPrice + newPrice * ( -maxChg / 100)).toFixed(2);
                            // }else{
                            //     // 反之 取最小涨幅
                            //     return (newPrice + newPrice * (minChg / 100)).toFixed(2);

                            // }
                        },
                        // min: minPrice,
                        
                        max: function(params){
                            return (newPrice + newPrice * ( maxChg / 100)).toFixed(2)
                            // if(maxChg < 0){
                            //     // 如果最大涨幅小于0  取最小涨幅的相反数 为 最大涨幅
                            //     return (newPrice + newPrice * ( Math.abs(minChg) / 100)).toFixed(2);
                            // }else{
                            //     // 反之 取最大涨幅
                            //     return (newPrice + newPrice * ( maxChg / 100)).toFixed(2);

                            // }
                        }, 
                        // max: maxPrice,
                        axisLine:{
                            show: true,
                            lineStyle: {
                                color: '#eee',
                                type: 'dashed'
                                // color: '#ccc'
                            }
                        },
                        axisTick:{
                            show: false
                        },
                        splitLine: {
                            show: false,
                            
                        }
                    },
                     
                   
                    
                ],
                series : [
                    {
                        name:'价格',
                        type:'line',
                        // data:[15.81, 15.70, 16.81, 14.81, 15.85, 15.97, 16.56],
                        // data: this.lastPriceArr.slice(0, 120),
                        data: this.lastPriceArr,
                        smooth: true,
                        // xAxisIndex: 0,
                        // yAxisIndex: 0,
                        lineStyle: {

                            width: 1,
                            // opacity: 0
                        },
                        yAxisIndex: 0,
                        itemStyle: {
                            borderWidth: 0,
                            opacity: 0
            
                        },
                        
                    },
                    {
                        name:'价格',
                        type:'line',
                        // data:[15.81, 15.70, 16.81, 14.81, 15.85, 15.97, 16.56],
                        // data: this.lastPriceArr.slice(0, 120),
                        data: this.lastPriceArr,
                        smooth: true,
                        // xAxisIndex: 0,
                        yAxisIndex: 1,
                        lineStyle: {

                            width: 1,
                            // opacity: 0
                        },
                        yAxisIndex: 0,
                        itemStyle: {
                            borderWidth: 0,
                            opacity: 0
            
                        },
                        
                    },
                    {
                        name:'涨跌',
                        type:'line',
                        smooth: true,
                        // data:newData,
                        data: this.chgArr,
                        // data: this.chgArr.slice(0, 120),
                        // xAxisIndex: 0,
                        // yAxisIndex: 1,
                        lineStyle: {
                            color: 'rgba(0,0,0,0)',
                            opacity: 0
                        },
                        
                        
                        itemStyle: {
                            borderWidth: 0,
                            opacity: 0
            
                        },
                        
                        // yAxisIndex: 0
                    },
                    {
                        name:'均价',
                        type:'line',
                        smooth: true,
                        // xAxisIndex: 0,
                        // yAxisIndex: 0,
                        lineStyle: {

                            width: 1,
                        },
                        // data:[15.71, 15.51, 15.31, 15.51, 15.81, 15.81, 15.81],
                        // data: this.avgPriceArr.slice(0, 120),
                        data: this.avgPriceArr,
                        itemStyle: {
                            borderWidth: 0,
                            opacity: 0
            
                        }

                        
                        
                    
                    }
                    
                ]
            };



            let option2 = {
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: [
                    {
                        left: '3%',
                        right: '4%',
                        top:'10%',
                        // bottom: '2%',
                        height: '100',
                        containLabel: true
                    }
                ],
                xAxis : [
                    {
                        type : 'category', //category
                        data : this.handleXAxis(),
                        // axisTick: {
                        //     alignWithLabel: true
                        // },
                        axisTick:{
                            show: false
                        },
                        
                        // min: new Date(this.ymd + ' 09:30:00'),
                        // min: this.ymd + ' 09:30:00',
                        // max: new Date(this.ymd + ' 15:00:00'),
                        // max: this.ymd + ' 15:00:00',
                        // minInterval: 1000 * 60,
                        axisLine:{
                            show: true,
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                        axisLabel:{
                            show: false,
                            
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisTick:{
                            show: false
                        },
                        splitLine: {
                            show: false,
                            
                        },
                        axisLine:{
                            show: false,
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                        axisLabel: {
                            show: true,
                            color: '#333'
                        },
                        min: 0,
                        max: maxVolume           
                    }
                    
                ],
                series : [
                    {
                        name:'成交量（手）',
                        type:'bar',
                        barWidth: '60%',
                        data: this.volumeArr,
                        smooth: true
                    }
                ]
            }

            let chart = this.$echarts.init(document.getElementById('TimeCahrt'));
            let chart2 = this.$echarts.init(document.getElementById('volumeChart'));

            chart.setOption(option);
            chart2.setOption(option2);
            
            this.$echarts.connect([chart, chart2]);
            // console.log(this.timeArr)
        },


        // date 时间组, lastPrice 最新价格组, avgPrice 均价组, chg 涨跌幅组
        handleData(data){
            // console.log(data);
            let timeArr = [],lastPriceArr = [],avgPriceArr=[],chgArr=[],volumeArr=[],valueArr=[],value_volume=[];
            if(data && data.length !== 0){
                this.ymd = `${data[0].mintime.slice(0,4)}-${data[0].mintime.slice(4,6)}-${data[0].mintime.slice(6,8)}`;
                data.map((item, index)=>{
                    // console.log(item.mintime)
                    let y_m_d_h_m_s = `${item.mintime.slice(0,4)}-${item.mintime.slice(4,6)}-${item.mintime.slice(6,8)} ${item.mintime.slice(8,10)}:${item.mintime.slice(10,12)}`;
                    
                    // 时间
                    let time =  `${item.mintime.slice(8,10)}:${item.mintime.slice(10,12)}`;
                    timeArr.push(time);

                    // 最新价
                    lastPriceArr.push(item.lastPrice);
                    // lastPriceArr.push([new Date(y_m_d_h_m_s), item.lastPrice]);

                    // 均价
                    avgPriceArr.push(item.avgPrice);
                    // avgPriceArr.push([new Date(y_m_d_h_m_s), item.avgPrice]);

                    // 涨跌幅
                    chgArr.push((item.changeRate ));
                    // chgArr.push([new Date(y_m_d_h_m_s), (item.changeRate / 1000)]);
                    valueArr.push(item.changeRate);
                    // 记录上一次的成交量
                    this.prevVolume = item.businessAmount;
                    // 记录下一次的成交量
                    this.nextVolume = data[index + 1]?data[index + 1].businessAmount:item.businessAmount;
                    // console.log(this.prevVolume);

                    // 成交量 （手）
                    if(index > 0 && index < data.length - 1){
                        value_volume.push(
                            Math.floor(
                                (this.nextVolume - this.prevVolume) / 100
                            )
                        );
                        volumeArr.push(
                            // [
                                // new Date(y_m_d_h_m_s),
                                Math.floor(
                                    (this.nextVolume - this.prevVolume) / 100
                                )
                            // ]
                            
                        );


                    }else if(index === 0){
                        value_volume.push(
                            Math.floor(
                                item.businessAmount / 100
                            )
                        );
                        volumeArr.push(
                            // [
                                // new Date(y_m_d_h_m_s),
                                Math.floor(
                                    item.businessAmount / 100
                                )
                            // ]
                        );
                    }     
                });
                this.timeArr = timeArr;
                this.lastPriceArr = lastPriceArr;
                this.avgPriceArr = avgPriceArr;
                this.chgArr = chgArr;
                this.volumeArr = volumeArr;
                this.valueChgArr = valueArr;
                this.value_volume = value_volume;
                this.sumVolume(this.volumeArr);
                // console.log(this.avgPriceArr.length);
            }   
        },

        // 计算
        sumVolume(arr){
            // console.log(arr.length);
            let sum = 0;
            arr.map((item) => {
                sum += item;
            });

            // console.log(sum);
        },


        // 固定x轴上面的数据
        handleXAxis(){
            let y_m_d = new Date().format('YYYY-MM-DD');
            // console.log(y_m_d);
            let start = new Date(y_m_d + ' 09:30:00').getTime();
            let middle_Eleven = new Date(y_m_d + ' 11:30:00').getTime();
            let middle_Thirteen = new Date(y_m_d + ' 13:00:00').getTime();
            let end = new Date(y_m_d + ' 15:00:00').getTime();
            let arr = [];

            let timeLib = start;


            while(timeLib){
                    if(timeLib >= start && timeLib < middle_Eleven){
                        // sum += 1;
                        arr.push(new Date(timeLib).format('hh:mm'));
                    }
                    if(timeLib === middle_Eleven){
                        arr.push('11:30/13:00');
                    }

                    if(timeLib > middle_Thirteen && timeLib <= end){
                        
                        // sum2 += 1;
                        arr.push(new Date(timeLib).format('hh:mm'));
                    }
                    
                    if(timeLib > end){
                        break;
                    }

                    timeLib += 60000;
                }
            // console.log(this.timeArr);
            return arr;
            // console.log(arr);
        }
    }
}
</script>


