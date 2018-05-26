<template>
<div class="investListContainer container">
    
      <div class="investLeft">
        <!-- 今日关注主题 -->
        <div class="todayFollow">
          
          <follow-theme ></follow-theme>
          
        </div>

        <!-- 最新龙虎榜交易主题 -->
        <div class="newBillboardFollowTheme">
          <theme-label :title="newBillboardFollowTitle"></theme-label>
          <div class="tableContainer">

            <bill-board-table @sortMethod="sortMethod" :billBoardTable="newBillBoardTable"></bill-board-table>
            
          </div>
            <div class="pageContainer">
                <page-select 
                    @changePage="newChangePage" 
                    :totalNum="newBoardTransTheme?newBoardTransTheme.totalCount:0" 
                    :pageSize="10"
                ></page-select>
            </div>
        </div>

        <!-- 近五日龙虎榜交易主题 -->
        <div class="recentBillboardFollowTheme">
            <theme-label :title="recentBillboardFollowTitle"></theme-label>
            <div class="tableContainer">

                <bill-board-table @sortMethod="sortMethod" :billBoardTable="recentBillBoardTable"></bill-board-table>
            
            </div>
            <div class="pageContainer">
                <page-select 
                    @changePage="recentChangePage" 
                    :totalNum="fiveBoardTransTheme?fiveBoardTransTheme.totalCount:0" 
                    :pageSize="10"
                ></page-select>
            </div>
        </div>
      </div>
      <div class="investright">
          <div @click="enterSearch" class="themeSearch">
              <span>主题检索</span>
          </div>
          <!-- 今日流入主题 -->
        <div class="newEnterTheme">
          <theme-label :title="newEnterTitle"></theme-label>
          <div class="tableContainer">

            <invest-table @sortCapitalFlow="sortCapitalFlow" :capitalTableInfo="newEnterTheme"></invest-table>
            
          </div>
            
        </div>
        <!-- 今日资金流出主题 -->
        <div class="newExitTheme">
          <theme-label :title="newExitTitle"></theme-label>
          <div class="tableContainer">

            <invest-table @sortCapitalFlow="sortCapitalFlow" :capitalTableInfo="newExitTheme"></invest-table>
            
          </div>
            
        </div>
        <!-- 近五日资金流入主题 -->
        <div class="recentEnterTheme">
          <theme-label :title="recentEnterTitle"></theme-label>
          <div class="tableContainer">

            <invest-table @sortCapitalFlow="sortCapitalFlow" :capitalTableInfo="recentEnterTheme"></invest-table>
            
          </div>
            
        </div>

        <!-- 近五日资金流出主题 -->
        <div class="recentExitTheme">
          <theme-label :title="recentExitTitle"></theme-label>
          <div class="tableContainer">

            <invest-table @sortCapitalFlow="sortCapitalFlow" :capitalTableInfo="recentExitTheme"></invest-table>
            
          </div>
            
        </div>

      </div>
    
    
</div>
</template>

<script>
import themeLabel from '~/components/indexComponents/themeDetails/Label';
import FollowTheme from '~/components/indexComponents/FollowTheme';
import BillBoardTable from '~/components/invest/BillboardTable';
import PageSelect from '~/components/invest/PageSelect';

import InvestTable from '~/components/invest/InvestTable';

