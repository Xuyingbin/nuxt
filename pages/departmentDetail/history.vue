<template>
  <div class="historyContainer">
    <div class="tableContainer">
        <table>
            <thead>
                <tr>
                    <th>日期</th>
                    <th>上榜股票名称</th>
                    <th>买入金额（万）</th>
                    <th>卖出金额（万）</th>
                    <th>净买入（万）</th>
                </tr>
            </thead>
            <!-- <tbody v-if="stockListTable.length === 0">
                <tr>
                    <td colspan="5"> - - 没有数据了 - - </td>
                </tr>
            </tbody> -->
            <tbody v-if="stockListTable && stockListTable.length !== 0" v-for="stock in stockListTable" style="background: #fff;border-right: 1px solid #dedede;border-bottom: 1px solid #dedede">
                <tr >
                    <td :rowspan="stock.length" style="background: #fff;border-right: 1px solid #dedede;border-bottom: 1px solid #dedede">
                        {{stock.date}}
                    </td>
                    <td> 
                        <nuxt-link 
                            :to="'/stockDetails?name='+stock.oneData.secu_abbr+'&code='+stock.oneData.stockCode" target="_blank"
                        >
                            {{stock.oneData.secu_abbr}}
                        </nuxt-link>
                    </td>
                    <td>{{stock.oneData.buy_sum}}</td>
                    <td>{{stock.oneData.sale_sum}}</td>
                    <td :class="stock.oneData.style">{{stock.oneData.differ_sum}}</td>
                </tr>
                <tr v-for="differ in stock.data">
                    
                    <td><nuxt-link 
                            :to="'/stockDetails?name='+differ.secu_abbr+'&code='+differ.stockCode" target="_blank"
                        >{{differ.secu_abbr}}</nuxt-link></td>
                    <td>{{differ.buy_sum}}</td>
                    <td>{{differ.sale_sum}}</td>
                    <td :class="differ.style">{{differ.differ_sum}}</td>
                </tr>
                <!-- <tr>
                
                    <td><a href="javascript:;">乐心医疗</a></td>
                    <td>1053.65万</td>
                    <td>425.15万</td>
                    <td class="textRed">1452.36万</td>
                </tr>
                <tr style="border-bottom: 1px solid #dedede;">
                    
                    <td><a href="javascript:;">乐心医疗</a></td>
                    <td>1053.65万</td>
                    <td>425.15万</td>
                    <td class="textRed">1452.36万</td>
                </tr> -->
            </tbody>
            <!-- <tbody>
                <tr >
                    <td :rowspan="4" style="background: #fff;border-right: 1px solid #dedede;border-bottom: 1px solid #dedede">
                        2017-10-12
                    </td>
                    <td> <a href="javascript:;">乐心医疗</a></td>
                    <td>1053.65万</td>
                    <td>425.15万</td>
                    <td class="textRed">1452.36万</td>
                </tr>
                <tr>
                    
                    <td><a href="javascript:;">乐心医疗</a></td>
                    <td>1053.65万</td>
                    <td>425.15万</td>
                    <td class="textRed">1452.36万</td>
                </tr>
                <tr>
                
                    <td><a href="javascript:;">乐心医疗</a></td>
                    <td>1053.65万</td>
                    <td>425.15万</td>
                    <td class="textRed">1452.36万</td>
                </tr>
                <tr style="border-bottom: 1px solid #dedede;">
                    
                    <td><a href="javascript:;">乐心医疗</a></td>
                    <td>1053.65万</td>
                    <td>425.15万</td>
                    <td class="textRed">1452.36万</td>
                </tr>
            </tbody> -->
        </table>
    </div>
    
    <div class="historyPageContainer">
        <button class="btn btn-warning" @click="backPage">回到首页</button>
        <button class="btn btn-warning" @click="pervPage">上一页</button>
        <button class="btn btn-warning" @click="nextPage">下一页</button>
        <span>当前页： {{currentPage}}</span>
    </div>
    
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import Util from '~/store/util';

