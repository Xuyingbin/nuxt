<template>
<div>
    <!-- <div class="introDeatil"> -->
        <!-- <ul v-if="themeUpDownCount">
            <li>上涨家数：{{themeUpDownCount.riseCount}}</li>
            <li>下跌家数：{{themeUpDownCount.fallCount}}</li>
            <li>平盘家数：{{themeUpDownCount.territoryCount}}</li>
            <li>停牌家数：{{themeUpDownCount.breakCount}}</li>
        </ul> -->
    <!-- </div> -->
    <div class="chartArea">
                            
        <div id="upDownNums" style="width:390px;height:320px;"></div>

        <!-- <div class="lengend">
            <ul>
                <li><i></i><span>上涨家数</span></li>
                <li><i></i><span>下跌家数</span></li>
                <li><i></i><span>平盘家数</span></li>
                <li><i></i><span>停牌家数</span></li>
            </ul>
        </div> -->
    </div>
</div>


</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return {

        }
    },

    mounted(){
        this.chartInit();
    },

    computed: {
        ...mapGetters(['themeUpDownCount'])
    },

    watch: {
        'themeUpDownCount'(newVal, oldVal){
            // console.log(newVal);
            let arr = [];
            // for(let key in newVal){ "#c12e34", "#2b821d", "#0098d9", "#e6b600"
                newVal['riseCount'] === 0?null:arr.push({value: newVal.riseCount, name:'上涨家数: ' + newVal.riseCount, itemStyle: { color: '#c12e34' }})
                newVal['fallCount'] === 0?null:arr.push({value: newVal.fallCount, name:'下跌家数: ' + newVal.fallCount, itemStyle: { color: '#2b821d' }})
                newVal['territoryCount'] === 0?null:arr.push({value: newVal.territoryCount, name:'平盘家数: ' + newVal.territoryCount, itemStyle: { color: '#0098d9' }})
                newVal['breakCount'] === 0?null:arr.push({value: newVal.breakCount, name:'停牌家数: ' + newVal.breakCount, itemStyle: { color: '#e6b600' }})
            // }
            // console.log(arr);

            this.chartInit(arr);
        }
    },  

    methods: {
        chartInit(data){
            let option = {
                
                tooltip : {
                    trigger: 'item',
                    // formatter: "{a} <br/>{b} : {c} ({d}%)"
                    formatter: function (params) { 
                        // console.log(params.data);
                        return params.data.name + ' (' + params.percent + '%)';
                    }
                },
                
                series : [
                    {
                        name: '涨跌家数',
                        type: 'pie',
                        radius : '60%',
                        center: ['50%', '50%'],
                        data: data,
                        // [
                        //     {value:12, name:'上涨家数'},
                        //     {value:5, name:'下跌家数'},
                        //     {value:1, name:'平盘家数'},
                        //     {value:1, name:'停牌家数'}
                        // ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 5,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };


            let Chart = this.$echarts.init(document.getElementById('upDownNums'));

            Chart.setOption(option);

        },

        
    }
}
</script>
