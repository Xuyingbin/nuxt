<template>
<div class="themeChartContainer">
    <div class="chartTitle">
        <span :class="{active: status === 1}" @click="changeChart(1)">资金净流入前五（亿元）</span>/
        <span :class="{active: status === 0}" @click="changeChart(0)">主题成交额前五（亿元）</span> 
    </div>
    <div class="chartContainer">
        <div :style="opacityA" class="chartC">
            <div id="themeChart" class="themeChart"></div>
        </div>
        <div :style="opacityB" class="chartC">

            <div id="investChart" class="themeChart"></div>
            
        </div>
    </div>
</div>
</template>


<script>

import { mapGetters } from 'vuex';
import Util from '~/store/util';

export default {
    data(){
        return {
            status: 1,
            opacityA: {opacity: '0', zIndex: '1'},
            opacityB: {opacity: '1', zIndex: '99'}
            
        }
    },

    computed:{
        ...mapGetters(['themeTradeFive', 'capitalFlow'])
    },

    watch: {
        'themeTradeFive'(newVal, oldVal){
            // console.log(newVal);
            this.initCharts(0);
        },
        'capitalFlow'(newVal, oldVal){
            // console.log(newVal);
            this.initCharts(1);
        }
    },

    mounted(){
        this.initCharts(0);
        this.initCharts(1);
    },

    methods: {
        //  type  0 主题成交额   1 资金流向
        handleOptions(data, type){
            
            
            let capital = this.handleData({capital: true, type: type, data: data});
            let chg = this.handleData({chg: true, data: data});
            let name = this.handleData({name: true, data: data});

            let option = {
   
    
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                        
                       shadowStyle:{
                            
                            opacity: 0
                        }, 
                    },
                    
                    
                    formatter: function(params){
                        // console.log(params);
                        // var data = [['11.3%', '11.3%'], ['10.2%', '11.3%'], ['1.1%', '11.3%'], ['10.1%', '11.3%'], ['8.6%', '11.3%']];
                        var data = chg;
                        // return  params[0].axisValue + '<br>' + data[params[0].dataIndex][0] + ' ' + data[params[0].dataIndex][1];
                        return  params[0].axisValue + '<br>' + data[params[0].dataIndex][0];
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : name,
                        // data : ['手业纺织', '手工', '手纺织', '手工业织', '手工业纺'],
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine:{
                            show:false
                        },
                        axisLabel:{
                          formatter: function(value, index){
                            // console.log(value);
                            return value;
                          }  
                        },
                        axisTick:{
                            show: false
                        },
                        splitLine:{
                            show: false
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        nameLocation:'center',
                        axisLine:{
                            show:false
                        },
                        axisTick:{
                            show: false
                        },
                        splitLine:{
                            show: false
                        },
                        axisLabel:{
                            show:false
                        }
                    }
                ],
                series : [
                    {
                        name:'',
                        type:'bar',
                        barWidth: '60%',
                        data: capital,
                        // data:[390, 52, 200, 334, 10 ],
                        label:{
                            normal:{
                                show:true,
                                position:'top'
                            }
                        },
                        itemStyle:{
                            normal:{
                                color:function(params) {
                                    
                                        // build a color map as your need.  
                                        var colorList = [  
                                        '#d73517','#df4d32','#e9654d','#f08c79','#fab4a7'
                                        ];  
                                        return colorList[params.dataIndex]  
                                    },
                                
                            }
                        },
                        
                    }
                ]
            };

            return option;
        },
        
        initCharts(type){

            
            
            let chart = this.$echarts.init(document.getElementById('themeChart'));
            let invest = this.$echarts.init(document.getElementById('investChart'));
            
            if(type === 0){
                chart.setOption(this.handleOptions(this.themeTradeFive, 0));

            }else if(type === 1){
                
                invest.setOption(this.handleOptions(this.capitalFlow, 1));
            }

        },

        // 切换图标
        changeChart(num){
            this.status = num;
            if(num === 0){
                this.opacityA = {
                    opacity : '1',
                    zIndex: '99'
                }
                this.opacityB = {opacity: '0', zIndex: '1'}
               
            }else if(num === 1){
                this.opacityA = {
                    opacity : '0',
                    zIndex: '1'
                }
                this.opacityB = {opacity: '1', zIndex: '99'}
            }
            
        },

        // 数据处理  params name 主题名称 chg 涨跌幅数据  capital 资金  data 接收的数据
        handleData({chg, name, capital, type, data}){
            
                let arr = [];
                // console.log(data);
                data?data.map((item) => {
                    if(capital){
                        // console.log(item);
                        if(type === 0){
                            arr.push( Util.formatMoney({num: item.tradeMoney, type: '亿', float: 0}));
                        }else if(type === 1){
                            
                            arr.push( Util.formatMoney({num: item.netInflow, type: '亿', float: 0}));
                        }
                        
                    }
                    if(name){
                        arr.push(item.conceptStockName);                
                    }

                    if(chg){
                        let chgArr = [ parseFloat(item.chg?item.chg:0).toFixed(2) + '%' ];    
                        arr.push(chgArr);
                    }
                }):null;
                // console.log(arr);
                return arr;
            

            
        }

    }
}
</script>
