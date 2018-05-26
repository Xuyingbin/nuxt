<template>
<div>
    <!-- 上榜理由 -->
    <div class="onBoardReason">
        <span>上榜理由</span>
        <span>{{stockDetail_billboard?stockDetail_billboard.result:''}}</span>
        <!-- <span>三日平均换手率大前五日均值30倍且大于20%</span> -->
    </div>
    <div class="departmentBusiness">
        <div class="departTitle">
            <div class="t-center">
                <ul>
                    <li @click="departChange(0)" :class="{'active': departStatus === 0}">买入营业部</li>
                    <li @click="departChange(1)" :class="{'active': departStatus === 1}">卖出营业部</li>
                </ul>
            </div>
            <div class="t-right dateList" v-if="stockDetails.dates" >
                <span  @click="showDateList"> {{currentDate}}<i></i></span>
                <ul v-show="dateListIsShow" >
                    <li @click="selectHandleDate(date)" v-for="date in stockDetails.dates">{{date}}</li>
                    <!-- <li>2017-6-26</li>
                    <li>2017-6-26</li>
                    <li>2017-6-26</li>
                    <li>2017-6-26</li>
                    <li>2017-6-26</li>
                    <li>2017-6-26</li> -->
                </ul>
            </div>
            
        </div>
        <div class="chartContainer" v-if="stockDetails.dates">
            <div :style="{opacity: buyIsShow, zIndex: buyIsShow}" class="buyDepart" >
                <div class="chartArea">
                    <div class="chart-l">
                        <depart-chart></depart-chart>
                    </div>
                    <div class="chart-r">
                        <div class="legendOne">
                            <span>单位：万元</span>
                        </div>
                        <div class="legendTwo">
                            <span>净买入：</span>
                            <span>{{netBuy === 0?0: netBuy+'万'}}</span>
                        </div>
                        <div class="legendThree">
                            <span><i></i> 买入</span>
                            <span><i></i> 卖出</span>
                        </div>
                        <div class="legendFour">
                            <span>买入总计：</span>
                            <span class="textRed">{{totalBuy === 0?0: totalBuy+'万'}}</span>
                        </div>
                    </div>
                </div>

                <div class="chartDesc">
                    <ul v-if="stockDetail_billboard && stockDetail_billboard.buys">
                        <li  
                            v-for="(buy,index) in theFive(stockDetail_billboard.buys)" 
                            
                        >
                            <nuxt-link v-if="buy.departmentName !== '机构专用'" :to="'/departmentDetail/history?id='+ buy.boCode" target="_blank">
                                <b>{{index + 1}}</b><span>{{buy.departmentName}}</span>
                            </nuxt-link>
                            <a v-if="buy.departmentName === '机构专用'" class="noStyle" ><b v-if="buy.departmentName === '机构专用'">{{index + 1}}</b><span>{{buy.departmentName}}</span></a>
                        </li>
                        
                        <!-- <li><b>2</b><span>华鑫证券有限责任公司北京菜市口大街证券营业部</span></li>
                        <li><b>3</b><span>华鑫证券有限责任公司北京菜市口大街证券营业部</span></li>
                        <li><b>4</b><span>华鑫证券有限责任公司北京菜市口大街证券营业部</span></li>
                        <li><b>5</b><span>华鑫证券有限责任公司北京菜市口大街证券营业部</span></li> -->
                    </ul>
                </div>
                
            </div>
            <div :style="{opacity: sellIsShow, zIndex: sellIsShow}" class="sellDepart">
                <div class="chartArea">
                    <div class="chart-l">
                        <depart-sale-chart></depart-sale-chart>
                    </div>
                    <div class="chart-r">
                        <div class="legendOne">
                            <span>单位：万元</span>
                        </div>
                        <div class="legendTwo">
                            <span>净卖出：</span>
                            <span>{{netSale === 0?0: netSale+'万'}}</span>
                        </div>
                        <div class="legendThree">
                            <span><i></i> 买入</span>
                            <span><i></i> 卖出</span>
                        </div>
                        <div class="legendFour">
                            <span>卖出总计：</span>
                            <span class="textRed">{{totalSale === 0?0: totalSale+'万'}}</span>
                        </div>
                    </div>
                </div>

                <div class="chartDesc">
                    <ul v-if="stockDetail_billboard && stockDetail_billboard.sales">
                        <li v-for="(sale, index) in theFive(stockDetail_billboard.sales)"
                        >
                            <nuxt-link v-if="sale.departmentName !== '机构专用'" :to="'/departmentDetail/history?id='+ sale.boCode" target="_blank">
                            
                                <b>{{index + 1}}</b><span>{{sale.departmentName}}</span>
                            </nuxt-link>
                            <a v-if="sale.departmentName === '机构专用'" class="noStyle"><b>{{index + 1}}</b><span>{{sale.departmentName}}</span></a>
                        </li>
                        <!-- <li><b>2</b><span>北京菜市口大街证券营业部</span></li>
                        <li><b>3</b><span>北京菜市口大街证券营业部</span></li>
                        <li><b>4</b><span>北京菜市口大街证券营业部</span></li>
                        <li><b>5</b><span>北京菜市口大街证券营业部</span></li> -->
                    </ul>
                </div>
                
            </div>
            
            
        </div>

    
   
    </div>
</div>

</template>

