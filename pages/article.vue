<template>
<section class="articleDetails">
    <div class="container articleContainer">

        <div class="article-l">
            <theme-label :title="articleTitle"></theme-label>
            <div class="articleConText" v-if="articleDetails">
                
                <h1>{{articleDetails.obj.tar.infomationName}}</h1>
                <!-- <h1>特斯拉中国工厂落地两大关键时间点需重视！概念股一年半翻5倍</h1> -->
                <h4>
                    <span>{{dateFormat(articleDetails.obj.tar.infomationTime)}}</span>
                    <span v-if="articleDetails.obj.tar.informationSource">来源：{{articleDetails.obj.tar.informationSource}}</span>
                </h4>
                <div class="articleText" v-html="articleDetails.obj.tar.infomationContent"> 
                    
                    <!-- <p>次报道称，援引自内部人员消息，特斯拉已经和上海市政府达成协议，将在上海自贸区内，建一座特斯拉独资的工厂，目前双方还在商议国产时间等公告细节。 </p>
                    <p>另外，中金公司10月23日发布的最新研报认为，特斯拉此前已反复表示，会在今年年底前披露中国设厂的详细计划。可能的公布时间点包括公司11月1日的三季报，或者11月初Trump总统访华。</p>
                    <p>这两则重磅消息看起来有些突然，但其实一路都是有迹可循，自今年以来，特斯拉落地上海的准备工作也是铺垫很久。</p>
                    <p>2017年6月，发改委、商务部发布《外商投资产业指导目录cnpm 》取消了外资新能源汽车动力电池制造的准入限制以及同一家外商在国内建立合资纯电动汽车生产企业不超过两家的限制。</p>
                    <p>9月21日，商务部发言人高峰在发布会上称，将尽快研究出台减少新能源汽车制造领域外商投资限制的政策措施，持续推进这个领域的对外开放。</p>
                    <p>此番言论也被市场解读为中国放宽新能源车投资限制，其中“新能源车”、“自贸区”、“独资”的字眼更是直指特斯拉。 </p> -->
                </div>

                <div class="article-footer">
                    <span>责任编辑： {{articleDetails.obj.tar.infomationCreater}}</span>
                </div>
            </div>
        </div>
        <div class="article-r">
            <!-- 领涨主题 -->
            <div class="Theme">
                <theme-label :title="upTheme"></theme-label>
                <div class="tableContainer">
                    <theme-table :themeTableInfo="upThemeTableInfo"></theme-table>
                </div>
            </div>
            <!-- 领跌主题 -->
            <div class="Theme">
                <theme-label :title="downTheme"></theme-label>
                <div class="tableContainer">
                    <theme-table :themeTableInfo="downThemeTableInfo"></theme-table>
                </div>
            </div>
            <!-- 今日资金流入主题 -->
            <div class="Theme">
                <theme-label :title="enterTheme"></theme-label>
                <div class="tableContainer">
                    <invest-table @sortCapitalFlow="sortCapitalFlow" :capitalTableInfo="newEnterTheme"></invest-table>
                </div>
            </div>
            <!-- 今日资金流出主题 -->
            <div class="Theme">
                <theme-label :title="exitTheme"></theme-label>
                <div class="tableContainer">
                    <invest-table @sortCapitalFlow="sortCapitalFlow" :capitalTableInfo="newExitTheme"></invest-table>
                </div>
            </div>
        </div>
    </div>
    
</section>
</template>

