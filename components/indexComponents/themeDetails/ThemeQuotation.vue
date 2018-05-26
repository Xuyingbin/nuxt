<template>
<div class="quotationTab">
    <ul class="tabTitle">
        <li @click="navClick(nav.id)" v-for="nav in navData" :class="{'active': navStatus === nav.id}">{{nav.name}}</li>
        <!-- <li>龙虎榜</li> -->
    </ul>
    <div class="chartsContainer">
        <div v-show="chartIsShow">
            <theme-details-chart :chartData="chartData"></theme-details-chart>
        </div>
        <div v-show="BillboardIsShow">
            <billboard-table :currentTheme="currentTheme"></billboard-table>

        </div>
        
    </div>
</div>
</template>

<script>
import ThemeDetailsChart from './ThemeDetailsChart';
import BillboardTable from './BillboardTable';

import { mapGetters, mapActions } from 'vuex';
export default {
    data(){
        return {
            navStatus:0,
            
            date: [],
            data: [],
            chartIsShow: true, // 主题行情显示
            BillboardIsShow: false, // 龙虎榜显示
            navData:[
                {
                    id:0,
                    name: '主题行情'
                },
                {
                    id:1,
                    name: '龙虎榜'
                }
            ],
            //  折线图数据
            chartData: null    
        }
    },

    computed: {
        ...mapGetters(['relationThemeQuo', 'currentTheme'])
    },
    mounted(){
            
        // this.getData();
        // setInterval(()=>{
        //     date.push((new Date()).format('hh:mm'));
        //     data.push(Math.random());
        //     this.stocksChart(date,data);
        // },3000)
    },
    watch: {
        'relationThemeQuo'(newVal, oldVal){
            // console.log(newVal);
            this.handleQuoData(newVal.list?newVal.list:[]);
        },
        // 'currentTheme'(newVal, oldVal){
        //     console.log(newVal);
        // }
        
    },

    mounted(){
        
        this.handleQuoData(this.relationThemeQuo?this.relationThemeQuo.list:[]);
    },

    components: {
        ThemeDetailsChart,
        BillboardTable
    },
    methods: {
        
        // 导航切换
        navClick(id){
            this.navStatus = id;
            if(id === 0){
                this.chartIsShow = true;
                this.BillboardIsShow = false;
            }else if(id === 1){
                this.BillboardIsShow = true;
                this.chartIsShow = false;
            }
                
            
        },

        // 数据处理

        handleQuoData(data){
            let date = [];
            let chg = [];
            if(data && data.length !== 0){
                data.map((item) => {
                    for(let key in item){
                        // console.log(key);
                        date.push(key);
                        chg.push(item[key]);
                    }
                });
                this.chartData = {

                    date: this.handleDate(date),
                    data: this.handleChg(chg)
                } 
            }


        },

        //  时间处理
        handleDate(data){
            // console.log(data);
            let strArr = [];

            if(data && data.length !== 0){
                data.map((item) => {
                    let str = item.slice(8, item.length);
                    let dateStr = str.substring(0,2) + ':' + str.substring(2,str.length);

                    strArr.push(dateStr);
                })
            }

            // console.log(strArr);
            return strArr;
            
        },

        // 涨跌幅处理
        handleChg(data){
            if(data && data.length !== 0){
                let chgArr = [];

                data.map((item) => {
                    let chg = (parseFloat(item)).toFixed(2);
                    
                    
                    chgArr.push(chg);
                });

                // console.log(chgArr);

                return chgArr;
            }
        }
        

       
    }
}
</script>

