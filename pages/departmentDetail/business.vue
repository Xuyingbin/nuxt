<template>
<div class="businessContainer">
    <div class="changeCol">
        <ul>
            <li :class="queryType === '1'?'active':''" @click="checkType('1')">5日</li>
            <li :class="queryType === '2'?'active':''" @click="checkType('2')">10日</li>
            <li :class="queryType === '3'?'active':''" @click="checkType('3')">1个月</li>
            <li :class="queryType === '4'?'active':''" @click="checkType('4')">3个月</li>
        </ul>
    </div>
    <div v-show="queryType === '1'" class="tableContainer">
        <table>
            <thead>
                <tr>
                    <th>参与个股数量</th>
                    <th>上榜股票名称</th>
                    <th>参与次数</th>
                    <th>合计买入(万)</th>
                    <th>合计卖出(万)</th>
                    <th>净买入(万)</th>
                    <!-- <th>参与时间</th> -->
                </tr>
            </thead>
            <tbody v-if="departmentTypeStockList && departmentTypeStockList.stockList && stockList_5day.len">
                <tr>
                    <td :rowspan="stockList_5day.len" style="background: #fff;border-right: 1px solid #dedede;border-bottom: 1px solid #dedede">
                        {{stockList_5day.len}}支
                    </td>
                    <td> 
                        <nuxt-link
                            :to="'/stockDetails?name='+stockList_5day.firstData.stockName+'&code='+stockList_5day.firstData.stockCode" target="_blank"
                        >{{stockList_5day.firstData.stockName}}</nuxt-link></td>
                    <td>{{stockList_5day.firstData.on_the_list_num}}</td>
                    <td>{{stockList_5day.firstData.buy_sum}}</td>
                    <td>{{stockList_5day.firstData.sale_sum}}</td>
                    <td :class="stockList_5day.firstData.net_buy_sum >= 0?'textRed':'textGreen'">
                        {{stockList_5day.firstData.net_buy_sum}}
                    </td>
                    
                </tr>
                <tr v-for="stock in stockList_5day.data">
                    
                    <td> 
                        <nuxt-link
                            :to="'/stockDetails?name='+stock.stockName+'&code='+stock.stockCode" target="_blank"
                        >{{stock.stockName}}</nuxt-link></td>
                    <td>{{stock.on_the_list_num}}</td>
                    <td>{{stock.buy_sum}}</td>
                    <td>{{stock.sale_sum}}</td>
                    <td :class="stock.net_buy_sum >= 0?'textRed':'textGreen'">{{stock.net_buy_sum}}</td>
                    
                </tr>
                <!--
                <tr>
                
                    <td> <a href="javascript:;">乐心医疗</a></td>
                    <td>5</td>
                    <td>425.15万</td>
                    <td>425.15万</td>
                    <td class="textRed">1452.36万</td>
                    <td>11/8</td>
                </tr>
                <tr style="border-bottom: 1px solid #dedede;">
                    
                    <td> <a href="javascript:;">乐心医疗</a></td>
                    <td>5</td>
                    <td>425.15万</td>
                    <td>425.15万</td>
                    <td class="textRed">1452.36万</td>
                    <td>11/8</td>
                </tr> -->
            </tbody>
            
        </table>
        
        <div class="page-container" v-if="stockList_5day && stockList_5day.len">
            <page-select 
                @changePage="recentChangePage_5day" 
                :totalNum="stockList_5day.len" 
                :pageSize="10"
            ></page-select>
        </div>
        
    </div>
    <div v-show="queryType === '2'"  class="tableContainer">
        <table>
            <thead>
                <tr>
                    <th>参与个股数量</th>
                    <th>上榜股票名称</th>
                    <th>参与次数</th>
                    <th>合计买入(万)</th>
                    <th>合计卖出(万)</th>
                    <th>净买入(万)</th>
                    <!-- <th>参与时间</th> -->
                </tr>
            </thead>
            <tbody v-if="departmentTypeStockList && departmentTypeStockList.stockList && stockList_10day.len">
                <tr>
                    <td :rowspan="stockList_10day.len" style="background: #fff;border-right: 1px solid #dedede;border-bottom: 1px solid #dedede">
                        {{stockList_10day.len}}支
                    </td>
                    <td> 
                        <nuxt-link
                            :to="'/stockDetails?name='+stockList_10day.firstData.stockName+'&code='+stockList_10day.firstData.stockCode" target="_blank"
                        >{{stockList_10day.firstData.stockName}}</nuxt-link></td>
                    <td>{{stockList_10day.firstData.on_the_list_num}}</td>
                    <td>{{stockList_10day.firstData.buy_sum}}</td>
                    <td>{{stockList_10day.firstData.sale_sum}}</td>
                    <td :class="stockList_10day.firstData.net_buy_sum >= 0?'textRed':'textGreen'">
                        {{stockList_10day.firstData.net_buy_sum}}
                    </td>
                    
                </tr>
                <tr v-for="stock in stockList_10day.data">
                    
                    <td> 
                        <nuxt-link
                            :to="'/stockDetails?name='+stock.stockName+'&code='+stock.stockCode" target="_blank"
                        >{{stock.stockName}}</nuxt-link></td>
                    <td>{{stock.on_the_list_num}}</td>
                    <td>{{stock.buy_sum}}</td>
                    <td>{{stock.sale_sum}}</td>
                    <td :class="stock.net_buy_sum >= 0?'textRed':'textGreen'">{{stock.net_buy_sum}}</td>
                    
                </tr>
                <!--
                <tr>
                
                    <td> <a href="javascript:;">乐心医疗</a></td>
                    <td>5</td>
                    <td>425.15万</td>
                    <td>425.15万</td>
                    <td class="textRed">1452.36万</td>
                    <td>11/8</td>
                </tr>
                <tr style="border-bottom: 1px solid #dedede;">
                    
                    <td> <a href="javascript:;">乐心医疗</a></td>
                    <td>5</td>
                    <td>425.15万</td>
                    <td>425.15万</td>
                    <td class="textRed">1452.36万</td>
                    <td>11/8</td>
                </tr> -->
            </tbody>
            
        </table>
        
        <div class="page-container" v-if="stockList_10day && stockList_10day.len">
            <page-select 
                @changePage="recentChangePage_10day" 
                :totalNum="stockList_10day.len" 
                :pageSize="10"
            ></page-select>
        </div>
        
    </div>
    <div v-show="queryType === '3'" class="tableContainer">
        <table>
            <thead>
                <tr>
                    <th>参与个股数量</th>
                    <th>上榜股票名称</th>
                    <th>参与次数</th>
                    <th>合计买入(万)</th>
                    <th>合计卖出(万)</th>
                    <th>净买入(万)</th>
                    <!-- <th>参与时间</th> -->
                </tr>
            </thead>
            <tbody v-if="departmentTypeStockList && departmentTypeStockList.stockList && stockList_1month.len">
                <tr>
                    <td :rowspan="stockList_1month.len" style="background: #fff;border-right: 1px solid #dedede;border-bottom: 1px solid #dedede">
                        {{stockList_1month.len}}支
                    </td>
                    <td> 
                        <nuxt-link
                            :to="'/stockDetails?name='+stockList_1month.firstData.stockName+'&code='+stockList_1month.firstData.stockCode" target="_blank"
                        >{{stockList_1month.firstData.stockName}}</nuxt-link></td>
                    <td>{{stockList_1month.firstData.on_the_list_num}}</td>
                    <td>{{stockList_1month.firstData.buy_sum}}</td>
                    <td>{{stockList_1month.firstData.sale_sum}}</td>
                    <td :class="stockList_1month.firstData.net_buy_sum >= 0?'textRed':'textGreen'">
                        {{stockList_1month.firstData.net_buy_sum}}
                    </td>
                    
                </tr>
                <tr v-for="stock in stockList_1month.data">
                    
                    <td> 
                        <nuxt-link
                            :to="'/stockDetails?name='+stock.stockName+'&code='+stock.stockCode" target="_blank"
                        >{{stock.stockName}}</nuxt-link></td>
                    <td>{{stock.on_the_list_num}}</td>
                    <td>{{stock.buy_sum}}</td>
                    <td>{{stock.sale_sum}}</td>
                    <td :class="stock.net_buy_sum >= 0?'textRed':'textGreen'">{{stock.net_buy_sum}}</td>
                    
                </tr>
                <!--
                <tr>
                
                    <td> <a href="javascript:;">乐心医疗</a></td>
                    <td>5</td>
                    <td>425.15万</td>
                    <td>425.15万</td>
                    <td class="textRed">1452.36万</td>
                    <td>11/8</td>
                </tr>
                <tr style="border-bottom: 1px solid #dedede;">
                    
                    <td> <a href="javascript:;">乐心医疗</a></td>
                    <td>5</td>
                    <td>425.15万</td>
                    <td>425.15万</td>
                    <td class="textRed">1452.36万</td>
                    <td>11/8</td>
                </tr> -->
            </tbody>
            
        </table>
        
        <div class="page-container" v-if="stockList_1month && stockList_1month.len">
            <page-select 
                @changePage="recentChangePage_1month" 
                :totalNum="stockList_1month.len" 
                :pageSize="10"
            ></page-select>
        </div>
        
    </div>
    <div v-show="queryType === '4'" class="tableContainer">
        <table>
            <thead>
                <tr>
                    <th>参与个股数量</th>
                    <th>上榜股票名称</th>
                    <th>参与次数</th>
                    <th>合计买入(万)</th>
                    <th>合计卖出(万)</th>
                    <th>净买入(万)</th>
                    <!-- <th>参与时间</th> -->
                </tr>
            </thead>
            <tbody v-if="departmentTypeStockList && departmentTypeStockList.stockList && stockList_3month.len">
                <tr>
                    <td :rowspan="stockList_3month.len" style="background: #fff;border-right: 1px solid #dedede;border-bottom: 1px solid #dedede">
                        {{stockList_3month.len}}支
                    </td>
                    <td> 
                        <nuxt-link
                            :to="'/stockDetails?name='+stockList_3month.firstData.stockName+'&code='+stockList_3month.firstData.stockCode" target="_blank"
                        >{{stockList_3month.firstData.stockName}}</nuxt-link></td>
                    <td>{{stockList_3month.firstData.on_the_list_num}}</td>
                    <td>{{stockList_3month.firstData.buy_sum}}</td>
                    <td>{{stockList_3month.firstData.sale_sum}}</td>
                    <td :class="stockList_3month.firstData.net_buy_sum >= 0?'textRed':'textGreen'">
                        {{stockList_3month.firstData.net_buy_sum}}
                    </td>
                    
                </tr>
                <tr v-for="stock in stockList_3month.data">
                    
                    <td> 
                        <nuxt-link
                            :to="'/stockDetails?name='+stock.stockName+'&code='+stock.stockCode" target="_blank"
                        >{{stock.stockName}}</nuxt-link></td>
                    <td>{{stock.on_the_list_num}}</td>
                    <td>{{stock.buy_sum}}</td>
                    <td>{{stock.sale_sum}}</td>
                    <td :class="stock.net_buy_sum >= 0?'textRed':'textGreen'">{{stock.net_buy_sum}}</td>
                    
                </tr>
                <!--
                <tr>
                
                    <td> <a href="javascript:;">乐心医疗</a></td>
                    <td>5</td>
                    <td>425.15万</td>
                    <td>425.15万</td>
                    <td class="textRed">1452.36万</td>
                    <td>11/8</td>
                </tr>
                <tr style="border-bottom: 1px solid #dedede;">
                    
                    <td> <a href="javascript:;">乐心医疗</a></td>
                    <td>5</td>
                    <td>425.15万</td>
                    <td>425.15万</td>
                    <td class="textRed">1452.36万</td>
                    <td>11/8</td>
                </tr> -->
            </tbody>
            
        </table>
        
        <div class="page-container" v-if="stockList_3month && stockList_3month.len">
            <page-select 
                @changePage="recentChangePage_3month" 
                :totalNum="stockList_3month.len" 
                :pageSize="10"
            ></page-select>
        </div>
        
    </div>
    
    

    
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PageSelect from '~/components/invest/PageSelect';
import Util from '~/store/util';
import axios from 'axios';
export default {
    name: 'BusinessDetail',
    data(){
        return {
            totalNum: 1,
            // pageSize: 10,
            // 当前页面
            currentPage: 1,
            // 储存查询类型 1：近五日 2：近十日 3：近1个月 4：近3个月 5：近半年 6：近一年（不传默认1）7:近三日 8：近一日
            queryType: '1',
            // 渲染数据
            stockList_5day: {},
            stockList_10day: {},
            stockList_1month: {},
            stockList_3month: {}
            // {
                // len: 4,
                // firstData: {
                //     stockName: '',
                //     stockCode: '',
                //     buy_sum: '',
                //     sale_sum: '',
                //     net_buy_sum: ''
                // },
                // data: [
                //     {
                //         stockName: '',
                //         stockCode: '',
                //         buy_num: '',
                //         sale_sum: '',
                //         net_buy_sum: ''
                //     }
                // ]
            // }
        }
    },
    async fetch ({ store, query }) {
        await Promise.all([
            
            axios.get(Util.baseUrl() + 'stock/getDeptStockSaleByType?type=1&bo_code='+ query.id)
        ])
        .then(res => {
            // console.log(res);
            let [ st4 ] = res;
            store.commit('DEPARTMENT_QUEY_STOCK', {...st4.data, requestType: '1'});
        })

    },
    components:{
        PageSelect
    },

    computed: {
        ...mapGetters(['departmentTypeStockList']),
        
    },

    watch: {
        'departmentTypeStockList'(newVal, oldVal){
            console.log(newVal);

            this.dataHandleStockList(newVal.stockList, newVal.secu_num, newVal.requestType);
            this.totalNum = parseInt(newVal.secu_num);
        }
    },

    created(){
        // console.log(this.departmentTypeStockList);
        this.dataHandleStockList(this.departmentTypeStockList.stockList, this.departmentTypeStockList.secu_num, this.departmentTypeStockList.requestType);
        this.totalNum = parseInt(this.departmentTypeStockList.secu_num);
    },

    mounted(){
        // this.getDepartmentTypeStockList({
        //     bo_code: this.$route.query.id
            
        // });
        for(let index=1; index<=4; index++){
            this.getDepartmentTypeStockList({
                bo_code: this.$route.query.id,
                type: String(index)
            });
        }
        
    },

    methods: {
        ...mapActions(['getDepartmentTypeStockList']),
        recentChangePage_5day(page){
            this.getDepartmentTypeStockList({
                bo_code: this.$route.query.id,
                type: this.queryType,
                page_no: page
            });
        },
        recentChangePage_10day(page){
            this.getDepartmentTypeStockList({
                bo_code: this.$route.query.id,
                type: this.queryType,
                page_no: page
            });
        },
        recentChangePage_1month(page){
            this.getDepartmentTypeStockList({
                bo_code: this.$route.query.id,
                type: this.queryType,
                page_no: page
            });
        },
        recentChangePage_3month(page){
            this.getDepartmentTypeStockList({
                bo_code: this.$route.query.id,
                type: this.queryType,
                page_no: page
            });
        },
        
        // 股票列表数据处理
        dataHandleStockList(data, len, type){
            
            if(data && data.length !== 0){
                let arr = [];
                
                data.map((item, index) => {

                    if(index === 0){
                        let obj = {
                            on_the_list_num: item.on_the_list_num,
                            stockName: item.secu_abbr,
                            stockCode: item.stockCode,
                            buy_sum: (parseFloat(item.buy_sum)).toFixed(2) ,
                            sale_sum: (parseFloat(item.sale_sum)).toFixed(2) ,
                            net_buy_sum: (parseFloat(item.buy_sum - item.sale_sum)).toFixed(2) 
                        }
                        if(type === '1'){
                            this.stockList_5day.firstData = obj;
                        } 
                        if(type === '2'){
                            this.stockList_10day.firstData = obj;
                        } 
                        if(type === '3'){
                            this.stockList_1month.firstData = obj;
                        } 
                        if(type === '4'){
                            this.stockList_3month.firstData = obj;
                        }   
                        
                    }else{
                        let obj = {
                            on_the_list_num: item.on_the_list_num,
                            stockName: item.secu_abbr,
                            stockCode: item.stockCode,
                            buy_sum: (parseFloat(item.buy_sum)).toFixed(2) ,
                            sale_sum: (parseFloat(item.sale_sum)).toFixed(2) ,
                            net_buy_sum: (parseFloat(item.buy_sum - item.sale_sum)).toFixed(2) 
                        }
                        arr.push(obj);
                    }
                });
                // console.log(type);
                switch (type){
                    case '1':
                        this.stockList_5day.data = arr;
                        this.stockList_5day.len = len?len:0;
                        // console.log(this.stockList_5day);
                    break;
                    case '2':
                        this.stockList_10day.data = arr;
                        this.stockList_10day.len = len?len:0;
                        // console.log(this.stockList_10day);
                    break;
                    case '3':
                        this.stockList_1month.data = arr;
                        this.stockList_1month.len = len?len:0;
                    break;
                    case '4':
                        this.stockList_3month.data = arr;
                        this.stockList_3month.len = len?len:0;
                    break;
                    default: 
                        this.stockList_5day.data = arr;
                        this.stockList_5day.len = len?len:0;
                    break;
                }
                
                // console.log(this.stockList);
            }
        },

        // 切换类型
        checkType(type){
            // this.getDepartmentTypeStockList({
            //     bo_code: this.$route.query.id,
            //     type: type
            // });
            this.queryType = type;
        },
        // // 上一页
        // pervPage(){
        //     if(this.currentPage >= 1){
        //         this.getDepartmentTypeStockList({
        //             type: this.queryType,
        //             bo_code: this.$route.query.id,
        //             page_no: --this.currentPage
        //         });
        //     }
            
        // },
        // // 下一页
        // nextPage(){
            
        //     this.currentPage++;
        //     if(this.currentPage <= Math.ceil(this.stockList.len / 10)){
        //         this.getDepartmentTypeStockList({
        //             type: this.queryType,
        //             bo_code: this.$route.query.id,
        //             page_no: this.currentPage
        //         });
        //     }else{
        //         this.currentPage--;
        //         console.log(this.currentPage);
        //     }
                
           
        // }
    }
}
</script>