<script>
import themeLabel from '~/components/indexComponents/themeDetails/Label';
import InvestTable from '~/components/invest/InvestTable';
import themeTable from '~/components/newsDetails/ThemeTableTop';
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios'
import Util from '~/store/util';
import '~/utils/format';
export default {
    layout: 'Dashboard',
    validate({ params, query }) {
        let id = query.id;
        
        let bool = /^[\d]+$/.test(id);
        if(bool){

            return true // 如果参数有效
        }else{

            return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
        }
    },


    data(){
        return {
            articleTitle: '文章详情',
            upTheme: '今日领涨主题',
            downTheme: '今日领跌主题',
            enterTheme: '今日资金流入主题',
            exitTheme: '今日资金流出主题',
            upThemeTableInfo: { // 领涨主题
                textStyle:{
                    textRed: true,
                    textGreen: false
                },
                thead: ["主题", "涨幅", "领涨个股"],
                tbody: [
                    // {
                    //     theme: {
                    //         id: 0,
                    //         router: '/themeDetails',
                    //         name: '保险'
                    //     },
                    //     data: '3.47%',
                    //     stock: {
                    //         id: 0,
                    //         router: '/stockDetails',
                    //         name: '中国重汽'
                    //     }
                    // },

                ]
            },
            downThemeTableInfo: { // 领跌主题
                textStyle:{
                    textRed: false,
                    textGreen: true
                },
                thead: ["主题", "跌幅", "领跌个股"],
                tbody: [
                    // {
                    //     theme: {
                    //         id: 0,
                    //         router: '/themeDetails',
                    //         name: '保险'
                    //     },
                    //     data: '-3.47%',
                    //     stock: {
                    //         id: 0,
                    //         router: '/stockDetails',
                    //         name: '中国重汽'
                    //     }
                    // },
                   
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
            
        }
    },

    head() {
        return {
        title: this.articleDetails.obj.tar.infomationName + ' - 主题风向标',
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
        
        await Promise.all([            
            axios.get(Util.baseUrl() + 'infomation/getInfomation?infoId='+query.id),
            axios.get(Util.baseUrl() + 'conceptSort?num=5'),
            axios.get(Util.baseUrl() + 'fundflow/getFundflowPC')

        ])
        .then(res => {
            // console.log(res);
            let [ article, lead, flow ] = res;

            store.commit('ARTICLE_DETAIL', article.data);
            store.commit('LEAD_UP_DOWN_THEME', lead.data);
            store.commit('TODAY_INVEST_INFLOW', flow.data.inResult);

            store.commit('TODAY_INVEST_OUTFLOW', flow.data.outResult);
        });
        
    },

    components: {
        themeLabel,
        InvestTable,
        themeTable
    },

    computed: {
        ...mapGetters(['leadTheme', 'todayInvestInflow', 'todayInvestOutflow', 'articleDetails']),
        titleName(){
            // console.log(this.articleDetails);
            return this.articleDetails?this.articleDetails.obj.tar.infomationName:'';
        }
    },

    watch:{ 
        
        'leadTheme'(newVal, oldVal){
            // console.log(newVal);
            // leadUpTheme leadDownTheme
            this.upThemeTableInfo.tbody = newVal.leadUpTheme;
            this.downThemeTableInfo.tbody = newVal.leadDownTheme;
        },

        // 资金流入流出
        'todayInvestInflow'(newVal, oldVal){
            this.newEnterTheme.tbody = this.handleInvestFlow(newVal, 'in');
        },
        'todayInvestOutflow'(newVal, oldVal){
            this.newExitTheme.tbody = this.handleInvestFlow(newVal, 'out');
            // this.newExitTheme.tbody = this.handleInvestFlow(newVal, 'out');
        }

        
    },

    created(){
        // ssr
        // 领涨领跌主题
        this.upThemeTableInfo.tbody = this.leadTheme.leadUpTheme;
        this.downThemeTableInfo.tbody = this.leadTheme.leadDownTheme;
        // 资金流入流出
        this.newEnterTheme.tbody = this.handleInvestFlow(this.todayInvestInflow, 'in');
        this.newExitTheme.tbody = this.handleInvestFlow(this.todayInvestOutflow, 'out');
    },

    mounted(){
          // 进入 回到顶部
        if(this.$route.path.indexOf('/article') !== -1){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }

        // console.log(mapGetters(['leadTheme', 'todayInvestInflow', 'todayInvestOutflow', 'articleDetails']))

        // 文章详情
        // this.getArticleDetail({
        //     infoId: this.$route.query.id
        // });

        // 领涨领跌主题
        // this.getLeadTheme({num: 5});

        // 今日  资金流入流出
        // this.getTodayInvestFlow();
        // this.getTodayInvestFlow({type: 'out'});

        
    },

    updated(){
        // let obj = {content: $('html').html()};
        // let Form = new Form();
        // console.log(Form);
        // this.serverRending(obj)
        
    },

    methods: {
        ...mapActions(['getLeadTheme', 'getTodayInvestFlow', 'getArticleDetail', 'serverRending']),
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


        // 时间格式
        dateFormat(time){
            return (new Date(time)).format();
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
        }
    }
}
</script>