import { mapActions, mapGetters } from 'vuex';
import Util from '~/store/util'
import axios from 'axios'
export default {
    data(){
        return {
            newBillboardFollowTitle: '最新龙虎榜交易主题',
            recentBillboardFollowTitle: '近五日龙虎榜交易主题',
            newEnterTitle: '今日资金流入主题',
            newExitTitle: '今日资金流出主题',
            recentEnterTitle: '近五日资金流入主题',
            recentExitTitle: '近五日资金流出主题',
            
            
            newBillBoardTable: { // 今日龙虎榜主题
                type: 'new',
                thead: [
                    {
                        name: '主题名称',
                        isSort: false
                    },
                    {
                        name: '合计买入(亿)',
                        isSort: true,
                        sortKey: 'inAmount'
                    },
                    {
                        name: '合计卖出(亿)',
                        isSort: true,
                        sortKey: 'outAmount'
                    },
                    {
                        name: '净买入(亿)',
                        isSort: true,
                        sortKey: 'netAmount'
                    },
                    {
                        name: '涨跌幅',
                        isSort: true,
                        sortKey: 'changeRate'
                    },
                    {
                        name: '个股总数',
                        isSort: true,
                        sortKey: 'heroCount'
                    },
                    {
                        name: '上榜个股',
                        isSort: false
                    },
                ],
                tbody:[
                    // {
                    //     id: 0,
                    //     conceptName: '有色金属',
                    //     inAmount: '1.45',
                    //     outAmount: '1.42',
                    //     netAmount: '0.03',
                    //     changeRate: '1.3%',
                    //     heroCount: '3',
                    //     maxStockList: [
                    //         {
                    //             stockCode: 0,
                    //             stockName: '江西铜业'
                    //         },
                    //         {
                    //             stockCode: 1,
                    //             nastockNameme: '江西铜业'
                    //         },
                    //         {
                    //             stockCode: 2,
                    //             stockName: '江西铜业'
                    //         }
                            
                    //     ]
                    // }
                    
                    
                ]
            },
            recentBillBoardTable: { // 近五日龙虎榜主题
                type: 'five',
                thead: [
                    {
                        name: '主题名称',
                        isSort: false
                    },
                    {
                        name: '合计买入(亿)',
                        isSort: true,
                        sortKey: 'inAmount'
                    },
                    {
                        name: '合计卖出(亿)',
                        isSort: true,
                        sortKey: 'outAmount'
                    },
                    {
                        name: '净买入(亿)',
                        isSort: true,
                        sortKey: 'netAmount'
                    },
                    {
                        name: '涨跌幅',
                        isSort: true,
                        sortKey: 'changeRate'
                    },
                    {
                        name: '个股总数',
                        isSort: true,
                        sortKey: 'heroCount'
                    },
                    {
                        name: '上榜个股',
                        isSort: false
                    },
                ],
                
                tbody:[
                    // {
                    //     id: 0,
                    //     conceptName: '有色金属',
                    //     inAmount: '1.45',
                    //     outAmount: '1.42',
                    //     netAmount: '0.03',
                    //     changeRate: '1.3%',
                    //     heroCount: '3',
                    //     maxStockList: [
                    //         {
                    //             stockCode: 0,
                    //             stockName: '江西铜业'
                    //         },
                    //         {
                    //             stockCode: 1,
                    //             nastockNameme: '江西铜业'
                    //         },
                    //         {
                    //             stockCode: 2,
                    //             stockName: '江西铜业'
                    //         }
                            
                    //     ]
                    // }
                    
                ]
            },
            newEnterTheme: {// 今日资金流入主题
                type: 'new',
                textStyle:{
                    textRed: true,
                    textGreen: false
                },
                thead: [
                    {
                        name: '主题名称',
                        isSort: false,

                    }, 
                    {
                        name: '资金流入(亿)',
                        isSort: true,
                        sortKey: 'flowInTotal',
                        sort: 'sortKeyIn'

                    }, 
                    {
                        name: '涨幅',
                        isSort: true,
                        sortKey: 'chg',
                        sort: 'sortKeyIn'
                        
                    }   
                ],
                tbody: [
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // }
                    
                    
                ]
            },
            newExitTheme: {// 今日资金流入主题 recentEnterTheme
                type: 'new',
                textStyle:{
                    textRed: true,
                    textGreen: false
                },
                thead: [
                    {
                        name: '主题名称',
                        isSort: false,

                    }, 
                    {
                        name: '资金流出(亿)',
                        isSort: true,
                        sortKey: 'flowOutTotal',
                        sort: 'sortKeyOut'

                    }, 
                    {
                        name: '涨幅',
                        isSort: true,
                        sortKey: 'chg',
                        sort: 'sortKeyOut'
                        
                    }   
                ],
                
                tbody: [
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // }
                    
                    
                ]
            },
            recentEnterTheme: {// 近五日资金流入主题 
                type: 'five',
                textStyle:{
                    textRed: true,
                    textGreen: false
                },
                thead: [
                    {
                        name: '主题名称',
                        isSort: false,

                    }, 
                    {
                        name: '资金流入(亿)',
                        isSort: true,
                        sortKey: 'flowInTotal',
                        sort: 'sortKeyIn'

                    }, 
                    {
                        name: '涨幅',
                        isSort: true,
                        sortKey: 'chg',
                        sort: 'sortKeyIn'
                        
                    }   
                ],
               
                tbody: [
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // }
                    
                    
                ]
            },
            recentExitTheme: {// 近五日资金流入主题 
                type: 'five',
                textStyle:{
                    textRed: false,
                    textGreen: true
                },
                thead: [
                    {
                        name: '主题名称',
                        isSort: false,

                    }, 
                    {
                        name: '资金流出(亿)',
                        isSort: true,
                        sortKey: 'flowOutTotal',
                        sort: 'sortKeyOut'

                    }, 
                    {
                        name: '涨幅',
                        isSort: true,
                        sortKey: 'chg',
                        sort: 'sortKeyOut'
                        
                    }   
                ],
                tbody: [
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // },
                    
                    // {
                    //     id: 0,
                    //     itemName: '保险',
                    //     items: ["1.09", "3.47%"]
                    // }
                    
                    
                ]
            }
        }
    },
    components: {
        
        themeLabel,
        FollowTheme,
        BillBoardTable,
        PageSelect,
        InvestTable
    },

    async fetch ({ store, params }) {
        await Promise.all([
            axios.get(Util.baseUrl() + 'stock/getConceptHeroListPC?days=1'),
            axios.get(Util.baseUrl() + 'stock/getConceptHeroListPC?days=5'),
            axios.get(Util.baseUrl() + 'fundflow/getFundflowPC'),
            axios.get(Util.baseUrl() + 'fundflow/getFundflowFiveDays')
        ])
        .then(res => {
            // console.log(res);
            let [ newBoard, fiveBoard, todayFlow, fiveFlow ] = res;

            store.commit('NEW_BOARD_TRANS_THEME', newBoard.data);
            store.commit('FIVE_BOARD_TRANS_THEME', fiveBoard.data);

            store.commit('TODAY_INVEST_INFLOW', todayFlow.data.inResult);
            store.commit('TODAY_INVEST_OUTFLOW', todayFlow.data.outResult);

            store.commit('FIVE_INVEST_INFLOW', fiveFlow.data.inResult);
            store.commit('FIVE_INVEST_OUTFLOW', fiveFlow.data.outResult);
        })

        // let market_index = await axios.get(Util.baseUrl() + 'index');
        // let lead = await axios.get(Util.baseUrl() + 'conceptSort');
    },
    watch: {
        'newBoardTransTheme'(newVal, oldVal){
            // console.log(newVal);
            // this.getBoardTransTheme({days: 1});
            this.newBillBoardTable.tbody = newVal.conceptStockHeroList;
        },
        'fiveBoardTransTheme'(newVal, oldVal){
            // this.getBoardTransTheme({days: 5});
            this.recentBillBoardTable.tbody = newVal.conceptStockHeroList;
        },

        // 资金流入流出
        'todayInvestInflow'(newVal, oldVal){
            this.newEnterTheme.tbody = this.handleInvestFlow(newVal, 'in');
        },
        'todayInvestOutflow'(newVal, oldVal){
            this.newExitTheme.tbody = this.handleInvestFlow(newVal, 'out');
        },
        'fiveInvestInflow'(newVal, oldVal){
            this.recentEnterTheme.tbody = this.handleInvestFlow(newVal, 'in');
        },
        'fiveInvestOutflow'(newVal, oldVal){
            this.recentExitTheme.tbody = this.handleInvestFlow(newVal, 'out');
        },

        
    },
    computed: {
        ...mapGetters([
            'newBoardTransTheme', 
            'fiveBoardTransTheme', 
            'todayInvestInflow',
            'todayInvestOutflow',
            'fiveInvestInflow',
            'fiveInvestOutflow'
        ])
    },

    created(){
        // 龙虎榜交易主题
        this.newBillBoardTable.tbody = this.newBoardTransTheme.conceptStockHeroList;
        this.recentBillBoardTable.tbody = this.fiveBoardTransTheme.conceptStockHeroList;
        // 今日 近五日  资金流入流出
        this.newEnterTheme.tbody = this.handleInvestFlow(this.todayInvestInflow, 'in');
        this.newExitTheme.tbody = this.handleInvestFlow(this.todayInvestOutflow, 'out');
        this.recentEnterTheme.tbody = this.handleInvestFlow(this.fiveInvestInflow, 'in');
        this.recentExitTheme.tbody = this.handleInvestFlow(this.fiveInvestOutflow, 'out');
    },
    mounted(){
        // this.getBoardTransTheme({days: 1});
        // this.getBoardTransTheme({days: 5});
        // 龙虎榜交易主题
        // this.newBillBoardTable.tbody = this.newBoardTransTheme.conceptStockHeroList;
        // this.recentBillBoardTable.tbody = this.fiveBoardTransTheme.conceptStockHeroList;
        // 今日 近五日  资金流入流出
        // this.newEnterTheme.tbody = this.handleInvestFlow(this.todayInvestInflow, 'in');
        // this.newExitTheme.tbody = this.handleInvestFlow(this.todayInvestOutflow, 'in');
        // this.recentEnterTheme.tbody = this.handleInvestFlow(this.fiveInvestInflow, 'in');
        // this.recentExitTheme.tbody = this.handleInvestFlow(this.fiveInvestOutflow, 'out');
        // this.getTodayInvestFlow();
        // this.getTodayInvestFlow({type: 'out'});
        // this.getFiveInvestFlow();
        // this.getFiveInvestFlow({type: 'out'});

        // 今日关注主题
        // this.getTodayFollowTheme();
    },

    methods: {
        ...mapActions(['getBoardTransTheme', 'getTodayInvestFlow', 'getFiveInvestFlow']),
        //  最新 分页
        newChangePage(data){
            this.getBoardTransTheme({days: 1, pageNo: data});
        },
        // 近五日 分页
        recentChangePage(data){
            // console.log(data);
            this.getBoardTransTheme({days: 5, pageNo: data});
        },

        // 跳转页面
        enterSearch(){
            this.$router.push({
                path: '/invest/themeSearch'
            })
        },
        

        // 资金流入流出  数据处理
        handleInvestFlow(data, type){
            let investArr = [];
            if(data){
                data.map((item) => {

                    let obj = {};

                    obj.id = item.id;
                    obj.itemName = item.conceptStockName;
                    if(type === 'in'){
                        
                        obj.items = [Util.formatMoney({num: item.flowInTotal, type:'亿'}) , (parseFloat(item.chg)).toFixed(2)];
                    }else if(type === 'out'){
                        obj.items = [Util.formatMoney({num: item.flowOutTotal, type:'亿'}), (parseFloat(item.chg)).toFixed(2)];
                    }

                    investArr.push(obj);

                });
            }
            

            return investArr;
        },

        // 资金流入流出 排序
        sortCapitalFlow(obj){
            let {type, sortKey, sortType, sort} = obj;
            if(type === 'new'){
                this.getTodayInvestFlow({
                    sort: sortKey,
                    sortType: sortType
                })
            }else if(type === 'five'){
                this.getFiveInvestFlow({
                    sort: sortKey,
                    sortType: sortType
                });
            }
        },
        // 龙虎榜交易主题 根据条件排序

        sortMethod(obj){
            // console.log(obj);
            // let {type, sortKey, sortType} = obj;

            if(obj.type === 'new'){
                this.getBoardTransTheme({
                    ...obj,
                    days: 1
                })
            }else if(obj.type === 'five'){
                this.getBoardTransTheme({
                    ...obj,
                    days: 5
                })
            }
        },
        
        
    }
}
</script>
