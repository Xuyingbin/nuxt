<template>
<div class="departChart" id="buyChart" >
    
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
   
    data(){
        return {
            
        }
    },

    components: {

    },
    computed:{
        ...mapGetters(['stockDetail_billboard']),
        
    },
    watch: {
        
        'stockDetail_billboard'(newVal, oldVal){
            // console.log(newVal);
            if(newVal){
                
                this.renderBuyChart();

            }
        }
    },
    mounted(){
        // console.log(this.query);
        this.renderBuyChart();
        
        
    },

    methods: {
        optionsData(){
            let valData = this.stockDetail_billboard?this.stockDetail_billboard.buys.slice(0,5):[];
            // if(query === 'buyChart' && this.stockDetail_billboard){
            //     valData = this.stockDetail_billboard.buys?this.stockDetail_billboard.buys:[];
            // }else if(query === 'sellChart' && this.stockDetail_billboard){
            //     valData = this.stockDetail_billboard.sales?this.stockDetail_billboard.sales:[];
            // }
            // console.log(valData);

            // console.log(valData);
            let option = {
                color: ['#e80618'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                        data : ['1','2','3','4','5'],
                        axisLine:{
                            show:false
                        },
                        axisTick:{
                            show: false
                        },
                        splitLine:{
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            width: 16,
                            height: 16,
                            backgroundColor: '#aaaaaa',
                            fontSize: 14,
                            padding: [3, 4, 3, 4],
                            color: '#fff',
                            borderRadius: 4,
                            
                        }
                        
                    }
                    
                ],
                yAxis : [
                    {
                        type : 'value',
                                    
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
                        name:'买入',
                        type:'bar',
                        // data:[2.0, 4.9, 7.0, 23.2, 25.6],
                        data: this.arrangeData(valData),
                        itemStyle:{
                            normal:{
                                barBorderRadius: 5
                            }
                        },
                        label:{
                            normal:{
                                show:true,
                                position:'top'
                            }
                        },
                    
                    }
                ]
            };

            return option;
        },
        renderBuyChart(){
            
            

            let chartBuy = this.$echarts.init(document.getElementById('buyChart'));
            
            // console.log(chart);
            chartBuy.setOption(this.optionsData());
            
        },

        // 整理数据
        arrangeData(data){
            // console.log(data);
            let ins = [];
            // let outs = [];
            // let all = [];
            if(data && data.length !== 0){
                // console.log(data);
                data.map(item => {
                    ins.push((parseFloat(item.in) / 10000).toFixed(2));
                })
                // console.log(ins);
                return ins; 
            }else{
                return []
            }
        },

        


    }
}
</script>
