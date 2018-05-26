<template>
<section class="ThemeDetails">
    <div class="themeTitle">
        <div class="container">
            <div class="theme" v-if="themeDetailBasicInfo">
                <h1><i></i><span>{{themeDetailBasicInfo.conceptStockName}}</span></h1>
                <h2>
                    <!-- <span class="textRed">22.3</span> -->
                    <span :class="themeDetailBasicInfo.chg>=0?'textRed':'textGreen'">
                        {{themeDetailBasicInfo.chg>0?'+'+formatData(themeDetailBasicInfo.chg)+'%':formatData(themeDetailBasicInfo.chg)+'%'}}
                    </span>
                </h2>
                <div class="follow">
                    <span v-if="!themeDetailBasicInfo.attention" 
                        @click="addFollow({
                            infoId: themeDetailBasicInfo.id,
                            infoToken: themeDetailBasicInfo.conceptStockName,
                            infoType: 0
                        })"
                    ><strong>+</strong><b>关注</b></span>
                    <span v-if="themeDetailBasicInfo.attention"
                        @click="cancelFollow({
                            id: themeDetailBasicInfo.id,
                            type: 0
                        })"
                    ><b>取消关注</b></span>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="themeDesc">
            <div class="lineChart">
                <theme-label :title="lineChartTitle"></theme-label>
                <div class="conBox">
                    <theme-details-chart :chartData="chartData"></theme-details-chart>
                </div>
            </div>
            <div class="pieChart">
                <theme-label :title="pieChartTitle"></theme-label>
                <div class="conBox">
                    <pie-chart></pie-chart>
                    
                    
                </div>
            </div>
            <div class="desc">
                <theme-label :title="descTitle"></theme-label>
                <div class="conBox desc" v-if="themeBasicInfo">
                    <p>{{themeBasicInfo.conceptExplain}}</p>
                </div>
            </div>
        </div>

        <div class="relatedContainer">
            <div class="l-con">
               
                <!-- 关联个股 -->
                <related-shares :relationStock="themeConceptStock" :singleStyle="singleStyle"></related-shares>
            </div>
            <div class="r-con">
                 <div class="billboardContainer">
                     
                     <theme-label :title="billboardTitle"></theme-label>

                     <div class="tableContainer">
                         <billboard-table :currentTheme="currentTheme"></billboard-table>
                     </div>
                 </div>

                 <div class="moneyFollowContainer">
                     <money-flow :comStyle="comStyle" :capital="themeCapitalFlow"></money-flow>
                 </div>

                 <div class="relevantNewsContainer">
                     <relevant-news :releStyle="releStyle" :relationInfo="themeConceptNews"></relevant-news>
                 </div>
            </div>
        </div>
        <confirm-box v-if="confirmBoxIsShow" :title="title"></confirm-box>
    </div>
</section>
</template>

<script>
import themeLabel from '../indexComponents/themeDetails/Label';
import themeDetailsChart from './ThemeDetailsChart';
import pieChart from './PieChart';
import RelatedShares from '../indexComponents/themeDetails/RelatedShares';
import BillboardTable from '../indexComponents/themeDetails/BillboardTable';
import MoneyFlow from '../indexComponents/themeDetails/MoneyFlow';
import RelevantNews from '../indexComponents/themeDetails/RelevantNews';