import axios from 'axios';
export default {
    name: 'History',
    data(){
        return {
            // 时间位置数组
            datePositionArr: [],
            // 表格数据
            stockListTable:[
                // {
                //     date: '2018-03-13',
                //     length: 2,
                //     oneData:{
                //         secu_abbr: '智慧农业',
                //         secu_code: '000816.SZ',
                //         buy_sum: '9194333.00',
                //         sale_sum: '8079877.00',
                //         differ_sum: '200',
                //         style: {
                //             textRed: true,
                //             textGreen: false
                //         }
                //     },
                //     data: [
                //         {
                //             secu_abbr: '智慧农业',
                //             secu_code: '000816.SZ',
                //             buy_sum: '9194333.00',
                //             sale_sum: '8079877.00',
                //             differ_sum: '200',
                //             style: {
                //                 textRed: true,
                //                 textGreen: false
                //             }
                //         }
                //     ]
                // }
            ],
            currentPage: 1
        }
    },

    async fetch ({ store, query }) {
        await Promise.all([ 
            axios.get(Util.baseUrl() + 'stock/getDeptStockSale?bo_code='+ query.id),
            
        ])
        .then(res => {
            // console.log(res);
            let [ list ] = res;       
            store.commit('DEPARTMENT_STOCK_LIST', list.data);

        });

    },



    computed: {
        ...mapGetters(['departmentStockList'])
    },

    watch: {
        'departmentStockList'(newVal, oldVal){
            // console.log(newVal);
            if(newVal && newVal.stockList){
                // console.log(this.datePositionArr)
                this.handleDate(newVal.stockList);

                
            }
        }
    },

    created(){
        this.handleDate(this.departmentStockList.stockList);
    },

    mounted(){
        if(this.departmentStockList){

            this.handleDate(this.departmentStockList.stockList);
        }
        // this.getDepartmentStockList({bo_code: this.$route.query.id})
    },

    methods: {
        ...mapActions(['getDepartmentStockList']),
        //  分页
        recentChangePage(data){
            // console.log(data);
            this.getBoardTransTheme({days: 5, pageNo: data});
        },
        // 时间数据处理
        handleDate(data){
            // console.log(data);
            let dateArr = [0];
            if(data && data.length !== 0){
                for(let i = 0; i < data.length; i++){
                    // console.log(data[i + 1].trading_day);
                    let pervDate = data[i].trading_day;
                    let nextDate = data[i + 1]?data[i + 1].trading_day:'';
                    // 如果前面时间不等于后面数组 则记录不同数组的位置
                    if(pervDate !== nextDate){
                        dateArr.push(i + 1);
                    }
                }
                // 数据分割
                this.sliceData(data, dateArr);
                // console.log(dateArr);
                // this.datePositionArr = dateArr;
            }
        },

        

        // 分割数据
        sliceData(data, dateArr){
            // console.log(data)
            let dataTable = [];
            for(let i = 0; i < dateArr.length; i++){
                
                let arr = data.slice(dateArr[i], dateArr[i + 1]);
                if(arr.length !== 0){
                    // console.log(arr);
                    // 处理完数据后  push数组内
                    dataTable.push(this.handleEveryData(arr));
                    // 不含最后一个
                    // let index = i && i === 0;
                    // 每组 第一个 数据
                    // let firstData = data[dateArr[index - 1]];
                    
                }
                
            }
            this.stockListTable = dataTable;
        },

        // 处理每一个分割的数据
        handleEveryData(data){
            let dataObj = {};
            if(data && data.length !== 0){
                // console.log(data);
                // 后续数据 arr
                let arr = [];
                data.map((item, index) => {
                    if(index === 0){
                        // 第一个数据
                            
                        let oneData = {
                            // 个股，名称
                            secu_abbr: item.secu_abbr?item.secu_abbr:'',
                            // 个股代码
                            secu_code: item.secu_code,
                            // 买入
                            // buy_sum: item.buy_sum,
                            buy_sum: Util.formatMoney({num: parseFloat(item.buy_sum), type: '万'}) ,
                            // 卖出
                            // sale_sum: item.sale_sum,
                            sale_sum: Util.formatMoney({num: parseFloat(item.sale_sum), type: '万'}),
                            // 净买入
                            // differ_sum: item.buy_sum - item.sale_sum,
                            differ_sum: Util.formatMoney({num: item.buy_sum - item.sale_sum, type: '万'}),
                            // 个股代码
                            stockCode: item.stockCode,
                            style: {
                                textRed: item.buy_sum - item.sale_sum >= 0,
                                textGreen: item.buy_sum - item.sale_sum < 0
                            }
                        }

                        dataObj.oneData = oneData;
                        // 日期
                        dataObj.date = item.trading_day;
                        // 数据长度
                        dataObj.length = data.length;
                    }else{
                        // 后续数据
                        let obj = {
                            // 个股，名称
                            secu_abbr: item.secu_abbr?item.secu_abbr:'',
                            // 个股代码
                            secu_code: item.secu_code,
                            // 买入
                            // buy_sum: item.buy_sum,
                            buy_sum: Util.formatMoney({num: parseFloat(item.buy_sum), type: '万'}),
                            // 卖出
                            // sale_sum: item.sale_sum,
                            sale_sum: Util.formatMoney({num: parseFloat(item.sale_sum), type: '万'}),
                            // 净买入
                            // differ_sum: item.buy_sum - item.sale_sum,
                            differ_sum: Util.formatMoney({num: item.buy_sum - item.sale_sum, type: '万'}),
                            // 个股代码
                            stockCode: item.stockCode,
                            style: {
                                textRed: item.buy_sum - item.sale_sum >= 0,
                                textGreen: item.buy_sum - item.sale_sum < 0
                            }
                        }
                        
                        arr.push(obj);
                    }


                    
                });
                dataObj.data = arr;
            }
            // console.log(dataObj);
            return dataObj;
        },

        // 回到首页
        backPage(){
            this.getDepartmentStockList({
                bo_code: this.$route.query.id,
                page_no: 1
            });

            this.currentPage = 1;
        },
        // 上一页
        pervPage(){
            if(this.currentPage > 1){
                this.getDepartmentStockList({
                    bo_code: this.$route.query.id,
                    page_no: --this.currentPage
                });
            }
            
        },
        // 下一页
        nextPage(){
            // console.log(this.currentPage);
            let page = this.currentPage;
            if(this.departmentStockList.stockList.length !== 0){
                
                this.getDepartmentStockList({
                    bo_code: this.$route.query.id,
                    page_no: ++page
                });
                this.currentPage = page;
                // console.log(this.currentPage);
            }else{
                this.currentPage = page--;
            }
        }


    }
}
</script>

