<template>
<div class="themeDetails" v-if="themeConceptInfo && themeConceptInfo.code">
    <h2>{{themeConceptInfo.conceptStockInfoVo.conceptStockName}}</h2>
    <p class="details">
        <!-- 运用现代科学技术成果和现代管理手段，以及传统农业的有效经验建立起来的，能获得较高的经济效益、生态效益和社会效益的现代化高效农业。 -->
        {{themeConceptInfo.conceptStockInfoVo.conceptExplain}}
    </p>
    <!-- 主题行情  龙虎榜 -->
    <div class="themeQuotation">
        <theme-quotation></theme-quotation>
    </div>
    <!-- 资金流向 -->
    <div class="moneyFlowContainer">
        <money-flow :capital="themeConceptInfo.stockFlowList"></money-flow>
    </div>
    <!-- 相关个股 -->
    <div class="relatedSharesContainer">
        <related-shares :relationStock="themeConceptInfo.sdvList"></related-shares>
    </div>
    <!-- 相关资讯 -->
    <div class="relevantNewsContainer">
        <relevant-news :relationInfo="themeConceptInfo.infomationList"></relevant-news>
    </div>
    

</div>
</template>

<script>
import ThemeQuotation from './ThemeQuotation';
import MoneyFlow from './MoneyFlow';
import RelatedShares from './RelatedShares';
import RelevantNews from './RelevantNews';

import { mapGetters, mapActions } from 'vuex';
// import Loading from '../../loading/loading';
import axios from 'axios';

// let loading_img = new Loading('.loading-view');



export default {
    data(){
        return {
            timer: null,
            loadingNum: 0,
        }
    },
    

    components: {
        ThemeQuotation,
        MoneyFlow,
        RelatedShares,
        RelevantNews
        
    },
    watch: {
        'currentTheme'(newVal, oldVal){
            // console.log(newVal);
            let id = newVal.id || '';
            this.getRelationThemeQuo({conceptStockId: id})
            // console.log(newVal);
            // if(newVal){
                // this.intervalGet();
            // }else{
                // clearInterval(this.timer);
            // }
        },
        'themeConceptInfo'(newVal, oldVal){
            // console.log(newVal);
        }
    },

    computed: {
        ...mapGetters(['themeConceptInfo', 'currentTheme']),
        // nowDate(){
        //     let date = null;
        //     setInterval(()=> {
        //         date = (new Date()).getTime();
        //         // console.log((new Date()).getTime());
                

        //     }, 5000);

        //     return date;
        // }
    },
    mounted(){
        console.log(this.currentTheme);
        // this.intervalGet();
        // console.log(this.loading);
        
// axios.interceptors.request.use(function(config){
//     // console.log(config);
//     if(config.url.indexOf('/informationAssociateTheme') !== -1){
        
//         if(this.loadingNum !== 1){
//             loading_img.show();
//         }
//         this.loadingNum = 1;
//     }
//     // loading_img.show();
//     return config;
// }.bind(this));

        // 拦截响应

// axios.interceptors.response.use(function(config){
//     loading_img.hide();

//     this.loadingNum = 0;

//     return config;
// }.bind(this));
    },

    destroyed(){
        // console.log('销毁了');
        clearInterval(this.timer);
        // console.log(this.timer);
    },
    methods: {
        ...mapActions(['saveCurrentInfo', 'getRelationThemeQuo']),
        // 股市时间判断  conceptStockId
        stockMarketDate(){
            let themeId = this.currentTheme.id || '';
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
                    if(this.currentTheme){
                        // console.log(this.currentTheme.id)
                        
                        this.getRelationThemeQuo({conceptStockId: themeId});
                    }
                }

                if(nowDate >= pm_One && nowDate <= pm_Three){
                    if(this.currentTheme){

                        this.getRelationThemeQuo({conceptStockId: themeId});
                    }
                }
            }else{
                clearInterval(this.timer);
            }

        },

        // // 定时发起请求

        intervalGet(){
            // this.timer = setInterval(()=>{
                
                this.stockMarketDate();
            // }, 60000);
        }

    }
}
</script>
