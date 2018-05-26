<template>
<div>
<div class="themeStockChart" >
    <div id="themeStockChart" style="width:500px;height: 400px"></div>
</div>

</div>


</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
       data(){
        return {
            stockConceptThemeProps: {
                stockName: this.$route.query.name?this.$route.query.name:'',
                themeList: [
                    {value: 0, name: '', themeId: 0}
                ]
            }
        }
    },

    watch:{
        'stockConceptTheme'(newVal, oldVal){
            // console.log(newVal);
            this.handleData(this.stockConceptTheme);
            this.chartInit();
        }
        
    },

    computed:{
        ...mapGetters(['stockConceptTheme'])
    },

    mounted(){
        this.handleData(this.stockConceptTheme);
        setTimeout(()=>{
            this.chartInit();
        },10)
        // console.log(this.stockConceptThemeProps);
    },

    methods: {
        chartInit(){
            let option = {
                color: ["#97b552", "#e5cf0d", "#2ec7c9", "#b6a2de", "#ffb980", "#d87a80", "#8d98b3", "#2ec7c9"],
                
                // tooltip : {
                //     trigger: 'item',
                //     formatter: "{a}"
                // },
                
                
                calculable : true,
                graphic:{
                        type:'text',
                        left:'center',
                        top:'center',
                        style:{
                            text:this.stockConceptThemeProps.stockName,
                            textAlign:'center',
                            fill:'#000',
                            width:30,
                            height:30
                        },
                },
                series : [
                    
                    {
                        name:'个股相关主题',
                        type:'pie',
                        radius : [45, 120],
                        center : ['50%', '50%'],
                        roseType : 'area',
                        // data:[
                        //     {value:0, name:'苹果产业链1'},
                        //     {value:0, name:'苹果产业链2'},
                        //     {value:0, name:'苹果产业链3'},
                        //     {value:0, name:'苹果产业4'},
                        //     {value:0, name:'苹果产业链5'},
                        //     {value:0, name:'苹果产业链6'},
                        //     {value:0, name:'苹果产业链7'},
                        //     {value:0, name:'苹果产业链8'}
                        // ]
                        data: this.stockConceptThemeProps.themeList
                    }
                ]
            };

            let chart = this.$echarts.init(document.getElementById('themeStockChart'));

            chart.setOption(option);

            chart.on('click', this.eConsole);
        },


        clickFunc(data){
            // console.log(data); //  饼图点击事件
            if(data !== 0){

                window.open('/themeDetails?id='+data);
            }
            // this.$router.push({
            //     path: '/render/themeDetails',
            //     query: {
            //         id: data
            //     }
            // })
        },


        eConsole(param) {
            // console.log(param);

        　　//alert(option.series[0].data.length);
        　　//alert(option.series[0].data[i]);
        　　//param.dataIndex 获取当前点击索引，
        　　//alert(param.dataIndex);
        　　this.clickFunc(param.data.themeId);//执行点击效果
        },
        // 数据处理
        handleData(data){
            if(data && data.length !== 0){
                let arr = [];
                data.map((item) => {
                    let obj = {value: 0, name: item.conceptStockName, themeId: item.id};
                    arr.push(obj);
                });
                this.stockConceptThemeProps.themeList = arr;
                // console.log(this.stockConceptTheme.themeList);
            }
        }
    }
}
</script>

