<template>

<div class="themeContent" v-if="todayFollowTheme && todayFollowTheme.todayAttentionInformation.length !== 0">
    
    
    <div class="followTitle">
        <span>今日关注主题</span>
    </div>
    <div class="followContent">
        <ul class="followContainer">
            <li v-for="followTheme in followThemeList">
                <div :class="followTheme.left.style" 
                    @click="jumpThemeDetails({
                        id: followTheme.id
                    })"
                >
                    <span>{{followTheme.left.value}}</span>
                    <span>{{followTheme.left.themeName}}</span>
                </div>
                <div class="follow-r">
                    <div class="t-title">
                        <span>
                            <nuxt-link :to="'/article?id='+followTheme.right.id" target="_blank">
                                {{followTheme.right.title}}
                            </nuxt-link>
                            
                            
                        </span>
                    </div>
                    <div class="t-content">
                        <span 
                            v-for="stock in followTheme.right.stocks"
                            @click="jumpStockDetails({
                                id: stock.code,
                                name: stock.name
                            })"
                        >
                            <i :class="stock.chg>=0?'up':'down'"></i>
                            <b :class="stock.chg>=0?'textRed':'textGreen'">{{stock.name}}</b>
                            <b :class="stock.style">{{stock.value}}</b>
                        </span>
                        <!-- <span><i></i><b>{{followTheme.right.stocks[1].name}}</b><b :class="followTheme.right.stocks[0].style">{{followTheme.right.stocks[1].value}}</b></span> -->
                    </div>
                </div>
            </li>
            <!-- <li>
                <div class="follow-l bgRed">
                    <span>+22.3%</span>
                    <span>人工智能</span>
                </div> 
            </li>
            <li>
                <div class="follow-l bgRed">
                    <span>+22.3%</span>
                    <span>人工智能</span>
                </div>
                <div class="follow-r">
                    <div class="t-title">
                        <span>自由贸易港再迎突破，天津港和宁波港有望成第二批试点</span>
                    </div>
                    <div class="t-content">
                        <span><i></i><b>东软集团</b><b class="textRed">+1.13%</b></span>
                        <span><i></i><b>东软集团</b><b class="textRed">+1.13%</b></span>
                    </div>
                </div>
            </li>
            <li>
                <div class="follow-l bgRed">
                    <span>+22.3%</span>
                    <span>人工智能</span>
                </div>
                <div class="follow-r">
                    <div class="t-title">
                        <span>自由贸易港再迎突破，天津港和宁波港有望成第二批试点</span>
                    </div>
                    <div class="t-content">
                        <span><i></i><b>东软集团</b><b class="textRed">+1.13%</b></span>
                        <span><i></i><b>东软集团</b><b class="textRed">+1.13%</b></span>
                    </div>
                </div>
            </li> -->
        </ul>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    props: [""],
    data(){
        return {
            followThemeList: [//  今日关注主题
               
                // {
                //     id: 2,
                //     left: {
                //         themeName: '人工智能',
                //         value: '+22.3%',
                //         style: {
                //             'follow-l': true, 
                //             'bgRed': true,
                //             'bgGreen': false
                //         }
                //     },
                //     right: {
                //         title: '自由贸易港再迎突破，天津港和宁波港有望成第二批试点',
                //         stocks:[
                //             {
                //                 name: '东软集团',
                //                 value: '+1.13%',
                //                 style:{
                //                     'textGreen': false,
                //                     'textRed': true
                //                 }
                //             },
                //             {
                //                 name: '东软集团',
                //                 value: '+1.13%',
                //                 style:{
                //                     'textGreen': false,
                //                     'textRed': true
                //                 }
                //             }
                //         ]
                //     }
                // }
            ],
        }
    },
    computed: {
        ...mapGetters(['todayFollowTheme'])
    },

    watch: {

        // 今日关注主题

        // 'todayFollowTheme'(newVal, oldVal){
        //     console.log(newVal);
            
        // }
    },

    created(){
        this.handleTodayFollowTheme(this.todayFollowTheme?this.todayFollowTheme.todayAttentionInformation:[]);
    },

    mounted(){
        // console.log(this.$store);

        // this.getTodayFollowTheme();
    },

    methods: {
        // ...mapActions(['getTodayFollowTheme']),
        // 今日关注主题  数据处理
        handleTodayFollowTheme(data){
            // console.log(data);
            let followThemeArr = [];
            if(data.length === 0){
                return;
            }
            data.map((item) => {
                let obj = {};
                if(item.conceptStockInfoVo){
                    obj.id = item.conceptStockInfoVo.id;
                    obj.left = {
                        themeName: item.conceptStockInfoVo.conceptStockName,
                        value: parseFloat(item.conceptStockInfoVo.chg).toFixed(2) + '%',
                        style: {
                            'follow-l': true, 
                            'bgRed': item.conceptStockInfoVo.chg >= 0,
                            'bgGreen': item.conceptStockInfoVo.chg < 0
                        }
                    }
                }
                
                
                obj.right = {
                    id: item.id,
                    title: item.infomationName,
                    stocks: this.handleLeadStock(item.stockDetails)
                }

                followThemeArr.push(obj);
            });

            this.followThemeList = followThemeArr;
            // console.log(followThemeArr)
        },

        // 领涨跌股 数据处理
        handleLeadStock(data){
            let leadArr = [];
            data.map((item) => {
                let obj = {};
                obj.name = item.stockName;
                obj.code = item.stockCode;
                obj.chg = item.changeRate;
                obj.value = parseFloat(item.changeRate).toFixed(2) + '%';
                obj.style = {
                    'textGreen': item.changeRate < 0,
                    'textRed': item.changeRate >= 0
                }

                leadArr.push(obj);
            });

            return leadArr;
        },

        // 主题详情
        jumpThemeDetails(obj){
            let {id} = obj;
            window.open('/themeDetails?id='+id);
            // this.$router.push({
            //     path: '/render/themeDetails',
            //     query: {
            //         id: id
            //     }
            // });
        },

        // 个股详情
        jumpStockDetails(obj){
            let {id, name} = obj;

            window.open(`/stockDetails?code=${id}&name=${name}`);
            // this.$router.push({
            //     path: '/render/stockDetails',
            //     query: {
            //         code: id,
            //         name: name
            //     }
            // })
        }
    }
}
</script>

