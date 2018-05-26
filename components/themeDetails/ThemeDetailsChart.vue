<template>
<div class="stocksContainer">
    <div class="chartTitle" v-if="themeBasicInfo">
        <span>{{formatDate(themeBasicInfo.nowDate)}}</span>
        <!-- <span v-if="themeBasicInfo">{{formatDate(themeBasicInfo.nowDate)}}</span> -->
        <!-- {{themeConceptInfo.conceptStockInfo}} -->
        <span>最新涨跌幅 
            <!-- <i></i> -->
            <b :class="themeBasicInfo.chg >=0 ?'textRed':'textGreen'">{{themeBasicInfo?formatData(themeBasicInfo.chg) + '%':''}}</b></span>
            <!-- <b v-if="themeBasicInfo" :class="themeBasicInfo.chg >=0 ?'textRed':'textGreen'">{{formatData(themeBasicInfo.chg) + '%'}}</b></span> -->
    </div>
    <div id="stockCharts" style="width:100%;height:230px;"></div>
</div> 
</template>

<script>
import '~/utils/format'; // 时间格式化
import { mapGetters } from 'vuex';
export default {
    props: ["chartData"],
    data(){
        return {
            date: [],
            data: []
            
        }
    },

    mounted(){
        // this.getData();
        // setInterval(()=>{
        //     this.date.push((new Date()).format('hh:mm'));
        //     this.data.push(Math.random());
        //     this.stocksChart(this.date,this.data);
        // },3000)
    },

    watch: {
        'chartData'(newVal, oldVal){
            // console.log(newVal);
            this.stocksChart(newVal);
        },
        
        
    },

    computed:{
        ...mapGetters(['themeBasicInfo'])
    },

    methods: {
        stocksChart({date,data}){
            let visalArr = [];
            data.map((item,index) => {
                let obj = {};
                if(item >= 0){
                   obj = {gt: index, lte: index+1, color: 'red'};
                   
                }else{
                    obj = {gt: index, lte: index+1, color: 'green'};
                }
                visalArr.push(obj);
            });


            let option = {
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '10%'];
                    },
                    formatter: function(params){
                        return params[0].name + '<br />涨幅:' + params[0].value + '%'
                    }
                },
                
                // toolbox: {
                //     feature: {
                        
                        
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.handleXAxis(),
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
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    
                    splitLine:{
                        show: true,
                        lineStyle: {
                            color: '#eee',
                            type: 'dashed'
                        }
                    },
                    axisTick:{
                        show: false
                    },
                    position: 'bottom'
                },
                yAxis:[
                    {
                        type: 'value',
                        axisLabel: {
                            // show: false,
                            formatter: function (value) {
                                // console.log(value);
                                return value.toFixed(2) + '%';
                            },

                            color: function (value, index) {
                                return value < 0 ? 'green' : 'red';
                            }
                        },
                        // boundaryGap: [0, '100%'],
                        splitLine:{
                        show: true,
                            lineStyle: {
                                color: '#eee',
                                type: 'dashed'
                            }
                        },
                        splitNumber: 3,
                        axisTick:{
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        },

                        // axisLabel: {
                        //     show: true
                        // }
                        
                        
                    }
                    
                ],
                visualMap: {
                    show: false,
                    dimension: 0,
                    pieces: visalArr
                },

                series: [
                    {
                        name:'涨幅',
                        type:'line',
                        smooth:true,
                        symbol: 'none',
                        sampling: 'average',
                        itemStyle: {
                            normal: {
                                color: 'rgb(255, 70, 131)'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgb(202, 200, 255)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(243, 255, 255)'
                                }])
                            }
                        },
                        data: data
                    }
                ]
            };

            let chart = this.$echarts.init(document.getElementById('stockCharts'));
            chart.setOption(option);
        },

        // getData(){
            
            
        //     setTimeout(() => {

        //         this.date.push((new Date()).format('hh:mm'));// 模拟数据
        //         let randomData = Math.random() >=0.5?(Math.random() * 10).toFixed(2):(Math.random() * 10).toFixed(2) * -1;
        //         this.data.push(randomData);
        //         this.stocksChart(this.date,this.data);
        //         setTimeout(() => {
        //             this.getData();
        //         },3000);
        //     },3000);
        // }

        formatData(num){
            let data = (parseFloat(num)).toFixed(2);
            if(data > 0){
                return "+" + data;
            }else{

                return data;
            }
        },
        // 格式化时间
        formatDate(date){
            // console.log(new Date('2018-03-02 09:30:00'));
            return (new Date(date)).format('YYYY-MM-DD hh:mm');
            // return date;
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