import { mapGetters, mapActions } from 'vuex';
import ConfirmBox from '../alertBox/ConfirmBox';
export default {
    data(){
        return {

            // 弹出框内容
            title: '',
            // 弹出框是否显示
            confirmBoxIsShow: false,
            lineChartTitle: '今日走势图',
            pieChartTitle: '涨跌家数',
            descTitle: '主题概述',
            billboardTitle: '龙虎榜',
            singleStyle: {// 关联个股
                padding: '18px',
                border: '1px solid #ececec',
                background: '#fff',
                marginTop: '25px'
            },
            
            comStyle: { // 资金流向
                background: '#fff',
                padding: '5px 15px',
            },
            releStyle: { //相关资讯
                background: '#fff',
                padding: '15px',
            },

            //  折线图数据
            chartData: null,
            // 当前主题信息
            currentTheme: {
                id: ''
            },


            userPhone: ''
        }
    },
    
      
    

    components: {
        themeLabel,
        themeDetailsChart,
        pieChart,
        RelatedShares,
        BillboardTable,
        MoneyFlow,
        RelevantNews,
        ConfirmBox
    },

    computed: {
        ...mapGetters([
            'themeConceptStock', 
            'themeConceptNews', 
            'themeBasicInfo', 
            'themeUpDownMin', 
            'themeCapitalFlow',
            'optionalAddFollow',
            'optionalCancelFollow'
        ]),

        themeDetailBasicInfo(){
            return this.themeBasicInfo;
        },
        themeName(){
            return this.themeBasicInfo?this.themeBasicInfo.conceptStockName:'';
        }
    },

    watch:{
        '$route'(newVal, oldVal){
            // console.log(newVal);
            location.reload();
        },

        'themeUpDownMin'(newVal, oldVal){
            // console.log(newVal);
            this.handleQuoData(newVal);

            // console.log(this.chartData);
        },

        // 添加关注
        'optionalAddFollow'(newVal, oldVal){
            // console.log(newVal);
            if(this.userPhone){
                if(newVal.success && newVal.attention){
                    this.themeDetailBasicInfo.attention = true;
                }else{
                    this.title = '关注失败';
                    this.confirmBoxIsShow = true;
                    let timer = setTimeout(() => {
                        this.confirmBoxIsShow = false;
                        this.title = '';
                        clearTimeout(timer);
                    }, 1500)
                }
            }else{
                this.$router.push({
                    path: '/login'
                })
            }
            
        },

        //取消关注
        'optionalCancelFollow'(newVal, oldVal){
            // console.log(newVal);
            if(newVal.success){
                    this.themeDetailBasicInfo.attention = false;
            }else{
                this.title = '取消关注失败';
                this.confirmBoxIsShow = true;
                let timer = setTimeout(() => {
                    this.confirmBoxIsShow = false;
                    this.title = '';
                    clearTimeout(timer);
                }, 1500)
            }
        }

    },
    

    mounted(){
        this.userPhone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone');
          // 进入 回到顶部
        if(this.$route.path === '/themeDetails'){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }

            // 详情
        this.getThemeDetails({
            conceptId: this.$route.query.id,
            phone: this.userPhone
        });
        // 涨跌分时
        this.getThemeUpDownMin({
            conceptStockId: this.$route.query.id
        });
        // 涨跌家数
        this.getThemeUpDownCount({
            infoId: this.$route.query.id
        });

        this.getThemeTransBillboard({
            conceptId: this.$route.query.id
        });

        this.currentTheme.id = this.$route.query.id;
    },

    destroyed(){
        // 离开页面  清除缓存
        this.clearDetails('theme');
    },

    methods: {
        ...mapActions([
            'getThemeDetails', 
            'getThemeUpDownMin', 
            'getThemeUpDownCount', 
            'getThemeTransBillboard',
            'addOptionalFollowAction',
            'cancelOptionalFollowAction',
            'clearDetails'
        ]),

        // 数据格式
        formatData(data){
            return parseFloat((parseFloat(data)).toFixed(2));
        },

        addFollow(obj){
            addOptionalFollowAction({
                ...obj,
                userToken: this.userPhone,
                
            });
        },

        cancelFollow(obj){
            cancelOptionalFollowAction({
                ...obj,
                phone: this.userPhone,
                
            })
        },

        // 数据处理

        handleQuoData(data){
            let date = [];
            let chg = [];
            if(data && data.length !== 0){
                data.map((item) => {
                    for(let key in item){
                        // console.log(key);
                        let hhmm = (new Date(key)).format('hh:mm');
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

