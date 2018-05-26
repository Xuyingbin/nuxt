<template>
<section class="information">
    <div class="container informationContainer">
        <div class="infoContainer">
            
            <info-list :ssrList="ssrInfoList"></info-list>
            <div class="getMore">
                <span v-if="!isLoaded" @click="loadMore()">更多</span>
                <span v-if="isLoaded">没有更多的数据了。。。</span>
            </div>
        </div>
        <div class="themeContainer">
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
    
</section>
</template>

<script>
import InfoList from '~/components/information/InfoList';
import themeLabel from '~/components/indexComponents/themeDetails/Label';
import InvestTable from '~/components/invest/InvestTable';
import { mapGetters, mapActions } from 'vuex';
import Util from '~/store/util';
import axios from 'axios';
export default {
    layout: 'Dashboard',
    data(){
        return {
            newEnterTitle: '今日资金流入主题',
            newExitTitle: '今日资金流出主题',
            recentEnterTitle: '近五日资金流入主题',
            recentExitTitle: '近五日资金流出主题',
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
                    {
                        id: 0,
                        itemName: '',
                        items: ["", ""]
                    }
                    
                    
                    
                ]
            },
            newExitTheme: {// 今日资金流入主题 recentEnterTheme
                type:'new',
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
                    
                    
                    {
                        id: 0,
                        itemName: '',
                        items: ["", ""]
                    }
                    
                    
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
                    
                    {
                        id: 0,
                        itemName: '',
                        items: ["", ""]
                    }
                    
                    
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
                    
                    {
                        id: 0,
                        itemName: '',
                        items: ["", ""]
                    }
                    
                    
                ]
            },

            isHaveInfoData: false,
            // 初始数据组
            initInfoList: [],
            // 是否加载完
            isLoaded: false,
            // 加载页码
            pageNo: 1
        }
    },
    head() {
        return {
        title: '资讯 - 主题风向标',
        //   meta: [
        //     {
        //       hid: "description",
        //       name: "description",
        //       content: "My custom description"
        //     }
        //   ]
        };
    },

    async fetch ({ store, params }) {
        await Promise.all([
            axios.get(Util.baseUrl() + 'infomation/getInfomationsPC')
            
        ])
        .then(res => {
            // console.log(res);
            let [ infolist ] = res;

            store.commit('INFOMATION_LIST', infolist.data);

        })
    },
    

    components: {
        InfoList,
        themeLabel,
        InvestTable
    },

    
    watch: {
        // 资金流入流出
        'todayInvestInflow'(newVal, oldVal){
            this.newEnterTheme.tbody = this.handleInvestFlow(newVal, 'in');
        },
        'todayInvestOutflow'(newVal, oldVal){
            console.log(newVal);
            this.newExitTheme.tbody = this.handleInvestFlow(newVal, 'out');
        },
        'fiveInvestInflow'(newVal, oldVal){
            this.recentEnterTheme.tbody = this.handleInvestFlow(newVal, 'in');
        },
        'fiveInvestOutflow'(newVal, oldVal){
            this.recentExitTheme.tbody = this.handleInvestFlow(newVal, 'out');
        },

        'infomationList'(newVal, oldVal) {
            // console.log(newVal);
            if (oldVal && newVal) {
                if (newVal.resultMap) {
                let infoList = this.handleData(newVal.resultMap);
                // console.log(this.initInfoList[this.initInfoList.length - 1].date);
                // console.log(infoList[0].date);
                // console.log(infoList[0].date === this.lastDate);
                let lastDate =
                    this.initInfoList.length !== 0
                    ? this.initInfoList[this.initInfoList.length - 1].date
                    : null;
                if (lastDate && infoList[0].date === lastDate) {
                    infoList[0].isSame = true;

                    // console.log(infoList)
                }
                this.initInfoList = [...this.initInfoList, ...infoList];
                } else {
                this.isLoaded = true;
                }
            } else {
                this.initInfoList = [...this.handleData(newVal.resultMap)];
                // console.log(this.initInfoList);
            }
        }
        
    },

    computed:{
        ...mapGetters([
            'todayInvestInflow',
            'todayInvestOutflow',
            'fiveInvestInflow',
            'fiveInvestOutflow',
            'infomationList'
        ]),

        ssrInfoList(){
            
            return this.initInfoList;
        }
    },
    created(){
        this.initInfoList = this.handleData(this.infomationList.resultMap);
    },
    mounted(){
         // 进入 回到顶部
        if(this.$route.path === '/information'){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }

        // 今日 近五日  资金流入流出
        this.getTodayInvestFlow();
        // this.getTodayInvestFlow({type: 'out'});
        this.getFiveInvestFlow();
        // this.getFiveInvestFlow({type: 'out'});
        // this.initInfoList = this.handleData(this.infomationList.resultMap);
        // this.getInfomationList({pageNo: 1});
    },
    methods: {
        ...mapActions(['getTodayInvestFlow', 'getFiveInvestFlow', 'getInfomationList']),


        // 资金流入流出  数据处理
        handleInvestFlow(data, type){
            let investArr = [];
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

        // 数据处理
        handleData(data) {
            // console.log(data);
            let arr = [];
            for (let key in data) {
                let obj = {
                isSame: false,
                date: key,
                infoMapList: data[key]
                };

                arr.push(obj);
            }

        return arr;
        },

        // 加载更多
        loadMore() {
        this.getInfomationList({
            pageNo: ++this.pageNo
        });
        },

    }
}
</script>
