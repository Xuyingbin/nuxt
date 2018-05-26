<template>
<div class="MoneyFlow">
    <label-bar :title="navTitle"></label-bar>
    <div class="moneyChart" :style="comStyle">
        <div class="moneyChartTitle">
            <div class="left">
                <span>近十日</span>
            </div>
            <div class="right">
                <span><i></i> 净流入</span>
                <span><i></i> 净流出</span>
                <span>单位： 亿元</span>
            </div>
        </div>
        <div class="moneyChart" id="moneyChart" style="width:100%;height:295px;"></div>
    </div>
</div>
</template>

<script>
import LabelBar from './Label';
import Util from '~/store/util';
export default {
    props: ["comStyle", "capital"],
    data(){
        return {
            navTitle: '资金流向',
            dateArr: [],
            flowArr: [],
            
        }
    },
    
    components: {
        LabelBar
    },

    watch:{
        'capital'(newVal, oldVal){
            console.log(newVal);
            // console.log(oldVal);
            // this.dataHandle(newVal);
            if(newVal){

                this.moneyFlowChart(newVal);
            }
        }
    },

    mounted(){
        this.moneyFlowChart(this.capital);
        // console.log(this.capital);
    },
    methods: {
        moneyFlowChart(data){
            // let inflow = [5, 8.9, 5, 8, 8, 7.6, 7.6, 3, 9, 8];
            // let inflow = this.inArr;
            // let outflow = [3, 4, 1.8, 2.4, 0.3, 4, 5, 3, 9, 8];
            // let outflow = this.outArr;
            this.dataHandle(data);
            let option = {
                color:[ '#d8361b', '#1cbf7b'],
                tooltip : {
                    trigger: 'axis',
                    formatter: function(params){
                        // console.log(params);
                        if(params[0].data >= 0){

                            return params[0].axisValue + '<br />净流入： ' + params[0].data;
                        }else{
                            return params[0].axisValue + '<br />净流出： ' + Math.abs(params[0].data);

                        }
                        
                    }
                },
                
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        // data : [10.1, 10.2, 10.3, 10.4,10.5,10.6,10.7,10.8,10.9,10.10],
                        data : this.dateArr,
                        splitLine:{
                            show: true,
                            lineStyle: {
                                color: '#f8f8f8'
                            }
                        },
                        
                        axisLine:{
                            lineStyle:{
                                width: 2,
                                color: '#d8361b'
                            }
                        },
                        axisTick:{
                            show: false
                        },
                        axisLabel: {        
                            show: true,
                            textStyle: {
                                color: '#000',
                                
                            }
                        },
                        
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisTick:{
                            show: false
                        },
                        splitLine:{
                            show: true,
                            lineStyle: {
                                color: '#f8f8f8'
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                width: 2,
                                color: '#d8361b'
                            }
                        },
                        axisLabel: {        
                            show: true,
                            textStyle: {
                                color: '#000',
                                
                            }
                        },
                    }
                ],
                series : [
                    {
                        name:'流入',
                        type:'bar',
                        // data:[2.0, 4.9, 7.0, -3.2, 5.6, -7.7, 3.6,2.6, -5.9, 5.6],
                        data: this.flowArr,
                        barMaxWidth: 50,
                        itemStyle:{
                            normal:{
                                color: function(params){
                                    // console.log(params);
                                    if(params.value >= 0){
                                        return '#d8361b';
                                    }else{
                                        return '#1cbf7b';
                                    }
                                }
                            }
                        }
                        
                    }
                    
                ]
            };

            let charts = this.$echarts.init(document.getElementById('moneyChart'));
            charts.setOption(option);

        },

        // 数据处理
        dataHandle(data){
            let arr = [];
            let flowArr = [];
            if(data && data.length !== 0){
                // console.log(data);
                
                for(let key in data){
                    arr.push(key);
                    flowArr.push( (data[key] / 100000000).toFixed(2))
                }

            
            }

            this.dateArr = arr;
            this.flowArr = flowArr;
        },

        // 流入流出处理
        // flowDataHandle(data){
        //     if(data && data.length !== 0){
        //         let inArr = [];
        //         let outArr = [];
        //         data.map((item) => {
        //             let flow = item.inTotal;
                    
        //             if(flow > 0){
        //                 inArr.push(flow);
        //             }else{
        //                 outArr.push(flow);
        //             }
        //         });

        //         this.inArr = inArr;
        //         this.outArr = outArr;

        //     }

            
        // }
    }
}
</script>

