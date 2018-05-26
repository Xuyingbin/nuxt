<template>
<div class="stockIntro" v-if="basicInfoList">
    <div class="stock-l">
        <div class="st-top">
            <span>{{stockName}}（{{stockCode}}）</span>
            <!-- stockBasicInfo.fellow 为false 没有关注  或者没有登录  true  已关注 -->
            <b v-if="!basicInfoList.fellow" @click="addFollow()">+ 关注</b>
            <b v-if="basicInfoList.fellow" @click="cancelFollow()">取消关注</b>
        </div>
        <div class="st-bottom" v-if="basicInfoList.isStoped">
            <h1 class="textRed">停牌</h1>
        </div>
        <div class="st-bottom" v-if="!basicInfoList.isStoped">
            <div class="nowPrice">
                <span>现价</span>
                <strong :class="basicInfoList.changeRate>=0?'textRed':'textGreen'">{{basicInfoList.currentPrice}}</strong>
            </div>
            <div class="upNum">
                <span :class="basicInfoList.changePrice>=0?'textRed':'textGreen'">
                    {{formatData(basicInfoList.changePrice)> 0?'+'+formatData(basicInfoList.changePrice):formatData(stockBasicInfo.changePrice)}}
                </span>
            </div>
            <div class="upDown">
                <span>涨幅</span>
                <strong :class="basicInfoList.changeRate>=0?'textRed':'textGreen'">
                    {{formatData(basicInfoList.changeRate)> 0?'+'+formatData(basicInfoList.changeRate)+'%':formatData(stockBasicInfo.changeRate)+'%'}}
                </strong>
            </div>
        </div>
    </div>
    <div class="stock-r">
        <ul>
            <li>今开 <span class="textRed">{{basicInfoList.isStoped?'--':basicInfoList.openPrice}}</span> </li>
            <li>最高 <span>{{basicInfoList.highPrice}}</span> </li>
            <li>成交额  <span>{{businessBalance(basicInfoList.businessBalance)}}</span>（亿）</li>
            <li>昨收  <span>{{basicInfoList.preclosePrice}}</span> </li>
            <li>最低  <span>{{basicInfoList.lowPrice}}</span> </li>
            <li>成交量  <span>{{businessAmount(basicInfoList.businessAmount)}}</span>（手）</li>
            <!-- <li>成交量  <span>{{basicInfoList.businessAmount}}</span>（手）</li> -->
            
        </ul>
    </div>
    <confirm-box v-if="boxIsShow" :title="title"></confirm-box>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Util from '~/utils/format';
import ConfirmBox from '../alertBox/ConfirmBox';
export default {
    data(){
        return {
            // 弹出框 是否显示
            boxIsShow: false,
            // 弹出框内容
            title: '',
            businessMoney: '',
            stockName: this.$route.query.name?this.$route.query.name:'',
            stockCode: this.$route.query.code?this.$route.query.code:'',

            userPhone: ''
        }
    },
    components: {
        ConfirmBox
    },
    watch: {
        'optionalAddFollow'(newVal, oldVal){
            // console.log(newVal);
            if(this.userPhone){
                if(newVal.success && newVal.attention){
                    this.basicInfoList.fellow = true;
                }else{
                    this.title = '关注失败';
                    this.boxIsShow = true;
                    let timer = setTimeout(() => {
                        this.boxIsShow = false;
                        this.title = '';
                        clearTimeout(timer);
                    }, 1500)
                }
            }else{
                this.$router.push({
                    path: '/login'
                })
            }
            
            // this.businessBalance(newVal.businessBalance);
        },
        'optionalCancelFollow'(newVal, oldVal){
            // console.log(newVal);
            if(newVal.success){
                this.basicInfoList.fellow = false;
            }else{
                this.title = '取消关注失败';
                this.boxIsShow = true;
                let timer = setTimeout(() => {
                    this.boxIsShow = false;
                    this.title = '';
                    clearTimeout(timer);
                }, 1500)
            }
        },

        
    },
    computed:{
        ...mapGetters(['stockBasicInfo','currentStock', 'optionalAddFollow', 'optionalCancelFollow']),
        basicInfoList(){
            // console.log(this.stockBasicInfo);
            return this.stockBasicInfo;
        }
        
    },

    mounted(){
        this.userPhone = sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone') || null;
    },

    methods: {
        ...mapActions(['addOptionalFollowAction', 'cancelOptionalFollowAction']),
        // 保留两位小数
        formatData(num){
            return parseFloat((parseFloat(num)).toFixed(2));
        },
        businessBalance(num){
            return parseFloat((parseFloat(num) / 100000000).toFixed(2));
        },
        businessAmount(num){
            return parseInt((parseFloat(num) / 100));
        },

        // 添加关注
        addFollow(){
            this.addOptionalFollowAction({
                userToken: this.userPhone,
                infoId: this.stockBasicInfo.id,
                infoToken: this.stockCode,
                infoType: 1
            })
        },

        // 取消关注
        cancelFollow(){
            this.cancelOptionalFollowAction({
                id: this.stockBasicInfo.id,
                phone: this.userPhone,
                type: 1
            })
        }

    }
}
</script>