<script>
import DepartChart from './DepartChart';
import DepartSaleChart from './DepartSaleChart';
import $ from 'jquery';
import { mapActions, mapGetters } from 'vuex';
export default {
    data(){
        return {
            // 营业部点击状态
            departStatus: 0,
            // 买入营业部 是否显示
            buyIsShow: 1,
            // 卖出营业部  是否显示
            sellIsShow: 0,
            Tag: 'buyChart',
            // 卖出营业部 Id
            sellTag: 'sellChart',
            // 买入营业部Id
            buyTag: 'buyChart',

            // 日期列表是否显示
            dateListIsShow: false,
            // 当前选择的日期
            currentDate: '',
            
            // 净买入
            netBuy: 0,
            // 总买入
            totalBuy: 0,
            // 净卖出
            netSale: 0,
            // 总卖出
            totalSale: 0
        }
    },
    components: {
        DepartChart,
        DepartSaleChart
    },
    computed:{
        ...mapGetters(['stockDetails', 'currentStockDetails', 'stockDetail_billboard'])
    },
    watch: {
       'stockDetails.dates'(newVal, oldVal){
           this.currentDate = newVal[0];
        //    if(newVal){
        //         this.currentDate = newVal[0];
        //         this.getStockDetail_billboard({
        //             stockCode: this.currentStockDetails.stockCode,
        //             dateStr: newVal[0]
        //         })
        //    }else{
        //        this.currentDate = oldVal[0];
        //        this.getStockDetail_billboard({
        //             stockCode: this.currentStockDetails.stockCode,
        //             dateStr: oldVal[0]
        //         })
        //    }
        // console.log(newVal)
       },
       
        'stockDetail_billboard'(newVal, oldVal){
            // console.log(newVal);
            if(newVal){
                this.calNetData({
                    operData: this.stockDetail_billboard.buys?this.stockDetail_billboard.buys.slice(0,5):[],
                    type: 'buy'
                });
                this.calNetData({
                    operData: this.stockDetail_billboard.sales?this.stockDetail_billboard.sales.slice(0,5):[],
                    type: 'sale'
                })

                // console.log(this.stockDetail_billboard.sales.slice(0,5))
            }
        }
    
    },
    mounted(){
        $('.departmentBusiness').on('click', (e) => {
            e.stopPropagation();
            let len = $(e.target).parents('.dateList').length;
                
            if(len === 0){
                this.dateListIsShow = false;
            }
        });

        // console.log(this.currentStockDetails);

        // this.currentDate = this.stockDetails.dates?this.stockDetails.dates[0]:'';
        
    },
    methods: {
        ...mapActions(['getStockDetail_billboard']),
        departChange(id){
            if(id === 0){
                this.departStatus = 0;

                this.buyIsShow = 1;
                this.sellIsShow = 0;

                // console.log(this.$refs.departChart.renderChart())
                this.Tag = this.buyTag;
            }else if(id === 1){
                this.departStatus = 1;
                this.buyIsShow = 0;
                this.sellIsShow = 1;
                this.Tag = this.sellTag;
            }
        },

        // 日期列表显示事件
        showDateList(){
            this.dateListIsShow = !this.dateListIsShow;
        },

        // 选择日期
        selectHandleDate(date){
            this.currentDate = date;
            this.dateListIsShow = false;

            // 获取个股详情里的龙虎榜数据
            this.getStockDetail_billboard({
                stockCode: this.currentStockDetails.stockCode,
                dateStr: date,
                // heroId: this.currentStockDetails.heroId
            })
        },

        // 计算净数据
        calNetData(data){
            let {operData, type} = data;
            // let buy = 0, sale = 0, netBuy = 0, netSale = 0;
            // 如果是买入
            let sum = 0;
            
            if(operData.length !== 0){
                    operData.map((item) => {
                        sum += item.in;
                        // if(type === 'buy'){
                        //     item.in?buy += parseFloat(item.in):buy += 0;
                        //     item.out?sale += parseFloat(item.out):sale += 0;
                            
                            
                        // }else if('sale'){
                        //     item.in?sale += parseFloat(item.in):bsaleuy += 0;
                        //     item.out?buy += parseFloat(item.out):buy += 0;
                            
                        // }

                        // item.in?sale += parseFloat(item.in):sale += 0;
                    });
                    // console.log('净买入'+netBuy);
                    // console.log('净卖出'+netSale);
                    // console.log('总买入'+buy);
                    // console.log('总卖出'+sale);
                    // netSale = ((sale - buy) / 10000).toFixed(2);
                    // netBuy = ((buy - sale) / 10000).toFixed(2);
                    // this.netBuy = netBuy ; // 净买入
                    // this.totalBuy = (buy / 10000).toFixed(2); // 总买入
                    
                    if(type === 'buy'){
                        this.netBuy = (sum / 10000).toFixed(2);
                        this.totalBuy = (sum / 10000).toFixed(2);
                    }else if(type === 'sale'){
                        this.netSale = (sum / 10000).toFixed(2);
                        this.totalSale = (sum / 10000).toFixed(2);
                    }
                    

                    // this.netSale = netSale; // 净卖出
                    // this.totalSale = (sale / 10000).toFixed(2); // 总卖出
            }
            
        },

        // 跳转营业部详情
        jumpDepartmentDetail(obj){
            // let { id } = obj;
            
            // console.log(id);
            // this.$router.push({
            //     path: '/render/departmentDetail',
            //     query: {
            //         id: id
            //     }
            // })
        },

        // 前五
        theFive(arr){
            if(arr && arr.length !== 0){
                // console.log(arr.slice(0, 5));
                return arr.slice(0, 5);
            }else{
                return arr;
            }
        }

    }

}
</script>
