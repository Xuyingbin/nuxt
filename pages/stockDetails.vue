<template>
<section class="stockDetails">
    <div class="container">
        <div class="stockContainer">
            <stock-intro></stock-intro> 
        </div>

        <div class="chartContaienr">
            <div class="chart-l">

                <chart-left></chart-left>
            </div>
            <div class="chart-r">
                <chart-right></chart-right>
            </div>
        </div>
        
        <div class="departBusiness">
            <depar-business></depar-business>
        </div> 
        
    </div>
    
</section>
</template>

<script>
import stockIntro from '~/components/stockDetails/StockIntro';
import ChartLeft from '~/components/stockDetails/ChartLeft';
import ChartRight from '~/components/stockDetails/ChartRight';
import DeparBusiness from '~/components/stockDetails/DepartBusiness';
import { mapGetters, mapActions } from 'vuex';
import Util from '~/store/util';
import axios from 'axios';
export default {
    layout: 'Dashboard',
    // validate({ params, query }) {
    //     let name = query.name;
    //     let code = query.code;
    //     let bool = /^[\d]{6}$/.test(code);
    //     if(bool && name){

    //         return true // 如果参数有效
    //     }else{

    //         return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
    //     }
    // },
    data(){
        return {
            timer: null,
            userPhone: ''
            
        }
    },
    head() {
        return {
        title: `${this.$route.query.name}(${this.$route.query.code}) - 主题风向标`,
        //   meta: [
        //     {
        //       hid: "description",
        //       name: "description",
        //       content: "My custom description"
        //     }
        //   ]
        };
    },

    async fetch ({ store, query }) {
        let marketCode = query.marketCode || '';
        let code = query.code || '000001';
        await Promise.all([            
            axios.get(Util.baseUrl() + 'stock/getStockDetails?stockCode='+code+'&marketCode='+ marketCode),
            // axios.get(Util.baseUrl() + 'stock/getStockDetails?stockCode='+query.code+'&marketCode='+ marketCode),
            // axios.get(Util.baseUrl() + 'stock/getStockDepartment?stockCode='+query.code+'&marketCode='+ marketCode)
            
        ])
        .then(res => {
            // console.log(res);
            let [ stock ] = res;
            let date = stock.data.dates?stock.data.dates[0]:'';
            store.commit('STOCK_BASIC_INFO', {...stock.data.detail, fellow: stock.data.fellow, isStoped: stock.data.isStoped});
            
            return Promise.all([            
                axios.get(Util.baseUrl() + 'stock/getStockDepartment?dateStr='+date+'&stockCode='+ query.code)
            
            ])

        })
        .then(res => {
            let [ depart ] = res;

            store.commit('STOCKDETAIL_BILLBOARD', depart.data);
        })

    },
    
    created(){
        // console.log(window.query);
    },
    

    components: {
        stockIntro,
        ChartLeft,
        ChartRight,
        DeparBusiness
    },

    computed:{
        ...mapGetters(['currentStock']),
        stockName(){
            // setTimeout(() => {

                return this.$route.query.name?this.$route.query.name:'';
            // }, 0);
        },
        stockCode(){
            
            // setTimeout(() => {
                return this.$route.query.code?this.$route.query.code:'';
            // }, 0);
        }
    },

    watch:{
        '$route.query'(newVal, oldVal){
            location.reload();
        }
    },  

    mounted(){
        let phone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
        this.userPhone = phone;
          // 进入 回到顶部
        if(this.$route.path === '/stockDetails'){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }

        // console.log(this.$route.query)
        this.getStockDetails({
            userPhone: phone,
            stockCode: this.$route.query.code,
            marketCode: this.$route.query.marketCode?this.$route.query.marketCode:null
        });
        this.getKLineData({
            stockCode: this.$route.query.code,
            marketCode: this.$route.query.marketCode?this.$route.query.marketCode:null
        })

        // 定时发起请求
        this.intervalGet();
    },

    destroyed(){
        //  清除缓存
        this.clearDetails('stock');
        clearInterval(this.timer);
    },

    methods: {
        ...mapActions(['getStockDetails', 'getKLineData', 'clearDetails', 'getTimeChart']),
        stockMarketDate(){
            // 现在的时间戳
            let nowDate = (new Date()).getTime();
            // 现在的周几
            let nowDateWeekday = (new Date()).getDay();

            // 获取当天
            let now = (new Date()).format('YYYY-MM-DD');
            // 当天 上午9:30 时间戳
            let am_Nine = new Date(`${now} 09:30:00`);
            // 当天 上午11:30 时间戳
            let am_Eleven = new Date(`${now} 19:30:00`);
            // 当天 下午1:00 时间戳
            let pm_One = new Date(`${now} 13:00:00`);
            // 当天 下午3:00 时间戳
            let pm_Three = new Date(`${now} 15:30:00`);

            // 如果在工作日
            if(nowDateWeekday >= 1 && nowDateWeekday <=5 ){
                if(nowDate >= am_Nine && nowDate <= am_Eleven){
                    // console.log(this.currentInfo);
                   
                    this.getTimeChart({
                        userPhone: this.userPhone,
                        stockCode: this.$route.query.code,
                        marketCode: this.$route.query.marketCode?this.$route.query.marketCode:null
                    });
                        
                    
                }

                if(nowDate >= pm_One && nowDate <= pm_Three){
                    this.getTimeChart({
                        userPhone: this.userPhone,
                        stockCode: this.$route.query.code,
                        marketCode: this.$route.query.marketCode?this.$route.query.marketCode:null
                    });
                }
            }else{
                clearInterval(this.timer);
            }

        },

        // // 定时发起请求

        intervalGet(){
            this.timer = setInterval(()=>{
                
                this.stockMarketDate();
            }, 6000);
        }
    }
}
</script>


